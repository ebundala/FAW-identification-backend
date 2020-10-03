import { Injectable } from '@nestjs/common';
import { FormQueryInput, 
    ResponseQueryInput, 
    GradeQueryInput,
     AttachmentQueryInput, 
     QuestionQueryInput, 
     RecommendationQueryInput, 
     OrderByInput, 
     AnswerQueryInput, 
     ForumQueryInput,
     ForumAnswerQueryInput,
     CommentQueryInput, FormCategoryQueryInput} from '../../models/graphql';
import { FindManyResponseArgs,
     ResponseWhereInput, 
     FormOrderByInput, 
     FindManyQuestionArgs, 
     QuestionWhereInput,
      QuestionOrderByInput,
       FindManyGradeArgs, 
       GradeWhereInput, 
       GradeOrderByInput, 
       FindManyAttachmentArgs, 
       AttachmentWhereInput, 
       AttachmentOrderByInput, 
       FindManyFormArgs, 
       FormWhereInput, 
       FindManyRecommendationArgs, 
       RecommendationWhereInput, 
       RecommendationOrderByInput, 
       FindManyAnswerArgs, 
       AnswerWhereInput, 
       AnswerOrderByInput, 
       FindManyForumArgs,
       ForumWhereInput,
       ForumOrderByInput,
       FindManyForumAnswerArgs,
       ForumAnswerWhereInput,
       ForumAnswerOrderByInput,
       CommentWhereInput,
       CommentOrderByInput,
       FindManyCommentArgs, FindManyFormCategoryArgs, FormCategoryWhereInput, FormCategoryOrderByInput} from '@prisma/client';

@Injectable()
export class QueryHelper {
   public answersQueryBuilder(where: AnswerQueryInput) {
        const args: FindManyAnswerArgs = {};
        if (where) {
            if (where.take) {
                args.take = where.take
            }
            if (where.skip) {
                args.skip = where.skip
            }
            if (where.where) {
                const whereInput: AnswerWhereInput = {}
                if (where.where.id) {
                    whereInput.id = where.where.id
                }
                
                
                args.where = whereInput
            }
            if (where.cursor) {
                args.cursor = where.cursor
            }
            if (where.orderBy) {
                const orderBy: AnswerOrderByInput = {}
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
        args.include={
                response: true,
                question: true,
            }
            return args
    }
    public responseQueryBuilder(where: ResponseQueryInput) {
        const args: FindManyResponseArgs = {};
        if (where) {
            if (where.take) {
                args.take = where.take;
            }
            if (where.skip) {
                args.skip = where.skip;
            }
            if (where.where) {
                const whereInput: ResponseWhereInput = {};
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
                const orderBy: FormOrderByInput = {};
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
        const args: FindManyQuestionArgs = {};
        if (where) {
            if (where.take) {
                args.take = where.take;
            }
            if (where.skip) {
                args.skip = where.skip;
            }
            if (where.where) {
                const whereInput: QuestionWhereInput = {};
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
                const orderBy: QuestionOrderByInput = {};
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
        const args: FindManyGradeArgs = {};
        if (where) {
            if (where.take) {
                args.take = where.take;
            }
            if (where.skip) {
                args.skip = where.skip;
            }
            if (where.where) {
                const whereInput: GradeWhereInput = {};
                if (where.where.id) {
                    whereInput.id = where.where.id;
                }
                if (where.where.name) {
                    whereInput.name = where.where.name;
                }
                if (where.where.description) {
                    whereInput.description = where.where.description;
                }

                if (where.where.max) {
                    whereInput.max = where.where.max;
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
                const orderBy: GradeOrderByInput = {};
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
                if (where.orderBy.max == OrderByInput.asc) {
                    orderBy.max = "asc";
                }
                if (where.orderBy.max == OrderByInput.desc) {
                    orderBy.max = "desc";
                }
                if (where.orderBy.min == OrderByInput.asc) {
                    orderBy.min = "asc";
                }
                if (where.orderBy.min == OrderByInput.desc) {
                    orderBy.min = "desc";
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

    public attachmentQueryBuilder(where: AttachmentQueryInput) {
        const args: FindManyAttachmentArgs = {};
        if (where) {
            if (where.take) {
                args.take = where.take;
            }
            if (where.skip) {
                args.skip = where.skip;
            }
            if (where.where) {
                const whereInput: AttachmentWhereInput = {};
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
                const orderBy: AttachmentOrderByInput = {};
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
        const args: FindManyFormArgs = {};
        if (where) {
            if (where.take) {
                args.take = where.take;
            }
            if (where.skip) {
                args.skip = where.skip;
            }
            if (where.where) {
                const whereInput: FormWhereInput = {};
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
                const orderBy: FormOrderByInput = {};
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
    public recommendationQueryBuilder(where: RecommendationQueryInput){
        const args: FindManyRecommendationArgs = {};
        if (where) {
            if (where.take) {
                args.take = where.take;
            }
            if (where.skip) {
                args.skip = where.skip;
            }
            if (where.where) {
                const whereInput: RecommendationWhereInput = {};
                if (where.where.id) {
                    whereInput.id = where.where.id;
                }
                if (where.where.content) {
                    whereInput.content = where.where.content;
                }
                if (where.where.grade&&where.where.grade.id) {
                    whereInput.grade = {id:where.where.grade.id};
                }
                args.where = whereInput;
            }
            if (where.cursor) {
                args.cursor = where.cursor;
            }
            if (where.orderBy) {
                const orderBy: RecommendationOrderByInput = {};
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

    public commentQueryBuilder(where: CommentQueryInput) {
        const args: FindManyCommentArgs = {};
        if (where) {
            if (where.take) {
                args.take = where.take;
            }
            if (where.skip) {
                args.skip = where.skip;
            }
            if (where.where) {
                const whereInput: CommentWhereInput = {};
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
                const orderBy: CommentOrderByInput = {};
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
        const args: FindManyForumAnswerArgs = {};
        if (where) {
            if (where.take) {
                args.take = where.take;
            }
            if (where.skip) {
                args.skip = where.skip;
            }
            if (where.where) {
                const whereInput: ForumAnswerWhereInput = {};
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
                const orderBy: ForumAnswerOrderByInput = {};
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
        const args: FindManyForumArgs = {};
        if (where) {
            if (where.take) {
                args.take = where.take;
            }
            if (where.skip) {
                args.skip = where.skip;
            }
            if (where.where) {
                const whereInput: ForumWhereInput = {};
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
                const orderBy: ForumOrderByInput = {};
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
    public formCategoryQueryBuilder(where: FormCategoryQueryInput){
        const args: FindManyFormCategoryArgs = {};
        if(where){
            if (where.take) {
                args.take = where.take;
            }
            if (where.skip) {
                args.skip = where.skip;
            }
            if (where.where) {
                const whereInput: FormCategoryWhereInput = {};
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
                const orderBy: FormCategoryOrderByInput = {};
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
    
}
