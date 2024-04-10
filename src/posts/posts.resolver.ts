import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './models/post.model'
import { CreatePostInputDTO } from './dto/create-post.input';
import { UsePipes, ValidationPipe } from '@nestjs/common';
@Resolver('Post')
@UsePipes(new ValidationPipe({}))
export class PostsResolver {
    constructor(private readonly postsService: PostsService) {}

    @Query()
    async posts(): Promise<Post[]> {
        return await this.postsService.findAll()
    }

    @Query(returns => 'Post')
    async post(@Args('id') id: string): Promise<Post> {
        return await this.postsService.findOneById(id)
    }

    @Mutation(returns => 'Post')
    @UsePipes(new ValidationPipe({ transform: true}))
    async createPost(@Args('input') createPostInput: CreatePostInputDTO): Promise<Post> {
        return await this.postsService.create(createPostInput)
    }

    @Mutation(returns => 'Post')
    async updatePost(@Args('input') updatePostInput: any): Promise<Post> {
        return await this.postsService.update(updatePostInput.id, updatePostInput)
    }

    @Mutation(returns => Boolean)
    async deletePost(@Args('id') id: string): Promise<boolean> {
        return await this.postsService.delete(id)
    }

}
