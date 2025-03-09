import { getPosts } from "@/api";
import { Post } from "@/types/post";
import { Link } from "react-router";
import PostList from "./PostList";
import useSWR from "swr";
import { Button } from "@/components/ui/button";

const Posts = () => {
  const { data, error } = useSWR<{ posts: Post[] }>("/api/posts", () =>
    getPosts()
  );

  if (error) return <div>Failed to load posts</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold underline mb-4">Posts</h1>
      <Button className="cursor-pointer" asChild>
        <Link to="/admin/posts/new">Create New Post</Link>
      </Button>
      <PostList posts={data.posts} />
    </div>
  );
};

export default Posts;
