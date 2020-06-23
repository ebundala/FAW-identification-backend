import { Module } from '@nestjs/common';
import { ReccommendationResolver } from './reccommendation.resolver';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';
import { ReccommendationService } from './reccommendation-service';

@Module({
  imports:[PrismaClientModule],
  providers: [ReccommendationResolver,ReccommendationService]
})
export class ReccommendationModule {}
