import { Injectable } from '@nestjs/common';
import { PrismaClient, RecommendationUpdateArgs, } from '@prisma/client';
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
        const args: RecommendationUpdateArgs = {where:data.where,data:{}};
        if(data.update){
            if(data.update.content){
                args.data.content=data.update.content;
            }
            if(data.update.grade){
                args.data.grade={
                    connect: {
                        id: data.update.grade.id
                    }
                }
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
   async grade(parent: Recommendation, ctx: any, uid: any) {
        return this.prisma.recommendation.findOne({where:{id:parent.id}}).grade();
     }
}
