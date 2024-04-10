import { Injectable } from '@nestjs/common';
import { Post } from './models/post.model';
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class PostsService {
    private posts: Post[] = [];

    findAll(): Post[] {
        return this.posts;
    }

    findOneById(id: string): Post {
        return this.posts.find(post => post.id === id) 
    }

    create(createPostsDto: any): Post {
        const newPost: Post = {
            ...createPostsDto,
            id: uuidv4(),
            createdAt: new Date()
        }
        this.posts.push(newPost)
        return newPost;
    };

    update(id:string, updatePostDto: any): Post {
        const postIndex = this.posts.findIndex(post => 
            post.id === id
        )

        if (postIndex === -1) return null;

        this.posts[postIndex] = {
            ...this.posts[postIndex], ...updatePostDto
        }

        return this.posts[postIndex]
    }

    delete(id: string): boolean {
        const postIndex = this.posts.findIndex(post => post.id === id);
        
        if(postIndex !== -1) {
            this.posts.splice(postIndex, 1);
            return true
        }

        return false
    }

}
