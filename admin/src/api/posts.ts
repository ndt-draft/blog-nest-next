import { apiFetch } from "./fetch";
import { CreatePostDto } from "@/types/post";

export async function getPosts() {
  return apiFetch("/posts", { method: "GET" });
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
