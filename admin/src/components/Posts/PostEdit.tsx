import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getPost, updatePost } from "@/api/posts";
import PostForm from "./PostForm";
import { UpdatePostDto } from "@/types/post";

const PostEdit = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<UpdatePostDto | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPost() {
      const data = await getPost(id!);
      setPost(data);
    }
    fetchPost();
  }, [id]);

  const handleSubmit = async (data: UpdatePostDto) => {
    await updatePost(id!, data);
    navigate(`/admin/posts/${id}`);
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold underline mb-4">
        Edit Post: {post.title}
      </h1>
      <PostForm onSubmit={handleSubmit} defaultValues={post} />
    </div>
  );
};

export default PostEdit;
