import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import { Post } from "@/types/post";
import { useRouter } from "next/router";
import { Category } from "@/types/category";
import Link from "next/link";
import { fetchPostById, fetchPosts } from "@/api";
import PageTitle from "@/components/PageTitle";
import CommentsProvider from "@/components/CommentsProvider";

export const getStaticPaths = (async () => {
  // Call an external API endpoint to get posts
  const res = await fetchPosts();
  const data = await res.json();

  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const paths = data.posts.map((post: Post) => ({
    params: { id: `${post.id}` },
  }));

  // { fallback: false } means other routes should 404
  return { paths, fallback: true };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }) => {
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const res = await fetchPostById(id);

  if (!res.ok) {
    return { notFound: true };
  }

  const post = await res.json();
  return { props: { post }, revalidate: 10 };
}) satisfies GetStaticProps<{
  post: Post;
}>;

export default function Page({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageTitle>{post.title}</PageTitle>
      <div>
        <span className="font-semibold">Categories: </span>
        <i>
          {post.categories.length > 0
            ? post.categories.map((cat: Category, index: number) => (
                <Link
                  key={cat.id}
                  className="mr-2 text-blue-600"
                  href={`/categories/${cat.id}`}
                >
                  {cat.name}
                  {index < post.categories.length - 1 && ","}
                </Link>
              ))
            : "No categories"}
        </i>
      </div>
      <div>{post.content}</div>
      <CommentsProvider postId={post.id} />
    </>
  );
}
