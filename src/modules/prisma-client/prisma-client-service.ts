
import { onDeleteArgs, PrismaDelete, PrismaSelect } from '@paljs/plugins';
import { Prisma,PrismaClient as _PrismaClient } from '@prisma/client';

export class PrismaClient extends _PrismaClient {
    constructor(options?: Prisma.PrismaClientOptions) {
        super(options);
    }

    async onDelete(args: onDeleteArgs) {
        const prismaDelete = new PrismaDelete(this);
        await prismaDelete.onDelete(args);
    }

    public getSelection(info): PrismaSelect {
        return new PrismaSelect(info);
    }
}

export const PrismaClientService = {
    provide: PrismaClient,
    useValue: new PrismaClient({ log: ['query'] })
}






