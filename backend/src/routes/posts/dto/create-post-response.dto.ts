export class CreatePostResponseDto {
  id: number;
  title: string;
  categories: number[];
  user_id: number;
  created_at: Date;
  updated_at: Date;
}
