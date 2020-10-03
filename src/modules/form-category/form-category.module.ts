import { Module } from '@nestjs/common';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { QueryHelperModule } from '../query-helper/query-helper.module';
import { FormCategoryService } from './form-category.service';
import { FormCategoryResolver } from './form-category.resolver';

@Module({
  imports:[PrismaClientModule,QueryHelperModule],
  providers: [FormCategoryResolver,FormCategoryService]
})
export class FormCategoryModule {}
