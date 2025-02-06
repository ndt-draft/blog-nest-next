import { Comment } from "@/types/comment";
import { StyledOL } from "./style";

type Props = {
  comments: Comment[];
};

const CommentList = ({ comments }: Props) => {
  if (comments.length <= 0) {
    return null;
  }

  return (
    <div>
      <h3>Comments:</h3>
      <StyledOL className={`list-inside list-decimal`}>
        {comments.map((comment: Comment) => (
          <li key={comment._id}>
            {comment.content}
            <StyledOL className={`ml-4 list-inside list-decimal`}>
              {comment?.replies?.map((reply) => (
                <li key={reply._id}>
                  {reply.content}
                  <StyledOL className={`ml-4 list-inside list-decimal`}>
                    {reply?.replies?.map((reply) => (
                      <li key={reply._id}>{reply.content}</li>
                    ))}
                  </StyledOL>
                </li>
              ))}
            </StyledOL>
          </li>
        ))}
      </StyledOL>
    </div>
  );
};

export default CommentList;
