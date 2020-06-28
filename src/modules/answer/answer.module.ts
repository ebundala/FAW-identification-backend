import { Module } from '@nestjs/common';
import { AnswerResolver } from './answer.resolver';
import { AnswerService } from './answer-service';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { QueryHelperModule } from '../query-helper/query-helper.module';

@Module({
  imports:[PrismaClientModule,QueryHelperModule],
  providers: [AnswerResolver,AnswerService]
})
export class AnswerModule {}
