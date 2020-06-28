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
   FormQueryInput } from '../../models/graphql';
import { UserService } from './user-service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(
    private readonly userService: UserService
  ) { }
  @Mutation((returns) => User)
  async signup(
    @Args('credentials', { type: () => AuthInput }) credentials: AuthInput,
    @Info() info,
    @Context() ctx
  ): Promise<AuthResult> {
    return this.userService.signup(credentials);
  }

  @Mutation((returns) => User)
  async signin(
    @Args('credentials', { type: () => AuthInput }) credentials: AuthInput,
  ): Promise<AuthResult> {
    return this.userService.signInWithEmail(credentials);
  }
  @Mutation((retuns) => SignOutResult)
  async signout(@Context() ctx): Promise<SignOutResult> {
    return this.userService.signOut(ctx.token)
  }
  @ResolveField((returns) => [Response])
  async responses(@Parent() parent, @Args("where", { type: () => ResponseQueryInput }) where: ResponseQueryInput, @Context() ctx): Promise<Response[]> {
    if (ctx.auth && ctx.auth.uid)
      return this.userService.responses(parent, where, ctx, ctx.auth.uid)
  }

  @ResolveField((returns) => [Form])
  async forms(@Parent() parent, @Args("where", { type: () => FormQueryInput }) where: FormQueryInput, @Context() ctx): Promise<Form[]> {
    if (ctx.auth && ctx.auth.uid)
      return this.userService.forms(parent, where, ctx, ctx.auth.uid)
  }
}
