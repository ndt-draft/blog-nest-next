import { Post } from "@/types/post";
import Link from "next/link";

type Props = {
  posts: Post[];
};

const PostList: React.FC<Props> = ({ posts }) => {
  return (
    <div className="font-[family-name:var(--font-popppins)]">
      {posts.map((post: Post) => (
        <Link href={`/posts/${post.id}`}>
          <div
            className="border border-zinc-300 mb-2 p-2 rounded-sm"
            key={post.id}
          >
            <span className="font-[family-name:var(--font-poppins)] font-semibold">
              {post.title}
            </span>
            <div>{post.content}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostList;
