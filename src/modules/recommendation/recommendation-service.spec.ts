import { Test, TestingModule } from '@nestjs/testing';
import { RecommendationService } from './recommendation-service';

describe('ReccommendationService', () => {
  let provider: RecommendationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecommendationService],
    }).compile();

    provider = module.get<RecommendationService>(RecommendationService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
