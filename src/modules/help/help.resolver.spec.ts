import { Test, TestingModule } from '@nestjs/testing';
import { HelpResolver } from './help.resolver';

describe('HelpResolver', () => {
  let resolver: HelpResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelpResolver],
    }).compile();

    resolver = module.get<HelpResolver>(HelpResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
