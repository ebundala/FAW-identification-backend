import { Module } from '@nestjs/common';
import { FormService } from './form-service';
import { FormResolver } from './form.resolver';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';

@Module({
    imports:[PrismaClientModule],
    providers:[FormService, FormResolver]
})
export class FormModule {}
