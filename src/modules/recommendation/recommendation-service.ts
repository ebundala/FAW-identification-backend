import { Injectable } from '@nestjs/common';
import { PrismaClient, } from '@prisma/client';
import { RecommendationWhereUniqueInput, RecommendationResult, RecommendationCreateInput, RecommendationUpdateInput, Recommendation, RecommendationQueryInput, AttachmentQueryInput } from 'src/models/graphql';
import { QueryHelper } from '../query-helper/query-helper';

@Injectable()
export class RecommendationService {
    constructor(private readonly prisma: PrismaClient,
        private readonly helper: QueryHelper) { }
    async createRecommendation(data: RecommendationCreateInput, uid: string): Promise<any | RecommendationResult> {
        return this.prisma.recommendation.create({
            data: {
                content: data.content,
                grade: { connect: { id: data.grade.id } },
            },
            include: {
                grade: true,
            }
        }).then((recommendation) => {
            return {
                status: true,
                message: 'Recommendation created successfully',
                recommendation
            }
        })
        .catch(({ message }) => {
            return {
                status: false,
                message: message || 'Failed to create recommendation'
            }
        });
    }
    async updateRecommendation(data: RecommendationUpdateInput, uid: String): Promise<any> {
        return this.prisma.recommendation.update({
            where: data.where,
            data: data.update,
            include: {
                grade: true,
            }
        })
            .then((recommendation) => {
                return {
                    status: true,
                    message: 'Recommendation updated successfully',
                    recommendation
                }
            })
            .catch(({ message }) => {
                return {
                    status: false,
                    message: message || 'Failed to update recommendation'
                }
            });

    }
    async deleteRecommendation(where: RecommendationWhereUniqueInput, uid: String): Promise<any> {
        return this.prisma.recommendation.delete({
            where: where,
            include: {
                grade: true,
            },
        }).then((recommendation) => {
            return {
                status: true,
                message: 'Recommendation deleted successfully',
                recommendation
            }
        }).catch(({ message }) => {
            return {
                status: false,
                message: message || 'Failed to delete the recommendation'
            }
        })
    }
    async attachments(parent: Recommendation,where: AttachmentQueryInput,ctx:any,uid: String){
        const args = this.helper.attachmentQueryBuilder(where);
        return this.prisma.recommendation.findOne({where:{id:parent.id}})
        .attachments(args);
    }
}
