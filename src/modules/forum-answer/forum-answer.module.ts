import { Module } from '@nestjs/common';
import { ForumAnswerService } from './forum-answer.service';
import { ForumAnswerResolver } from './forum-answer.resolver';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { QueryHelperModule } from '../query-helper/query-helper.module';

@Module({
  imports:[PrismaClientModule,QueryHelperModule],
  providers: [ForumAnswerService, ForumAnswerResolver]
})
export class ForumAnswerModule {}
