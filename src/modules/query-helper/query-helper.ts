import { Injectable } from '@nestjs/common';
import {Prisma,
    Role,
} from '@prisma/client';
import { GraphQLError } from 'graphql';
import {
    AnswerQueryInput, AttachmentQueryInput,
    CommentQueryInput, FormCategoryQueryInput, FormQueryInput,
    ForumAnswerQueryInput, ForumQueryInput, GradeQueryInput,
    HelpQueryInput,
    HelpStepQueryInput,
    OrderByInput, QuestionQueryInput,
    RecommendationQueryInput, ResponseQueryInput,
    UserQueryInput,
    UserWhereUniqueInput
} from '../../models/graphql';

@Injectable()
export class QueryHelper {
    filterUpdateDataInput<T>(data) {
        const update: T = {} as T;
        const entries = Object.entries(data);
        for (const [k, v] of entries) {
            if (v) {
                update[k] = v;
            }
        }
        return update;
    }
    userQueryBuilder(where: UserQueryInput): Prisma.UserFindManyArgs {
        const args:  Prisma.UserFindManyArgs = {};
        if (where) {
            if (where.take) {
                args.take = where.take
            }
            if (where.skip) {
                args.skip = where.skip
            }
            if (where.where) {
                const whereInput: Prisma.UserWhereInput = {}
                if (where.where.id) {
                    whereInput.id = where.where.id
                }
                if (where.where.email) {
                    whereInput.email = where.where.email
                }
                if (where.where.phoneNumber) {
                    whereInput.phoneNumber = where.where.phoneNumber
                }
                if (where.where.disabled) {
                    whereInput.disabled = where.where.disabled
                }
                if (where.where.emailVerified) {
                    whereInput.emailVerified = where.where.emailVerified
                }
                if (where.where.role) {
                    whereInput.role = where.where.role
                }
                if (where.where.state) {
                    whereInput.state = where.where.state
                }
                args.where = whereInput
            }
            if (where.cursor) {
                args.cursor = where.cursor
            }

            if (where.orderBy) {
                const orderBy: Prisma.UserOrderByInput = {}
                if (where.orderBy.createdAt == OrderByInput.asc) {
                    orderBy.createdAt = "asc"
                }
                if (where.orderBy.createdAt == OrderByInput.desc) {
                    orderBy.createdAt = "desc"
                }
                if (where.orderBy.updatedAt == OrderByInput.asc) {
                    orderBy.updatedAt = "asc"
                }
                if (where.orderBy.updatedAt == OrderByInput.desc) {
                    orderBy.updatedAt = "desc"
                }
                if (where.orderBy.email == OrderByInput.asc) {
                    orderBy.email = "asc"
                }
                if (where.orderBy.email == OrderByInput.desc) {
                    orderBy.email = "desc"
                }
                if (where.orderBy.disabled == OrderByInput.asc) {
                    orderBy.disabled = "asc"
                }
                if (where.orderBy.disabled == OrderByInput.desc) {
                    orderBy.disabled = "desc"
                }
                if (where.orderBy.emailVerified == OrderByInput.asc) {
                    orderBy.emailVerified = "asc"
                }
                if (where.orderBy.emailVerified == OrderByInput.desc) {
                    orderBy.emailVerified = "desc"
                }
                if (where.orderBy.phoneNumber == OrderByInput.asc) {
                    orderBy.phoneNumber = "asc"
                }
                if (where.orderBy.phoneNumber == OrderByInput.desc) {
                    orderBy.phoneNumber = "desc"
                }
                if (where.orderBy.role == OrderByInput.asc) {
                    orderBy.role = "asc"
                }
                if (where.orderBy.role == OrderByInput.desc) {
                    orderBy.role = "desc"
                }
                if (where.orderBy.state == OrderByInput.asc) {
                    orderBy.state = "asc"
                }
                if (where.orderBy.state == OrderByInput.desc) {
                    orderBy.state = "desc"
                }
                args.orderBy = orderBy;
            }

        }
        args.include = {
            avator: true,
        }
        return args
    }
    public answersQueryBuilder(where: AnswerQueryInput) {
        const args: Prisma.AnswerFindManyArgs = {};
        if (where) {
            if (where.take) {
                args.take = where.take
            }
            if (where.skip) {
                args.skip = where.skip
            }
            if (where.where) {
                const whereInput: Prisma.AnswerWhereInput = {}
                if (where.where.id) {
                    whereInput.id = where.where.id
                }


                args.where = whereInput
            }
            if (where.cursor) {
                args.cursor = where.cursor
            }
            if (where.orderBy) {
                const orderBy: Prisma.AnswerOrderByInput = {}
                if (where.orderBy.createdAt == OrderByInput.asc) {
                    orderBy.createdAt = "asc"
                }
                if (where.orderBy.createdAt == OrderByInput.desc) {
                    orderBy.createdAt = "desc"
                }
                if (where.orderBy.updatedAt == OrderByInput.asc) {
                    orderBy.updatedAt = "asc"
                }
                if (where.orderBy.updatedAt == OrderByInput.desc) {
                    orderBy.updatedAt = "desc"
                }
                if (where.orderBy.booleanValue == OrderByInput.asc) {
                    orderBy.booleanValue = "asc"
                }
                if (where.orderBy.booleanValue == OrderByInput.desc) {
                    orderBy.booleanValue = "desc"
                }
                if (where.orderBy.textValue == OrderByInput.asc) {
                    orderBy.textValue = "asc"
                }
                if (where.orderBy.textValue == OrderByInput.desc) {
                    orderBy.textValue = "desc"
                }
                args.orderBy = orderBy;
            }

        }
        args.include = {
            response: true,
            question: true,
        }
        return args
    }
    public responseQueryBuilder(where: ResponseQueryInput) {
        const args: Prisma.ResponseFindManyArgs = {};
        if (where) {
            if (where.take) {
                args.take = where.take;
            }
            if (where.skip) {
                args.skip = where.skip;
            }
            if (where.where) {
                const whereInput: Prisma.ResponseWhereInput = {};
                if (where.where.id) {
                    whereInput.id = where.where.id;
                }
                if (where.where.authorId) {
                    whereInput.authorId = where.where.authorId;
                }
                if (where.where.state) {
                    whereInput.state = where.where.state;
                }
                args.where = whereInput;
            }
            if (where.cursor) {
                args.cursor = where.cursor;
            }
            if (where.orderBy) {
                const orderBy: Prisma.FormOrderByInput = {};
                if (where.orderBy.createdAt == OrderByInput.asc) {
                    orderBy.createdAt = "asc";
                }
                if (where.orderBy.createdAt == OrderByInput.desc) {
                    orderBy.createdAt = "desc";
                }
                if (where.orderBy.updatedAt == OrderByInput.asc) {
                    orderBy.updatedAt = "asc";
                }
                if (where.orderBy.updatedAt == OrderByInput.desc) {
                    orderBy.updatedAt = "desc";
                }
                if (where.orderBy.state == OrderByInput.asc) {
                    orderBy.state = "asc";
                }
                if (where.orderBy.state == OrderByInput.desc) {
                    orderBy.state = "desc";
                }
                args.orderBy = orderBy;
            }

        }
        args.include = {
            author: true,
            form: true,
        };
        return args;
    }

    public questionQueryBuilder(where: QuestionQueryInput) {
        const args: Prisma.QuestionFindManyArgs = {};
        if (where) {
            if (where.take) {
                args.take = where.take;
            }
            if (where.skip) {
                args.skip = where.skip;
            }
            if (where.where) {
                const whereInput: Prisma.QuestionWhereInput = {};
                if (where.where.id) {
                    whereInput.id = where.where.id;
                }
                if (where.where.question) {
                    whereInput.question = where.where.question;
                }
                if (where.where.instruction) {
                    whereInput.instruction = where.where.instruction;
                }
                if (where.where.questionNumber) {
                    whereInput.questionNumber = where.where.questionNumber;
                }
                if (where.where.questionType) {
                    whereInput.questionType = where.where.questionType;
                }
                if (where.where.weight) {
                    whereInput.weight = where.where.weight;
                }
                args.where = whereInput;
            }
            if (where.cursor) {
                args.cursor = where.cursor;
            }
            if (where.orderBy) {
                const orderBy: Prisma.QuestionOrderByInput = {};
                if (where.orderBy.createdAt == OrderByInput.asc) {
                    orderBy.createdAt = "asc";
                }
                if (where.orderBy.createdAt == OrderByInput.desc) {
                    orderBy.createdAt = "desc";
                }
                if (where.orderBy.updatedAt == OrderByInput.asc) {
                    orderBy.updatedAt = "asc";
                }
                if (where.orderBy.updatedAt == OrderByInput.desc) {
                    orderBy.updatedAt = "desc";
                }
                if (where.orderBy.id == OrderByInput.asc) {
                    orderBy.id = "asc";
                }
                if (where.orderBy.id == OrderByInput.desc) {
                    orderBy.id = "desc";
                }

                if (where.orderBy.question == OrderByInput.asc) {
                    orderBy.question = "asc";
                }
                if (where.orderBy.question == OrderByInput.desc) {
                    orderBy.question = "desc";
                }
                if (where.orderBy.questionNumber == OrderByInput.asc) {
                    orderBy.questionNumber = "asc";
                }
                if (where.orderBy.questionNumber == OrderByInput.desc) {
                    orderBy.questionNumber = "desc";
                }
                if (where.orderBy.instruction == OrderByInput.asc) {
                    orderBy.instruction = "asc";
                }
                if (where.orderBy.instruction == OrderByInput.desc) {
                    orderBy.instruction = "desc";
                }
                if (where.orderBy.questionType == OrderByInput.asc) {
                    orderBy.questionType = "asc";
                }
                if (where.orderBy.questionType == OrderByInput.desc) {
                    orderBy.questionType = "desc";
                }
                if (where.orderBy.weight == OrderByInput.asc) {
                    orderBy.weight = "asc";
                }
                if (where.orderBy.weight == OrderByInput.desc) {
                    orderBy.weight = "desc";
                }
                args.orderBy = orderBy;
            }

        }
        args.include = {
            form: true,
        };
        return args;
    }
    public gradeQueryBuilder(where: GradeQueryInput) {
        const args: Prisma.GradeFindManyArgs = {};
        if (where) {
            if (where.take) {
                args.take = where.take;
            }
            if (where.skip) {
                args.skip = where.skip;
            }
            if (where.where) {
                const whereInput: Prisma.GradeWhereInput = {};
                if (where.where.id) {
                    whereInput.id = where.where.id;
                }
                if (where.where.name) {
                    whereInput.name = where.where.name;
                }
                if (where.where.description) {
                    whereInput.description = where.where.description;
                }

                if (where.where.maxValue) {
                    whereInput.maxValue = where.where.maxValue;
                }
                if (where.where.maxInclusive) {
                    whereInput.maxInclusive = where.where.maxInclusive;
                }
                if (where.where.minInclusive) {
                    whereInput.minInclusive = where.where.minInclusive;
                }

                args.where = whereInput;
            }
            if (where.cursor) {
                args.cursor = where.cursor;
            }
            if (where.orderBy) {
                const orderBy: Prisma.GradeOrderByInput = {};
                if (where.orderBy.createdAt == OrderByInput.asc) {
                    orderBy.createdAt = "asc";
                }
                if (where.orderBy.createdAt == OrderByInput.desc) {
                    orderBy.createdAt = "desc";
                }
                if (where.orderBy.updatedAt == OrderByInput.asc) {
                    orderBy.updatedAt = "asc";
                }
                if (where.orderBy.updatedAt == OrderByInput.desc) {
                    orderBy.updatedAt = "desc";
                }
                if (where.orderBy.id == OrderByInput.asc) {
                    orderBy.id = "asc";
                }
                if (where.orderBy.id == OrderByInput.desc) {
                    orderBy.id = "desc";
                }

                if (where.orderBy.name == OrderByInput.asc) {
                    orderBy.name = "asc";
                }
                if (where.orderBy.name == OrderByInput.desc) {
                    orderBy.name = "desc";
                }
                if (where.orderBy.description == OrderByInput.asc) {
                    orderBy.description = "asc";
                }
                if (where.orderBy.description == OrderByInput.desc) {
                    orderBy.description = "desc";
                }
                if (where.orderBy.maxValue == OrderByInput.asc) {
                    orderBy.maxValue = "asc";
                }
                if (where.orderBy.maxValue == OrderByInput.desc) {
                    orderBy.maxValue = "desc";
                }
                if (where.orderBy.minValue == OrderByInput.asc) {
                    orderBy.minValue = "asc";
                }
                if (where.orderBy.minValue == OrderByInput.desc) {
                    orderBy.minValue = "desc";
                }
                if (where.orderBy.maxInclusive == OrderByInput.asc) {
                    orderBy.maxInclusive = "asc";
                }
                if (where.orderBy.maxInclusive == OrderByInput.desc) {
                    orderBy.maxInclusive = "desc";
                }
                if (where.orderBy.minInclusive == OrderByInput.asc) {
                    orderBy.minInclusive = "asc";
                }
                if (where.orderBy.minInclusive == OrderByInput.desc) {
                    orderBy.minInclusive = "desc";
                }
                args.orderBy = orderBy;
            }

        }
        args.include = {
            form: true,
        };
        return args;
    }

    public helpStepQueryBuilder(where: HelpStepQueryInput) {
        const args: Prisma.HelpStepFindManyArgs = {};
        if (where) {
            if (where.take) {
                args.take = where.take;
            }
            if (where.skip) {
                args.skip = where.skip;
            }
            if (where.where) {
                const whereInput: Prisma.HelpStepWhereInput = {};
                if (where.where.id) {
                    whereInput.id = where.where.id;
                }
                if (where.where.title) {
                    whereInput.title = where.where.title;
                }
                if (where.where.description) {
                    whereInput.description = where.where.description;
                }
                if (where.where.stepNumber) {
                    whereInput.stepNumber = where.where.stepNumber;
                }


                args.where = whereInput;
            }
            if (where.cursor) {
                args.cursor = where.cursor;
            }
            if (where.orderBy) {
                const orderBy: Prisma.HelpStepOrderByInput = {};
                if (where.orderBy.createdAt == OrderByInput.asc) {
                    orderBy.createdAt = "asc";
                }
                if (where.orderBy.createdAt == OrderByInput.desc) {
                    orderBy.createdAt = "desc";
                }
                if (where.orderBy.updatedAt == OrderByInput.asc) {
                    orderBy.updatedAt = "asc";
                }
                if (where.orderBy.updatedAt == OrderByInput.desc) {
                    orderBy.updatedAt = "desc";
                }
                if (where.orderBy.title == OrderByInput.asc) {
                    orderBy.title = "asc";
                }
                if (where.orderBy.title == OrderByInput.desc) {
                    orderBy.title = "desc";
                }
                if (where.orderBy.description == OrderByInput.asc) {
                    orderBy.description = "asc";
                }
                if (where.orderBy.description == OrderByInput.desc) {
                    orderBy.description = "desc";
                }

                if (where.orderBy.stepNumber == OrderByInput.asc) {
                    orderBy.stepNumber = "asc";
                }
                if (where.orderBy.stepNumber == OrderByInput.desc) {
                    orderBy.stepNumber = "desc";
                }


                args.orderBy = orderBy;
            }

        }
        return args;
    }
    public attachmentQueryBuilder(where: AttachmentQueryInput) {
        const args: Prisma.AttachmentFindManyArgs = {};
        if (where) {
            if (where.take) {
                args.take = where.take;
            }
            if (where.skip) {
                args.skip = where.skip;
            }
            if (where.where) {
                const whereInput: Prisma.AttachmentWhereInput = {};
                if (where.where.id) {
                    whereInput.id = where.where.id;
                }
                if (where.where.path) {
                    whereInput.path = where.where.path;
                }
                if (where.where.filename) {
                    whereInput.filename = where.where.filename;
                }
                if (where.where.mimetype) {
                    whereInput.mimetype = where.where.mimetype;
                }
                if (where.where.encoding) {
                    whereInput.encoding = where.where.encoding;
                }


                args.where = whereInput;
            }
            if (where.cursor) {
                args.cursor = where.cursor;
            }
            if (where.orderBy) {
                const orderBy: Prisma.AttachmentOrderByInput = {};
                if (where.orderBy.createdAt == OrderByInput.asc) {
                    orderBy.createdAt = "asc";
                }
                if (where.orderBy.createdAt == OrderByInput.desc) {
                    orderBy.createdAt = "desc";
                }
                if (where.orderBy.updatedAt == OrderByInput.asc) {
                    orderBy.updatedAt = "asc";
                }
                if (where.orderBy.updatedAt == OrderByInput.desc) {
                    orderBy.updatedAt = "desc";
                }
                if (where.orderBy.path == OrderByInput.asc) {
                    orderBy.path = "asc";
                }
                if (where.orderBy.path == OrderByInput.desc) {
                    orderBy.path = "desc";
                }

                if (where.orderBy.filename == OrderByInput.asc) {
                    orderBy.filename = "asc";
                }
                if (where.orderBy.filename == OrderByInput.desc) {
                    orderBy.filename = "desc";
                }
                if (where.orderBy.mimetype == OrderByInput.asc) {
                    orderBy.mimetype = "asc";
                }
                if (where.orderBy.mimetype == OrderByInput.desc) {
                    orderBy.mimetype = "desc";
                }
                if (where.orderBy.encoding == OrderByInput.asc) {
                    orderBy.encoding = "asc";
                }
                if (where.orderBy.encoding == OrderByInput.desc) {
                    orderBy.encoding = "desc";
                }

                args.orderBy = orderBy;
            }

        }
        return args;
    }

    public formQueryBuilder(where: FormQueryInput) {
        const args: Prisma.FormFindManyArgs = {};
        if (where) {
            if (where.take) {
                args.take = where.take;
            }
            if (where.skip) {
                args.skip = where.skip;
            }
            if (where.where) {
                const whereInput: Prisma.FormWhereInput = {};
                if (where.where.id) {
                    whereInput.id = where.where.id;
                }
                if (where.where.authorId) {
                    whereInput.authorId = where.where.authorId;
                }
                if (where.where.state) {
                    whereInput.state = where.where.state;
                }
                if (where.where.category) {
                    whereInput.category = where.where.category;
                }
                args.where = whereInput;
            }
            if (where.cursor) {
                args.cursor = where.cursor;
            }
            if (where.orderBy) {
                const orderBy: Prisma.FormOrderByInput = {};
                if (where.orderBy.createdAt == OrderByInput.asc) {
                    orderBy.createdAt = "asc";
                }
                if (where.orderBy.createdAt == OrderByInput.desc) {
                    orderBy.createdAt = "desc";
                }
                if (where.orderBy.updatedAt == OrderByInput.asc) {
                    orderBy.updatedAt = "asc";
                }
                if (where.orderBy.updatedAt == OrderByInput.desc) {
                    orderBy.updatedAt = "desc";
                }
                if (where.orderBy.title == OrderByInput.asc) {
                    orderBy.title = "asc";
                }
                if (where.orderBy.title == OrderByInput.desc) {
                    orderBy.title = "desc";
                }
                args.orderBy = orderBy;
            }

        }
        args.include = {
            author: true,
        };
        return args;
    }
    public recommendationQueryBuilder(where: RecommendationQueryInput) {
        const args: Prisma.RecommendationFindManyArgs = {};
        if (where) {
            if (where.take) {
                args.take = where.take;
            }
            if (where.skip) {
                args.skip = where.skip;
            }
            if (where.where) {
                const whereInput: Prisma.RecommendationWhereInput = {};
                if (where.where.id) {
                    whereInput.id = where.where.id;
                }
                if (where.where.content) {
                    whereInput.content = where.where.content;
                }
                if (where.where.grade && where.where.grade.id) {
                    whereInput.grade = { id: where.where.grade.id };
                }
                args.where = whereInput;
            }
            if (where.cursor) {
                args.cursor = where.cursor;
            }
            if (where.orderBy) {
                const orderBy: Prisma.RecommendationOrderByInput = {};
                if (where.orderBy.createdAt == OrderByInput.asc) {
                    orderBy.createdAt = "asc";
                }
                if (where.orderBy.createdAt == OrderByInput.desc) {
                    orderBy.createdAt = "desc";
                }
                if (where.orderBy.updatedAt == OrderByInput.asc) {
                    orderBy.updatedAt = "asc";
                }
                if (where.orderBy.updatedAt == OrderByInput.desc) {
                    orderBy.updatedAt = "desc";
                }
                if (where.orderBy.content == OrderByInput.asc) {
                    orderBy.content = "asc";
                }
                if (where.orderBy.content == OrderByInput.desc) {
                    orderBy.content = "desc";
                }

                if (where.orderBy.id == OrderByInput.asc) {
                    orderBy.id = "asc";
                }
                if (where.orderBy.id == OrderByInput.desc) {
                    orderBy.id = "desc";
                }


                args.orderBy = orderBy;
            }

        }
        return args;
    }
    public helpQueryBuilder(where: HelpQueryInput) {
        const args: Prisma.HelpFindManyArgs = {};
        if (where) {
            if (where.take) {
                args.take = where.take;
            }
            if (where.skip) {
                args.skip = where.skip;
            }
            if (where.where) {
                const whereInput: Prisma.HelpWhereInput = {};
                if (where.where.id) {
                    whereInput.id = where.where.id;
                }
                if (where.where.topic) {
                    whereInput.topic = where.where.topic;
                }
                if (where.where.state) {
                    whereInput.state = where.where.state;
                }
                if (where.where.description) {
                    whereInput.description = where.where.description;
                }
                args.where = whereInput;
            }
            if (where.cursor) {
                args.cursor = where.cursor;
            }
            if (where.orderBy) {
                const orderBy: Prisma.HelpOrderByInput = {};
                if (where.orderBy.createdAt == OrderByInput.asc) {
                    orderBy.createdAt = "asc";
                }
                if (where.orderBy.createdAt == OrderByInput.desc) {
                    orderBy.createdAt = "desc";
                }
                if (where.orderBy.updatedAt == OrderByInput.asc) {
                    orderBy.updatedAt = "asc";
                }
                if (where.orderBy.updatedAt == OrderByInput.desc) {
                    orderBy.updatedAt = "desc";
                }
                if (where.orderBy.topic == OrderByInput.asc) {
                    orderBy.topic = "asc";
                }
                if (where.orderBy.description == OrderByInput.desc) {
                    orderBy.description = "desc";
                }
                args.orderBy = orderBy;
            }

        }
        /*  args.include = {
             steps: true,
         }; */
        return args;
    }
    public commentQueryBuilder(where: CommentQueryInput) {
        const args: Prisma.CommentFindManyArgs = {};
        if (where) {
            if (where.take) {
                args.take = where.take;
            }
            if (where.skip) {
                args.skip = where.skip;
            }
            if (where.where) {
                const whereInput: Prisma.CommentWhereInput = {};
                if (where.where.id) {
                    whereInput.id = where.where.id;
                }
                if (where.where.author) {
                    //   whereInput.authorId = where.where.author.id;
                }
                if (where.where.state) {
                    whereInput.state = where.where.state;
                }
                args.where = whereInput;
            }
            if (where.cursor) {
                args.cursor = where.cursor;
            }
            if (where.orderBy) {
                const orderBy: Prisma.CommentOrderByInput = {};
                if (where.orderBy.createdAt == OrderByInput.asc) {
                    orderBy.createdAt = "asc";
                }
                if (where.orderBy.createdAt == OrderByInput.desc) {
                    orderBy.createdAt = "desc";
                }
                if (where.orderBy.updatedAt == OrderByInput.asc) {
                    orderBy.updatedAt = "asc";
                }
                if (where.orderBy.updatedAt == OrderByInput.desc) {
                    orderBy.updatedAt = "desc";
                }
                if (where.orderBy.content == OrderByInput.asc) {
                    orderBy.content = "asc";
                }
                if (where.orderBy.content == OrderByInput.desc) {
                    orderBy.content = "desc";
                }
                if (where.orderBy.commentsEnabled == OrderByInput.asc) {
                    orderBy.commentsEnabled = "asc";
                }
                if (where.orderBy.commentsEnabled == OrderByInput.desc) {
                    orderBy.commentsEnabled = "desc";
                }
                args.orderBy = orderBy;
            }

        }
        args.include = {
            author: true,
        };
        return args;
    }
    public forumAnswerQueryBuilder(where: ForumAnswerQueryInput) {
        const args: Prisma.ForumAnswerFindManyArgs = {};
        if (where) {
            if (where.take) {
                args.take = where.take;
            }
            if (where.skip) {
                args.skip = where.skip;
            }
            if (where.where) {
                const whereInput: Prisma.ForumAnswerWhereInput = {};
                if (where.where.id) {
                    whereInput.id = where.where.id;
                }
                if (where.where.author) {
                    //  whereInput.authorId = where.where.author.id;
                }
                if (where.where.state) {
                    whereInput.state = where.where.state;
                }
                args.where = whereInput;
            }
            if (where.cursor) {
                args.cursor = where.cursor;
            }
            if (where.orderBy) {
                const orderBy: Prisma.ForumAnswerOrderByInput = {};
                if (where.orderBy.createdAt == OrderByInput.asc) {
                    orderBy.createdAt = "asc";
                }
                if (where.orderBy.createdAt == OrderByInput.desc) {
                    orderBy.createdAt = "desc";
                }
                if (where.orderBy.updatedAt == OrderByInput.asc) {
                    orderBy.updatedAt = "asc";
                }
                if (where.orderBy.updatedAt == OrderByInput.desc) {
                    orderBy.updatedAt = "desc";
                }
                if (where.orderBy.commentsEnabled == OrderByInput.asc) {
                    orderBy.commentsEnabled = "asc";
                }
                if (where.orderBy.commentsEnabled == OrderByInput.desc) {
                    orderBy.commentsEnabled = "desc";
                }
                if (where.orderBy.content == OrderByInput.asc) {
                    orderBy.content = "asc";
                }
                if (where.orderBy.content == OrderByInput.desc) {
                    orderBy.content = "desc";
                }
                args.orderBy = orderBy;
            }

        }
        args.include = {
            author: true,
        };
        return args;
    }
    public forumQueryBuilder(where: ForumQueryInput) {
        const args: Prisma.ForumFindManyArgs = {};
        if (where) {
            if (where.take) {
                args.take = where.take;
            }
            if (where.skip) {
                args.skip = where.skip;
            }
            if (where.where) {
                const whereInput: Prisma.ForumWhereInput = {};
                if (where.where.id) {
                    whereInput.id = where.where.id;
                }
                if (where.where.author) {

                    whereInput.author = where.where.author;
                }
                if (where.where.state) {
                    whereInput.state = where.where.state;
                }
                args.where = whereInput;
            }
            if (where.cursor) {
                args.cursor = where.cursor;
            }
            if (where.orderBy) {
                const orderBy: Prisma.ForumOrderByInput = {};
                if (where.orderBy.createdAt == OrderByInput.asc) {
                    orderBy.createdAt = "asc";
                }
                if (where.orderBy.createdAt == OrderByInput.desc) {
                    orderBy.createdAt = "desc";
                }
                if (where.orderBy.updatedAt == OrderByInput.asc) {
                    orderBy.updatedAt = "asc";
                }
                if (where.orderBy.updatedAt == OrderByInput.desc) {
                    orderBy.updatedAt = "desc";
                }
                if (where.orderBy.question == OrderByInput.asc) {
                    orderBy.question = "asc";
                }
                if (where.orderBy.description == OrderByInput.desc) {
                    orderBy.description = "desc";
                }
                args.orderBy = orderBy;
            }

        }
        args.include = {
            author: true,
        };
        return args;
    }
    public formCategoryQueryBuilder(where: FormCategoryQueryInput) {
        const args: Prisma.FormCategoryFindManyArgs = {};
        if (where) {
            if (where.take) {
                args.take = where.take;
            }
            if (where.skip) {
                args.skip = where.skip;
            }
            if (where.where) {
                const whereInput: Prisma.FormCategoryWhereInput = {};
                if (where.where.id) {
                    whereInput.id = where.where.id;
                }

                if (where.where.state) {
                    whereInput.state = where.where.state;
                }
                args.where = whereInput;
            }
            if (where.cursor) {
                args.cursor = where.cursor;
            }
            if (where.orderBy) {
                const orderBy: Prisma.FormCategoryOrderByInput = {};
                if (where.orderBy.createdAt == OrderByInput.asc) {
                    orderBy.createdAt = "asc";
                }
                if (where.orderBy.createdAt == OrderByInput.desc) {
                    orderBy.createdAt = "desc";
                }
                if (where.orderBy.updatedAt == OrderByInput.asc) {
                    orderBy.updatedAt = "asc";
                }
                if (where.orderBy.updatedAt == OrderByInput.desc) {
                    orderBy.updatedAt = "desc";
                }
                if (where.orderBy.name == OrderByInput.asc) {
                    orderBy.name = "asc";
                }
                if (where.orderBy.name == OrderByInput.desc) {
                    orderBy.name = "desc";
                }

                args.orderBy = orderBy;
            }

        }
        args.include = {
            image: true,
        };
        return args;
    }
    public isAdmin(ctx: any) {
        if (!(ctx.auth.role === Role.ADMIN)) {
            throw new GraphQLError("You dont have permision to perform this action");
        }
    }
    public isOwner(where: UserWhereUniqueInput, ctx: any,) {
        if (!(ctx.auth.role === Role.ADMIN)) {
            if (!where.id)
                throw new GraphQLError("You dont have permision to perform this action");


            if (!(ctx.auth.uid === where.id)) {
                throw new GraphQLError("You dont have permision to perform this action");
            }

        }
    }
}
