import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { QuestionCreateInput, QuestionResult, QuestionWhereUniqueInput, QuestionUpdateInput } from 'src/models/graphql';

@Injectable()
export class QuestionService {
    constructor(private readonly prisma: PrismaClient) { }

    async createQuestion(data: QuestionCreateInput, uid: String): Promise<any | QuestionResult> {
        return this.prisma.question.create({

            data: {
                question: data.question,
                questionNumber: data.questionNumber,
                questionType: data.questionType,
                weight: data.weight,
                instruction: data.instruction,
                form: {
                    connect: { id: data.form.id }
                },
            },
            include: {
                form: true,
                attachments: true

            },
        }).then((question) => {
            return {
                status: true,
                message: 'Question created successfully',
                question
            }
        }).catch(({ message }) => {
            return {
                status: false,
                message: message || 'Failed to create question'
            }
        });
    }

    async updateQuestion(data: QuestionUpdateInput, uid: String): Promise<any | QuestionResult> {
        return this.prisma.question.update({
            where: data.where,
            data: data.update,
            include: {
                form: true,
                attachments: true

            },
        }).then((question) => {
            return {
                status: true,
                message: 'Question updated successfully',
                question
            }
        }).catch(({ message }) => {
            return {
                status: false,
                message: message || 'Failed to update question'
            }
        });
    }

    async deleteQuestion(where: QuestionWhereUniqueInput, uid: String): Promise<any | QuestionResult> {
        return this.prisma.question.delete({
            where
        }).then((question) => {
            return {
                status: true,
                message: 'Question deleted successfully',
                question
            }
        }).catch(({ message }) => {
            return {
                status: false,
                message: message || 'Failed to delete question'
            }
        });
    }
}
