import { Injectable } from '@nestjs/common';
import { PrismaClient, FindManyCommentArgs, CommentCreateArgs, CommentUpdateArgs, FindManyAttachmentArgs } from '@prisma/client';
import { QueryHelper } from '../query-helper/query-helper';
import { CommentQueryInput,Comment, State, CommentCreateInput, CommentUpdateInput, CommentWhereUniqueInput, AttachmentQueryInput, CommentResult } from 'src/models/graphql';

@Injectable()
export class CommentService {
    constructor(
        private readonly prisma: PrismaClient,
        private readonly helper: QueryHelper){}
        createComment(data: CommentCreateInput, uid: string): Promise<any | CommentResult> {
            const args: CommentCreateArgs = {
                data: {
                    content: data.content,
                    commentsEnabled: data.commentsEnabled,
                    state: data.state || State.PENDING,                                        
                    author: {
                        connect: { id: uid }
                    }
                }
            };
            if(data.comment){
                args.data.comment={ connect: data.comment}
            }
            if(data.forum){
                args.data.forum={ connect: data.forum}
            }
            if(data.forumAnswer){
               args.data.forumAnswer={ connect: data.forumAnswer}
            }
            if (data.attachments) {
                args.data.attachments = { connect: data.attachments }
            }
            return this.prisma.comment.create(args).then((comment) => {
                return {
                    status: true,
                    message: 'Form created successfully',
                    comment
                }
            })
                .catch(({ message }) => {
                    return {
                        status: false,
                        message: message || 'Failed to create form'
                    }
                });
        }
        updateComment(data: CommentUpdateInput): Promise<any> {
            const args: CommentUpdateArgs = { where: data.where, data: {} };
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
            return this.prisma.comment.update(args)
                .then((comment) => {
                    return {
                        status: true,
                        message: 'Forum updated successfully',
                        comment
                    }
                })
                .catch(({ message }) => {
                    return {
                        status: false,
                        message: message || 'Failed to update forum'
                    }
                });
    
        }
    
        deleteComment(where: CommentWhereUniqueInput, uid: String): Promise<any> {
            return this.prisma.comment.delete({
                where: where,
            }).then((comment) => {
                return {
                    status: true,
                    message: 'Forum deleted successfully',
                    comment:{
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
         
        forum(parent: Comment, ctx: any, uid: string) {
            return this.prisma.comment.findOne({ where: { id: parent.id } })
                .forum();
        }
        comment(parent: Comment, ctx: any, uid: string) {
            return this.prisma.comment.findOne({ where: { id: parent.id } })
                .comment();
        }
        forumAnswer(parent: Comment, ctx: any, uid: string) {
            return this.prisma.comment.findOne({ where: { id: parent.id } })
                .forumAnswer();
        }
        comments(parent: Comment, where: CommentQueryInput, ctx: any, uid: String): Promise<any[]> {
            const args: FindManyCommentArgs = this.helper.commentQueryBuilder(where);
            return this.prisma.comment
                .findOne({ where: { id: parent.id } })
                .comments(args);
        }
    
    
        attachments(parent: Comment, where: AttachmentQueryInput, ctx: any, uid: String): Promise<any[]> {
            const args: FindManyAttachmentArgs = this.helper.attachmentQueryBuilder(where);
            return this.prisma.comment
                .findOne({ where: { id: parent.id } })
                .attachments(args);
        }
        author(parent: Comment, ctx: any, uid: string) {
            return this.prisma.comment.findOne({ where: { id: parent.id } })
                .author();
        }
}
