import { Post } from "@/types/post";
import Link from "next/link";

type Props = {
  post: Post;
};

const PostItem = ({ post }: Props) => {
  return (
    <Link href={`/posts/${post.id}`}>
      <div className="border border-zinc-300 mb-2 p-2 rounded-sm" key={post.id}>
        <span className="font-[family-name:var(--font-poppins)] font-semibold">
          {post.title}
        </span>
        <div>{post.content}</div>
      </div>
    </Link>
  );
};

export default PostItem;
