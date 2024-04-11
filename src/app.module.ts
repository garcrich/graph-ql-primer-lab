import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphqlModule } from './graphql/graphql.module';
import { VideoGamesModule } from './video-games/video-games.module';

@Module({
  imports: [GraphqlModule, VideoGamesModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
