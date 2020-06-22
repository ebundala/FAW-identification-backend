import { Resolver, Mutation, Context, Args } from '@nestjs/graphql';
import { Form,FormResult,FormCreateInput } from 'src/models/graphql';
import { FormService } from './form-service';

@Resolver((of) => Form)
export class FormResolver {
    constructor(private readonly formService: FormService){}
 @Mutation((returns)=>FormResult)
 async createForm(@Args('data', { type: () => FormCreateInput }) data: FormCreateInput,@Context() ctx): Promise<FormResult>{
     if(ctx.auth&&ctx.auth.uid)
    return this.formService.createForm(data,ctx.auth.uid);
 }
}
