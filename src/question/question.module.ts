import { Module } from '@nestjs/common';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';
import { QuestionService } from './question-service';
import { QuestionResolver } from './question.resolver';

@Module({
    imports:[PrismaClientModule],
    providers:[QuestionService, QuestionResolver]
})
export class QuestionModule {}
