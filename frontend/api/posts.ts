import { apiFetch } from "./fetch";

type PostsParams = { category?: string };

export const fetchPosts = (params?: PostsParams) => {
  return apiFetch("/posts", { params });
};

export const fetchPostById = (id?: string) => {
  if (!id) {
    return Promise.reject(new Error("Post ID is required"));
  }
  return apiFetch(`/posts/${id}`);
};
