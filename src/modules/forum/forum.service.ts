import { Injectable } from '@nestjs/common';
import {
    Prisma
} from '@prisma/client';
import {
    AttachmentQueryInput, CommentQueryInput,
    Forum, ForumAnswerQueryInput, ForumCreateInput, ForumQueryInput, ForumResult,
    ForumUpdateInput, ForumWhereUniqueInput, State
} from 'src/models/graphql';
import { AppLogger } from '../app-logger/app-logger.module';
import { MailService } from '../mail/mail.service';
import { PrismaClient } from '../prisma-client/prisma-client-service';
import { QueryHelper } from '../query-helper/query-helper';

@Injectable()
export class ForumService {

    constructor(
        private readonly prisma: PrismaClient,
        private readonly mail: MailService,
        private readonly logger: AppLogger,
        private readonly helper: QueryHelper) {
        this.logger.setContext(ForumService.name);
    }
    createForum(data: ForumCreateInput, uid: string): Promise<any | ForumResult> {
        const args: Prisma.ForumCreateArgs = {
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
        return this.prisma.forum.create(args).then(async (forum) => {
            await this.mail.sendNewQuestionPostedEmail(forum.id).catch((e) => {
                this.logger.error(e);
            });
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
        const args: Prisma.ForumUpdateArgs = { where: data.where, data: {} };
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
    async deleteForum(where: ForumWhereUniqueInput, uid: String): Promise<any> {

        return this.prisma.forum.delete({
            where: where,
        }).then((forum) => {
            return {
                status: true,
                message: 'Forum deleted successfully',
                forum: {
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
    forumAnswers(parent: Forum, where: ForumAnswerQueryInput, ctx: any, uid: String): Promise<any[]> {
        const args: Prisma.ForumAnswerFindManyArgs = this.helper.forumAnswerQueryBuilder(where);
        return this.prisma.forum
            .findUnique({ where: { id: parent.id } })
            .forumAnswers(args);
    }


    comments(parent: Forum, where: CommentQueryInput, ctx: any, uid: String): Promise<any[]> {
        const args: Prisma.CommentFindManyArgs = this.helper.commentQueryBuilder(where);
        return this.prisma.forum
            .findUnique({ where: { id: parent.id } })
            .comments(args);
    }


    attachments(parent: Forum, where: AttachmentQueryInput, ctx: any, uid: String): Promise<any[]> {
        const args: Prisma.AttachmentFindManyArgs = this.helper.attachmentQueryBuilder(where);
        return this.prisma.forum
            .findUnique({ where: { id: parent.id } })
            .attachments(args);
    }
    author(parent: Forum, ctx: any, uid: string) {
        return this.prisma.forum.findUnique({ where: { id: parent.id } })
            .author();
    }

    getForums(where?: ForumQueryInput): Promise<any> {
        const args: Prisma.ForumFindManyArgs = this.helper.forumQueryBuilder(where);
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
