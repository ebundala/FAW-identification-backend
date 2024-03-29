import { Test, TestingModule } from '@nestjs/testing';
import { GradeResolver } from './grade.resolver';

describe('GradeResolver', () => {
  let resolver: GradeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GradeResolver],
    }).compile();

    resolver = module.get<GradeResolver>(GradeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
