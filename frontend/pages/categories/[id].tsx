import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import { Category } from "@/types/category";
import { Post } from "@/types/post";
import PostList from "@/components/PostList";
import { fetchCategories, fetchCategory, fetchPosts } from "@/api";
import PageTitle from "@/components/PageTitle";

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all categories to pre-generate paths
  const res = await fetchCategories();
  const categories: Category[] = await res.json();

  const paths = categories.map((category) => ({
    params: { id: category.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = (async ({ params }) => {
  // Fetch data from external API
  const res = await Promise.all([
    fetchCategory(params?.id), // Pass params to fetchCategory
    fetchPosts({ category: params?.id }),
  ]);

  if (!res[0].ok) {
    return { notFound: true };
  }

  const category: Category = await res[0].json();
  const { posts } = await res[1].json();

  // Pass data to the page via props
  return { props: { category, posts } };
}) satisfies GetStaticProps<
  { category: Category; posts: Post[] },
  { id: string }
>;

export default function Page({
  category,
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageTitle>Category: {category?.name}</PageTitle>
      <PostList posts={posts || []} />
    </>
  );
}
