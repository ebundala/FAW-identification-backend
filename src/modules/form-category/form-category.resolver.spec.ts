import { Test, TestingModule } from '@nestjs/testing';
import { FormCategoryResolver } from './form-category.resolver';

describe('FormCategoryResolver', () => {
  let resolver: FormCategoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormCategoryResolver],
    }).compile();

    resolver = module.get<FormCategoryResolver>(FormCategoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
