import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ResponseCreateInput, ResponseResult, ResponseUpdateInput, ResponseWhereUniqueInput, State } from 'src/models/graphql';

@Injectable()
export class ResponseService {
    constructor(private readonly prisma: PrismaClient){}
    async createResponse(data: ResponseCreateInput,uid: string): Promise<any|ResponseResult>{
        const response =  await this.prisma.response.create({
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
}
