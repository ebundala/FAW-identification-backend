import { Injectable } from '@nestjs/common';
import {
    PrismaClient, FindManyAnswerArgs,
} from '@prisma/client';
import {
    ResponseCreateInput, Response, ResponseResult,
    ResponseUpdateInput, ResponseWhereUniqueInput, State, AnswerQueryInput, OrderByInput, AttachmentQueryInput, Answer, ResponseQueryInput, ResponseListResult
} from 'src/models/graphql';
import { QueryHelper } from '../query-helper/query-helper';

@Injectable()
export class ResponseService {
 

    constructor(private readonly prisma: PrismaClient,
        private readonly helper: QueryHelper) { }
    async createResponse(data: ResponseCreateInput, uid: string):  Promise<any | ResponseResult> {
        return this.prisma.response.create({
            data: {
                state: data.state || State.PENDING,
                form: {
                    connect: {
                        id: data.form.id
                    }
                },
                author: {
                    connect: { id: uid }
                }
            }
        }).then((response) => {
            return {
                status: true,
                message: 'Response created successfully',
                response
            }
        })
            .catch(({ message }) => {
                return {
                    status: false,
                    message: message || 'Failed to create response'
                }
            });

    }
    async updateResponse(data: ResponseUpdateInput, uid: String): Promise<any> {
        return this.prisma.response.update({
            where: data.where,
            data: data.update
        })
            .then((response) => {
                return {
                    status: true,
                    message: 'Response updated successfully',
                    response
                }
            })
            .catch(({ message }) => {
                return {
                    status: false,
                    message: message || 'Failed to update response'
                }
            });

    }

    async deleteResponse(where: ResponseWhereUniqueInput, uid: String): Promise<any> {
        return this.prisma.response.delete({
            where: where,
        }).then((response) => {
            return {
                status: true,
                message: 'Response deleted successfully',
                response:{
                    id:where.id
                }
            }
        }).catch(({ message }) => {
            return {
                status: false,
                message: message || 'Failed to delete the response'
            }
        })
    }
    // get users responses
    async  responses(where: ResponseQueryInput,uid:string): Promise<any | ResponseListResult> {
        var args = this.helper.responseQueryBuilder(where);
        if(args.where){
            args.where.author = {id:uid}
        }else{
            args.where = {author:{id:uid}}
        }
        
       return this.prisma.response.findMany(args).then((responses)=>{
           return {
               status: true,
               message: "success",
               responses
           }
       }).catch(({message})=>{
           return {
               status:false,
               message:message||"Failed to retrieve responses"
           }
       });
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
    async form(parent: Response, ctx: any, uid: any) {
        return this.prisma.response.findOne({ where: { id: parent.id } }).form();
    }
    async author(parent: Response, ctx: any, uid: any) {
        return this.prisma.response.findOne({ where: { id: parent.id } }).author();
    }
    async grade(parent: Response, ctx: any, uid: any) {
        //calculate grade here;

        const response = await this.prisma.response.findOne({
            where: { id: parent.id },
            include: {
                answers: {
                    include: {
                        question: true
                    }
                },
                form: {
                    include: {
                        grades: {
                            include: {
                                recommendations: true
                            }
                        },
                        questions: true
                    },

                }
            }
        });
        if (response.state === State.APPROVED) {
            const totalWeight = response.answers.map((ans, i) => {
                return ans.question.weight;
            }).reduce((i = 0, v) => i + v);
            const score = response.answers.map((ans, i) => {
                if (ans.booleanValue === true) {
                    return ans.question.weight;
                }
                else {
                    return 0;
                }
            }).reduce((i = 0, v) => i + v);

            const scorePercentage = (score / totalWeight) * 100;
            //find ranges
            const grades = response.form.grades.map((g, i) => {
                if (scorePercentage <= g.max && g.min <= scorePercentage) {
                    return g;
                }
            }).filter((v)=>v);
            if (grades.length > 0) {
                return grades[0];
            }
            return null;
        }
    }

}
