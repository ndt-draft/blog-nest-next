type Category = {
  id: number;
  name: string;
};

type User = {
  id: number;
  name: string;
  email: string;
};

export class CreatePostResponseDto {
  id: number;
  title: string;
  content: string;
  categories: Category[];
  user: User;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}
