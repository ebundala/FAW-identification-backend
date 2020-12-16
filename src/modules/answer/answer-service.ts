import { Injectable } from '@nestjs/common';
import { FindManyAttachmentArgs } from '@prisma/client';
import {
    Answer, AnswerCreateInput, AnswerResult,


    AnswerUpdateInput,
    AnswerWhereUniqueInput,
    AttachmentQueryInput
} from 'src/models/graphql';
import { PrismaClient } from '../prisma-client/prisma-client-service';
import { QueryHelper } from '../query-helper/query-helper';

@Injectable()
export class AnswerService {
    constructor(private readonly prisma: PrismaClient,
        private readonly helper: QueryHelper) { }
    async createAnswer(data: AnswerCreateInput, uid: string): Promise<any | AnswerResult> {
        return this.prisma.answer.create({
            data: {
                booleanValue: data.booleanValue,
                textValue: data.textValue,
                response: {
                    connect: {
                        id: data.response.id
                    }
                },
                question: {
                    connect: {
                        id: data.question.id
                    }
                }
            },
            
        }) .then((answer) => {
            return {
                status: true,
                message: 'Answer created successfully',
                answer
            }
        })
        .catch(({ message }) => {
            return {
                status: false,
                message: message || 'Failed to create answer'
            }
        });
    }
    async updateAnswer(data: AnswerUpdateInput, uid: String): Promise<any> {
        return this.prisma.answer.update({
            where: data.where,
            data: data.update,
            
        })
            .then((answer) => {
                return {
                    status: true,
                    message: 'Answer updated successfully',
                    answer
                }
            })
            .catch(({ message }) => {
                return {
                    status: false,
                    message: message || 'Failed to update answer'
                }
            });

    }

    async deleteAnswer(where: AnswerWhereUniqueInput, uid: String): Promise<any> {
        return this.prisma.answer.delete({
            where: where,
           
        }).then((answer) => {
            return {
                status: true,
                message: 'Answer deleted successfully',
                answer:{
                    id:where.id
                }
            }
        }).catch(({ message }) => {
            return {
                status: false,
                message: message || 'Failed to delete the answer'
            }
        })
    }

    async attachments(parent: Answer,where: AttachmentQueryInput, uid: String){
       const args: FindManyAttachmentArgs = this.helper.attachmentQueryBuilder(where);
       return this.prisma.answer.findOne({where:{id:parent.id}})
       .attachments(args)
    }
    async response(parent: Answer,ctx:any,uid:String){
        return this.prisma.answer.findOne({where:{id:parent.id}})
        .response()
    }
    async question(parent: Answer,ctx:any,uid:String){
        return this.prisma.answer.findOne({where:{id:parent.id}})
        .question()
    }
}
