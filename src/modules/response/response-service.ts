import { Injectable } from '@nestjs/common';
import { PrismaClient, FindManyAnswerArgs, AnswerWhereInput, AnswerOrderByInput } from '@prisma/client';
import { ResponseCreateInput,Response, ResponseResult,
     ResponseUpdateInput, ResponseWhereUniqueInput, State, AnswerQueryInput, OrderByInput } from 'src/models/graphql';

@Injectable()
export class ResponseService {
    constructor(private readonly prisma: PrismaClient){}
    async createResponse(data: ResponseCreateInput,uid: string): Promise<any|ResponseResult>{
        return this.prisma.response.create({
           data:{
               state: data.state || State.PENDING,
               form:{
                   connect:{
                       id: data.form.id
                   }
               },
               author:{
                   connect:{id:uid}
               }
           },
           include:{
            attachments:true,
            author: true,
            grade: true,
            form: true
           }
       }).then((response)=>{
        return{
            status: true,
            message:  'Response created successfully',
            response
        }
    })
    .catch(({message})=>{
      return {
          status: false,
          message: message || 'Failed to create response'
      }
    });
    
    }
    async updateResponse(data:ResponseUpdateInput,uid:String):Promise<any>{
      return  this.prisma.response.update({
            where:data.where,
            data:data.update,
            include:{
                attachments:true,
                author: true,
                grade: true,
                form: true
               }
        })
        .then((response)=>{
            return{
                status: true,
                message:  'Response updated successfully',
                response
            }
        })
        .catch(({message})=>{
          return {
              status: false,
              message: message || 'Failed to update response'
          }
        });
        
    }

    async deleteResponse(where: ResponseWhereUniqueInput,uid:String):Promise<any>{
        return this.prisma.response.delete({
            where:where,
            include:{
                attachments:true,
                author: true,
                grade: true,
                form: true
            },
        }).then((response)=>{
            return{
                status: true,
                message: 'Response deleted successfully',
                response
            }
        }).catch(({message})=>{
            return{
                status:false,
                message: message ||  'Failed to delete the response'
            }
        })
    }
    async answers(parent: Response, where: AnswerQueryInput, ctx: any, uid: String): Promise<any[]> {
        const args: FindManyAnswerArgs = {};
        if (where) {
            if (where.take) {
                args.take = where.take
            }
            if (where.skip) {
                args.skip = where.skip
            }
            if (where.where) {
                const whereInput: AnswerWhereInput = {}
                if (where.where.id) {
                    whereInput.id = where.where.id
                }
                
                
                args.where = whereInput
            }
            if (where.cursor) {
                args.cursor = where.cursor
            }
            if (where.orderBy) {
                const orderBy: AnswerOrderByInput = {}
                if (where.orderBy.createdAt == OrderByInput.asc) {
                    orderBy.createdAt = "asc"
                }
                if (where.orderBy.createdAt == OrderByInput.desc) {
                    orderBy.createdAt = "desc"
                }
                if (where.orderBy.updatedAt == OrderByInput.asc) {
                    orderBy.updatedAt = "asc"
                }
                if (where.orderBy.updatedAt == OrderByInput.desc) {
                    orderBy.updatedAt = "desc"
                }
                if (where.orderBy.booleanValue == OrderByInput.asc) {
                    orderBy.booleanValue = "asc"
                }
                if (where.orderBy.booleanValue == OrderByInput.desc) {
                    orderBy.booleanValue = "desc"
                }
                if (where.orderBy.textValue == OrderByInput.asc) {
                    orderBy.textValue = "asc"
                }
                if (where.orderBy.textValue == OrderByInput.desc) {
                    orderBy.textValue = "desc"
                }
                args.orderBy = orderBy;
            }

        }
        args.include={
                response: true,
                question: true,
                attachments:true
            }
        return this.prisma.response
            .findOne({ where: { id: parent.id } })
            .answers(args);
    }
}
