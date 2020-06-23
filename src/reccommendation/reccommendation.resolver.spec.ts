import { Test, TestingModule } from '@nestjs/testing';
import { ReccommendationResolver } from './reccommendation.resolver';

describe('ReccommendationResolver', () => {
  let resolver: ReccommendationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReccommendationResolver],
    }).compile();

    resolver = module.get<ReccommendationResolver>(ReccommendationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
