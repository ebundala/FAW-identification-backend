import { Module } from '@nestjs/common';
import { RecommendationResolver } from './recommendation.resolver';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { RecommendationService } from './recommendation-service';
import { QueryHelperModule } from '../query-helper/query-helper.module';

@Module({
  imports:[PrismaClientModule,QueryHelperModule],
  providers: [RecommendationResolver,RecommendationService]
})
export class RecommendationModule {}

