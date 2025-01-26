import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { Category } from "@/types/category";
import { Post } from "@/types/post";

export const getServerSideProps = (async ({ params }) => {
  // Fetch data from external API
  const res = await Promise.all([
    fetch(`http://localhost:3333/categories/${params?.id}`),
    fetch(`http://localhost:3333/posts?category=${params?.id}`),
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
    <main>
      <h2>{category.id}</h2>
      <p>{category.name}</p>

      <ol>
        {posts.map((post: Post) => (
          <li>{post.title}</li>
        ))}
      </ol>
    </main>
  );
}
