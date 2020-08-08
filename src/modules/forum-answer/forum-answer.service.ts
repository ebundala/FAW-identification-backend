import { Injectable } from '@nestjs/common';
import { PrismaClient, ForumAnswerCreateArgs, ForumAnswerUpdateArgs, FindManyCommentArgs, FindManyAttachmentArgs } from '@prisma/client';
import { QueryHelper } from '../query-helper/query-helper';
import { ForumAnswerResult, ForumAnswerCreateInput, State, ForumAnswerUpdateInput, ForumAnswerWhereUniqueInput, ForumAnswer, CommentQueryInput, AttachmentQueryInput } from 'src/models/graphql';

@Injectable()
export class ForumAnswerService {
    constructor(
        private readonly prisma: PrismaClient,
        private readonly helper: QueryHelper){}
        createForumAnswer(data: ForumAnswerCreateInput, uid: string): Promise<any | ForumAnswerResult> {
            const args: ForumAnswerCreateArgs = {
                data: {
                    content: data.content,
                    commentsEnabled: data.commentsEnabled,
                    state: data.state || State.PENDING,
                    forum:{
                        connect:{
                            id: data.forum.id
                        }
                    },                    
                    author: {
                        connect: { id: uid }
                    }
                }
            };
            if (data.attachments) {
                args.data.attachments = { connect: data.attachments }
            }
            return this.prisma.forumAnswer.create(args).then((forumAnswer) => {
                return {
                    status: true,
                    message: 'Form created successfully',
                    forumAnswer
                }
            })
                .catch(({ message }) => {
                    return {
                        status: false,
                        message: message || 'Failed to create form'
                    }
                });
        }
        updateForumAnswer(data: ForumAnswerUpdateInput): Promise<any> {
            const args: ForumAnswerUpdateArgs = { where: data.where, data: {} };
            if (data.update.content) {
                args.data.content = data.update.content
            }
            if (data.update.commentsEnabled) {
                args.data.commentsEnabled = data.update.commentsEnabled
            }
            if (data.update.state) {
                args.data.state = data.update.state
            }
            if (data.update.attachments) {
                args.data.attachments = { connect: data.update.attachments }
            }
            return this.prisma.forumAnswer.update(args)
                .then((forumAnswer) => {
                    return {
                        status: true,
                        message: 'Forum updated successfully',
                        forumAnswer
                    }
                })
                .catch(({ message }) => {
                    return {
                        status: false,
                        message: message || 'Failed to update forum'
                    }
                });
    
        }
    
        deleteForumAnswer(where: ForumAnswerWhereUniqueInput, uid: String): Promise<any> {
            return this.prisma.forumAnswer.delete({
                where: where,
            }).then((forumAnswer) => {
                return {
                    status: true,
                    message: 'Forum deleted successfully',
                    forumAnswer
                }
            }).catch(({ message }) => {
                return {
                    status: false,
                    message: message || 'Failed to delete the forum'
                }
            })
        }
         
        forum(parent: ForumAnswer, ctx: any, uid: string) {
            return this.prisma.forumAnswer.findOne({ where: { id: parent.id } })
                .forum();
        }
    
        comments(parent: ForumAnswer, where: CommentQueryInput, ctx: any, uid: String): Promise<any[]> {
            const args: FindManyCommentArgs = this.helper.commentQueryBuilder(where);
            return this.prisma.forumAnswer
                .findOne({ where: { id: parent.id } })
                .comments(args);
        }
    
    
        attachments(parent: ForumAnswer, where: AttachmentQueryInput, ctx: any, uid: String): Promise<any[]> {
            const args: FindManyAttachmentArgs = this.helper.attachmentQueryBuilder(where);
            return this.prisma.forumAnswer
                .findOne({ where: { id: parent.id } })
                .attachments(args);
        }
        author(parent: ForumAnswer, ctx: any, uid: string) {
            return this.prisma.forumAnswer.findOne({ where: { id: parent.id } })
                .author();
        }
}
