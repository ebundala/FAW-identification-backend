import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AnswerService } from './answer-service';
import { AnswerWhereUniqueInput, AnswerResult, AnswerUpdateInput, AnswerCreateInput, Answer } from 'src/models/graphql';

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
}
