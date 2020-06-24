import { Module } from '@nestjs/common';
import { AnswerResolver } from './answer.resolver';
import { AnswerService } from './answer-service';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';

@Module({
  imports:[PrismaClientModule],
  providers: [AnswerResolver,AnswerService]
})
export class AnswerModule {}
