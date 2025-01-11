import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { DatabaseModule } from 'src/mongo/database.module';
import { commentsProviders } from './schemas/comment.providers';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [DatabaseModule, PostsModule],
  controllers: [CommentsController],
  providers: [CommentsService, ...commentsProviders],
})
export class CommentsModule {}
