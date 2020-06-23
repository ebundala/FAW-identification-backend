import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AnswerService {
    constructor(private readonly prisma: PrismaClient){}
}
