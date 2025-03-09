import { apiFetch } from "./fetch";

export function getPosts() {
  return apiFetch("/posts", { method: "GET" });
}

export function getPost(id: string) {
  return apiFetch(`/posts/${id}`, { method: "GET" });
}
