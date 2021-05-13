import { HttpService, Injectable } from '@nestjs/common';
import {
  Prisma, Role as _Role,
  State, State as _State, User as _User,

} from '@prisma/client';
import { GraphQLError } from 'graphql';
import {
  AuthInput, AuthResult, FormQueryInput, ResponseQueryInput,
  Role, SignOutResult, User, UserQueryInput, UserUpdateInput, UserWhereUniqueInput
} from 'src/models/graphql';
import { QueryHelper } from 'src/modules/query-helper/query-helper';
import { isEmail, isLength } from 'validator';
import { AppLogger } from '../app-logger/app-logger.module';
import { FirebaseService } from '../firebase-admin/firebase.service';
import { MailService } from '../mail/mail.service';
import { PrismaClient } from '../prisma-client/prisma-client-service';

@Injectable()
export class UserService {



  constructor(
    private readonly firebaseApp: FirebaseService,
    private readonly prisma: PrismaClient,
    private readonly httpService: HttpService,
    private readonly helper: QueryHelper,
    private readonly logger: AppLogger,
    private readonly mail: MailService
  ) {
    this.httpService.axiosRef.defaults.baseURL = this.firebaseApp.signInWithProviderHost;
    this.httpService.axiosRef.defaults.headers.post['Content-Type'] = 'application/json';
    this.logger.setContext(UserService.name);
  }
  async signup(credentials: AuthInput): Promise<AuthResult> {
    const res = await this.signupWithEmail(credentials);
    if (!res.error) {
      const link = await this.firebaseApp.admin.auth().generateEmailVerificationLink(credentials.email);
      await this.mail.sendWelcomeEmail(credentials.email, link).catch((e) => { this.logger.debug(e) });
    }
    return res;
  }

  signOut(token: String): Promise<SignOutResult> {

    return this.destroySessionToken(token);
  }
  async recoverAccount(email: string): Promise<AuthResult> {
    const user = await this.prisma.user.findUnique({ where: { email: email } })
    if (!user) return {
      error: true,
      message: "User account not found"
    };
    const link = await this.firebaseApp.admin.auth().generatePasswordResetLink(email);
    await this.mail.sendPasswordResetLink(email, link).catch((e) => { this.logger.debug(e) });
    return {
      message: 'Password resset instructions sent',
      error: false,
    }
  }
  async signupWithEmail(data: AuthInput): Promise<AuthResult> {
    const { email, password, displayName } = data;
    if (!isEmail(email)) {
      throw new GraphQLError('Invalid Email');
    } else if (!isLength(password, 6)) {
      throw new GraphQLError('Password must be atleast 6 characters long');
    } else if (!isLength(displayName, 3)) {
      throw new GraphQLError('Username must be 3 characters or more');
    }/* else if (!isAlphanumeric(displayName)) {
      throw new Error('Username can not contain special characters');
    }*/ else {
      const users = this.prisma.user;
      const exist = await users
        .findUnique({ where: { email } })
        .catch(() => false);
      if (exist) {
        throw new GraphQLError(
          'The email address is already in use by another account',
        );
      } else {

        return this._createUserWithEmail(email, password, displayName)
          .then((user) =>
            users.create({
              data: {
                id: user.uid,
                displayName: user.displayName,
                disabled: user.disabled,
                email: user.email,
                emailVerified: user.emailVerified,
                role: Role.USER,
              },
            }).catch(async ({ message }) => {
              await users.delete({ where: { email } });
              throw new GraphQLError(message || "Failed to create user account");
            })
          )
          .then(async (user) => {
            const setClaims = await this._setUserClaims(user);
            if (setClaims) {
              /*const session = await this.signInWithEmail({ email, password })
                 .catch((e) => e);
 
               if (session instanceof Error) {
                 await this.cleanUpOnSignUpFailure(user);
                 throw session;
               }
               return session;*/
              // return {
              //  error:false,

              // };

              return {
                error: false,
                message: "Thank you for registering\n you will receive a confimation email when your account is ready",
              }
            }

            if (!await this.cleanUpOnSignUpFailure(user)) {
              throw new GraphQLError('Failed to cleanup user signup errors')
            };
            throw new GraphQLError('Failed to create user account')

          })
          .then((session) => session);
      }
    }
  }

  private async cleanUpOnSignUpFailure(user) {

    const remove1 = await this.firebaseApp.admin
      .auth()
      .deleteUser(user.id)
      .then(() => true)
      .catch(() => false);
    const remove2 = await this.prisma.user
      .delete({ where: { id: user.id } })
      .then(() => true)
      .catch(() => false);
    return remove1 && remove2;
  }

  async signInWithEmail({ email, password }) {

    var user = await this.prisma.user
      .findUnique({ where: { email }, select: { id: true, state: true, role: true } });
    if (!user) {
      throw new GraphQLError('Signin failed user does not exist');
    }
    if (user.state === State.ARCHIVED || user.state === State.REJECTED || user.state === State.COMPLETED) {
      throw new GraphQLError("Your account is deactivated")
    }
    if (user.state === State.PENDING || user.state === State.REVIEW) {
      throw new GraphQLError("Your account is under review please try again later")
    }
    if (user.role == Role.ADMIN) {

      await this._setUserAdminClaims(user)
    }
    const returnSecureToken = true;
    const buffer = Buffer.from(
      JSON.stringify({ email, password, returnSecureToken }),
    );

    return this.httpService.axiosRef
      .post(this.firebaseApp.signInWithEmailPath, buffer)
      .then(async ({ status, data }) => {

        if (status === 200) {
          const { idToken } = data;

          debugger;
          const session = await this.createSessionToken(idToken).catch(
            (e) => e,
          );
          if (session instanceof Error) {
            const { message } = session;
            throw new Error(message || 'Signin failed something went wrong');
          }
          return session;
        }
        throw Error(`network error code ${status}`);

      }).catch(({ message }) => {
        throw Error(`Invalid credentials: ${message}`);
      });
  }

  async _createUserWithEmail(email, password, displayName) {
    return this.firebaseApp.admin.auth().createUser({
      email,
      emailVerified: false,
      // phoneNumber: '+11234567890',
      password,
      displayName,
      // photoURL: 'http://www.example.com/12345678/photo.png',
      disabled: false,
    });
  }
  async _setUserClaims(user) {
    return this.firebaseApp.admin
      .auth()
      .setCustomUserClaims(user.id, { role: Role.USER })
      .then(() => true)
      .catch(() => false);
  }
  async _setUserAdminClaims(user) {
    return this.firebaseApp.admin
      .auth()
      .setCustomUserClaims(user.id, { role: Role.ADMIN })
      .then(() => true)
      .catch(() => false);
  }
  async createSessionToken(idToken, expiresIn = 60 * 60 * 5 * 24 * 1000,) {

    return this.firebaseApp.admin
      .auth()
      .verifyIdToken(idToken, true)
      .then((decodedIdToken) => {
        // Only process if the user just signed in in the last 5 minutes.
        if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
          // Create session cookie and return it.
          return this.firebaseApp.admin
            .auth()
            .createSessionCookie(idToken, { expiresIn })
            .then((token) => {
              return this.prisma.user
                .findUnique({ where: { id: decodedIdToken.uid } })
                .then((user) => {
                  return {
                    user,
                    token,
                    error: false,
                    message: 'Session created successfully',
                  };
                });
            }).catch(({ message }) => {
              return {
                error: true,
                message: message || 'Unknown Error',
              }
            })
        };

        return {
          error: true,
          message: 'A user that was not recently signed in is trying to set a session',
        }
      });
  }

  async destroySessionToken(sessionToken) {
    return this.firebaseApp.admin
      .auth()
      .verifySessionCookie(sessionToken)
      .then((decodedClaims) =>
        this.firebaseApp.admin.auth().revokeRefreshTokens(decodedClaims.sub),
      )
      .then(() => ({
        status: true,
        message: 'Session destroyed successfully',
      })).catch(({ message }) => {
        return {
          status: false,
          message: 'Operation Failed'
        }
      });
  }
  async responses(parent: User, where: ResponseQueryInput, ctx: any, uid: String): Promise<any[]> {
    const args: Prisma.ResponseFindManyArgs = this.helper.responseQueryBuilder(where);
    return this.prisma.user
      .findUnique({ where: { id: parent.id } })
      .responses(args);
  }

  async forms(parent: User, where: FormQueryInput, ctx: any, uid: String): Promise<any[]> {
    const args: Prisma.FormFindManyArgs = this.helper.formQueryBuilder(where)
    // this.logger.debug(args,UserService.name);

    return this.prisma.user
      .findUnique({ where: { id: parent.id } })
      .forms(args);
  }
  async avator(parent: User, ctx: any, uid: any) {
    return this.prisma.user.findUnique({ where: { id: parent.id } }).avator();
  }

  async updateUser(data: UserUpdateInput, ctx: any, uid: any, info): Promise<any> {

    this.helper.isOwner(data.where, ctx);
    const _user = await this.prisma.user.findUnique({ where: { id: data.where.id } });

    const args: Prisma.UserUpdateArgs = { where: data.where, data: {} };
    if (data.update.displayName) {
      args.data.displayName = data.update.displayName
    }
    if (data.update.email) {
      this.helper.isAdmin(ctx);
      args.data.email = data.update.email
    }
    if (data.update.disabled) {
      this.helper.isAdmin(ctx);
      args.data.disabled = data.update.disabled

    }
    if (data.update.avator) {
      args.data.avator = { connect: data.update.avator }
    }
    if (data.update.phoneNumber) {
      args.data.phoneNumber = data.update.phoneNumber
    }
    if (data.update.emailVerified) {
      this.helper.isAdmin(ctx);
      args.data.emailVerified = data.update.emailVerified
    }
    if (data.update.role) {
      this.helper.isAdmin(ctx);
      args.data.role = data.update.role
    }
    if (data.update.state) {
      this.helper.isAdmin(ctx);
      args.data.state = data.update.state;
    }
    const result = await this.prisma.user.update(args)
      .then((user) => {
        return {
          status: true,
          message: 'user updated successfully',
          user
        }
      })
      .catch(({ message }) => {
        return {
          status: false,
          message: message || 'Failed to update user',
          user: undefined
        }
      });
    if (result.status) {
      const __user = (result.user as _User);
      if (_user.role != __user.role) {
        if (__user.role == _Role.ADMIN) {
          //Todo admin activated
          await this.mail.sendAccountMadeAdminEmail(__user.id).catch((e) => {
            this.logger.error(e);
          });
        }
        else if (_user.role == _Role.ADMIN) {
          //todo admin deactivated
          await this.mail.sendAccountRemovedAdminEmail(__user.id).catch((e) => {
            this.logger.error(e);
          });
        }

      }
      if (_user.state != __user.state) {
        if (__user.state == _State.APPROVED) {
          //user approved
          await this.mail.sendAccountActivationEmail(__user.id).catch((e) => {
            this.logger.error(e);
          });
        }
        else if (__user.state == _State.REJECTED) {
          //user deactivated
          await this.mail.sendAccountDeactivationEmail(__user.id).catch((e) => {
            this.logger.error(e);
          });
        }
        else if (__user.state == _State.ARCHIVED) {
          //user archived
          await this.mail.sendAccountDeactivationEmail(__user.id).catch((e) => {
            this.logger.error(e);
          });
        }
      }
    }
    return result;
  }

  deleteUser(where: UserWhereUniqueInput, ctx: any, uid: any): Promise<any> {
    this.helper.isAdmin(ctx);
    return this.prisma.user.delete({
      where: where,
    }).then((forum) => {
      return {
        status: true,
        message: 'User deleted successfully',
        user: {
          id: where.id
        }
      }
    }).catch(({ message }) => {
      return {
        status: false,
        message: message || 'Failed to delete user account'
      }
    })
  }
  getUsers(ctx: any, uid: any, where?: UserQueryInput,): Promise<any> {
    this.helper.isAdmin(ctx);
    const args: Prisma.UserFindManyArgs = this.helper.userQueryBuilder(where);
    return this.prisma.user.findMany(args).then((users) => {
      return {
        status: true,
        message: 'Success',
        users
      }
    }).catch(({ message }) => {
      return {
        status: false,
        message: message || 'Failed to fetch users',
      }
    });
  }

  /*
  linkIdProvider({ idToken, username }) {
    log(idToken);
    log(username);
    if (!idToken) {
      throw new Error('No id token provided');
    } else if (!username) {
      throw new Error('No username provided');
    } else {
      return admin.auth().verifyIdToken(idToken, true)
        .then(async (info) => {
          const {
            role, uid,
          } = info;

          if (role) {
            throw new Error('Provided token is already linked to a user');
          } else if (!isLength(username, 3)) {
            throw new Error('Username must be 3 characters or more');
          } else if (!isAlphanumeric(username)) {
            throw new Error('Username can not contain special characters');
          } else {
            const user = await admin.auth().getUser(uid).catch((error) => error);
            if (user instanceof Error) {
              throw new Error('Failed to get user account');
            } else {
              const {
                email, displayName, photoURL, phoneNumber, disabled, emailVerified,
              } = user;

              const users = DB.collection('Users');
              const exist = await users.firstExample({ email }).catch(() => false);
              const exist2 = await users.firstExample({ username }).catch(() => false);
              if (exist) {
              // Todo handle case were user is in database and firebase but has no claims set
                throw new Error('The email address is already in use by another account');
              } else if (exist2) {
                throw new Error('The Username is already in use by another account');
              } else {
              // link user here
                const auser = await users.save({
                  _key: uid,
                  username,
                  displayName,
                  phoneNumber,
                  disabled,
                  email,
                  emailVerified,
                  avator: photoURL,
                  role: 'SUBSCRIBER',
                }).catch((error) => error);

                if (auser instanceof Error) {
                  throw new Error(auser.message || 'Failed to create user account');
                } else {
                // set claims here
                  const setClaims = await this._setUserClaims(auser);
                  if (setClaims) {
                    const data = await users.document(auser).catch((error) => error);
                    if (data instanceof Error) {
                      throw new Error('Failed to get user info with session');
                    } else {
                      return { user: data, message: 'Account linked successfully' };
                    }
                  }
                }
              }
            }
          }
          return null;
        });
    }
  }

  async updateProfile(user, profile, avatorFile, coverFile) {
    this.isLogedIn(user._id);
    const userData = {};


    if (avatorFile) {
      const {
        createReadStream, filename, mimetype,
      } = await avatorFile;
      const stream = createReadStream();
      const fileUrl = await uploadFile(user._id, `profile/${user._id}/avator/${filename}`, mimetype, stream)
        .catch((e) => {
          const { message } = e;
          throw new Error(message || 'Failed to upload file');
        });
      if (!fileUrl) throw new Error('Failed to upload file');
      log(fileUrl);
      userData.photoURL = fileUrl;
    }
    // todo handle cover file
    if (coverFile) {
      const {
        createReadStream, filename, mimetype,
      } = await coverFile;
      const stream2 = createReadStream();
      const fileUrl2 = await uploadFile(user._id, `profile/${user._id}/cover/${filename}`, mimetype, stream2)
        .catch((e) => {
          const { message } = e;
          throw new Error(message || 'Failed to upload file');
        });
      if (!fileUrl2) throw new Error('Failed to upload file');
      userData.cover = fileUrl2;
    }
    let newUsername;
    if (profile) {
      const {
        username, avator, displayName, email, phoneNumber, cover, bio,
      } = profile;
      if (username) {
        const exist = await this.usersCol.firstExample({ username }).catch((e) => e);
        if (!(exist instanceof Error)) {
          if (exist._key !== user._key) {
            throw new Error('Username already in use with another account');
          }
        }
        newUsername = username;
        if (!isAlphanumeric(newUsername) || !isLength(newUsername, 3)) {
          throw new Error('Username must be 3 characters or more and not contain special characters');
        }
      }
      // const oldInfo = await this.usersCol.document(_id).catch((e) => e);
      // if (oldInfo instanceof Error) throw oldInfo;
      // eslint-disable-next-line prefer-const

      if (bio) userData.bio = bio;
      if (avator) userData.photoURL = avator;
      if (displayName && isLength(displayName, 2)) userData.displayName = displayName;
      if (email) userData.email = email;
      if (phoneNumber) userData.phoneNumber = phoneNumber;
      userData.cover = cover || userData.cover || user.cover;
    }
    const fuser = await admin.auth().updateUser(user._key, userData).catch((e) => e);
    if (fuser instanceof Error) {
      const { message } = fuser;
      throw new Error(message || 'Failed to update firebase user');
    }
    newUsername = newUsername || user.username;
    const data = {
      username: newUsername,
      email: fuser.email,
      phoneNumber: fuser.phoneNumber,
      avator: fuser.photoURL,
      displayName: fuser.displayName,
      disabled: fuser.disabled,
      emailVerified: fuser.emailVerified,
      cover: userData.cover,
    };
    if (userData.bio) data.bio = userData.bio;
    const auser = await this.usersCol.update(user._id, data)
      .then(() => this.usersCol.document(user._id)).catch((e) => e);
    if (auser instanceof Error) {
      throw auser;
    }
    return { user: auser, message: 'Profile updated successfully' };
  }
*/
}
