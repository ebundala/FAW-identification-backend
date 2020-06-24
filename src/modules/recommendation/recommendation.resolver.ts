import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { RecommendationService } from './recommendation-service';
import { RecommendationResult, RecommendationCreateInput, RecommendationUpdateInput, RecommendationWhereUniqueInput } from 'src/models/graphql';

@Resolver('Reccommendation')
export class RecommendationResolver {
    constructor(private readonly recommendationService: RecommendationService){}
    @Mutation((returns)=>RecommendationResult)
    async createRecommendation(@Args('data',{type:()=>RecommendationCreateInput}) data:RecommendationCreateInput,@Context() ctx): Promise<RecommendationResult>{
        if(ctx.auth&&ctx.auth.uid)
        return this.recommendationService.createRecommendation(data,ctx.auth.uid);
    }
    @Mutation((returns)=>RecommendationResult)
    async updateRecommendation(@Args('data',{type:()=>RecommendationUpdateInput}) data:RecommendationUpdateInput,@Context() ctx): Promise<RecommendationResult>{
        if(ctx.auth&&ctx.auth.uid)
        return this.recommendationService.updateRecommendation(data,ctx.auth.uid);
    }
    @Mutation((returns)=>RecommendationResult)
    async deleteRecommendation(@Args('where',{type:()=>RecommendationWhereUniqueInput}) where:RecommendationWhereUniqueInput,@Context() ctx): Promise<RecommendationResult>{
         if(ctx.auth&&ctx.auth.uid)
        return this.recommendationService.deleteRecommendation(where,ctx.auth.uid);
    }
}
