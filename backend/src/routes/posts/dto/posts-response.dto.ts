import { CreatePostResponseDto } from './create-post-response.dto';

export class PostsResponseDto {
  posts: CreatePostResponseDto[];
  pagination: {
    limit: number;
    page: number;
    total: number;
  };
}
