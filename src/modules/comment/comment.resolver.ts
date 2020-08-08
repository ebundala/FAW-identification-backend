import { Resolver, Mutation, Args, Context, ResolveField, Parent } from '@nestjs/graphql';
import { CommentResult, CommentCreateInput, CommentUpdateInput, CommentWhereUniqueInput, Forum, CommentQueryInput, Attachment, AttachmentQueryInput, User } from 'src/models/graphql';
import { CommentService } from './comment.service';

@Resolver('Comment')
export class CommentResolver {
    constructor(private readonly commentService: CommentService) { }

    @Mutation((returns) => CommentResult)
    async createComment(@Args('data', { type: () => CommentCreateInput }) data: CommentCreateInput, @Context() ctx): Promise<CommentResult> {
        if (ctx.auth && ctx.auth.uid)
            return this.commentService.createComment(data, ctx.auth.uid);
    }
    @Mutation((returns) => CommentResult)
    async updateComment(@Args('data', { type: () => CommentUpdateInput }) data: CommentUpdateInput, @Context() ctx): Promise<CommentResult> {
        if (ctx.auth && ctx.auth.uid)
            return this.commentService.updateComment(data);
    }
    @Mutation((returns) => CommentResult)
    async deleteComment(@Args('where', { type: () => CommentWhereUniqueInput }) where: CommentWhereUniqueInput, @Context() ctx): Promise<CommentResult> {
        if (ctx.auth && ctx.auth.uid)
            return this.commentService.deleteComment(where, ctx.auth.uid);
    }
    
    @ResolveField((returns) => Forum)
    async forum(@Parent() parent,@Context() ctx): Promise<any> {
        if (ctx.auth && ctx.auth.uid)
            return this.commentService.forum(parent,ctx, ctx.auth.uid)
    }
    @ResolveField((returns) => Comment)
    async comment(@Parent() parent,@Context() ctx): Promise<any> {
        if (ctx.auth && ctx.auth.uid)
            return this.commentService.comment(parent,ctx, ctx.auth.uid)
    }
    @ResolveField((returns) => Comment)
    async forumAnswer(@Parent() parent,@Context() ctx): Promise<any> {
        if (ctx.auth && ctx.auth.uid)
            return this.commentService.forumAnswer(parent,ctx, ctx.auth.uid)
    }
    @ResolveField((returns) => [Comment])
    async comments(@Parent() parent, @Args("where", { type: () => CommentQueryInput }) where: CommentQueryInput, @Context() ctx): Promise<Comment[]> {
        if (ctx.auth && ctx.auth.uid)
          return this.commentService.comments(parent, where, ctx, ctx.auth.uid)
    }
    
    @ResolveField((returns) => [Attachment])
    async attachments(@Parent() parent, @Args("where", { type: () => AttachmentQueryInput }) where: AttachmentQueryInput, @Context() ctx): Promise<Attachment[]> {
        if (ctx.auth && ctx.auth.uid)
            return this.commentService.attachments(parent, where, ctx, ctx.auth.uid)
    }
    @ResolveField((returns)=>User)
    async author(@Parent() parent, @Context() ctx){
        if(ctx.auth&&ctx.auth.uid)

        return this.commentService.author(parent,ctx,ctx.auth.uid)
    }
}
