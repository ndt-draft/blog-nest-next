import { Post } from "@/types/post";
import Link from "next/link";

type Props = {
  posts: Post[];
};

const PostList: React.FC<Props> = ({ posts }) => {
  return (
    <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
      {posts.map((post: Post) => (
        <li key={post.id} className="mb-2">
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ol>
  );
};

export default PostList;
