import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import { Post } from "@/types/post";
import { useRouter } from "next/router";

export const getStaticPaths = (async () => {
  // Call an external API endpoint to get posts
  const res = await fetch("http://localhost:3333/posts");
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
  const res = await fetch(`http://localhost:3333/posts/${params?.id}`);

  if (!res.ok) {
    return { notFound: true };
  }

  const post = await res.json();
  return { props: { post } };
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
    <div>
      <h2>{post.title}</h2>
      <div>{post.content}</div>
    </div>
  );
}
