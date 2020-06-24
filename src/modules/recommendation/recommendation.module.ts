import { Module } from '@nestjs/common';
import { RecommendationResolver } from './recommendation.resolver';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { RecommendationService } from './recommendation-service';

@Module({
  imports:[PrismaClientModule],
  providers: [RecommendationResolver,RecommendationService]
})
export class RecommendationModule {}

