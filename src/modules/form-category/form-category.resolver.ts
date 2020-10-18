import { Args, Context, Info, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Attachment, FormCategoryCreateInput, FormCategoryListResult, FormCategoryQueryInput, FormCategoryResult, FormCategoryUpdateInput, FormCategoryWhereUniqueInput } from 'src/models/graphql';
import { FormCategoryService } from './form-category.service';

@Resolver('FormCategory')
export class FormCategoryResolver {
    constructor(private readonly formCategoryService: FormCategoryService) { }
    @Mutation((returns) => FormCategoryResult)
    async createFormCategory(@Args('data', { type: () => FormCategoryCreateInput }) data: FormCategoryCreateInput, @Context() ctx): Promise<FormCategoryResult> {
        if (ctx.auth && ctx.auth.uid)
            return this.formCategoryService.createFormCategory(data, ctx, ctx.auth.uid);
    }
    @Mutation((returns) => FormCategoryResult)
    async updateFormCategory(@Args('data', { type: () => FormCategoryUpdateInput }) data: FormCategoryUpdateInput, @Context() ctx): Promise<FormCategoryResult> {
        if (ctx.auth && ctx.auth.uid)
            return this.formCategoryService.updateFormCategory(data, ctx);
    }
    @Mutation((returns) => FormCategoryResult)
    async deleteFormCategory(@Args('where', { type: () => FormCategoryWhereUniqueInput }) where: FormCategoryWhereUniqueInput, @Context() ctx): Promise<FormCategoryResult> {
        if (ctx.auth && ctx.auth.uid)
            return this.formCategoryService.deleteFormCategory(where, ctx, ctx.auth.uid);
    }

    @ResolveField((returns) => [Attachment])
    async image(@Parent() parent, @Context() ctx): Promise<Attachment> {
        if (ctx.auth && ctx.auth.uid)
            return this.formCategoryService.image(parent, ctx, ctx.auth.uid);
    }

    //Queries
    @Query((returns) => FormCategoryListResult)
    async formCategories(@Args('where', { type: () => FormCategoryQueryInput }) where: FormCategoryQueryInput, @Context() ctx,
        @Info() info): Promise<FormCategoryListResult> {
        if (ctx.auth && ctx.auth.uid)
            return this.formCategoryService.getFormCategories(where);
    }
}
