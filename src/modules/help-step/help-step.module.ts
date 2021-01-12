import { Module } from '@nestjs/common';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { QueryHelperModule } from '../query-helper/query-helper.module';
import { HelpStepResolver } from './help-step.resolver';
import { HelpStepService } from './help-step.service';

@Module({
  imports: [PrismaClientModule, QueryHelperModule],
  providers: [HelpStepService, HelpStepResolver]
})
export class HelpStepModule {

}
