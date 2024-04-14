import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VideoGamesService } from './video-games.service';
import { VideoGame, VideoGameConnection } from './models/video-game.model';
import { CreateVideoGameInput } from './dto/create-video-game.input';
import { UpdateVideoGameInput } from './dto/update-video-game.input';
import { platform } from 'os';

@Resolver(of => 'VideoGame')
export class VideoGamesResolver {
  constructor(private videoGamesService: VideoGamesService) {}

  @Query()
  async videoGames(
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
    @Args('offset', { type: () => Int, nullable: true }) offset?: number,
    @Args('title', { nullable: true }) title?: string,
    @Args('yearReleased', { nullable: true }) yearReleased?: number,
    @Args('genre', { nullable: true }) genre?: string,
    @Args('publisher', { nullable: true }) publisher?: string,
    @Args('maxPrice', { nullable: true }) maxPrice?: number,
    @Args('minPrice', {nullable: true}) minPrice?: number,
    @Args('platform', {nullable: true}) platform?: string

  ): Promise<VideoGameConnection> {
    const res = await this.videoGamesService.findAll({ limit, offset, title, yearReleased, genre, publisher, maxPrice, minPrice, platform});
    
    return { ...res };
  }
  
  @Query(returns => 'VideoGame')
  async videoGame(@Args('id', { type: () => String }) id: string): Promise<VideoGame> {
    return await this.videoGamesService.findOne(id);
  }

  @Mutation(returns => 'VideoGame')
  async createVideoGame(
    @Args('createVideoGameInput') createVideoGameInput: CreateVideoGameInput,
  ): Promise<VideoGame> {
    return await this.videoGamesService.create(createVideoGameInput);
  }

  @Mutation(returns => 'VideoGame')
  async updateVideoGame(
    @Args('updateVideoGameInput') updateVideoGameInput: UpdateVideoGameInput,
  ): Promise<VideoGame> {
    return await this.videoGamesService.update(updateVideoGameInput.id, updateVideoGameInput);
  }

  @Mutation(returns => 'VideoGame')
  async deleteVideoGame(@Args('id', { type: () => String }) id: string): Promise<VideoGame> {
    return await this.videoGamesService.delete(id);
  }
}
