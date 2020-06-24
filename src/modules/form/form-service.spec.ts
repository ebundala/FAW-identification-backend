import { Test, TestingModule } from '@nestjs/testing';
import { FormService } from './form-service';

describe('FormService', () => {
  let provider: FormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormService],
    }).compile();

    provider = module.get<FormService>(FormService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
