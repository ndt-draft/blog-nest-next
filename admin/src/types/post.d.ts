import Category from "./category";

export type Post = {
  id: number;
  title: string;
  content: string;
  categories: Category[];
};

export type PostPagination = {
  total: number;
  page: number;
  limit: number;
};

export type CreatePostDto = Partial<Omit<Post, "id">>;
export type UpdatePostDto = CreatePostDto;

export type PostParams = {
  page?: number;
  limit?: number;
  s?: string;
  category?: number;
};
