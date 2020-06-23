import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AttachmentService {
    constructor(private readonly prisma: PrismaClient){}
}
