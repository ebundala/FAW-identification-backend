import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AnswerResult, AnswerCreateInput, State, AnswerUpdateInput, AnswerWhereUniqueInput } from 'src/models/graphql';

@Injectable()
export class AnswerService {
    constructor(private readonly prisma: PrismaClient) { }
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
            include: {
                response: true,
                attachments: true,
                question: true
            }
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
            include: {
                response: true,
                attachments: true,
                question: true
            }
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
            include: {
                response: true,
                attachments: true,
                question: true
            },
        }).then((answer) => {
            return {
                status: true,
                message: 'Answer deleted successfully',
                answer
            }
        }).catch(({ message }) => {
            return {
                status: false,
                message: message || 'Failed to delete the answer'
            }
        })
    }
}
