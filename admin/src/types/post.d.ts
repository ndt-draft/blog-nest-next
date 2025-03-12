import Category from "./category";
import { User } from "./user";

export type Post = {
  id: number;
  title: string;
  content: string;
  categories: Category[];
  user: User;
  created_at: string;
  updated_at: string;
};

export type PostPagination = {
  total: number;
  page: number;
  limit: number;
};

export type CreatePostDto = Partial<
  Omit<Post, "id" | "created_at" | "updated_at" | "user">
>;
export type UpdatePostDto = CreatePostDto;

export type PostParams = {
  page?: number;
  limit?: number;
  s?: string;
  category?: number;
};
