import useSWR from "swr";
import PostForm from "./PostForm";
import { CreatePostDto } from "@/types/post";
import { createPost } from "@/api/posts";
import { useNavigate } from "react-router";
import { getCategories } from "@/api/categories";

const PostNew = () => {
  const navigate = useNavigate();
  const { data: categories = [], error } = useSWR("/categories", getCategories);

  const handleFormSubmit = async (data: CreatePostDto) => {
    try {
      await createPost(data);
      navigate("/admin/posts");
    } catch (error) {
      console.error(error);
    }
  };

  if (error) return <div>Failed to load categories</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold underline mb-4">Create New Post</h1>
      <PostForm onSubmit={handleFormSubmit} categories={categories} />
    </div>
  );
};

export default PostNew;
