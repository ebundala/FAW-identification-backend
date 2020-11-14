import { Injectable } from '@nestjs/common';
import { FindManyAttachmentArgs, FindManyCommentArgs, ForumAnswerCreateArgs, ForumAnswerUpdateArgs, PrismaClient } from '@prisma/client';
import { AttachmentQueryInput, CommentQueryInput, ForumAnswer, ForumAnswerCreateInput, ForumAnswerResult, ForumAnswerUpdateInput, ForumAnswerWhereUniqueInput, State } from 'src/models/graphql';
import { AppLogger } from '../app-logger/app-logger.module';
import { MailService } from '../mail/mail.service';
import { QueryHelper } from '../query-helper/query-helper';

@Injectable()
export class ForumAnswerService {
    constructor(
        private readonly prisma: PrismaClient,
        private readonly mail: MailService,
        private readonly logger: AppLogger,
        private readonly helper: QueryHelper) {
        this.logger.setContext(ForumAnswerService.name);
    }
    createForumAnswer(data: ForumAnswerCreateInput, ctx: any, uid: string): Promise<any | ForumAnswerResult> {
        this.helper.isAdmin(ctx);
        const args: ForumAnswerCreateArgs = {
            data: {
                content: data.content,
                commentsEnabled: data.commentsEnabled,
                state: data.state || State.PENDING,
                forum: {
                    connect: {
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
        return this.prisma.forumAnswer.create(args).then(async (forumAnswer) => {
            await this.mail.sendQuestionAnsweredEmail(forumAnswer.id).catch((e) => {
                this.logger.error(e);

            })
            return {
                status: true,
                message: 'Answer created successfully',
                forumAnswer
            }
        })
            .catch(({ message }) => {
                return {
                    status: false,
                    message: message || 'Failed to create answer'
                }
            });
    }
    updateForumAnswer(data: ForumAnswerUpdateInput, ctx: any): Promise<any> {
        this.helper.isAdmin(ctx);
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
                    message: 'Forum answer updated successfully',
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

    deleteForumAnswer(where: ForumAnswerWhereUniqueInput, ctx: any, uid: String): Promise<any> {
        this.helper.isAdmin(ctx);
        return this.prisma.forumAnswer.delete({
            where: where,
        }).then((forumAnswer) => {
            return {
                status: true,
                message: 'Forum answer deleted successfully',
                forumAnswer: {
                    id: where.id
                }
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
