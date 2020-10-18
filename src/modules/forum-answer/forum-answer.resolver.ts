import { Args, Context, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Attachment, AttachmentQueryInput, CommentQueryInput, Forum, ForumAnswerCreateInput, ForumAnswerResult, ForumAnswerUpdateInput, ForumAnswerWhereUniqueInput, User } from 'src/models/graphql';
import { ForumAnswerService } from './forum-answer.service';

@Resolver('ForumAnswer')
export class ForumAnswerResolver {
    constructor(private readonly forumAnswerService: ForumAnswerService) { }
    @Mutation((returns) => ForumAnswerResult)
    async createForumAnswer(@Args('data', { type: () => ForumAnswerCreateInput }) data: ForumAnswerCreateInput, @Context() ctx): Promise<ForumAnswerResult> {
        if (ctx.auth && ctx.auth.uid)
            return this.forumAnswerService.createForumAnswer(data, ctx, ctx.auth.uid);
    }
    @Mutation((returns) => ForumAnswerResult)
    async updateForumAnswer(@Args('data', { type: () => ForumAnswerUpdateInput }) data: ForumAnswerUpdateInput, @Context() ctx): Promise<ForumAnswerResult> {
        if (ctx.auth && ctx.auth.uid)
            return this.forumAnswerService.updateForumAnswer(data, ctx);
    }
    @Mutation((returns) => ForumAnswerResult)
    async deleteForumAnswer(@Args('where', { type: () => ForumAnswerWhereUniqueInput }) where: ForumAnswerWhereUniqueInput, @Context() ctx): Promise<ForumAnswerResult> {
        if (ctx.auth && ctx.auth.uid)
            return this.forumAnswerService.deleteForumAnswer(where, ctx, ctx.auth.uid);
    }

    @ResolveField((returns) => Forum)
    async forum(@Parent() parent, @Context() ctx): Promise<any> {
        if (ctx.auth && ctx.auth.uid)
            return this.forumAnswerService.forum(parent, ctx, ctx.auth.uid)
    }
    @ResolveField((returns) => [Comment])
    async comments(@Parent() parent, @Args("where", { type: () => CommentQueryInput }) where: CommentQueryInput, @Context() ctx): Promise<Comment[]> {
        if (ctx.auth && ctx.auth.uid)
            return this.forumAnswerService.comments(parent, where, ctx, ctx.auth.uid)
    }

    @ResolveField((returns) => [Attachment])
    async attachments(@Parent() parent, @Args("where", { type: () => AttachmentQueryInput }) where: AttachmentQueryInput, @Context() ctx): Promise<Attachment[]> {
        if (ctx.auth && ctx.auth.uid)
            return this.forumAnswerService.attachments(parent, where, ctx, ctx.auth.uid)
    }
    @ResolveField((returns) => User)
    async author(@Parent() parent, @Context() ctx) {
        if (ctx.auth && ctx.auth.uid)
            return this.forumAnswerService.author(parent, ctx, ctx.auth.uid)
    }
}
