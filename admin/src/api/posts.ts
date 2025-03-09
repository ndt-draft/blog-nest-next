import { apiFetch } from "./fetch";

export async function getPosts() {
  return apiFetch("/posts", { method: "GET" });
}

export async function getPost(id: string) {
  return apiFetch(`/posts/${id}`, { method: "GET" });
}
