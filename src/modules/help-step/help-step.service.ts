import { Injectable } from '@nestjs/common';
//import { HelpStepCreateArgs, HelpStepUpdateInput as HsInput } from '@prisma/client';
import {Prisma} from '@prisma/client'
import {
    AttachmentQueryInput, HelpStep, HelpStepCreateInput, HelpStepResult,
    HelpStepUpdateInput, HelpStepWhereUniqueInput
} from 'src/models/graphql';
import { PrismaClient } from '../prisma-client/prisma-client-service';
import { QueryHelper } from '../query-helper/query-helper';

@Injectable()
export class HelpStepService {

    constructor(
        private readonly prisma: PrismaClient,
        private readonly helper: QueryHelper) { }
    async createHelpStep(data: HelpStepCreateInput, ctx: any): Promise<any | HelpStepResult> {
        this.helper.isAdmin(ctx)

        const args: Prisma.HelpStepCreateArgs = {
            data: {
                title: data.title,
                description: data.description,
                stepNumber: data.stepNumber,
                help: {
                    connect: { id: data.help.id }
                },
            }
        };
        if (data.attachments) {
            args.data.attachments = {
                connect: data.attachments
            };
        }
        return this.prisma.helpStep.create(args).then((helpStep) => {
            return {
                status: true,
                message: "Step created successfully",
                helpStep
            }
        })
            .catch(({ message }) => {
                return {
                    status: false,
                    message: message || 'Failed to create step'
                }
            });
    }
    async updateHelpStep(data: HelpStepUpdateInput, ctx: any): Promise<any | HelpStepResult> {
        this.helper.isAdmin(ctx)

        const update = this.helper.filterUpdateDataInput<Prisma.HelpStepUpdateInput>(data.update);
        if (data.update.attachments) {
            update.attachments = {
                connect: data.update.attachments
            };
        }
        return this.prisma.helpStep.update({
            where: data.where,
            data: update
        }).then((helpStep) => {
            return {
                status: true,
                message: 'Step updated successfully',
                helpStep
            }
        }).catch(({ message }) => {
            return {
                status: false,
                message: message || 'Failed to update Step'
            }
        });
    }
    async deleteHelpStep(where: HelpStepWhereUniqueInput, ctx: any): Promise<any | HelpStepResult> {
        this.helper.isAdmin(ctx)

        return this.prisma.helpStep.delete({
            where: where,

        }).then((grade) => {
            return {
                status: true,
                message: 'Step deleted successfully',
                helpStep: {
                    id: where.id
                }
            }
        }).catch(({ message }) => {
            return {
                status: false,
                message: message || 'Failed to delete the Step'
            }
        })
    }

    async attachments(parent: HelpStep, where: AttachmentQueryInput, ctx: any) {
        const args = this.helper.attachmentQueryBuilder(where);
        return this.prisma.helpStep.findUnique({ where: { id: parent.id } }).attachments(args);
    }
    async help(parent: HelpStep, ctx: any) {
        return this.prisma.helpStep.findUnique({ where: { id: parent.id } }).help()
    }
}
