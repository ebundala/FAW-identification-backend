import { Test, TestingModule } from '@nestjs/testing';
import { RecommendationResolver } from './recommendation.resolver';

describe('RecommendationResolver', () => {
  let resolver: RecommendationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecommendationResolver],
    }).compile();

    resolver = module.get<RecommendationResolver>(RecommendationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
