import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import { Post } from "@/types/post";
import { useRouter } from "next/router";
import { Category } from "@/types/category";
import { Comment } from "@/types/comment";
import { useEffect, useState } from "react";
import Link from "next/link";

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
  return { props: { post }, revalidate: 10 };
}) satisfies GetStaticProps<{
  post: Post;
}>;

export default function Page({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!post) {
      return;
    }

    const fetchComments = async () => {
      const response = await fetch(
        `http://localhost:3333/comments?postId=${post?.id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setComments(result?.comments);
    };

    fetchComments().catch((e) => {
      // handle the error as needed
      console.error("An error occurred while fetching the data: ", e);
    });
  }, []);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>{post.title}</h2>
      <div>
        <span>Categories: </span>
        <i>
          {post.categories.map((cat: Category) => (
            <Link className="mr-2 text-blue-600" href={`/categories/${cat.id}`}>
              {cat.name},
            </Link>
          ))}
        </i>
      </div>
      <div>{post.content}</div>
      <div>
        Comments:
        <ol className="list-inside list-decimal">
          {comments.map((comment: Comment) => (
            <li>
              {comment.content}
              <ol className="ml-4 list-inside list-decimal">
                {comment?.replies?.map((reply) => (
                  <li>
                    {reply.content}
                    <ol className="ml-4 list-inside list-decimal">
                      {reply?.replies?.map((reply) => (
                        <li>{reply.content}</li>
                      ))}
                    </ol>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
