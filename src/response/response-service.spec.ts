import { Test, TestingModule } from '@nestjs/testing';
import { ResponseService } from './response-service';

describe('ResponseService', () => {
  let provider: ResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseService],
    }).compile();

    provider = module.get<ResponseService>(ResponseService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
