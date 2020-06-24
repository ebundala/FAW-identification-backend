import { Test, TestingModule } from '@nestjs/testing';
import { AttachmentService } from './attachment-service';

describe('AttachmentService', () => {
  let provider: AttachmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttachmentService],
    }).compile();

    provider = module.get<AttachmentService>(AttachmentService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
