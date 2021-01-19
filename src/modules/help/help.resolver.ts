import {
    Args,
    Context,
    Info,
    Mutation,


    Parent,


    Query,


    ResolveField,


    Resolver
} from '@nestjs/graphql';
import { Help, HelpCreateInput, HelpListResult, HelpQueryInput, HelpResult, HelpStep, HelpStepQueryInput, HelpUpdateInput, HelpWhereUniqueInput } from 'src/models/graphql';
import { HelpService } from './help.service';

@Resolver((of) => Help)
export class HelpResolver {
    constructor(private readonly helpService: HelpService) { }
    @Mutation((returns) => HelpResult)
    async createHelp(@Args('data', { type: () => HelpCreateInput }) data: HelpCreateInput, @Context() ctx): Promise<HelpResult> {
        if (ctx.auth && ctx.auth.uid)
            return this.helpService.createHelp(data, ctx);
    }
    @Mutation((returns) => HelpResult)
    async updateHelp(@Args('data', { type: () => HelpUpdateInput }) data: HelpUpdateInput, @Context() ctx): Promise<HelpResult> {
        if (ctx.auth && ctx.auth.uid)
            return this.helpService.updateHelp(data, ctx);
    }
    @Mutation((returns) => HelpResult)
    async deleteHelp(@Args('where', { type: () => HelpWhereUniqueInput }) where: HelpWhereUniqueInput, @Context() ctx) {
        return this.helpService.deleteHelp(where, ctx);
    }
    @ResolveField((returns) => [HelpStep])
    async steps(@Parent() parent: Help, @Args("where", { type: () => HelpStepQueryInput }) where: HelpStepQueryInput, @Context() ctx) {
        return this.helpService.steps(parent, where, ctx)
    }
    @Query((retuns) => HelpListResult)
    async getHelp(@Info() info, @Args("where", { type: () => HelpQueryInput }) where: HelpQueryInput, @Context() ctx): Promise<HelpListResult> {
        return this.helpService.getHelps(where)
    }
}
