import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Post } from "@/types/post";
import { GetServerSideProps } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          {posts.map((post: Post) => (
            <li key={post.id} className="mb-2">
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ol>
      </main>
    </div>
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
