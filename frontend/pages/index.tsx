import { Post } from "@/types/post";
import { GetServerSideProps } from "next";
import PostList from "@/components/PostList";
import { fetchPosts } from "@/api";
import PageTitle from "@/components/PageTitle";

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <>
      <PageTitle>Posts</PageTitle>
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
