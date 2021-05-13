import { Injectable } from '@nestjs/common';
import {
    Prisma
} from '@prisma/client';
import {
    AttachmentQueryInput, Grade, GradeCreateInput, GradeResult,
    GradeUpdateDataInput, GradeUpdateInput,
    GradeWhereUniqueInput,

    QuestionQueryInput,
    RecommendationQueryInput,

    ResponseQueryInput
} from 'src/models/graphql';
import { PrismaClient } from '../prisma-client/prisma-client-service';
import { QueryHelper } from '../query-helper/query-helper';

@Injectable()
export class GradeService {

    constructor(
        private readonly prisma: PrismaClient,
        private readonly helper: QueryHelper) { }
    async createGrade(data: GradeCreateInput, uid: string): Promise<any | GradeResult> {
        return this.prisma.grade.create({
            data: {
                name: data.name,
                description: data.description,
                maxValue: data.maxValue,
                minValue: data.minValue,
                maxInclusive: data.maxInclusive ? true : false,
                minInclusive: data.minInclusive ? true : false,
                form: {
                    connect: {
                        id: data.form.id
                    }
                }
            }

        }).then((grade) => {
            return {
                status: true,
                message: 'Grade created successfully',
                grade
            }
        })
            .catch(({ message }) => {
                return {
                    status: false,
                    message: message || 'Failed to create grade'
                }
            });
    }
    async updateGrade(data: GradeUpdateInput, uid: String): Promise<any> {
        const update: GradeUpdateDataInput = this.helper.filterUpdateDataInput<GradeUpdateDataInput>(data.update);

        return this.prisma.grade.update({
            where: data.where,
            data: update,

        })
            .then((grade) => {
                return {
                    status: true,
                    message: 'Grade updated successfully',
                    grade
                }
            })
            .catch(({ message }) => {
                return {
                    status: false,
                    message: message || 'Failed to update grade'
                }
            });

    }



    async deleteGrade(where: GradeWhereUniqueInput, uid: String): Promise<any> {
        return this.prisma.grade.delete({
            where: where,

        }).then((grade) => {
            return {
                status: true,
                message: 'Grade deleted successfully',
                grade: {
                    id: where.id
                }
            }
        }).catch(({ message }) => {
            return {
                status: false,
                message: message || 'Failed to delete the grade'
            }
        })
    }
    async attachments(parent: Grade, where: AttachmentQueryInput, ctx: any, uid: String) {
        const args: Prisma.AttachmentFindManyArgs = this.helper.attachmentQueryBuilder(where);
        return this.prisma.grade.findUnique({ where: { id: parent.id } })
            .attachments(args)
    }
    async recommendations(parent: Grade, where: RecommendationQueryInput, ctx: any, uid: String): Promise<any[]> {
        const args: Prisma.RecommendationFindManyArgs = this.helper.recommendationQueryBuilder(where);
        return this.prisma.grade
            .findUnique({ where: { id: parent.id } })
            .recommendations(args);
    }
    async responses(parent: Grade, where: ResponseQueryInput, ctx: any, uid: String): Promise<any[]> {
        const args: Prisma.ResponseFindManyArgs = this.helper.responseQueryBuilder(where);
        return this.prisma.grade
            .findUnique({ where: { id: parent.id } })
            .responses(args);
    }
    async questions(parent: Grade, where: QuestionQueryInput, ctx: any, uid: String): Promise<any[]> {
        const args: Prisma.QuestionFindManyArgs = this.helper.questionQueryBuilder(where);
        return this.prisma.grade
            .findUnique({ where: { id: parent.id } })
            .questions(args);
    }
    async form(parent: Grade, ctx: any, uid: string) {
        return this.prisma.grade.findUnique({ where: { id: parent.id } }).form();
    }
}
