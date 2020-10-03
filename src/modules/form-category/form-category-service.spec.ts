import { Test, TestingModule } from '@nestjs/testing';
import { FormCategoryService } from './form-category.service';

describe('FormCategoryService', () => {
  let provider: FormCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormCategoryService],
    }).compile();

    provider = module.get<FormCategoryService>(FormCategoryService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
