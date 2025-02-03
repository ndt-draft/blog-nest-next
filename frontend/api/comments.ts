import { apiFetch } from "./fetch";

type CommentsParams = {
  postId?: number;
};

export const fetchComments = (params?: CommentsParams) => {
  return apiFetch(`/comments`, { params });
};
