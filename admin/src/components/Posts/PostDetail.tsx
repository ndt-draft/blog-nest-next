import { getPost } from "@/api";
import { Post } from "@/types/post";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const PostDetail = () => {
  let [post, setPost] = useState<Post | null>(null);
  let params = useParams();
  let id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPost(id);
        const data = await res.json();
        setPost(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline mb-4">{post?.title}</h1>
      <div>{post?.content}</div>
    </div>
  );
};

export default PostDetail;
