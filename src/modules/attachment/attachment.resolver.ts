import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { Attachment, AttachmentResult, AttachmentUpdateInput, AttachmentWhereUniqueInput } from 'src/models/graphql';
import { AttachmentService } from './attachment-service';
import { AttachmentCreateInput } from '@prisma/client';
import { GraphQLUpload, FileUpload } from 'graphql-upload';


@Resolver((of)=>Attachment)
export class AttachmentResolver {
    constructor(private readonly gradeService: AttachmentService){}
    @Mutation((returns)=>AttachmentResult)
    async createAttachment(@Args('data',{type:()=>GraphQLUpload}) file: FileUpload,@Context() ctx): Promise<AttachmentResult>{
        if(ctx.auth&&ctx.auth.uid)
        return this.gradeService.createAttachment(file,ctx.auth);
    }
    @Mutation((returns)=>AttachmentResult)
    async updateAttachment(@Args('data',{type:()=>AttachmentUpdateInput}) data:AttachmentUpdateInput,@Context() ctx): Promise<AttachmentResult>{
        if(ctx.auth&&ctx.auth.uid)
        return this.gradeService.updateAttachment(data,ctx.auth.uid);
    }
    @Mutation((returns)=>AttachmentResult)
    async deleteAttachment(@Args('where',{type:()=>AttachmentWhereUniqueInput}) where:AttachmentWhereUniqueInput,@Context() ctx): Promise<AttachmentResult>{
         if(ctx.auth&&ctx.auth.uid)
        return this.gradeService.deleteAttachment(where,ctx.auth.uid);
    }
}