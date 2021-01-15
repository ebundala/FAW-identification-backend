import { Module } from '@nestjs/common';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { QueryHelperModule } from '../query-helper/query-helper.module';
import { RecommendationService } from './recommendation-service';
import { RecommendationResolver } from './recommendation.resolver';

@Module({
  imports: [PrismaClientModule, QueryHelperModule],
  providers: [RecommendationResolver, RecommendationService]
})
export class RecommendationModule { }

