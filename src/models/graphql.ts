
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum AttachmentType {
    AUDIO = "AUDIO",
    VIDEO = "VIDEO",
    DOCUMENT = "DOCUMENT",
    IMAGE = "IMAGE"
}

export enum QuestionType {
    BOOLEAN = "BOOLEAN",
    TEXT = "TEXT"
}

export enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
    MODERATOR = "MODERATOR",
    ORGANIZATION = "ORGANIZATION"
}

export enum State {
    PENDING = "PENDING",
    REVIEW = "REVIEW",
    REJECTED = "REJECTED",
    APPROVED = "APPROVED",
    COMPLETED = "COMPLETED",
    ARCHIVED = "ARCHIVED"
}

export enum OrderByInput {
    asc = "asc",
    desc = "desc"
}

export class AnswerCreateInput {
    response: ResponseWhereUniqueInput;
    question: QuestionWhereUniqueInput;
    booleanValue?: boolean;
    textValue?: string;
}

export class AnswerUpdateDataInput {
    booleanValue?: boolean;
    textValue?: string;
}

export class AnswerWhereUniqueInput {
    id: string;
}

export class AnswerUpdateInput {
    where?: AnswerWhereUniqueInput;
    update?: AnswerUpdateDataInput;
}

export class AnswerOrderBy {
    id?: OrderByInput;
    booleanValue?: OrderByInput;
    textValue?: OrderByInput;
    createdAt?: OrderByInput;
    updatedAt?: OrderByInput;
}

export class AnswerWhereQuery {
    id?: string;
    response?: ResponseWhereUniqueInput;
    question?: QuestionWhereUniqueInput;
    booleanValue?: boolean;
    textValue?: string;
}

export class AnswerQueryInput {
    take?: number;
    skip?: number;
    where?: AnswerWhereQuery;
    orderBy?: AnswerOrderBy;
    cursor?: AnswerWhereUniqueInput;
}

export class AttachmentUpdateDataInput {
    path?: string;
    filename?: string;
    mimetype?: string;
    metadata?: AttachmentMetadata;
}

export class AttachmentWhereUniqueInput {
    id: string;
}

export class AttachmentUpdateInput {
    where?: AttachmentWhereUniqueInput;
    update?: AttachmentUpdateDataInput;
}

export class AttachmentOrderBy {
    id?: OrderByInput;
    path?: OrderByInput;
    filename?: OrderByInput;
    mimetype?: OrderByInput;
    encoding?: OrderByInput;
    createdAt?: OrderByInput;
    updatedAt?: OrderByInput;
}

export class AttachmentWhereQuery {
    id?: string;
    path?: string;
    filename?: string;
    mimetype?: string;
    encoding?: string;
}

export class AttachmentQueryInput {
    take?: number;
    skip?: number;
    where?: AttachmentWhereQuery;
    orderBy?: AttachmentOrderBy;
    cursor?: AttachmentWhereUniqueInput;
}

export class AttachmentMetadata {
    duration?: number;
    size?: number;
    meta?: string;
}

export class CommentCreateInput {
    content: string;
    comment?: CommentWhereUniqueInput;
    forum?: ForumWhereUniqueInput;
    forumAnswer?: ForumAnswerWhereUniqueInput;
    state?: State;
    commentsEnabled?: boolean;
    attachments?: AttachmentWhereUniqueInput[];
}

export class CommentUpdateDataInput {
    content?: string;
    commentsEnabled?: boolean;
    state?: State;
    attachments?: AttachmentWhereUniqueInput[];
}

export class CommentWhereUniqueInput {
    id: string;
}

export class CommentUpdateInput {
    where?: CommentWhereUniqueInput;
    update?: CommentUpdateDataInput;
}

export class CommentOrderBy {
    id?: OrderByInput;
    content?: OrderByInput;
    commentsEnabled?: OrderByInput;
    state?: OrderByInput;
    createdAt?: OrderByInput;
    updatedAt?: OrderByInput;
}

export class CommentWhereQuery {
    id?: string;
    content?: string;
    commentsEnabled?: boolean;
    author?: UserWhereUniqueInput;
    state?: State;
}

export class CommentQueryInput {
    take?: number;
    skip?: number;
    where?: CommentWhereQuery;
    orderBy?: CommentOrderBy;
    cursor?: CommentWhereUniqueInput;
}

export class FormCreateInput {
    title: string;
    description?: string;
    state?: State;
    category?: FormCategoryWhereUniqueInput;
    attachments: AttachmentWhereUniqueInput[];
}

export class FormUpdateDataInput {
    title?: string;
    description?: string;
    category?: FormCategoryWhereUniqueInput;
    state?: State;
    attachments?: AttachmentWhereUniqueInput[];
}

export class FormWhereUniqueInput {
    id: string;
}

export class FormUpdateInput {
    where?: FormWhereUniqueInput;
    update?: FormUpdateDataInput;
}

export class FormOrderBy {
    id?: OrderByInput;
    title?: OrderByInput;
    state?: OrderByInput;
    createdAt?: OrderByInput;
    updatedAt?: OrderByInput;
}

export class FormWhereQuery {
    id?: string;
    authorId?: string;
    state?: State;
    category?: FormCategoryWhereUniqueInput;
}

export class FormQueryInput {
    take?: number;
    skip?: number;
    where?: FormWhereQuery;
    orderBy?: FormOrderBy;
    cursor?: FormWhereUniqueInput;
}

export class FormCategoryCreateInput {
    name: string;
    description?: string;
    state?: State;
    image?: AttachmentWhereUniqueInput;
}

export class FormCategoryUpdateDataInput {
    name?: string;
    description?: string;
    state?: State;
    image?: AttachmentWhereUniqueInput;
}

export class FormCategoryWhereUniqueInput {
    id: string;
}

export class FormCategoryUpdateInput {
    where?: FormCategoryWhereUniqueInput;
    update?: FormCategoryUpdateDataInput;
}

export class FormCategoryOrderBy {
    id?: OrderByInput;
    name?: OrderByInput;
    description?: OrderByInput;
    state?: OrderByInput;
    createdAt?: OrderByInput;
    updatedAt?: OrderByInput;
}

export class FormCategoryWhereQuery {
    id?: string;
    name?: string;
    state?: State;
}

export class FormCategoryQueryInput {
    take?: number;
    skip?: number;
    where?: FormCategoryWhereQuery;
    orderBy?: FormCategoryOrderBy;
    cursor?: FormCategoryWhereUniqueInput;
}

export class ForumCreateInput {
    question: string;
    description: string;
    state?: State;
    attachments?: AttachmentWhereUniqueInput[];
}

export class ForumUpdateDataInput {
    question?: string;
    description?: string;
    state?: State;
    attachments?: AttachmentWhereUniqueInput[];
}

export class ForumWhereUniqueInput {
    id: string;
}

export class ForumUpdateInput {
    where?: ForumWhereUniqueInput;
    update?: ForumUpdateDataInput;
}

export class ForumOrderBy {
    id?: OrderByInput;
    question?: OrderByInput;
    description?: OrderByInput;
    state?: OrderByInput;
    createdAt?: OrderByInput;
    updatedAt?: OrderByInput;
}

export class ForumWhereQuery {
    id?: string;
    question?: string;
    description?: string;
    commentsEnabled?: boolean;
    author?: UserWhereUniqueInput;
    state?: State;
}

export class ForumQueryInput {
    take?: number;
    skip?: number;
    where?: ForumWhereQuery;
    orderBy?: ForumOrderBy;
    cursor?: ForumWhereUniqueInput;
}

export class ForumAnswerCreateInput {
    content: string;
    forum: ForumWhereUniqueInput;
    state?: State;
    commentsEnabled?: boolean;
    attachments?: AttachmentWhereUniqueInput[];
}

export class ForumAnswerUpdateDataInput {
    content?: string;
    commentsEnabled?: boolean;
    state?: State;
    attachments?: AttachmentWhereUniqueInput[];
}

export class ForumAnswerWhereUniqueInput {
    id: string;
}

export class ForumAnswerUpdateInput {
    where?: ForumAnswerWhereUniqueInput;
    update?: ForumAnswerUpdateDataInput;
}

export class ForumAnswerOrderBy {
    id?: OrderByInput;
    content?: OrderByInput;
    commentsEnabled?: OrderByInput;
    state?: OrderByInput;
    createdAt?: OrderByInput;
    updatedAt?: OrderByInput;
}

export class ForumAnswerWhereQuery {
    id?: string;
    content?: string;
    commentsEnabled?: boolean;
    author?: UserWhereUniqueInput;
    state?: State;
}

export class ForumAnswerQueryInput {
    take?: number;
    skip?: number;
    where?: ForumAnswerWhereQuery;
    orderBy?: ForumAnswerOrderBy;
    cursor?: ForumAnswerWhereUniqueInput;
}

export class GradeCreateInput {
    name: string;
    description?: string;
    min: number;
    max: number;
    minInclusive?: boolean;
    maxInclusive?: boolean;
    form: FormWhereUniqueInput;
}

export class GradeUpdateDataInput {
    name?: string;
    description?: string;
    min?: number;
    max?: number;
    minInclusive?: boolean;
    maxInclusive?: boolean;
}

export class GradeWhereUniqueInput {
    id: string;
}

export class GradeUpdateInput {
    where?: GradeWhereUniqueInput;
    update?: GradeUpdateDataInput;
}

export class GradeOrderBy {
    name?: OrderByInput;
    description?: OrderByInput;
    min?: OrderByInput;
    max?: OrderByInput;
    minInclusive?: OrderByInput;
    maxInclusive?: OrderByInput;
    id?: OrderByInput;
    createdAt?: OrderByInput;
    updatedAt?: OrderByInput;
}

export class GradeWhereQuery {
    id?: string;
    name?: string;
    description?: string;
    min?: number;
    max?: number;
    minInclusive?: boolean;
    maxInclusive?: boolean;
}

export class GradeQueryInput {
    take?: number;
    skip?: number;
    where?: GradeWhereQuery;
    orderBy?: GradeOrderBy;
    cursor?: GradeWhereUniqueInput;
}

export class QuestionCreateInput {
    questionNumber: number;
    question?: string;
    weight: number;
    instruction?: string;
    questionType: QuestionType;
    form: FormWhereUniqueInput;
    grade: GradeWhereUniqueInput;
    attachments: AttachmentWhereUniqueInput[];
}

export class QuestionUpdateDataInput {
    questionNumber?: number;
    question?: string;
    weight?: number;
    instruction?: string;
    questionType?: QuestionType;
    grade?: GradeWhereUniqueInput;
    attachments?: AttachmentWhereUniqueInput[];
}

export class QuestionWhereUniqueInput {
    id: string;
}

export class QuestionUpdateInput {
    where?: QuestionWhereUniqueInput;
    update?: QuestionUpdateDataInput;
}

export class QuestionOrderBy {
    questionNumber?: OrderByInput;
    weight?: OrderByInput;
    question?: OrderByInput;
    instruction?: OrderByInput;
    questionType?: OrderByInput;
    id?: OrderByInput;
    createdAt?: OrderByInput;
    updatedAt?: OrderByInput;
}

export class QuestionWhereQuery {
    id?: string;
    questionNumber?: number;
    question?: string;
    instruction?: string;
    weight?: number;
    questionType?: QuestionType;
    grade?: GradeWhereUniqueInput;
}

export class QuestionQueryInput {
    take?: number;
    skip?: number;
    where?: QuestionWhereQuery;
    orderBy?: QuestionOrderBy;
    cursor?: QuestionWhereUniqueInput;
}

export class RecommendationCreateInput {
    content: string;
    grade: GradeWhereUniqueInput;
    attachments: AttachmentWhereUniqueInput[];
}

export class RecommendationUpdateDataInput {
    content?: string;
    grade?: GradeWhereUniqueInput;
    attachments?: AttachmentWhereUniqueInput[];
    disconnected?: AttachmentWhereUniqueInput[];
}

export class RecommendationWhereUniqueInput {
    id: string;
}

export class RecommendationUpdateInput {
    where?: RecommendationWhereUniqueInput;
    update?: RecommendationUpdateDataInput;
}

export class RecommendationOrderBy {
    id?: OrderByInput;
    content?: OrderByInput;
    createdAt?: OrderByInput;
    updatedAt?: OrderByInput;
}

export class RecommendationWhereQuery {
    id?: string;
    content?: string;
    grade: GradeWhereUniqueInput;
}

export class RecommendationQueryInput {
    take?: number;
    skip?: number;
    where?: RecommendationWhereQuery;
    orderBy?: RecommendationOrderBy;
    cursor?: RecommendationWhereUniqueInput;
}

export class ResponseCreateInput {
    form: FormWhereUniqueInput;
    state: State;
}

export class ResponseUpdateDataInput {
    state?: State;
}

export class ResponseWhereUniqueInput {
    id: string;
}

export class ResponseUpdateInput {
    where?: ResponseWhereUniqueInput;
    update?: ResponseUpdateDataInput;
}

export class ResponseOrderBy {
    state?: OrderByInput;
    id?: OrderByInput;
    createdAt?: OrderByInput;
    updatedAt?: OrderByInput;
}

export class ResponseWhereQuery {
    id?: string;
    state?: State;
    authorId?: string;
    form?: FormWhereUniqueInput;
    grade?: GradeWhereUniqueInput;
}

export class ResponseQueryInput {
    take?: number;
    skip?: number;
    where?: ResponseWhereQuery;
    orderBy?: ResponseOrderBy;
    cursor?: ResponseWhereUniqueInput;
}

export class AuthInput {
    email: string;
    password: string;
    displayName?: string;
}

export class UserWhereUniqueInput {
    id?: string;
    email?: string;
}

export class Answer {
    id: string;
    response: Response;
    question: Question;
    attachments?: Attachment[];
    booleanValue?: boolean;
    textValue?: string;
    createdAt: string;
    updatedAt: string;
}

export class AnswerResult {
    status: boolean;
    message: string;
    answer?: Answer;
}

export class AnswerListResult {
    status: boolean;
    message: string;
    answers?: Answer[];
}

export abstract class IMutation {
    abstract createAnswer(data: AnswerCreateInput): AnswerResult | Promise<AnswerResult>;

    abstract updateAnswer(data: AnswerUpdateInput): AnswerResult | Promise<AnswerResult>;

    abstract deleteAnswer(where: AnswerWhereUniqueInput): AnswerResult | Promise<AnswerResult>;

    abstract createAttachment(data: Upload, metadata?: AttachmentMetadata): AttachmentResult | Promise<AttachmentResult>;

    abstract updateAttachment(data: AttachmentUpdateInput): AttachmentResult | Promise<AttachmentResult>;

    abstract deleteAttachment(where: AttachmentWhereUniqueInput): AttachmentResult | Promise<AttachmentResult>;

    abstract createComment(data: CommentCreateInput): CommentResult | Promise<CommentResult>;

    abstract updateComment(data: CommentUpdateInput): CommentResult | Promise<CommentResult>;

    abstract deleteComment(where: CommentWhereUniqueInput): CommentResult | Promise<CommentResult>;

    abstract createForm(data: FormCreateInput): FormResult | Promise<FormResult>;

    abstract updateForm(data: FormUpdateInput): FormResult | Promise<FormResult>;

    abstract deleteForm(where: FormWhereUniqueInput): FormResult | Promise<FormResult>;

    abstract createFormCategory(data: FormCategoryCreateInput): FormCategoryResult | Promise<FormCategoryResult>;

    abstract updateFormCategory(data: FormCategoryUpdateInput): FormCategoryResult | Promise<FormCategoryResult>;

    abstract deleteFormCategory(where: FormCategoryWhereUniqueInput): FormCategoryResult | Promise<FormCategoryResult>;

    abstract createForum(data: ForumCreateInput): ForumResult | Promise<ForumResult>;

    abstract updateForum(data: ForumUpdateInput): ForumResult | Promise<ForumResult>;

    abstract deleteForum(where: ForumWhereUniqueInput): ForumResult | Promise<ForumResult>;

    abstract createForumAnswer(data: ForumAnswerCreateInput): ForumAnswerResult | Promise<ForumAnswerResult>;

    abstract updateForumAnswer(data: ForumAnswerUpdateInput): ForumAnswerResult | Promise<ForumAnswerResult>;

    abstract deleteForumAnswer(where: ForumAnswerWhereUniqueInput): ForumAnswerResult | Promise<ForumAnswerResult>;

    abstract createGrade(data: GradeCreateInput): GradeResult | Promise<GradeResult>;

    abstract updateGrade(data: GradeUpdateInput): GradeResult | Promise<GradeResult>;

    abstract deleteGrade(where: GradeWhereUniqueInput): GradeResult | Promise<GradeResult>;

    abstract createQuestion(data: QuestionCreateInput): QuestionResult | Promise<QuestionResult>;

    abstract updateQuestion(data: QuestionUpdateInput): QuestionResult | Promise<QuestionResult>;

    abstract deleteQuestion(where: QuestionWhereUniqueInput): QuestionResult | Promise<QuestionResult>;

    abstract createRecommendation(data: RecommendationCreateInput): RecommendationResult | Promise<RecommendationResult>;

    abstract updateRecommendation(data: RecommendationUpdateInput): RecommendationResult | Promise<RecommendationResult>;

    abstract deleteRecommendation(where: RecommendationWhereUniqueInput): RecommendationResult | Promise<RecommendationResult>;

    abstract createResponse(data: ResponseCreateInput): ResponseResult | Promise<ResponseResult>;

    abstract updateResponse(data: ResponseUpdateInput): ResponseResult | Promise<ResponseResult>;

    abstract deleteResponse(where: ResponseWhereUniqueInput): ResponseResult | Promise<ResponseResult>;

    abstract version(): string | Promise<string>;

    abstract signup(credentials: AuthInput): AuthResult | Promise<AuthResult>;

    abstract signin(credentials: AuthInput): AuthResult | Promise<AuthResult>;

    abstract signout(): SignOutResult | Promise<SignOutResult>;
}

export class Attachment {
    id: string;
    path: string;
    filename: string;
    mimetype: string;
    duration?: number;
    size: number;
    isNew?: boolean;
    attachmentType: AttachmentType;
    encoding: string;
    createdAt: string;
    updatedAt: string;
}

export class AttachmentResult {
    status: boolean;
    message: string;
    file?: Attachment;
}

export class AttachmentListResult {
    status: boolean;
    message: string;
    files?: Attachment[];
}

export class Comment {
    id: string;
    content: string;
    state: State;
    author: User;
    forum?: Forum;
    forumAnswer?: ForumAnswer;
    comment?: Comment;
    comments?: Comment[];
    commentsEnabled?: boolean;
    attachments?: Attachment[];
    createdAt?: string;
    updatedAt?: string;
}

export class CommentResult {
    status: boolean;
    message: string;
    comment?: Comment;
}

export class CommentListResult {
    status: boolean;
    message: string;
    comments?: Comment[];
}

export class Form {
    id: string;
    title: string;
    description?: string;
    state: State;
    author: User;
    category?: FormCategory;
    questions?: Question[];
    grades?: Grade[];
    responses?: Response[];
    attachments?: Attachment[];
    createdAt?: string;
    updatedAt?: string;
}

export class FormResult {
    status: boolean;
    message: string;
    form?: Form;
}

export class FormListResult {
    status: boolean;
    message: string;
    forms?: Form[];
}

export abstract class IQuery {
    abstract forms(where?: FormQueryInput): FormListResult | Promise<FormListResult>;

    abstract formCategories(where?: FormCategoryQueryInput): FormCategoryListResult | Promise<FormCategoryListResult>;

    abstract forums(where?: ForumQueryInput): ForumListResult | Promise<ForumListResult>;

    abstract responses(where: ResponseQueryInput): ResponseListResult | Promise<ResponseListResult>;

    abstract version(): string | Promise<string>;
}

export class FormCategory {
    id: string;
    name: string;
    description?: string;
    state: State;
    image?: Attachment;
    createdAt?: string;
    updatedAt?: string;
}

export class FormCategoryResult {
    status: boolean;
    message: string;
    formCategory?: FormCategory;
}

export class FormCategoryListResult {
    status: boolean;
    message: string;
    formCategories?: FormCategory[];
}

export class Forum {
    id: string;
    question: string;
    description: string;
    state: State;
    author: User;
    forumAnswers?: ForumAnswer[];
    comments?: Comment[];
    commentsEnabled?: boolean;
    attachments?: Attachment[];
    createdAt?: string;
    updatedAt?: string;
}

export class ForumResult {
    status: boolean;
    message: string;
    forum?: Forum;
}

export class ForumListResult {
    status: boolean;
    message: string;
    forums?: Forum[];
}

export class ForumAnswer {
    id: string;
    content: string;
    state: State;
    author: User;
    forum: Forum;
    comments?: Comment[];
    commentsEnabled?: boolean;
    attachments?: Attachment[];
    createdAt?: string;
    updatedAt?: string;
}

export class ForumAnswerResult {
    status: boolean;
    message: string;
    forumAnswer?: ForumAnswer;
}

export class ForumAnswerListResult {
    status: boolean;
    message: string;
    forumAnswers?: ForumAnswer[];
}

export class Grade {
    id: string;
    name: string;
    description?: string;
    form: Form;
    responses?: Response[];
    recommendations?: Recommendation[];
    questions?: Question[];
    min: number;
    max: number;
    minInclusive?: boolean;
    maxInclusive?: boolean;
    attachments?: Attachment[];
    createdAt: string;
    updatedAt: string;
}

export class GradeResult {
    status: boolean;
    message: string;
    grade?: Grade;
}

export class GradeListResult {
    status: boolean;
    message: string;
    grades?: Grade[];
}

export class Question {
    id: string;
    questionNumber: number;
    question: string;
    weight?: number;
    instruction?: string;
    questionType: QuestionType;
    form: Form;
    grade: Grade;
    answers?: Answer[];
    attachments?: Attachment[];
    createdAt?: string;
    updatedAt?: string;
}

export class QuestionResult {
    status: boolean;
    message: string;
    question?: Question;
}

export class QuestionListResult {
    status: boolean;
    message: string;
    questions?: Question[];
}

export class Recommendation {
    id: string;
    content: string;
    attachments?: Attachment[];
    grade: Grade;
    createdAt?: string;
    updatedAt?: string;
}

export class RecommendationResult {
    status: boolean;
    message: string;
    recommendation?: Recommendation;
}

export class RecommendationListResult {
    status: boolean;
    message: string;
    recommendations?: Recommendation[];
}

export class Response {
    id: string;
    author: User;
    form: Form;
    answers?: Answer[];
    grade?: Grade;
    attachments?: Attachment[];
    state: State;
    createdAt: string;
    updatedAt: string;
}

export class ResponseResult {
    status: boolean;
    message: string;
    response?: Response;
}

export class ResponseListResult {
    status: boolean;
    message: string;
    responses?: Response[];
}

export abstract class ISubscription {
    abstract version(): string | Promise<string>;
}

export class User {
    id: string;
    email: string;
    displayName?: string;
    phoneNumber?: string;
    emailVerified: boolean;
    disabled: boolean;
    avator?: Attachment;
    role: Role;
    forms: Form[];
    responses: Response[];
    createdAt: string;
    updatedAt: string;
}

export class AuthResult {
    token?: string;
    error: boolean;
    message: string;
    user?: User;
}

export class SignOutResult {
    status?: boolean;
    message?: string;
}

export type Upload = any;
