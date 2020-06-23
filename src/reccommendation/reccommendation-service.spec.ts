import { Test, TestingModule } from '@nestjs/testing';
import { ReccommendationService } from './reccommendation-service';

describe('ReccommendationService', () => {
  let provider: ReccommendationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReccommendationService],
    }).compile();

    provider = module.get<ReccommendationService>(ReccommendationService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
