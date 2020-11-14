import { SendGridModule } from '@anchan828/nest-sendgrid/dist/sendgrid.module';
import { Module } from '@nestjs/common';
import dotenv from 'dotenv';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { MailService } from './mail.service';
const config = dotenv.config();
//console.log(config.parsed.SENDGRID_API_KEY)

@Module({
  imports: [
    PrismaClientModule,
    SendGridModule.forRoot({ apikey: config.parsed.SENDGRID_API_KEY })],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule { }
