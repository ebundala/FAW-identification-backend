
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum OrderByInput {
    asc = "asc",
    desc = "desc"
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

export class FileUpdateDataInput {
    path?: string;
    filename?: string;
    mimetype?: string;
    encoding?: string;
}

export class FileWhereUniqueInput {
    id: string;
}

export class FileUpdateInput {
    where?: FileWhereUniqueInput;
    update?: FileUpdateDataInput;
}

export class FileOrderBy {
    id?: OrderByInput;
    path?: OrderByInput;
    filename?: OrderByInput;
    mimetype?: OrderByInput;
    encoding?: OrderByInput;
}

export class FileWhereQuery {
    id?: string;
    path?: string;
    filename?: string;
    mimetype?: string;
    encoding?: string;
}

export class FileQueryInput {
    take?: number;
    skip?: number;
    where?: FileWhereQuery;
    orderBy?: FileOrderBy;
    cursor?: FileWhereUniqueInput;
}

export class FormCreateInput {
    title: string;
    description?: string;
    state?: State;
}

export class FormUpdateDataInput {
    title?: string;
    description?: string;
    state?: State;
}

export class FormWhereUniqueInput {
    id: string;
}

export class FormUpdateInput {
    where?: FormWhereUniqueInput;
    update?: FormUpdateDataInput;
}

export class FormOrderBy {
    title?: OrderByInput;
    createdAt?: OrderByInput;
    updatedAt?: OrderByInput;
}

export class FormWhereQuery {
    id?: string;
    authorId?: string;
    state?: State;
}

export class FormQueryInput {
    take?: number;
    skip?: number;
    where?: FormWhereQuery;
    orderBy?: FormOrderBy;
    cursor?: FormWhereUniqueInput;
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
}

export class QuestionUpdateDataInput {
    questionNumber?: number;
    question?: string;
    weight?: number;
    instruction?: string;
    questionType?: QuestionType;
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
}

export class QustionQueryInput {
    take?: number;
    skip?: number;
    where?: QuestionWhereQuery;
    orderBy?: QuestionOrderBy;
    cursor?: QuestionWhereUniqueInput;
}

export class ReccommendationCreateInput {
    content: string;
    grade: GradeWhereUniqueInput;
}

export class ReccommendationUpdateDataInput {
    content?: string;
    grade?: GradeWhereUniqueInput;
}

export class ReccommendationWhereUniqueInput {
    id: string;
}

export class ReccommendationUpdateInput {
    where?: ReccommendationWhereUniqueInput;
    update?: ReccommendationUpdateDataInput;
}

export class ReccommendationOrderBy {
    id?: OrderByInput;
    content?: OrderByInput;
    grade?: OrderByInput;
    createdAt?: OrderByInput;
    updatedAt?: OrderByInput;
}

export class ReccommendationWhereQuery {
    id?: string;
    content?: string;
    grade: GradeWhereUniqueInput;
}

export class ReccommendationQueryInput {
    take?: number;
    skip?: number;
    where?: ReccommendationWhereQuery;
    orderBy?: ReccommendationOrderBy;
    cursor?: ReccommendationWhereUniqueInput;
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
    author?: UserWhereUniqueInput;
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
    id?: number;
    email?: string;
}

export class Answer {
    id: string;
    response: Response;
    question: Question;
    attachments?: File[];
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

    abstract createFile(data: Upload): FileResult | Promise<FileResult>;

    abstract updateFile(data: FileUpdateInput): FileResult | Promise<FileResult>;

    abstract deleteFile(where: FileWhereUniqueInput): FileResult | Promise<FileResult>;

    abstract createForm(data: FormCreateInput): FormResult | Promise<FormResult>;

    abstract updateForm(data: FormUpdateInput): FormResult | Promise<FormResult>;

    abstract deleteForm(where: FormWhereUniqueInput): FormResult | Promise<FormResult>;

    abstract createGrade(data: GradeCreateInput): GradeResult | Promise<GradeResult>;

    abstract updateGrade(data: GradeUpdateInput): GradeResult | Promise<GradeResult>;

    abstract deleteGrade(where: GradeWhereUniqueInput): GradeResult | Promise<GradeResult>;

    abstract createQuestion(data?: QuestionCreateInput): QuestionResult | Promise<QuestionResult>;

    abstract updateQuestion(data?: QuestionUpdateInput): QuestionResult | Promise<QuestionResult>;

    abstract deleteQuestion(where?: QuestionWhereUniqueInput): QuestionResult | Promise<QuestionResult>;

    abstract createReccommendation(data: ReccommendationCreateInput): ReccommendationResult | Promise<ReccommendationResult>;

    abstract updateReccommendation(data: ReccommendationUpdateInput): ReccommendationResult | Promise<ReccommendationResult>;

    abstract deleteReccommendation(where: ReccommendationWhereUniqueInput): ReccommendationResult | Promise<ReccommendationResult>;

    abstract createResponse(data?: ResponseCreateInput): ResponseResult | Promise<ResponseResult>;

    abstract updateResponse(data?: ResponseUpdateInput): ResponseResult | Promise<ResponseResult>;

    abstract deleteResponse(where?: ResponseWhereUniqueInput): ResponseResult | Promise<ResponseResult>;

    abstract version(): string | Promise<string>;

    abstract signup(credentials?: AuthInput): AuthResult | Promise<AuthResult>;

    abstract signin(credentials?: AuthInput): AuthResult | Promise<AuthResult>;

    abstract signout(): SignOutResult | Promise<SignOutResult>;
}

export class File {
    id: string;
    path: string;
    filename: string;
    mimetype: string;
    encoding: string;
}

export class FileResult {
    status: boolean;
    message: string;
    file?: File;
}

export class FileListResult {
    status: boolean;
    message: string;
    files?: File[];
}

export class Form {
    id: string;
    title: string;
    description?: string;
    state: State;
    author: User;
    questions?: Question[];
    grades?: Grade[];
    responses?: Response[];
    attachments?: File[];
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

    abstract version(): string | Promise<string>;
}

export class Grade {
    id: string;
    name: string;
    description?: string;
    form: Form;
    responses?: Response[];
    recommendations?: Reccommendation[];
    min: number;
    max: number;
    minInclusive?: boolean;
    maxInclusive?: boolean;
    attachments?: File[];
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
    answers?: Answer[];
    attachments?: File[];
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

export class Reccommendation {
    id: string;
    content: string;
    attachments?: File[];
    grade: Grade;
    createdAt?: string;
    updatedAt?: string;
}

export class ReccommendationResult {
    status: boolean;
    message: string;
    reccommendation?: Reccommendation;
}

export class ReccommendationListResult {
    status: boolean;
    message: string;
    reccommendations?: Reccommendation[];
}

export class Response {
    id: string;
    author: User;
    form: Form;
    answers?: Answer[];
    grade?: Grade;
    attachments?: File[];
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
    avator?: File;
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
