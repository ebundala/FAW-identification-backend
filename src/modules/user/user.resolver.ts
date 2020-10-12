import {
  ResolveField,
  Resolver,
  Query,
  Mutation,
  Int,
  Args,
  Parent,
  Info,
  Context,
} from '@nestjs/graphql';
import { 
  User,
   AuthInput, 
  AuthResult, 
  Role, 
  SignOutResult,
   Response, 
   ResponseQueryInput, 
   Form, 
   FormQueryInput, 
   Attachment} from '../../models/graphql';
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
    const result=await this.userService.signup(credentials);
    this.setAuth(result.user,ctx);
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
    this.setAuth(result.user,ctx);
    return result;
  }
  private setAuth(user,ctx){
    ctx.auth={uid:user.id,};
  }
  @Mutation((retuns) => SignOutResult)
  async signout(@Context() ctx): Promise<SignOutResult> {
    return this.userService.signOut(ctx.token)
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
  @ResolveField((returns)=>Attachment)
    async avator(@Parent() parent: User, @Context() ctx){
      if (parent && parent.id)
        return this.userService.avator(parent,ctx,parent.id)
    }
}
