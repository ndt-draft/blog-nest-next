import { getPost } from "@/api";
import { Post } from "@/types/post";
import { useParams } from "react-router";
import useSWR from "swr";

const PostDetail = () => {
  let params = useParams();
  let id = params.id;
  const { data: post, error } = useSWR<Post>(`/api/posts/${id}`, () =>
    getPost(`${id}`)
  );

  if (error) return <div>Failed to load post</div>;
  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold underline mb-4">{post.title}</h1>
      <div>{post.content}</div>
    </div>
  );
};

export default PostDetail;
