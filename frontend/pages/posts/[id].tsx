import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import { Post } from "@/types/post";
import { useRouter } from "next/router";
import { Category } from "@/types/category";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import CommentList from "@/components/CommentList";
import {
  CommentCreateParams,
  createComment,
  fetchComments,
  fetchPostById,
  fetchPosts,
} from "@/api";
import CommentForm from "@/components/CommentForm";
import { Comment } from "@/types/comment";
import PageTitle from "@/components/PageTitle";

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
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentParentId, setCommentParentId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const response = await fetchComments({ postId: post?.id });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    setComments(result?.comments);
  }, [post?.id]);

  const onCreateComment = async (commentCreateParams: CommentCreateParams) => {
    const res = await createComment(commentCreateParams);

    if (!res.ok) {
      return;
    }

    // close comment form reply
    setCommentParentId(null);

    // refetch comments again for rightful order
    fetchData().catch((e) => {
      // handle the error as needed
      console.error("An error occurred while fetching the data: ", e);
    });
  };

  useEffect(() => {
    if (!post?.id) {
      return;
    }

    fetchData().catch((e) => {
      // handle the error as needed
      console.error("An error occurred while fetching the data: ", e);
    });
  }, [post.id, fetchData]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageTitle>{post.title}</PageTitle>
      <div>
        <span>Categories: </span>
        <i>
          {post.categories.map((cat: Category) => (
            <Link
              key={cat.id}
              className="mr-2 text-blue-600"
              href={`/categories/${cat.id}`}
            >
              {cat.name},
            </Link>
          ))}
        </i>
      </div>
      <div>{post.content}</div>
      {!commentParentId && (
        <CommentForm
          postId={post.id}
          onSubmit={onCreateComment}
          setCommentParentId={setCommentParentId}
        />
      )}
      <CommentList
        comments={comments}
        commentParentId={commentParentId}
        onCreateComment={onCreateComment}
        setCommentParentId={setCommentParentId}
      />
    </>
  );
}
