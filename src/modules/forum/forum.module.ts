import { Module } from '@nestjs/common';
import { MailModule } from '../mail/mail.module';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { QueryHelperModule } from '../query-helper/query-helper.module';
import { ForumResolver } from './forum.resolver';
import { ForumService } from './forum.service';

@Module({
  imports: [PrismaClientModule, QueryHelperModule, MailModule],
  providers: [ForumService, ForumResolver]
})
export class ForumModule { }
