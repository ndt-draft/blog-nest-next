import { Post } from "@/types/post";
import { GetServerSideProps } from "next";
import PostList from "@/components/PostList";
import { fetchPosts } from "@/api";

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <>
      <h2>Posts</h2>
      <PostList posts={posts} />
    </>
  );
}

export const getServerSideProps = (async () => {
  // Fetch data from external API
  const res = await fetchPosts();

  if (!res.ok) {
    return { notFound: true };
  }

  const { posts } = await res.json();

  // Pass data to the page via props
  return { props: { posts } };
}) satisfies GetServerSideProps;
