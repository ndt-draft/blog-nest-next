import { Post } from "@/types/post";
import PostItem from "./PostItem";

type Props = {
  posts: Post[];
};

const PostList: React.FC<Props> = ({ posts }) => {
  return (
    <div className="font-[family-name:var(--font-popppins)]">
      {posts.map((post: Post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
