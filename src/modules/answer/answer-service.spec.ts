import { Test, TestingModule } from '@nestjs/testing';
import { AnswerService } from './answer-service';

describe('AnswerService', () => {
  let provider: AnswerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerService],
    }).compile();

    provider = module.get<AnswerService>(AnswerService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
