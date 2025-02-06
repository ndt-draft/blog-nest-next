import { Comment } from "@/types/comment";
import styles from "./CommentList.module.css";
import PageTitle from "../PageTitle";
import CommentForm from "../CommentForm";
import { CommentCreateParams } from "@/api";

type Props = {
  comments: Comment[];
  commentFormMode: string | null;
  onCreateComment: (params: CommentCreateParams) => void | Promise<void>;
  setCommentFormMode: React.Dispatch<React.SetStateAction<string | null>>;
};

const CommentList = ({
  comments,
  commentFormMode,
  onCreateComment,
  setCommentFormMode,
}: Props) => {
  const onReply =
    ({ _id }: { _id: string }) =>
    () => {
      setCommentFormMode(_id);
    };

  if (comments.length <= 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <PageTitle type="h3">Comments:</PageTitle>
      <ol className={`${styles.commentList}`}>
        {comments.map((comment: Comment) => (
          <li key={comment._id} className={styles.commentItem}>
            {comment.content}
            <span
              className="text-blue-500 inline-block ml-2 cursor-pointer"
              onClick={onReply(comment)}
            >
              Reply
            </span>
            {commentFormMode === comment._id && (
              <div className="mb-2">
                <CommentForm
                  postId={comment.postId}
                  parentId={comment._id}
                  onSubmit={onCreateComment}
                  setCommentFormMode={setCommentFormMode}
                />
              </div>
            )}
            <ol className={`${styles.commentList} ml-4`}>
              {comment?.replies?.map((reply) => (
                <li key={reply._id} className={styles.commentItem}>
                  {reply.content}
                  <span
                    className="text-blue-500 inline-block ml-2 cursor-pointer"
                    onClick={onReply(reply)}
                  >
                    Reply
                  </span>
                  {commentFormMode === reply._id && (
                    <CommentForm
                      postId={reply.postId}
                      parentId={reply._id}
                      onSubmit={onCreateComment}
                      setCommentFormMode={setCommentFormMode}
                    />
                  )}
                  <ol className={`${styles.commentList} ml-4`}>
                    {reply?.replies?.map((reply) => (
                      <li key={reply._id} className={styles.commentItem}>
                        {reply.content}
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default CommentList;
