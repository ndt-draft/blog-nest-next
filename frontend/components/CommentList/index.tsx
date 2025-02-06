import { Comment } from "@/types/comment";
import styles from "./CommentList.module.css";
import PageTitle from "../PageTitle";

type Props = {
  comments: Comment[];
};

const CommentList = ({ comments }: Props) => {
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
            <ol className={`${styles.commentList} ml-4`}>
              {comment?.replies?.map((reply) => (
                <li key={reply._id} className={styles.commentItem}>
                  {reply.content}
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
