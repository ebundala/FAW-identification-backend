import { Injectable } from '@nestjs/common';
import { AnswerCreateWithoutResponseInput, FindManyAnswerArgs, ResponseCreateArgs, ResponseUpdateArgs } from '@prisma/client';
import {
    AnswerQueryInput, AttachmentQueryInput, Response, ResponseCreateInput,
    ResponseListResult, ResponseQueryInput, ResponseResult,
    ResponseUpdateInput, ResponseWhereUniqueInput, State
} from 'src/models/graphql';
import { AppLogger } from '../app-logger/app-logger.module';
import { PrismaClient } from '../prisma-client/prisma-client-service';
import { QueryHelper } from '../query-helper/query-helper';

@Injectable()
export class ResponseService {


    constructor(private readonly prisma: PrismaClient,
        private readonly logger: AppLogger,
        private readonly helper: QueryHelper) {
        this.logger.setContext(ResponseService.name);
    }
    async createResponse(data: ResponseCreateInput, uid: string): Promise<any | ResponseResult> {
        const args: ResponseCreateArgs = {
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
        }
        if (data.answers != null && data.answers.length) {
            const create: AnswerCreateWithoutResponseInput[] = data.answers.map((v) => ({
                booleanValue: v.booleanValue,
                textValue: v.textValue,
                question: {
                    connect: {
                        id: v.question.id
                    }
                }
            }))

            args.data.answers = { create }
        }
        return this.prisma.response.create(args).then((response) => {
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
        const args: ResponseUpdateArgs = {
            where: data.where,
            data: {
                answers: {
                    updateMany: [
                        { where: { id: "" }, data: {} }
                    ]
                }
            }
        }
        if (data.update) {
            if (data.update.state) {
                args.data.state = data.update.state;
            }
            if (data.update.answers && data.update.answers.length) {
                const updateMany = data.update.answers.map((v) => ({ where: v.where, data: v.update }))
                args.data.answers = { updateMany }
            }
        }
        return this.prisma.response.update(args)
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
                response: {
                    id: where.id
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
    async responses(where: ResponseQueryInput, uid: string): Promise<any | ResponseListResult> {
        var args = this.helper.responseQueryBuilder(where);
        if (args.where) {
            args.where.author = { id: uid }
        } else {
            args.where = { author: { id: uid } }
        }

        return this.prisma.response.findMany(args).then((responses) => {
            return {
                status: true,
                message: "success",
                responses
            }
        }).catch(({ message }) => {
            return {
                status: false,
                message: message || "Failed to retrieve responses"
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
    async grades(parent: Response, ctx: any, uid: any) {
        //TODO calculate grade here;
        try {
            const response = await this.prisma.response.findOne({
                where: { id: parent.id, },
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
                                    recommendations: {
                                        include: {
                                            attachments: true
                                        }
                                    },
                                    questions: true
                                }
                            },
                            //  questions: true
                        },

                    }
                }
            });

            if (response.state === State.APPROVED) {
                const { grades } = response.form;
                const { answers } = response;
                const answersMap = new Map();

                answers.forEach((answer, i) => {
                    const { question: { id, weight }, booleanValue } = answer;
                    answersMap.set(id, booleanValue);
                });
                const gradeScores = grades.filter((g) => g.questions && g.questions.length)
                    .map((grade) => {
                        const questionWeight = 100 / grade.questions.length;
                        const score = grade.questions.map(({ id }) => {
                            if (answersMap.get(id) === true) {
                                return questionWeight;
                            }
                            else {
                                return 0;
                            }
                        }).reduce((a, b) => a + b);
                        return { grade, score }
                    }).filter(({ grade, score }) => score >= grade.min);
                const sorted = gradeScores.sort((a, b) => a.score - b.score).map((v) => v.grade);
                this.logger.debug(sorted);
                return sorted;
                /* const gradeScore = grades.map((grade) => {
                     const gTotal = grade.max;
                     const cutof = grade.min;
                     if (grade.questions.length) {
                         const wTotal = grade.questions.map((v) => v.weight).reduce((p, c) => p + c);
                         const score = answers.filter((a) => a.question.gradeId === grade.id && a.booleanValue === true)
                             .map((p) => p.question.weight)
                             .reduce((p, c) => p + c);
                         //calculate grade score;
                         const gScore = (score / wTotal) * gTotal;
                         const passed = gScore > cutof;
                         return { grade, gScore, passed };
                     }
                     return { grade, gScore: 0, passed: false }
                 });
                 const sorted = gradeScore.filter((g) => g.passed).sort((a, b) => a.gScore - b.gScore);
 
                 return sorted.length ? sorted[0].grade : null;*/
            }
        }
        catch {
            return
        }

        /* if (response.state === State.APPROVED) {
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
         }*/
    }

}
