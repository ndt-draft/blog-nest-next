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
  let allPosts: Post[] = [];
  let currentPage = 0;
  const limit = 10; // Adjust the limit based on your API's pagination

  while (true) {
    const res = await fetchPosts({ page: currentPage, limit });
    const data = await res.json();

    allPosts = allPosts.concat(data.posts);

    if (data.posts.length < limit) {
      break; // Exit the loop if there are no more posts
    }

    currentPage++;
  }

  const paths = allPosts.map((post: Post) => ({
    params: { id: `${post.id}` },
  }));

  return { paths, fallback: false };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }) => {
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const res = await fetchPostById(id);

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
