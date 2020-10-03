import {
    Resolver,
    Mutation,
    Args,
    Context,
    ResolveField,
    Parent
} from '@nestjs/graphql';
import {
    Grade,
    GradeResult,
    GradeCreateInput,
    GradeUpdateInput,
    GradeWhereUniqueInput,
    Recommendation,
    RecommendationQueryInput,
    ResponseQueryInput,
    Attachment,
    Response,
    AttachmentQueryInput,
    Form, Question, QuestionQueryInput
} from 'src/models/graphql';
import { GradeService } from './grade-service';

@Resolver((of) => Grade)
export class GradeResolver {
    constructor(private readonly gradeService: GradeService) { }
    @Mutation((returns) => GradeResult)
    async createGrade(@Args('data', { type: () => GradeCreateInput }) data: GradeCreateInput, @Context() ctx): Promise<GradeResult> {
        if (ctx.auth && ctx.auth.uid)
            return this.gradeService.createGrade(data, ctx.auth.uid);
    }
    @Mutation((returns) => GradeResult)
    async updateGrade(@Args('data', { type: () => GradeUpdateInput }) data: GradeUpdateInput, @Context() ctx): Promise<GradeResult> {
        if (ctx.auth && ctx.auth.uid)
            return this.gradeService.updateGrade(data, ctx.auth.uid);
    }
    @Mutation((returns) => GradeResult)
    async deleteGrade(@Args('where', { type: () => GradeWhereUniqueInput }) where: GradeWhereUniqueInput, @Context() ctx): Promise<GradeResult> {
        if (ctx.auth && ctx.auth.uid)
            return this.gradeService.deleteGrade(where, ctx.auth.uid);
    }
    @ResolveField((returns) => [Recommendation])
    async recommendations(@Parent() parent: Grade, @Args("where", { type: () => RecommendationQueryInput }) where: RecommendationQueryInput, @Context() ctx): Promise<Recommendation[]> {
        if (ctx.auth && ctx.auth.uid)
            return this.gradeService.recommendations(parent, where, ctx, ctx.auth.uid)
    }

    @ResolveField((returns) => [Response])
    async responses(@Parent() parent: Grade, @Args("where", { type: () => ResponseQueryInput }) where: ResponseQueryInput, @Context() ctx): Promise<Response[]> {
        if (ctx.auth && ctx.auth.uid)
            return this.gradeService.responses(parent, where, ctx, ctx.auth.uid)
    }
    @ResolveField((returns) => [Attachment])
    async attachments(@Parent() parent: Grade,
        @Args("where", { type: () => AttachmentQueryInput }) where: AttachmentQueryInput,
        @Context() ctx): Promise<any[]> {
        if (ctx.auth && ctx.auth.uid)
            return this.gradeService.attachments(parent, where, ctx, ctx.auth.uid)
    }
    @ResolveField((returns) => [Question])
    async questions(@Parent() parent: Grade,
        @Args("where", { type: () => QuestionQueryInput }) where: QuestionQueryInput,
        @Context() ctx): Promise<any[]> {
        if (ctx.auth && ctx.auth.uid)
            return this.gradeService.questions(parent, where, ctx, ctx.auth.uid)
    }
    @ResolveField((returns)=>Form)
    async form(@Parent() parent: Grade, @Context() ctx){
        if(ctx.auth&&ctx.auth.uid)
        return this.gradeService.form(parent,ctx,ctx.auth.uid)
    }
}
