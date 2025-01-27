import Link from "next/link";
import { Post } from "@/types/post";
import { GetServerSideProps } from "next";

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
      {posts.map((post: Post) => (
        <li key={post.id} className="mb-2">
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ol>
  );
}

export const getServerSideProps = (async () => {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3333/posts`);

  if (!res.ok) {
    return { notFound: true };
  }

  const { posts } = await res.json();

  // Pass data to the page via props
  return { props: { posts } };
}) satisfies GetServerSideProps;
