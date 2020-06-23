import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ResponseService {
    constructor(private readonly prisma: PrismaClient){}
}
