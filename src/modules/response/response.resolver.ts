import { Resolver, Mutation, Args, Context, ResolveField, Parent } from '@nestjs/graphql';
import { ResponseService } from './response-service';
import { ResponseResult,Response, ResponseCreateInput, ResponseUpdateInput, ResponseWhereUniqueInput, Answer, AnswerQueryInput } from 'src/models/graphql';

@Resolver((of)=>Response)
export class ResponseResolver {
    constructor(private readonly responseService: ResponseService){}
    @Mutation((returns)=>ResponseResult)
    async createResponse(@Args('data',{type:()=>ResponseCreateInput}) data:ResponseCreateInput,@Context() ctx): Promise<ResponseResult>{
        if(ctx.auth&&ctx.auth.uid)
        return this.responseService.createResponse(data,ctx.auth.uid);
    }
    @Mutation((returns)=>ResponseResult)
    async updateResponse(@Args('data',{type:()=>ResponseUpdateInput}) data:ResponseUpdateInput,@Context() ctx): Promise<ResponseResult>{
        if(ctx.auth&&ctx.auth.uid)
        return this.responseService.updateResponse(data,ctx.auth.uid);
    }
    @Mutation((returns)=>ResponseResult)
    async deleteResponse(@Args('where',{type:()=>ResponseWhereUniqueInput}) where:ResponseWhereUniqueInput,@Context() ctx): Promise<ResponseResult>{
         if(ctx.auth&&ctx.auth.uid)
        return this.responseService.deleteResponse(where,ctx.auth.uid);
    }
    @ResolveField((returns) => [Answer])
    async answers(@Parent() parent, @Args("where", { type: () => AnswerQueryInput }) where: AnswerQueryInput, @Context() ctx): Promise<Answer[]> {
        if (ctx.auth && ctx.auth.uid)
            return this.responseService.answers(parent, where, ctx, ctx.auth.uid)
    }
}
