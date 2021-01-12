import { Module } from '@nestjs/common';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { QueryHelperModule } from '../query-helper/query-helper.module';
import { HelpResolver } from './help.resolver';
import { HelpService } from './help.service';

@Module({
  imports: [PrismaClientModule, QueryHelperModule],
  providers: [HelpService, HelpResolver]
})
export class HelpModule { }
