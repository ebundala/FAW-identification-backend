import {
  Args,


  Context, Info, Mutation,


  Parent, Query, ResolveField,
  Resolver
} from '@nestjs/graphql';
import {
  Attachment, AuthInput,
  AuthResult,




  Form,
  FormQueryInput, Response,
  ResponseQueryInput, SignOutResult, User,









  UserListResult,









  UserQueryInput,









  UserResult,
  UserUpdateInput,
  UserWhereUniqueInput
} from '../../models/graphql';
import { AppLogger } from '../app-logger/app-logger.module';
import { UserService } from './user-service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(
    private readonly userService: UserService,
    private readonly logger: AppLogger
  ) { }
  @Mutation((returns) => AuthResult)
  async signup(
    @Args('credentials', { type: () => AuthInput }) credentials: AuthInput,
    @Info() info,
    @Context() ctx
  ): Promise<AuthResult> {
    const result = await this.userService.signup(credentials);
    //this.setAuth(result.user, ctx);
    return result;
  }

  @Mutation((returns) => AuthResult)
  async signin(
    @Args('credentials', { type: () => AuthInput }) credentials: AuthInput,
    @Info() info,
    @Context() ctx
  ): Promise<AuthResult> {
    // this.logger.debug(ctx.req.body.query)
    //  debugger
    const result = await this.userService.signInWithEmail(credentials);
    this.setAuth(result.user, ctx);
    return result;
  }
  private setAuth(user, ctx) {
    ctx.auth = { uid: user.id, };
  }
  @Mutation((retuns) => SignOutResult)
  async signout(@Context() ctx): Promise<SignOutResult> {
    return this.userService.signOut(ctx.token)
  }
  @Mutation((retuns) => UserResult)
  async deleteUser(@Args("where", { type: () => UserWhereUniqueInput }) where: UserWhereUniqueInput, @Context() ctx): Promise<UserResult> {
    return this.userService.deleteUser(where, ctx, ctx.auth.uid);
  }

  @Mutation((retuns) => UserResult)
  async updateUser(@Args("data", { type: () => UserUpdateInput }) data: UserUpdateInput, @Context() ctx): Promise<UserResult> {

    return this.userService.updateUser(data, ctx, ctx.auth.uid)
  }
  @Query((retuns) => UserResult)
  async users(@Args("where", { type: () => UserQueryInput }) where: UserQueryInput, @Context() ctx): Promise<UserListResult> {
    return this.userService.getUsers(ctx, ctx.auth.uid, where)
  }
  @ResolveField((returns) => [Response])
  async responses(@Parent() parent: User, @Args("responsesWhere", { type: () => ResponseQueryInput }) where: ResponseQueryInput, @Context() ctx): Promise<Response[]> {
    if (parent && parent.id)
      return this.userService.responses(parent, where, ctx, parent.id)
  }

  @ResolveField((returns) => [Form])
  async forms(@Parent() parent: User, @Args("formsWhere", { type: () => FormQueryInput }) where: FormQueryInput, @Context() ctx): Promise<Form[]> {
    if (parent && parent.id)
      return this.userService.forms(parent, where, ctx, parent.id)
  }
  @ResolveField((returns) => Attachment)
  async avator(@Parent() parent: User, @Context() ctx) {
    if (parent && parent.id)
      return this.userService.avator(parent, ctx, parent.id)
  }
}


