import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question-service';

describe('QuestionService', () => {
  let provider: QuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionService],
    }).compile();

    provider = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
