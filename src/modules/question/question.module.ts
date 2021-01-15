import { Module } from '@nestjs/common';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { QueryHelperModule } from '../query-helper/query-helper.module';
import { QuestionService } from './question-service';
import { QuestionResolver } from './question.resolver';

@Module({
    imports: [PrismaClientModule, QueryHelperModule],
    providers: [QuestionService, QuestionResolver]
})
export class QuestionModule { }
