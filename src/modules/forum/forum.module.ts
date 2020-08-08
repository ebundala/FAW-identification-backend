import { Module } from '@nestjs/common';
import { ForumService } from './forum.service';
import { ForumResolver } from './forum.resolver';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { QueryHelperModule } from '../query-helper/query-helper.module';

@Module({
  imports:[PrismaClientModule,QueryHelperModule],
  providers: [ForumService, ForumResolver]
})
export class ForumModule {}
