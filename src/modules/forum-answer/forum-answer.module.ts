import { Module } from '@nestjs/common';
import { MailModule } from '../mail/mail.module';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { QueryHelperModule } from '../query-helper/query-helper.module';
import { ForumAnswerResolver } from './forum-answer.resolver';
import { ForumAnswerService } from './forum-answer.service';

@Module({
  imports: [PrismaClientModule, QueryHelperModule, MailModule],
  providers: [ForumAnswerService, ForumAnswerResolver]
})
export class ForumAnswerModule { }
