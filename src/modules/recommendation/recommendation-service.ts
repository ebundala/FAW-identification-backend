import { Injectable } from '@nestjs/common';
import { PrismaClient, } from '@prisma/client';
import { RecommendationWhereUniqueInput, RecommendationResult, RecommendationCreateInput, RecommendationUpdateInput } from 'src/models/graphql';

@Injectable()
export class RecommendationService {
    constructor(private readonly prisma: PrismaClient) { }
    async createRecommendation(data: RecommendationCreateInput, uid: string): Promise<any | RecommendationResult> {
        return this.prisma.recommendation.create({
            data: {
                content: data.content,
                grade: { connect: { id: data.grade.id } },
            },
            include: {
                attachments: true,
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
                attachments: true,
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
                attachments: true,
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
}
