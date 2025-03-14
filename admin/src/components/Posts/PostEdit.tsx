import useSWR from "swr";
import { useNavigate, useParams } from "react-router";
import { getPost, updatePost } from "@/api/posts";
import PostForm from "./PostForm";
import { UpdatePostDto } from "@/types/post";
import { toast } from "sonner";
import { getCategories } from "@/api/categories";
import { Category } from "@/types/category";

const PostEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: post,
    error: postError,
    mutate: mutatePost,
  } = useSWR(id ? `/posts/${id}` : null, () => getPost(id!));
  const { data: categories = [], error: categoriesError } = useSWR(
    "/categories",
    getCategories
  );

  const handleSubmit = async (data: UpdatePostDto) => {
    try {
      await updatePost(id!, data);
      mutatePost(); // Revalidate the post data after update
      navigate(`/admin/posts`);
      toast.success("Post updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to update post");
    }
  };

  if (!post) return <div>Loading...</div>;
  if (postError || categoriesError) return <div>Failed to load data</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold underline mb-4">
        Edit Post: {post.title}
      </h1>
      <PostForm
        onSubmit={handleSubmit}
        defaultValues={{
          ...post,
          categories: post?.categories?.map(
            (category: Category) => category.id
          ),
        }}
        categories={categories}
      />
    </div>
  );
};

export default PostEdit;
