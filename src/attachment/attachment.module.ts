import { Module } from '@nestjs/common';
import { AttachmentResolver } from './attachment.resolver';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';
import { AttachmentService } from './attachment-service';

@Module({
  imports:[PrismaClientModule],
  providers: [AttachmentResolver,AttachmentService]
})
export class AttachmentModule {}
