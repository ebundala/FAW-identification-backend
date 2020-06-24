import { Injectable } from '@nestjs/common';
import { PrismaClient} from '@prisma/client';
import { GradeResult, GradeCreateInput, GradeUpdateInput, GradeWhereUniqueInput } from 'src/models/graphql';

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
        }) .then((answer) => {
            return {
                status: true,
                message: 'Grade updated successfully',
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
}
