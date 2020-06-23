
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

export class AuthInput {
    email: string;
    password: string;
    displayName?: string;
}

export class UserWhereUniqueInput {
    id?: number;
    email?: string;
    uid?: string;
}

export class Answer {
    id: string;
}

export class File {
    id: string;
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

export abstract class IMutation {
    abstract createForm(data: FormCreateInput): FormResult | Promise<FormResult>;

    abstract updateForm(data: FormUpdateInput): FormResult | Promise<FormResult>;

    abstract deleteForm(where: FormWhereUniqueInput): FormResult | Promise<FormResult>;

    abstract version(): string | Promise<string>;

    abstract signup(credentials?: AuthInput): AuthResult | Promise<AuthResult>;

    abstract signin(credentials?: AuthInput): AuthResult | Promise<AuthResult>;

    abstract signout(): SignOutResult | Promise<SignOutResult>;
}

export abstract class IQuery {
    abstract forms(where?: FormQueryInput): FormListResult | Promise<FormListResult>;

    abstract version(): string | Promise<string>;

    abstract me(): User | Promise<User>;
}

export class Grade {
    id: string;
}

export class Question {
    id: string;
}

export class Reccommendation {
    id: string;
}

export class Response {
    id: string;
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
