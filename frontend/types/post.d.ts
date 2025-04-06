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
