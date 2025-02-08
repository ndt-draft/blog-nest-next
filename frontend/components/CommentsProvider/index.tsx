import { CommentCreateParams, createComment, fetchComments } from "@/api";
import { Comment } from "@/types/comment";
import React, { useCallback, useContext, useEffect, useState } from "react";
import CommentForm from "../CommentForm";
import CommentList from "../CommentList";

type CommentsContextType = {
  postId: number;
  commentParentId: string | null;
  comments: Comment[];
  onCreateComment: (params: CommentCreateParams) => void | Promise<void>;
  setCommentParentId: React.Dispatch<React.SetStateAction<string | null>>;
};

const CommentsContext = React.createContext<CommentsContextType | null>(null);

export const useComments = () => {
  const context = useContext(CommentsContext);

  if (!context) {
    throw new Error("useComments must be used within a CommentsProvider");
  }

  return context;
};

type Props = {
  postId: number;
};

const CommentsProvider = ({ postId }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentParentId, setCommentParentId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const response = await fetchComments({ postId });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    setComments(result?.comments);
  }, [postId]);

  const onCreateComment = async (commentCreateParams: CommentCreateParams) => {
    const res = await createComment(commentCreateParams);

    if (!res.ok) {
      return;
    }

    // close comment form reply
    setCommentParentId(null);

    // refetch comments again for rightful order
    fetchData().catch((e) => {
      // handle the error as needed
      console.error("An error occurred while fetching the data: ", e);
    });
  };

  useEffect(() => {
    if (!postId) {
      return;
    }

    fetchData().catch((e) => {
      // handle the error as needed
      console.error("An error occurred while fetching the data: ", e);
    });
  }, [postId, fetchData]);

  return (
    <CommentsContext.Provider
      value={{
        postId,
        comments,
        commentParentId,
        setCommentParentId,
        onCreateComment,
      }}
    >
      {!commentParentId && <CommentForm />}
      <CommentList />
    </CommentsContext.Provider>
  );
};

export default CommentsProvider;
