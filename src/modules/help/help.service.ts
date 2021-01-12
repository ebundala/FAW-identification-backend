import { Injectable } from '@nestjs/common';
import { Help, HelpCreateInput, HelpListResult, HelpQueryInput, HelpResult, HelpStepQueryInput, HelpUpdateDataInput, HelpUpdateInput, HelpWhereUniqueInput } from 'src/models/graphql';
import { PrismaClient } from '../prisma-client/prisma-client-service';
import { QueryHelper } from '../query-helper/query-helper';

@Injectable()
export class HelpService {
    async getHelps(where: HelpQueryInput): Promise<any | HelpListResult> {
        return this.prisma.help.findMany(where).then((helps) => {
            return {
                status: true,
                message: "success",
                helps
            }
        })
            .catch(({ message }) => {
                return {
                    status: false,
                    message: message || 'Failed to fetch help'
                }
            });

    }

    constructor(
        private readonly prisma: PrismaClient,
        private readonly helper: QueryHelper) { }
    async createHelp(data: HelpCreateInput, uid: string): Promise<any | HelpResult> {
        return this.prisma.help.create({
            data: {
                topic: data.topic,
                description: data.description,

            }
        }).then((help) => {
            return {
                status: true,
                message: "Help created successfully",
                help
            }
        })
            .catch(({ message }) => {
                return {
                    status: false,
                    message: message || 'Failed to create help'
                }
            });
    }
    async updateHelp(data: HelpUpdateInput, uid: string): Promise<any | HelpResult> {
        const update: HelpUpdateDataInput = this.helper.filterUpdateDataInput<HelpUpdateDataInput>(data.update);

        return this.prisma.help.update({
            where: data.where,
            data: update
        }).then((help) => {
            return {
                status: true,
                message: 'Help updated successfully',
                help
            }
        }).catch(({ message }) => {
            return {
                status: false,
                message: message || 'Failed to update help'
            }
        });
    }
    async deleteHelp(where: HelpWhereUniqueInput, uid: string) {
        return this.prisma.help.delete({ where }).then((grade) => {
            return {
                status: true,
                message: 'Help deleted successfully',
                help: {
                    id: where.id
                }
            }
        }).catch(({ message }) => {
            return {
                status: false,
                message: message || 'Failed to delete the help'
            }
        })
    }

    async steps(parent: Help, where: HelpStepQueryInput, ctx: any, uid: any) {
        const args = this.helper.helpStepQueryBuilder(where);
        return this.prisma.help.findOne({ where: { id: parent.id } }).steps(args)
    }
}
