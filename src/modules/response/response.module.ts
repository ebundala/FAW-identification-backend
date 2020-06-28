import { Module } from '@nestjs/common';
import { ResponseResolver } from './response.resolver';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { ResponseService } from './response-service';
import { QueryHelperModule } from '../query-helper/query-helper.module';

@Module({
  imports:[PrismaClientModule,QueryHelperModule],
  providers: [ResponseResolver,ResponseService]
})
export class ResponseModule {}
