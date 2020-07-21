import { Resolver, Mutation, Context, Args, Query, ResolveField, Parent, Info } from '@nestjs/graphql';
import {
    Form, FormResult, FormCreateInput,
    FormUpdateInput, FormWhereUniqueInput,
    FormQueryInput, FormListResult, Response, ResponseQueryInput, Grade, GradeQueryInput, Question, QuestionQueryInput, Attachment, AttachmentQueryInput, User
} from 'src/models/graphql';
import { FormService } from './form-service';
import { query } from 'express';

@Resolver((of) => Form)
export class FormResolver {
    constructor(private readonly formService: FormService) { }
    @Mutation((returns) => FormResult)
    async createForm(@Args('data', { type: () => FormCreateInput }) data: FormCreateInput, @Context() ctx): Promise<FormResult> {
        if (ctx.auth && ctx.auth.uid)
            return this.formService.createForm(data, ctx.auth.uid);
    }
    @Mutation((returns) => FormResult)
    async updateForm(@Args('data', { type: () => FormUpdateInput }) data: FormUpdateInput, @Context() ctx): Promise<FormResult> {
        if (ctx.auth && ctx.auth.uid)
            return this.formService.updateForm(data);
    }
    @Mutation((returns) => FormResult)
    async deleteForm(@Args('where', { type: () => FormWhereUniqueInput }) where: FormWhereUniqueInput, @Context() ctx): Promise<FormResult> {
        if (ctx.auth && ctx.auth.uid)
            return this.formService.deleteForm(where, ctx.auth.uid);
    }
    
    @ResolveField((returns) => [Response])
    async responses(@Parent() parent, @Args("where", { type: () => ResponseQueryInput }) where: ResponseQueryInput, @Context() ctx): Promise<Response[]> {
        if (ctx.auth && ctx.auth.uid)
            return this.formService.responses(parent, where, ctx, ctx.auth.uid)
    }
    @ResolveField((returns) => [Grade])
    async grades(@Parent() parent, @Args("where", { type: () => GradeQueryInput }) where: GradeQueryInput, @Context() ctx): Promise<Grade[]> {
        if (ctx.auth && ctx.auth.uid)
            return this.formService.grades(parent, where, ctx, ctx.auth.uid)
    }
    @ResolveField((returns) => [Question])
    async questions(@Parent() parent, @Args("where", { type: () => QuestionQueryInput }) where: QuestionQueryInput, @Context() ctx): Promise<Question[]> {
        if (ctx.auth && ctx.auth.uid)
            return this.formService.questions(parent, where, ctx, ctx.auth.uid)
    }
    @ResolveField((returns) => [Attachment])
    async attachments(@Parent() parent, @Args("where", { type: () => AttachmentQueryInput }) where: AttachmentQueryInput, @Context() ctx): Promise<Attachment[]> {
        if (ctx.auth && ctx.auth.uid)
            return this.formService.attachments(parent, where, ctx, ctx.auth.uid)
    }
    @ResolveField((returns)=>User)
    async author(@Parent() parent, @Context() ctx){
        if(ctx.auth&&ctx.auth.uid)
        return this.formService.author(parent,ctx,ctx.auth.uid)
    }
    //Queries
    @Query((returns) => FormListResult)
    async forms(@Args('where', { type: () => FormQueryInput }) where: FormQueryInput, @Context() ctx,
    @Info() info): Promise<FormListResult> {
        if (ctx.auth && ctx.auth.uid)
        return this.formService.getForms(where);
    }
}
