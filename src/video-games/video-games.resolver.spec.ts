import { Test, TestingModule } from '@nestjs/testing';
import { VideoGamesResolver } from './video-games.resolver';

describe('VideoGamesResolver', () => {
  let resolver: VideoGamesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoGamesResolver],
    }).compile();

    resolver = module.get<VideoGamesResolver>(VideoGamesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
