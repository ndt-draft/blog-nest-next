import { Comment } from "@/types/comment";
import styles from "./CommentList.module.css";

type Props = {
  comments: Comment[];
};

const CommentList: React.FC<Props> = ({ comments }) => {
  return (
    <div>
      {comments.length > 0 && (
        <>
          <h3>Comments:</h3>
          <ol className={`${styles.commentList} list-inside list-decimal`}>
            {comments.map((comment: Comment) => (
              <li key={comment.id} className={styles.commentItem}>
                {comment.content}
                <ol
                  className={`${styles.commentList} ml-4 list-inside list-decimal`}
                >
                  {comment?.replies?.map((reply) => (
                    <li key={reply.id} className={styles.commentItem}>
                      {reply.content}
                      <ol
                        className={`${styles.commentList} ml-4 list-inside list-decimal`}
                      >
                        {reply?.replies?.map((reply) => (
                          <li key={reply.id} className={styles.commentItem}>
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
        </>
      )}
    </div>
  );
};

export default CommentList;
