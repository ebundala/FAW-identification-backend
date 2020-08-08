import { Test, TestingModule } from '@nestjs/testing';
import { ForumAnswerResolver } from './forum-answer.resolver';

describe('ForumAnswerResolver', () => {
  let resolver: ForumAnswerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForumAnswerResolver],
    }).compile();

    resolver = module.get<ForumAnswerResolver>(ForumAnswerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
