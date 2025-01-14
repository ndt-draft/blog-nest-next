import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';
import { DatabaseModule } from 'src/mongo/database.module';
import { postsProviders } from './schemas/post.providers';
import { Category } from '../categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Category]), DatabaseModule],
  controllers: [PostsController],
  providers: [PostsService, ...postsProviders],
  exports: [PostsService],
})
export class PostsModule {}
