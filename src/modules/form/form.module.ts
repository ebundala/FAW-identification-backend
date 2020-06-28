import { Module } from '@nestjs/common';
import { FormService } from './form-service';
import { FormResolver } from './form.resolver';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { QueryHelperModule } from '../query-helper/query-helper.module';

@Module({
    imports:[PrismaClientModule,QueryHelperModule],
    providers:[FormService, FormResolver]
})
export class FormModule {}
