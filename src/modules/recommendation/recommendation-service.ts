import { Injectable } from '@nestjs/common';
import { RecommendationUpdateArgs, AttachmentUpdateManyWithoutRecommendationInput, RecommendationCreateArgs, } from '@prisma/client';
import { RecommendationWhereUniqueInput, RecommendationResult, RecommendationCreateInput, RecommendationUpdateInput, Recommendation, RecommendationQueryInput, AttachmentQueryInput } from 'src/models/graphql';
import { PrismaClient } from '../prisma-client/prisma-client-service';
import { QueryHelper } from '../query-helper/query-helper';

@Injectable()
export class RecommendationService {

    constructor(private readonly prisma: PrismaClient,
        private readonly helper: QueryHelper) { }
    async createRecommendation(data: RecommendationCreateInput, uid: string): Promise<any | RecommendationResult> {
        const args: RecommendationCreateArgs = {
            data: {
                content: data.content,
                grade: { connect: { id: data.grade.id } },
                attachments: {
                    connect: data.attachments
                }
            }
        }

        return this.prisma.recommendation.create(args)
            .then((recommendation) => {
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
        const args: RecommendationUpdateArgs = { where: data.where, data: {} };
        if (data.update) {
            if (data.update.content) {
                args.data.content = data.update.content;
            }
            if (data.update.grade) {
                args.data.grade = {
                    connect: {
                        id: data.update.grade.id
                    }
                }
            }
            const attach: AttachmentUpdateManyWithoutRecommendationInput = {}
            if (data.update.attachments) {
                attach.connect = data.update.attachments;

            }
            if (data.update.disconnected) {
                attach.disconnect = data.update.disconnected;
            }
            if (attach.connect || attach.disconnect) {
                args.data.attachments = attach;
            }
        }
        return this.prisma.recommendation.update(args)
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
            where: where
        }).then((recommendation) => {
            return {
                status: true,
                message: 'Recommendation deleted successfully',
                recommendation: {
                    id: where.id
                }
            }
        }).catch(({ message }) => {
            return {
                status: false,
                message: message || 'Failed to delete the recommendation'
            }
        })
    }
    async attachments(parent: Recommendation, where: AttachmentQueryInput, ctx: any, uid: String) {
        const args = this.helper.attachmentQueryBuilder(where);
        return this.prisma.recommendation.findOne({ where: { id: parent.id } })
            .attachments(args);
    }
    async grade(parent: Recommendation, ctx: any, uid: any) {
        return this.prisma.recommendation.findOne({ where: { id: parent.id } }).grade();
    }
}
