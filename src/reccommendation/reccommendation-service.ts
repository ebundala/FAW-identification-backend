import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ReccommendationService {
    constructor(private readonly prisma: PrismaClient){}
}
