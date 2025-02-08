import CommentForm from "../CommentForm";

type Props = {
  comment: {
    _id: string;
    content: string;
  };
  commentParentId: string | null;
  onReply: ({ _id }: { _id: string }) => () => void;
};

const CommentItem = ({ comment, commentParentId, onReply }: Props) => {
  return (
    <span>
      {comment.content}
      <span
        className="text-blue-500 inline-block ml-2 cursor-pointer"
        onClick={onReply(comment)}
      >
        Reply
      </span>
      {commentParentId === comment._id && (
        <div className="mb-2">
          <CommentForm />
        </div>
      )}
    </span>
  );
};

export default CommentItem;
