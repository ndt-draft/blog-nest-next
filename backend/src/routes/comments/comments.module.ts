import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { DatabaseModule } from 'src/mongo/database.module';
import { commentsProviders } from './schemas/comment.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CommentsController],
  providers: [CommentsService, ...commentsProviders],
})
export class CommentsModule {}
