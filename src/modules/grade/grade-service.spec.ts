import { Test, TestingModule } from '@nestjs/testing';
import { GradeService } from './grade-service';

describe('GradeService', () => {
  let provider: GradeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GradeService],
    }).compile();

    provider = module.get<GradeService>(GradeService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
