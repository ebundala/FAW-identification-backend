import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { QuestionCreateInput, QuestionResult, QuestionWhereUniqueInput, QuestionUpdateInput, Answer, AnswerQueryInput, Attachment, AttachmentQueryInput, Question } from 'src/models/graphql';
import { QueryHelper } from '../query-helper/query-helper';

@Injectable()
export class QuestionService {
    
    constructor(private readonly prisma: PrismaClient,
        private readonly helper: QueryHelper) { }

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
            data: data.update
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
    async answers(parent: Question,where: AnswerQueryInput,ctx:any,uid:String){
     const args = this.helper.answersQueryBuilder(where);
     return this.prisma.question.findOne({where:{id:parent.id}})
     .answers(args);
    }
    async attachments(parent: Question,where:AttachmentQueryInput,ctx:any,uid:String){
        const args = this.helper.attachmentQueryBuilder(where);
     return this.prisma.question.findOne({where:{id:parent.id}})
     .attachments(args);
    }
   async form(parent: Question, ctx: any, uid: any) {
        return this.prisma.question.findOne({where:{id:parent.id}}).form()
    }
}
