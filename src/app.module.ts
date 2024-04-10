import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphqlModule } from './graphql/graphql.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [GraphqlModule, PostsModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
