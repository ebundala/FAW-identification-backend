import { Test, TestingModule } from '@nestjs/testing';
import { HelpStepService } from './help-step.service';

describe('HelpStepService', () => {
  let service: HelpStepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelpStepService],
    }).compile();

    service = module.get<HelpStepService>(HelpStepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
