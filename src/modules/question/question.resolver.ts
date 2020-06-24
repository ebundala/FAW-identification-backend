import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { Question, QuestionResult, QuestionCreateInput, QuestionUpdateInput, QuestionWhereUniqueInput } from 'src/models/graphql';
import { PrismaClient } from '@prisma/client';
import { QuestionService } from './question-service';

@Resolver((of)=>Question)
export class QuestionResolver {
    constructor(private readonly questionService: QuestionService){}
    @Mutation((returns)=>QuestionResult)
    async createQuestion(@Args('data',{type:()=>QuestionCreateInput}) data:QuestionCreateInput,@Context() ctx): Promise<QuestionResult>{
        if(ctx.auth&&ctx.auth.uid)
        return this.questionService.createQuestion(data,ctx.auth.uid);
    }
    @Mutation((returns)=>QuestionResult)
    async updateQuestion(@Args('data',{type:()=>QuestionUpdateInput}) data:QuestionUpdateInput,@Context() ctx): Promise<QuestionResult>{
        if(ctx.auth&&ctx.auth.uid)
        return this.questionService.updateQuestion(data,ctx.auth.uid);
    }
    @Mutation((returns)=>QuestionResult)
    async deleteQuestion(@Args('where',{type:()=>QuestionWhereUniqueInput}) where:QuestionWhereUniqueInput,@Context() ctx): Promise<QuestionResult>{
         if(ctx.auth&&ctx.auth.uid)
        return this.questionService.deleteQuestion(where,ctx.auth.uid);
    }
}
