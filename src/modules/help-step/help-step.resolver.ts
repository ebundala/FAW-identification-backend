import { Args, Context, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Attachment, AttachmentQueryInput, Help, HelpStep, HelpStepCreateInput, HelpStepResult, HelpStepUpdateInput, HelpStepWhereUniqueInput } from 'src/models/graphql';
import { HelpStepService } from './help-step.service';

@Resolver((of) => HelpStep)
export class HelpStepResolver {
    constructor(private readonly helpStepService: HelpStepService) { }
    @Mutation((returns) => HelpStepResult)
    async createHelpStep(@Args('data', { type: () => HelpStepCreateInput }) data: HelpStepCreateInput, @Context() ctx): Promise<HelpStepResult> {

        return this.helpStepService.createHelpStep(data, ctx);
    }
    @Mutation((returns) => HelpStepResult)
    async updateHelpStep(@Args('data', { type: () => HelpStepUpdateInput }) data: HelpStepUpdateInput, @Context() ctx): Promise<HelpStepResult> {

        return this.helpStepService.updateHelpStep(data, ctx);
    }
    @Mutation((returns) => HelpStepResult)
    async deleteHelpStep(@Args('where', { type: () => HelpStepWhereUniqueInput }) where: HelpStepWhereUniqueInput, @Context() ctx) {

        return this.helpStepService.deleteHelpStep(where, ctx);
    }
    @ResolveField((returns) => [Attachment])
    async attachments(@Parent() parent: HelpStep, @Args('where', { type: () => AttachmentQueryInput }) where: AttachmentQueryInput, @Context() ctx) {
        return this.helpStepService.attachments(parent, where, ctx)
    }
    @ResolveField((returns) => Help)
    async help(@Parent() parent: HelpStep, @Context() ctx) {
        return this.helpStepService.help(parent, ctx,)
    }
}
