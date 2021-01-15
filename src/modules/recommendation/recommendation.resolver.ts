import { Args, Context, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Attachment, AttachmentQueryInput, Grade, Recommendation, RecommendationCreateInput, RecommendationResult, RecommendationUpdateInput, RecommendationWhereUniqueInput } from 'src/models/graphql';
import { RecommendationService } from './recommendation-service';

@Resolver((of) => Recommendation)
export class RecommendationResolver {
    constructor(private readonly recommendationService: RecommendationService) { }
    @Mutation((returns) => RecommendationResult)
    async createRecommendation(@Args('data', { type: () => RecommendationCreateInput }) data: RecommendationCreateInput, @Context() ctx): Promise<RecommendationResult> {
        if (ctx.auth && ctx.auth.uid)
            return this.recommendationService.createRecommendation(data, ctx.auth.uid);
    }
    @Mutation((returns) => RecommendationResult)
    async updateRecommendation(@Args('data', { type: () => RecommendationUpdateInput }) data: RecommendationUpdateInput, @Context() ctx): Promise<RecommendationResult> {
        if (ctx.auth && ctx.auth.uid)
            return this.recommendationService.updateRecommendation(data, ctx.auth.uid);
    }
    @Mutation((returns) => RecommendationResult)
    async deleteRecommendation(@Args('where', { type: () => RecommendationWhereUniqueInput }) where: RecommendationWhereUniqueInput, @Context() ctx): Promise<RecommendationResult> {
        if (ctx.auth && ctx.auth.uid)
            return this.recommendationService.deleteRecommendation(where, ctx.auth.uid);
    }
    @ResolveField((returns) => [Attachment])
    async attachments(@Parent() parent: Recommendation,
        @Args("where", { type: () => AttachmentQueryInput }) where: AttachmentQueryInput,
        @Context() ctx): Promise<any[]> {
        if (ctx.auth && ctx.auth.uid)
            return this.recommendationService.attachments(parent, where, ctx, ctx.auth.uid)
    }
    @ResolveField((returns) => Grade)
    async grade(@Parent() parent: Recommendation, @Context() ctx) {
        if (ctx.auth && ctx.auth.uid)
            return this.recommendationService.grade(parent, ctx, ctx.auth.uid)
    }
}
