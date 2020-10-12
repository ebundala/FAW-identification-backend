import { Injectable } from '@nestjs/common';
import { PrismaClient, FindManyAttachmentArgs,ForumCreateArgs, ForumUpdateArgs, FindManyForumArgs, FindManyCommentArgs, FindManyForumAnswerArgs } from '@prisma/client';
import { QueryHelper } from '../query-helper/query-helper';
import { ForumCreateInput, ForumResult,State, ForumListResult, ForumQueryInput, Forum, AttachmentQueryInput, ForumWhereUniqueInput, ForumUpdateInput, CommentQueryInput, ForumAnswerQueryInput } from 'src/models/graphql';

@Injectable()
export class ForumService {

    constructor(
        private readonly prisma: PrismaClient,
        private readonly helper: QueryHelper){}
        createForum(data: ForumCreateInput, uid: string): Promise<any | ForumResult> {
            const args: ForumCreateArgs = {
                data: {
                    question: data.question,
                    description: data.description,
                    state: data.state || State.PENDING,
                    author: {
                        connect: { id: uid }
                    }
                }
            };
            if (data.attachments) {
                args.data.attachments = { connect: data.attachments }
            }
            return this.prisma.forum.create(args).then((forum) => {
                return {
                    status: true,
                    message: 'Forum created successfully',
                    forum
                }
            })
                .catch(({ message }) => {
                    return {
                        status: false,
                        message: message || 'Failed to create form'
                    }
                });
        }
        updateForum(data: ForumUpdateInput): Promise<any> {
            const args: ForumUpdateArgs = { where: data.where, data: {} };
            if (data.update.question) {
                args.data.question = data.update.question
            }
            if (data.update.description) {
                args.data.description = data.update.description
            }
            if (data.update.state) {
                args.data.state = data.update.state
            }
            if (data.update.attachments) {
                args.data.attachments = { connect: data.update.attachments }
            }
            return this.prisma.forum.update(args)
                .then((forum) => {
                    return {
                        status: true,
                        message: 'Forum updated successfully',
                        forum
                    }
                })
                .catch(({ message }) => {
                    return {
                        status: false,
                        message: message || 'Failed to update forum'
                    }
                });
    
        }
    
        deleteForum(where: ForumWhereUniqueInput, uid: String): Promise<any> {
            return this.prisma.forum.delete({
                where: where,
            }).then((forum) => {
                return {
                    status: true,
                    message: 'Forum deleted successfully',
                    forum:{
                        id:where.id
                    }
                }
            }).catch(({ message }) => {
                return {
                    status: false,
                    message: message || 'Failed to delete the forum'
                }
            })
        }
         forumAnswers(parent: Forum, where: ForumAnswerQueryInput, ctx: any, uid: String): Promise<any[]> {
            const args: FindManyForumAnswerArgs = this.helper.forumAnswerQueryBuilder(where);
            return this.prisma.forum
                .findOne({ where: { id: parent.id } })
               .forumAnswers(args);
        }
    
    
        comments(parent: Forum, where: CommentQueryInput, ctx: any, uid: String): Promise<any[]> {
            const args: FindManyCommentArgs = this.helper.commentQueryBuilder(where);
            return this.prisma.forum
                .findOne({ where: { id: parent.id } })
                .comments(args);
        }
    
    
        attachments(parent: Forum, where: AttachmentQueryInput, ctx: any, uid: String): Promise<any[]> {
            const args: FindManyAttachmentArgs = this.helper.attachmentQueryBuilder(where);
            return this.prisma.forum
                .findOne({ where: { id: parent.id } })
                .attachments(args);
        }
        author(parent: Forum, ctx: any, uid: string) {
            return this.prisma.forum.findOne({ where: { id: parent.id } })
                .author();
        }
       
        getForums(where?: ForumQueryInput): Promise<any> {
            const args: FindManyForumArgs = this.helper.forumQueryBuilder(where);
            return this.prisma.forum.findMany(args).then((forums) => {
                return {
                    status: true,
                    message: 'Success',
                    forums
                }
            }).catch(({ message }) => {
                return {
                    status: false,
                    message: message || 'Failed to fetch forums',
                }
            });
        }
}
