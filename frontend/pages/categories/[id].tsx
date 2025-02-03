import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { Category } from "@/types/category";
import { Post } from "@/types/post";
import PostList from "@/components/PostList";
import { fetchCategory, fetchPosts } from "@/api";

export const getServerSideProps = (async ({ params }) => {
  // Fetch data from external API
  const res = await Promise.all([
    fetchCategory(params?.id),
    fetchPosts({ category: params?.id }),
  ]);

  if (!res[0].ok) {
    return { notFound: true };
  }

  const category: Category = await res[0].json();
  const { posts } = await res[1].json();

  // Pass data to the page via props
  return { props: { category, posts } };
}) satisfies GetServerSideProps<
  { category: Category; posts: Post[] },
  { id: string }
>;

export default function Page({
  category,
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <h2>Category: {category.name}</h2>

      <PostList posts={posts} />
    </>
  );
}
