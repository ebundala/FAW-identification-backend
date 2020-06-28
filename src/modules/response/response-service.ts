import { Injectable } from '@nestjs/common';
import { PrismaClient, FindManyAnswerArgs, 
     } from '@prisma/client';
import { ResponseCreateInput,Response, ResponseResult,
     ResponseUpdateInput, ResponseWhereUniqueInput, State, AnswerQueryInput, OrderByInput, AttachmentQueryInput, Answer } from 'src/models/graphql';
import { QueryHelper } from '../query-helper/query-helper';

@Injectable()
export class ResponseService {
    constructor(private readonly prisma: PrismaClient,
        private readonly helper: QueryHelper){}
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
        const args: FindManyAnswerArgs = this.helper.answersQueryBuilder(where);
        return this.prisma.response
            .findOne({ where: { id: parent.id } })
            .answers(args);
    }
    async attachments(parent: Response, where: AttachmentQueryInput, ctx: any, uid: String): Promise<any[]> {
        const args = this.helper.attachmentQueryBuilder(where);
        return this.prisma.response
            .findOne({ where: { id: parent.id } })
            .attachments(args);
    }
    
}
