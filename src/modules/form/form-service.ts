import { Injectable, Logger } from '@nestjs/common';
import {
    visit,
    DocumentNode, ASTNode, Kind, ObjectTypeDefinitionNode,
    NamedTypeNode, DirectiveDefinitionNode, FieldDefinitionNode,
    ArgumentNode, StringValueNode, UnionTypeDefinitionNode,
    InterfaceTypeDefinitionNode, EnumTypeDefinitionNode,
    EnumValueDefinitionNode,


} from 'graphql';

import {
    PrismaClient,
    FindManyFormArgs,
    FindManyResponseArgs,
    FindManyQuestionArgs,
    FindManyGradeArgs,
    FindManyAttachmentArgs,
    FormUpdateArgs,
    FormArgs,
    FormCreateArgs

} from '@prisma/client';
import {
    Form,
    State,
    FormUpdateInput,
    FormCreateInput,
    FormResult,
    FormWhereUniqueInput,
    FormQueryInput,
    FormListResult,
    ResponseQueryInput,
    QuestionQueryInput,
    GradeQueryInput,
    AttachmentQueryInput
} from 'src/models/graphql';
import { QueryHelper } from 'src/modules/query-helper/query-helper';
import { AppLogger } from '../app-logger/app-logger.module';
import { selectionSetFromFieldSet } from '@apollo/gateway/dist/FieldSet';

@Injectable()
export class FormService {

    constructor(
        private readonly prisma: PrismaClient,
        private readonly helper: QueryHelper,
        private readonly logger: AppLogger
    ) { }
    createForm(data: FormCreateInput, ctx: any, uid: string): Promise<any | FormResult> {
        this.helper.isAdmin(ctx);
        const args: FormCreateArgs = {
            data: {
                title: data.title,
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

        if (data.category) {
            args.data.category = { connect: { id: data.category.id } }
        }

        return this.prisma.form.create(args).then((form) => {
            return {
                status: true,
                message: 'Form created successfully',
                form
            }
        })
            .catch(({ message }) => {
                return {
                    status: false,
                    message: message || 'Failed to create form'
                }
            });
    }
    updateForm(data: FormUpdateInput, ctx: any): Promise<any> {
        this.helper.isAdmin(ctx);
        const args: FormUpdateArgs = { where: data.where, data: {} };
        if (data.update.title) {
            args.data.title = data.update.title
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
        if (data.update.category) {
            args.data.category = { connect: { id: data.update.category.id } }
        }
        return this.prisma.form.update(args)
            .then((form) => {
                return {
                    status: true,
                    message: 'Form updated successfully',
                    form
                }
            })
            .catch(({ message }) => {
                return {
                    status: false,
                    message: message || 'Failed to update form'
                }
            });

    }

    deleteForm(where: FormWhereUniqueInput, ctx: any, uid: String): Promise<any> {
        this.helper.isAdmin(ctx);
        return this.prisma.form.delete({
            where: where,
        }).then((form) => {
            return {
                status: true,
                message: 'Form deleted successfully',
                form: {
                    id: where.id
                }
            }
        }).catch(({ message }) => {
            return {
                status: false,
                message: message || 'Failed to delete the form'
            }
        })
    }
    responses(parent: Form, where: ResponseQueryInput, ctx: any, uid: String): Promise<any[]> {
        const args: FindManyResponseArgs = this.helper.responseQueryBuilder(where);
        return this.prisma.form
            .findOne({ where: { id: parent.id } })
            .responses(args);
    }


    questions(parent: Form, where: QuestionQueryInput, ctx: any, uid: String): Promise<any[]> {
        const args: FindManyQuestionArgs = this.helper.questionQueryBuilder(where);
        return this.prisma.form
            .findOne({ where: { id: parent.id } })
            .questions(args);
    }


    grades(parent: Form, where: GradeQueryInput, ctx: any, uid: String): Promise<any[]> {
        const args: FindManyGradeArgs = this.helper.gradeQueryBuilder(where);
        return this.prisma.form
            .findOne({ where: { id: parent.id } })
            .grades(args);
    }


    attachments(parent: Form, where: AttachmentQueryInput, ctx: any, uid: String): Promise<any[]> {
        const args: FindManyAttachmentArgs = this.helper.attachmentQueryBuilder(where);
        return this.prisma.form
            .findOne({ where: { id: parent.id } })
            .attachments(args);
    }
    author(parent: Form, ctx: any, uid: string) {
        return this.prisma.form.findOne({ where: { id: parent.id } })
            .author();
    }
    category(parent: Form, ctx: any, uid: string) {
        return this.prisma.form.findOne({ where: { id: parent.id } })
            .category();
    }
    getForms(where?: FormQueryInput): Promise<any | FormListResult> {
        const args: FindManyFormArgs = this.helper.formQueryBuilder(where);

        return this.prisma.form.findMany(args).then((forms) => {
            return {
                status: true,
                message: 'Success',
                forms
            }
        }).catch(({ message }) => {
            return {
                status: false,
                message: message || 'Failed to fetch forms',
            }
        });
    }

    visitor(ast) {
        const gen = _visit(ast);
        this.logger.debug(gen, FormService.name)
    }

}
const _visit = (ast) => {
    return visit(ast, {
        enter,
        leave
    })
}
const enter = (node, key, parent, path, ancestors) => {
    if (node.selectionSet && (node.selectionSet.kind == Kind.SELECTION_SET)) {

        const selections = node.selectionSet.selections;
        // console.log(selections);
        if (selections && selections.lengh) {
            const sets = selections.map((item) => {
                if (item.selectionSet) {
                    return { [item.name.value]: enter(item, key, parent, path, ancestors) };
                }

                return { [item.name.value]: true }
            });
            return { [node.name.value]: sets }
        }
        return { [node.name.value]: true }
    }
    return node
}

const leave = (node, key, parent, path, ancestors) => {
    if (node.kind == Kind.SELECTION_SET) {
        console.log(node.kind)
    }
}