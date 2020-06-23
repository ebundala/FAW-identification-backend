import { Injectable } from '@nestjs/common';
import { PrismaClient, FormWhereInput, StringFilter, FindManyFormArgs, FormOrderByInput,  } from '@prisma/client';
import { Form,State, FormUpdateInput,FormCreateInput, FormResult, FormWhereUniqueInput, FormQueryInput, OrderByInput, FormListResult } from 'src/models/graphql';

@Injectable()
export class FormService {
    constructor(private readonly prisma: PrismaClient){}
    async createForm(data: FormCreateInput,uid: string): Promise<any|FormResult>{
        const form =  await this.prisma.form.create({
           data:{
               title:data.title,
               description:data.description,
               state: data.state || State.PENDING,
               author:{
                   connect:{id:uid}
               }
           },
           include:{
            attachments:true,
            author: true,
            questions:true,
            grades: true,
           }
       });

        return {
            status: true,
            message: 'Form created successfully',
            form
        
        }
    }
    async updateForm(data:FormUpdateInput):Promise<any>{
      return  this.prisma.form.update({
            where:data.where,
            data:data.update,
            include:{
                attachments:true,
                author: true,
                questions:true,
                grades: true,
               }
            /* select:{
               id: true,
               title:true,
               description:true,
               author:true,
               state: true,
            } */
        })
        .then((form)=>{
            return{
                status: true,
                message:  'Form updated successfully',
                form
            }
        })
        .catch(({message})=>{
          return {
              status: false,
              message: message || 'Failed to update form'
          }
        });
        
    }

    async deleteForm(where: FormWhereUniqueInput,uid:String):Promise<any>{
        return this.prisma.form.delete({
            where:where,
            include:{
             attachments:true,
             author: true,
             questions:true,
             grades: true,
            },
        }).then((form)=>{
            return{
                status: true,
                message: 'Form deleted successfully',
                form
            }
        }).catch(({message})=>{
            return{
                status:false,
                message: message ||  'Failed to delete the form'
            }
        })
    }

    async getForms(where?:FormQueryInput): Promise<any|FormListResult>{
         const args:FindManyFormArgs = {}
         if(where){
             if(where.take){
             args.take = where.take}
             if(where.skip){
             args.skip = where.skip}
             if(where.where){
                 const whereInput:FormWhereInput = {}
                 if(where.where.id){
                    whereInput.id = where.where.id}
                if(where.where.authorId){
                    whereInput.authorId = where.where.authorId}
                if(where.where.state){
                    whereInput.state = where.where.state}
                args.where = whereInput
             }
             if(where.cursor){
                 args.cursor = where.cursor
             }
             if(where.orderBy){
                 const orderBy: FormOrderByInput = {}
                 if(where.orderBy.createdAt==OrderByInput.asc){
                    orderBy.createdAt = "asc"
                 }
                 if(where.orderBy.createdAt==OrderByInput.desc){
                    orderBy.createdAt = "desc"
                 }
                 if(where.orderBy.updatedAt==OrderByInput.asc){
                    orderBy.updatedAt = "asc"
                 }
                 if(where.orderBy.updatedAt==OrderByInput.desc){
                    orderBy.updatedAt = "desc"
                 }
                 if(where.orderBy.title==OrderByInput.asc){
                    orderBy.title = "asc"
                 }
                 if(where.orderBy.title==OrderByInput.desc){
                    orderBy.title = "desc"
                 }
                args.orderBy = orderBy;    
            }
              
         }
         args.include={
             attachments:true,
             author: true,
             questions:true,
             grades: true,
         }
        return this.prisma.form.findMany(args).then((forms)=>{
             return{
                 status: true,
                 message: 'Success',
                 forms
             }
         }).catch(({message})=>{
             return{
                status: false,
                message: message || 'Failed to fetch forms',
            }
         });
    }
}
