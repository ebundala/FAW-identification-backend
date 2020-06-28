import { Module, HttpModule, HttpService } from '@nestjs/common';
import { UsersResolver } from './user.resolver';
import { UserService } from './user-service';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { QueryHelperModule } from '../query-helper/query-helper.module';


@Module({
  imports: [HttpModule,PrismaClientModule,QueryHelperModule],
  providers: [UsersResolver,UserService],
})
export class UserModule {}
