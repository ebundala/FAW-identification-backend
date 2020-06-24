import { Resolver, Mutation, Args, Context, ResolveField, Parent } from '@nestjs/graphql';
import { Grade, GradeResult, GradeCreateInput, GradeUpdateInput, GradeWhereUniqueInput, Recommendation, RecommendationQueryInput } from 'src/models/graphql';
import { GradeService } from './grade-service';

@Resolver((of)=>Grade)
export class GradeResolver {
    constructor(private readonly gradeService: GradeService){}
    @Mutation((returns)=>GradeResult)
    async createGrade(@Args('data',{type:()=>GradeCreateInput}) data:GradeCreateInput,@Context() ctx): Promise<GradeResult>{
        if(ctx.auth&&ctx.auth.uid)
        return this.gradeService.createGrade(data,ctx.auth.uid);
    }
    @Mutation((returns)=>GradeResult)
    async updateGrade(@Args('data',{type:()=>GradeUpdateInput}) data:GradeUpdateInput,@Context() ctx): Promise<GradeResult>{
        if(ctx.auth&&ctx.auth.uid)
        return this.gradeService.updateGrade(data,ctx.auth.uid);
    }
    @Mutation((returns)=>GradeResult)
    async deleteGrade(@Args('where',{type:()=>GradeWhereUniqueInput}) where:GradeWhereUniqueInput,@Context() ctx): Promise<GradeResult>{
         if(ctx.auth&&ctx.auth.uid)
        return this.gradeService.deleteGrade(where,ctx.auth.uid);
    }
    @ResolveField((returns) => [Recommendation])
    async recommendations(@Parent() parent, @Args("where", { type: () => RecommendationQueryInput }) where: RecommendationQueryInput, @Context() ctx): Promise<Recommendation[]> {
        if (ctx.auth && ctx.auth.uid)
            return this.gradeService.recommendations(parent, where, ctx, ctx.auth.uid)
    }
}
