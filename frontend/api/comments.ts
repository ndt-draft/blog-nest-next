import { apiFetch } from "./fetch";

type CommentsParams = {
  postId?: number;
};

export type CommentCreateParams = {
  postId: number;
  content: string;
  parentId: string | null;
};

export const fetchComments = (params?: CommentsParams) => {
  return apiFetch(`/comments`, { params });
};

export const createComment = (params?: CommentCreateParams) => {
  return apiFetch(`/comments`, {
    method: "POST",
    body: JSON.stringify(params),
  });
};
