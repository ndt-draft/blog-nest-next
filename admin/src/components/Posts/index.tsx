import { getPosts } from "@/api";
import { Button } from "@/components/ui/button";
import { Post } from "@/types/post";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import PostList from "./PostList";

const Posts = () => {
  let [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPosts();
        const data = await res.json();
        setPosts(data.posts);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline mb-4">Posts</h1>
      <Button className="cursor-pointer" asChild>
        <Link to="/admin/posts/new">Create New Post</Link>
      </Button>
      <PostList posts={posts} />
    </div>
  );
};

export default Posts;
