import { Resolver, Mutation, Args, ResolveField, Parent, Context, Query, Info } from '@nestjs/graphql';
import { ForumService } from './forum.service';
import { ForumResult, FormCreateInput, ForumCreateInput, ForumUpdateInput, ForumWhereUniqueInput, ForumAnswer, ForumAnswerQueryInput, CommentQueryInput, Attachment, User, ForumListResult, ForumQueryInput, AttachmentQueryInput } from 'src/models/graphql';

@Resolver('Forum')
export class ForumResolver {
    constructor(private readonly forumService: ForumService) { }
    @Mutation((returns) => ForumResult)
    async createForum(@Args('data', { type: () => ForumCreateInput }) data: ForumCreateInput, @Context() ctx): Promise<ForumResult> {
        if (ctx.auth && ctx.auth.uid)
            return this.forumService.createForum(data, ctx.auth.uid);
    }
    @Mutation((returns) => ForumResult)
    async updateForum(@Args('data', { type: () => ForumUpdateInput }) data: ForumUpdateInput, @Context() ctx): Promise<ForumResult> {
        if (ctx.auth && ctx.auth.uid)
            return this.forumService.updateForum(data);
    }
    @Mutation((returns) => ForumResult)
    async deleteForum(@Args('where', { type: () => ForumWhereUniqueInput }) where: ForumWhereUniqueInput, @Context() ctx): Promise<ForumResult> {
        if (ctx.auth && ctx.auth.uid)
            return this.forumService.deleteForum(where, ctx.auth.uid);
    }
    
    @ResolveField((returns) => [ForumAnswer])
    async forumAnswers(@Parent() parent, @Args("where", { type: () => ForumAnswerQueryInput }) where: ForumAnswerQueryInput, @Context() ctx): Promise<Response[]> {
        if (ctx.auth && ctx.auth.uid)
            return this.forumService.forumAnswers(parent, where, ctx, ctx.auth.uid)
    }
    @ResolveField((returns) => [Comment])
    async comments(@Parent() parent, @Args("where", { type: () => CommentQueryInput }) where: CommentQueryInput, @Context() ctx): Promise<Comment[]> {
        if (ctx.auth && ctx.auth.uid)
            return this.forumService.comments(parent, where, ctx, ctx.auth.uid)
    }
    
    @ResolveField((returns) => [Attachment])
    async attachments(@Parent() parent, @Args("where", { type: () => AttachmentQueryInput }) where: AttachmentQueryInput, @Context() ctx): Promise<Attachment[]> {
        if (ctx.auth && ctx.auth.uid)
            return this.forumService.attachments(parent, where, ctx, ctx.auth.uid)
    }
    @ResolveField((returns)=>User)
    async author(@Parent() parent, @Context() ctx){
        if(ctx.auth&&ctx.auth.uid)
        return this.forumService.author(parent,ctx,ctx.auth.uid)
    }
    //Queries
    @Query((returns) => ForumListResult)
    async forums(@Args('where', { type: () => ForumQueryInput }) where: ForumQueryInput, @Context() ctx,
    @Info() info): Promise<ForumListResult> {
        if (ctx.auth && ctx.auth.uid)
        return this.forumService.getForums(where);
    }
}
