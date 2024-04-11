import { Injectable, NotFoundException } from '@nestjs/common';
import { VideoGame, VideoGameConnection } from './models/video-game.model';
import { VIDEO_GAMES_SEED } from '../data/video-games.seed';

type queryType = {
  limit?: number,
  offset?: number,
  title?: string,
  yearReleased?: number,
  genre?: string,
  publisher?: string,
  maxPrice?: number,
  minPrice?: number,
  platform?: string
}

@Injectable()
export class VideoGamesService {
  private videoGames: VideoGame[] = VIDEO_GAMES_SEED;

  async findAll({ limit, offset, title, yearReleased, genre, publisher, maxPrice, minPrice, platform }: queryType): Promise<VideoGameConnection> {
    // Apply filters
    const filteredGames = this._filterGames({ title, yearReleased, genre, publisher, maxPrice, minPrice, platform });

    // Apply pagination
    const effectiveOffset = offset || 0;
    const startIndex = effectiveOffset;
    const endIndex = limit ? Math.min(startIndex + limit, filteredGames.length) : filteredGames.length;
    const paginatedGames = filteredGames.slice(startIndex, endIndex);

    // Calculate pagination metadata
    const totalCount = filteredGames.length; // Consider the total count before filtering
    const totalPages = limit ? Math.ceil(filteredGames.length / limit) : 1;
    const currentPage = effectiveOffset + 1;

    // Return the paginated result along with pagination metadata
    return {
      games: paginatedGames,
      totalCount,
      totalPages,
      currentPage
    };
  }

  async count(): Promise<number> {
    return await this.videoGames.length;
  }

  findOne(id: string): VideoGame {
    const game = this.videoGames.find(game => game.id === id);
    if (!game) {
      throw new NotFoundException(`Game with ID "${id}" not found`);
    }
    return game;
  }

  create(gameData: Omit<VideoGame, 'id'>): VideoGame {
    const newGame = {
      id: (this.videoGames.length + 1).toString(),
      ...gameData,
    };
    this.videoGames.push(newGame);
    return newGame;
  }

  update(id: string, gameData: Partial<VideoGame>): VideoGame {
    const gameIndex = this.videoGames.findIndex(game => game.id === id);
    if (gameIndex === -1) {
      throw new NotFoundException(`Game with ID "${id}" not found`);
    }
    const updatedGame = { ...this.videoGames[gameIndex], ...gameData };
    this.videoGames[gameIndex] = updatedGame;
    return updatedGame;
  }

  delete(id: string): boolean {
    const gameIndex = this.videoGames.findIndex(game => game.id === id);
    if (gameIndex === -1) {
      throw new NotFoundException(`Game with ID "${id}" not found`);
    }
    this.videoGames.splice(gameIndex, 1);
    return true;
  }

  private _filterGames({ title, yearReleased, genre, publisher, maxPrice, minPrice, platform }: queryType): VideoGame[] {
    let matchedGames = this.videoGames.filter(game => {
      let match = true;
      if (title && !game.title.toLowerCase().includes(title.toLowerCase())) {
        match = false;
      }
      if (yearReleased && game.yearReleased !== yearReleased) {
        match = false;
      }
      if (genre && game.genre.toLowerCase() !== genre.toLowerCase()) {
        match = false;
      }
      if (publisher && game.publisher.toLowerCase() !== publisher.toLowerCase()) {
        match = false;
      }
      if (minPrice !== undefined && game.price < minPrice) {
        match = false;
      }
      if (maxPrice !== undefined && game.price > maxPrice) {
        match = false;
      }
      if (platform && game.platform.toLowerCase() !== platform.toLowerCase()) {
        match = false;
      }
      return match;
    });


    return matchedGames
  }
}
