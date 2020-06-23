import { Module } from '@nestjs/common';
import { GradeResolver } from './grade.resolver';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';
import { GradeService } from './grade-service';

@Module({
  imports:[PrismaClientModule],
  providers: [GradeResolver,GradeService]
})
export class GradeModule {}
