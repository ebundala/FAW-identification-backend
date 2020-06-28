import { Resolver, Mutation, Args, Context, ResolveField, Parent } from '@nestjs/graphql';
import { AnswerService } from './answer-service';
import { AnswerWhereUniqueInput, AnswerResult, AnswerUpdateInput, AnswerCreateInput, Answer, Attachment, AttachmentQueryInput } from 'src/models/graphql';

@Resolver((of)=>Answer)
export class AnswerResolver {
    constructor(private readonly answerService: AnswerService){}
    @Mutation((returns)=>AnswerResult)
    async createAnswer(@Args('data',{type:()=>AnswerCreateInput}) data:AnswerCreateInput,@Context() ctx): Promise<AnswerResult>{
        if(ctx.auth&&ctx.auth.uid)
        return this.answerService.createAnswer(data,ctx.auth.uid);
    }
    @Mutation((returns)=>AnswerResult)
    async updateAnswer(@Args('data',{type:()=>AnswerUpdateInput}) data:AnswerUpdateInput,@Context() ctx): Promise<AnswerResult>{
        if(ctx.auth&&ctx.auth.uid)
        return this.answerService.updateAnswer(data,ctx.auth.uid);
    }
    @Mutation((returns)=>AnswerResult)
    async deleteAnswer(@Args('where',{type:()=>AnswerWhereUniqueInput}) where:AnswerWhereUniqueInput,@Context() ctx): Promise<AnswerResult>{
         if(ctx.auth&&ctx.auth.uid)
        return this.answerService.deleteAnswer(where,ctx.auth.uid);
    }
    @ResolveField((returns)=>[Attachment])
    async attachments(@Args('where',{type:()=>AttachmentQueryInput}) where: AttachmentQueryInput, @Parent() parent, @Context() ctx){
        if(ctx.auth&&ctx.auth.uid)
        return this.answerService.attachments(parent,where,ctx.auth.uid)
    }
}
