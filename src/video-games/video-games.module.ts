import { Module } from '@nestjs/common';
import { VideoGamesService } from './video-games.service';
import { VideoGamesResolver } from './video-games.resolver';

@Module({
  providers: [VideoGamesService, VideoGamesResolver]
})
export class VideoGamesModule {}
