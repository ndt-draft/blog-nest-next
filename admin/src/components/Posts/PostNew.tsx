import PostForm from "./PostForm";
import { CreatePostDto } from "@/types/post";
import { createPost } from "@/api/posts";
import { useNavigate } from "react-router";

const PostNew = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (data: CreatePostDto) => {
    try {
      await createPost(data);

      navigate("/admin/posts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline mb-4">Create New Post</h1>
      <PostForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default PostNew;
