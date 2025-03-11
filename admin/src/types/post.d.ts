import Category from "./category";

export type Post = {
  id: number;
  title: string;
  content: string;
  categories: Category[];
};

export type CreatePostDto = Partial<Omit<Post, "id">>;
export type UpdatePostDto = CreatePostDto;
