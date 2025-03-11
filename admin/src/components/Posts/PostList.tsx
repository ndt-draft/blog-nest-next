import { Post } from "@/types/post";
import { Link } from "react-router";

type Props = {
  posts: Post[];
};

const PostList = ({ posts }: Props) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link to={`/admin/posts/${post.id}`}>{post.title}</Link>
          <Link to={`/admin/posts/${post.id}/edit`}>Edit</Link>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
