import { Comment } from '../schemas/comment.interface';

export class CommentsResponseDto {
  comments: Comment[];
  pagination: {
    limit: number;
    page: number;
    total: number;
  };
}
