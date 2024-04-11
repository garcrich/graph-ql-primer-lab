// src/video-games/dto/create-video-game.input.ts

import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateVideoGameInput {
    @Field()
    title: string;

    @Field(() => Int)
    yearReleased: number;

    @Field()
    genre: string;

    @Field()
    publisher: string;

    @Field()
    price: number

    @Field()
    platform: string;
}
