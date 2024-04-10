import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreatePostInputDTO {
    @Field()
    @IsNotEmpty({ message: 'Title must not be empty.'})
    @IsString({ message: 'Title msut be a string.'})
    @MaxLength(100, { message: 'Title must not exceed 100 characters.'})
    title: string;

    @Field()
    @IsNotEmpty({ message: 'Content must not be empty.'})
    @IsString({ message: 'Content must be a string.'})
    content: string;

    @Field()
    @IsNotEmpty({ message: 'Author must not be empty.'})
    @IsString({ message: 'Author must be a string.'})
    author: string;
}