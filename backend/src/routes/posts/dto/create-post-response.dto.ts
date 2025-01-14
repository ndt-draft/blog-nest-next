type Category = {
  id: number;
  name: string;
};

export class CreatePostResponseDto {
  id: number;
  title: string;
  content: string;
  categories: Category[];
  user: {
    id: number;
    name: string;
    email: string;
  };
  user_id: number;
  created_at: Date;
  updated_at: Date;
}
