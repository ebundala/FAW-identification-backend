import { Resolver, Mutation, Args, Context, ResolveField, Parent } from '@nestjs/graphql';
import { ForumAnswerService } from './forum-answer.service';
import { ForumAnswerResult, Forum,ForumAnswerCreateInput, ForumAnswerUpdateInput, ForumAnswerWhereUniqueInput, Attachment, User, AttachmentQueryInput, CommentQueryInput } from 'src/models/graphql';

@Resolver('ForumAnswer')
export class ForumAnswerResolver {
    constructor(private readonly forumAnswerService: ForumAnswerService) { }
    @Mutation((returns) => ForumAnswerResult)
    async createForumAnswer(@Args('data', { type: () => ForumAnswerCreateInput }) data: ForumAnswerCreateInput, @Context() ctx): Promise<ForumAnswerResult> {
        if (ctx.auth && ctx.auth.uid)
            return this.forumAnswerService.createForumAnswer(data, ctx.auth.uid);
    }
    @Mutation((returns) => ForumAnswerResult)
    async updateForumAnswer(@Args('data', { type: () => ForumAnswerUpdateInput }) data: ForumAnswerUpdateInput, @Context() ctx): Promise<ForumAnswerResult> {
        if (ctx.auth && ctx.auth.uid)
            return this.forumAnswerService.updateForumAnswer(data);
    }
    @Mutation((returns) => ForumAnswerResult)
    async deleteForumAnswer(@Args('where', { type: () => ForumAnswerWhereUniqueInput }) where: ForumAnswerWhereUniqueInput, @Context() ctx): Promise<ForumAnswerResult> {
        if (ctx.auth && ctx.auth.uid)
            return this.forumAnswerService.deleteForumAnswer(where, ctx.auth.uid);
    }
    
    @ResolveField((returns) => Forum)
    async forum(@Parent() parent,@Context() ctx): Promise<any> {
        if (ctx.auth && ctx.auth.uid)
            return this.forumAnswerService.forum(parent,ctx, ctx.auth.uid)
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
    @ResolveField((returns)=>User)
    async author(@Parent() parent, @Context() ctx){
        if(ctx.auth&&ctx.auth.uid)
        return this.forumAnswerService.author(parent,ctx,ctx.auth.uid)
    }
}
