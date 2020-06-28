import { Module } from '@nestjs/common';
import { GradeResolver } from './grade.resolver';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { GradeService } from './grade-service';
import { QueryHelperModule } from '../query-helper/query-helper.module';

@Module({
  imports:[PrismaClientModule,QueryHelperModule],
  providers: [GradeResolver,GradeService]
})
export class GradeModule {}
