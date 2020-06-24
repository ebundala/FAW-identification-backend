import { Injectable } from '@nestjs/common';
import { PrismaClient, FindManyRecommendationArgs, RecommendationWhereInput, RecommendationOrderByInput} from '@prisma/client';
import { GradeResult, GradeCreateInput, GradeUpdateInput, GradeWhereUniqueInput, Grade, RecommendationQueryInput, OrderByInput } from 'src/models/graphql';

@Injectable()
export class GradeService {
    constructor(private readonly prisma: PrismaClient){}
    async createGrade(data: GradeCreateInput, uid: string): Promise<any | GradeResult> {
        return this.prisma.grade.create({
            data: {
                name: data.name,
                description:data.description,
                max: data.max,
                min: data.min,
                maxInclusive:data.maxInclusive,
                minInclusive: data.minInclusive,
                form:{
                    connect:{
                        id:data.form.id
                    }
                }
            },
            include: {
                attachments: true,
                recommendations:true,
                form:true
            }
        }) .then((grade) => {
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
        return this.prisma.grade.update({
            where: data.where,
            data: data.update,
            include: {
                attachments: true,
                recommendations:true,
                form:true
            }
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
            include: {
                attachments: true,
            },
        }).then((grade) => {
            return {
                status: true,
                message: 'Grade deleted successfully',
                grade
            }
        }).catch(({ message }) => {
            return {
                status: false,
                message: message || 'Failed to delete the grade'
            }
        })
    }
    async recommendations(parent: Grade, where: RecommendationQueryInput, ctx: any, uid: String): Promise<any[]> {
        const args: FindManyRecommendationArgs = {}
        if (where) {
            if (where.take) {
                args.take = where.take
            }
            if (where.skip) {
                args.skip = where.skip
            }
            if (where.where) {
                const whereInput: RecommendationWhereInput = {}
                if (where.where.id) {
                    whereInput.id = where.where.id
                }
                
                args.where = whereInput
            }
            if (where.cursor) {
                args.cursor = where.cursor
            }
            if (where.orderBy) {
                const orderBy: RecommendationOrderByInput = {}
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
                if (where.orderBy.content == OrderByInput.asc) {
                    orderBy.content = "asc"
                }
                if (where.orderBy.content == OrderByInput.desc) {
                    orderBy.content = "desc"
                }
                args.orderBy = orderBy;
            }

        }
        args.include={
                attachments:true,
                grade:true
                
            }
        return this.prisma.grade
            .findOne({ where: { id: parent.id } })
            .recommendations(args);
    }
}
