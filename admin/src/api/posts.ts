import { apiFetch } from "./fetch";
import { CreatePostDto, UpdatePostDto, PostParams } from "@/types/post";

export async function getPosts(params: PostParams) {
  const { page = 0, limit = 10, s, category } = params;
  let query = `/posts?page=${page}&limit=${limit}`;
  if (s) query += `&s=${s}`;
  if (category !== undefined) query += `&category=${category}`;
  return apiFetch(query, { method: "GET" });
}

export async function getPost(id: string) {
  return apiFetch(`/posts/${id}`, { method: "GET" });
}

export async function createPost(data: CreatePostDto) {
  return apiFetch("/posts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function updatePost(id: string, data: UpdatePostDto) {
  return apiFetch(`/posts/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
