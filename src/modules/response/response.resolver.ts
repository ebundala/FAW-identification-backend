import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { ResponseService } from './response-service';
import { ResponseResult,Response, ResponseCreateInput, ResponseUpdateInput, ResponseWhereUniqueInput } from 'src/models/graphql';

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
}
