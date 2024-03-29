import { Module } from '@nestjs/common';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { QueryHelperModule } from '../query-helper/query-helper.module';
import { ResponseService } from './response-service';
import { ResponseResolver } from './response.resolver';

@Module({
  imports: [PrismaClientModule, QueryHelperModule],
  providers: [ResponseResolver, ResponseService]
})
export class ResponseModule { }
