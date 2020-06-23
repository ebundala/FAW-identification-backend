import { Module } from '@nestjs/common';
import { ResponseResolver } from './response.resolver';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';
import { ResponseService } from './response-service';

@Module({
  imports:[PrismaClientModule],
  providers: [ResponseResolver,ResponseService]
})
export class ResponseModule {}
