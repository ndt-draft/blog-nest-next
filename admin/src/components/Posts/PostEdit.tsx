import React, { useEffect, useState } from "react";
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

  return <PostForm onSubmit={handleSubmit} defaultValues={post} />;
};

export default PostEdit;
