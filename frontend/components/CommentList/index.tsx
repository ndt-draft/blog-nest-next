import { Comment } from "@/types/comment";

type Props = {
  comments: Comment[];
};

const CommentList: React.FC<Props> = ({ comments }) => {
  return (
    <div>
      {comments.length > 0 && (
        <>
          <h3>Comments:</h3>
          <ol className="list-inside list-decimal">
            {comments.map((comment: Comment) => (
              <li>
                {comment.content}
                <ol className="ml-4 list-inside list-decimal">
                  {comment?.replies?.map((reply) => (
                    <li>
                      {reply.content}
                      <ol className="ml-4 list-inside list-decimal">
                        {reply?.replies?.map((reply) => (
                          <li>{reply.content}</li>
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
