import { SendGridService } from '@anchan828/nest-sendgrid';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Role } from '@prisma/client';
import { MailDataRequired } from "@sendgrid/helpers/classes/mail";
import { AppLogger } from '../app-logger/app-logger.module';
import { PrismaClient } from '../prisma-client/prisma-client-service';

@Injectable()
export class MailService {

    private from: string;
    private accountActivationTemplateId: string;
    private accountDeactivationTemplateId: string;
    private accountMadeAdminTemplateId: string;
    private accountRemovedAdminTemplateId: string;
    private newQuestionTemplateId: string;
    private questionAnsweredTemplateId: string;
    private welcomeTemplateId: string;
    private passwordResetTemplateId: string;



    constructor(
        private readonly sendGrid: SendGridService,
        private readonly config: ConfigService,
        private readonly logger: AppLogger,
        private readonly prisma: PrismaClient
    ) {
        this.logger.setContext(MailService.name);
        this.from = this.config.get<string>("SENDGRID_SENDER_EMAIL");
        this.accountActivationTemplateId = this.config.get<string>("SENDGRID_ACCOUNT_ACTIVATION_TEMPLATE");
        this.accountDeactivationTemplateId = this.config.get<string>("SENDGRID_ACCOUNT_DEACTIVATION_TEMPLATE");
        this.accountMadeAdminTemplateId = this.config.get<string>("SENDGRID_ACCOUNT_ADMIN_ACTIVATION_TEMPLATE");
        this.accountRemovedAdminTemplateId = this.config.get<string>("SENDGRID_ACCOUNT_ADMIN_DEACTIVATION_TEMPLATE");
        this.newQuestionTemplateId = this.config.get<string>("SENDGRID_NEW_FORUM_TEMPLATE");
        this.questionAnsweredTemplateId = this.config.get<string>("SENDGRID_FORUM_ANSWERED_TEMPLATE");
        this.welcomeTemplateId = this.config.get<string>("SENDGRID_WELCOME_TEMPLATE");
        this.passwordResetTemplateId = this.config.get<string>("SENDGRID_PASS_RESSET_TEMPLATE")
    }
    async sendAccountActivationEmail(userId: string,) {
        this.logger.debug(this.sendAccountActivationEmail.name);
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (user.email && this.accountActivationTemplateId) {
            return this.sendGrid.send({
                templateId: this.accountActivationTemplateId,
                from: this.from,
                to: user.email,
                dynamicTemplateData: { ...user }
            });
        }
    }
    async sendPasswordResetLink(email: any, link: string) {
        this.logger.debug(this.sendPasswordResetLink.name);
        const user = await this.prisma.user.findUnique({ where: { email: email } });
        if (user.email && this.passwordResetTemplateId) {
            return this.sendGrid.send({
                templateId: this.passwordResetTemplateId,
                from: this.from,
                to: user.email,
                dynamicTemplateData: { ...user, link }
            });
        }
    }
    async sendAccountDeactivationEmail(userId: string) {
        this.logger.debug(this.sendAccountDeactivationEmail.name);

        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (user.email && this.accountDeactivationTemplateId) {
            return this.sendGrid.send({
                templateId: this.accountDeactivationTemplateId,
                from: this.from,
                to: user.email,
                dynamicTemplateData: user
            });
        }
    }
    async sendAccountMadeAdminEmail(userId: string) {
        this.logger.debug(this.sendAccountMadeAdminEmail.name);

        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (user.email && this.accountMadeAdminTemplateId) {
            return this.sendGrid.send({
                templateId: this.accountMadeAdminTemplateId,
                from: this.from,
                to: user.email,
                dynamicTemplateData: user
            });
        }
    }
    async sendAccountRemovedAdminEmail(userId: string) {
        this.logger.debug(this.sendAccountRemovedAdminEmail.name);

        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (user.email && this.accountRemovedAdminTemplateId) {
            return this.sendGrid.send({
                templateId: this.accountRemovedAdminTemplateId,
                from: this.from,
                to: user.email,
                dynamicTemplateData: user
            });
        }
    }
    async sendNewQuestionPostedEmail(forumId: string) {
        this.logger.debug(this.sendNewQuestionPostedEmail.name);

        const admins = await this.prisma.user.findMany({ where: { role: Role.ADMIN } });
        const forum = await this.prisma.forum.findUnique({
            where: { id: forumId }, include: {
                author: true,
                attachments: true
            }
        });
        if (admins.length && forum && this.newQuestionTemplateId) {
            const data = admins.map<Partial<MailDataRequired>>((admin) => (
                {
                    templateId: this.newQuestionTemplateId,
                    from: this.from,
                    to: admin.email,
                    dynamicTemplateData: forum
                }
            ))
            return this.sendGrid.send(data, true);
        }
    }
    async sendQuestionAnsweredEmail(answerId: string) {
        this.logger.debug(this.sendQuestionAnsweredEmail.name);

        const answer = await this.prisma.forumAnswer.findUnique({
            where: { id: answerId }, include: {
                attachments: true,
                author: true,
                forum: {
                    include: {
                        attachments: true,
                        author: true,
                    }
                }
            }
        })
        if (answer && this.questionAnsweredTemplateId) {
            return this.sendGrid.send({
                templateId: this.questionAnsweredTemplateId,
                from: this.from,
                to: answer.forum.author.email,
                dynamicTemplateData: answer
            });
        }
    }
    async sendWelcomeEmail(email: string, link: string) {
        this.logger.debug(this.sendWelcomeEmail.name);
        const user = await this.prisma.user.findUnique({ where: { email: email } });
        if (user && this.welcomeTemplateId) {
            return this.sendGrid.send({
                templateId: this.welcomeTemplateId,
                from: this.from,
                to: user.email,
                dynamicTemplateData: { ...user, link }
            });
        }
    }
}
