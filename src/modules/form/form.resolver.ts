import { Resolver, Mutation, Context, Args, Query } from '@nestjs/graphql';
import { Form,FormResult,FormCreateInput, FormUpdateInput, FormWhereUniqueInput, FormQueryInput, FormListResult } from 'src/models/graphql';
import { FormService } from './form-service';
import { query } from 'express';

@Resolver((of) => Form)
export class FormResolver {
    constructor(private readonly formService: FormService){}
 @Mutation((returns)=>FormResult)
 async createForm(@Args('data', { type: () => FormCreateInput }) data: FormCreateInput,@Context() ctx): Promise<FormResult>{
     if(ctx.auth&&ctx.auth.uid)
    return this.formService.createForm(data,ctx.auth.uid);
 }
 @Mutation((returns)=>FormResult)
 async updateForm(@Args('data', { type: () => FormUpdateInput }) data: FormUpdateInput,@Context() ctx): Promise<FormResult>{
     if(ctx.auth&&ctx.auth.uid)
    return this.formService.updateForm(data);
 }
 @Mutation((returns)=>FormResult)
 async deleteForm(@Args('where', { type: () => FormWhereUniqueInput }) where: FormWhereUniqueInput,@Context() ctx): Promise<FormResult>{
     if(ctx.auth&&ctx.auth.uid)
    return this.formService.deleteForm(where,ctx.auth.uid);
 }
 @Query((returns)=>FormListResult)
 async forms(@Args('where',{type:()=>FormQueryInput}) where: FormQueryInput,@Context() ctx): Promise<FormListResult>{
     return this.formService.getForms(where);
 }
 
}
