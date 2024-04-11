import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class UpdateVideoGameInput {
  @Field(() => String)
  id: string;

  @Field({ nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  yearReleased?: number;

  @Field({ nullable: true })
  genre?: string;

  @Field({ nullable: true })
  publisher?: string;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field({ nullable: true })
  platform?: string;
}
