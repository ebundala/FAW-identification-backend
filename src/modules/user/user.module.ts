import { HttpModule, Module } from '@nestjs/common';
import { MailModule } from '../mail/mail.module';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { QueryHelperModule } from '../query-helper/query-helper.module';
import { UserService } from './user-service';
import { UsersResolver } from './user.resolver';


@Module({
  imports: [HttpModule, PrismaClientModule, QueryHelperModule, MailModule],
  providers: [UsersResolver, UserService],
})
export class UserModule { }
