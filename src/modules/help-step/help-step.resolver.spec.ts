import { Test, TestingModule } from '@nestjs/testing';
import { HelpStepResolver } from './help-step.resolver';

describe('HelpStepResolver', () => {
  let resolver: HelpStepResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelpStepResolver],
    }).compile();

    resolver = module.get<HelpStepResolver>(HelpStepResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
