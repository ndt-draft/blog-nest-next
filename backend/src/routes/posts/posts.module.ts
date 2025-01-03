import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';
import { DatabaseModule } from 'src/mongo/database.module';
import { postsProviders } from 'src/mongo/schemas/post.providers';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User]), DatabaseModule],
  controllers: [PostsController],
  providers: [PostsService, ...postsProviders],
})
export class PostsModule {}
