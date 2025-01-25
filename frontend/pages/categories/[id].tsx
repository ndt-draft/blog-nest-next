import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { Category } from "@/types/category";

export const getServerSideProps = (async ({ params }) => {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3333/categories/${params?.id}`);

  if (!res.ok) {
    return { notFound: true };
  }

  const category: Category = await res.json();
  // Pass data to the page via props
  return { props: { category } };
}) satisfies GetServerSideProps<{ category: Category }, { id: string }>;

export default function Page({
  category,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <h2>{category.id}</h2>
      <p>{category.name}</p>
    </main>
  );
}
