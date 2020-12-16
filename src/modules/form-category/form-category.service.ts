import { Injectable } from '@nestjs/common';
import { FindManyFormCategoryArgs, FormCategoryCreateArgs, FormCategoryUpdateArgs } from '@prisma/client';
import { FormCategory, FormCategoryCreateInput, FormCategoryQueryInput, FormCategoryResult, FormCategoryUpdateInput, FormCategoryWhereUniqueInput, State } from 'src/models/graphql';
import { PrismaClient } from '../prisma-client/prisma-client-service';
import { QueryHelper } from '../query-helper/query-helper';

@Injectable()
export class FormCategoryService {

    constructor(
        private readonly prisma: PrismaClient,
        private readonly helper: QueryHelper) { }
    createFormCategory(data: FormCategoryCreateInput, ctx: any, uid: string): Promise<any | FormCategoryResult> {
        this.helper.isAdmin(ctx);
        const args: FormCategoryCreateArgs = {
            data: {
                name: data.name,
                description: data.description,
                state: data.state || State.PENDING,

            }
        };
        if (data.image) {
            args.data.image = { connect: { id: data.image.id } };
        }
        return this.prisma.formCategory.create(args).then((formCategory) => {
            return {
                status: true,
                message: 'Form Category created successfully',
                formCategory
            }
        })
            .catch(({ message }) => {
                return {
                    status: false,
                    message: message || 'Failed to create form category'
                }
            });
    }
    updateFormCategory(data: FormCategoryUpdateInput, ctx: any): Promise<any> {
        this.helper.isAdmin(ctx);
        const args: FormCategoryUpdateArgs = { where: data.where, data: {} };
        if (data.update.name) {
            args.data.name = data.update.name
        }
        if (data.update.description) {
            args.data.description = data.update.description
        }
        if (data.update.state) {
            args.data.state = data.update.state
        }
        if (data.update.image) {
            args.data.image = { connect: { id: data.update.image.id } }
        }
        return this.prisma.formCategory.update(args)
            .then((formCategory) => {
                return {
                    status: true,
                    message: 'Form Category updated successfully',
                    formCategory
                }
            })
            .catch(({ message }) => {
                return {
                    status: false,
                    message: message || 'Failed to update Form Category'
                }
            });

    }

    deleteFormCategory(where: FormCategoryWhereUniqueInput, ctx: any, uid: String): Promise<any> {
        this.helper.isAdmin(ctx);
        return this.prisma.formCategory.delete({
            where: where,
        }).then((formCategory) => {
            return {
                status: true,
                message: 'FormCategory deleted successfully',
                formCategory: {
                    id: where.id
                }
            }
        }).catch(({ message }) => {
            return {
                status: false,
                message: message || 'Failed to delete the FormCategory'
            }
        })
    }
    image(parent: FormCategory, ctx: any, uid: String): Promise<any> {
        return this.prisma.formCategory
            .findOne({ where: { id: parent.id } })
            .image();
    }








    getFormCategories(where?: FormCategoryQueryInput): Promise<any> {
        const args: FindManyFormCategoryArgs = this.helper.formCategoryQueryBuilder(where);
        return this.prisma.formCategory.findMany(args).then((formCategories) => {
            return {
                status: true,
                message: 'Success',
                formCategories
            }
        }).catch(({ message }) => {
            return {
                status: false,
                message: message || 'Failed to fetch Form Categories',
            }
        });
    }
}
