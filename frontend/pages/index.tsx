import { Post, PostPagination } from "@/types/post";
import { GetServerSideProps } from "next";
import PostList from "@/components/PostList";
import { fetchPosts } from "@/api";
import PageTitle from "@/components/PageTitle";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Home({
  posts,
  pagination,
  page,
}: {
  posts: Post[];
  pagination: PostPagination;
  page: number;
}) {
  const totalPages = Math.ceil(pagination.total / pagination.limit);
  return (
    <>
      <PageTitle>Posts</PageTitle>
      <PostList posts={posts} />
      <Pagination>
        <PaginationContent>
          {page - 1 >= 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={`/?page=${page - 1}&limit=${pagination.limit}`}
              />
            </PaginationItem>
          )}
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem>
              <PaginationLink
                href={`/?page=${index + 1}&limit=${pagination.limit}`}
                isActive={page - 1 === index}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {page + 1 <= totalPages && (
            <PaginationItem>
              <PaginationNext
                href={`/?page=${page + 1}&limit=${pagination.limit}`}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
}

export const getServerSideProps = (async (context) => {
  const page = context.query?.page
    ? parseInt(context.query.page as string, 10)
    : 1;
  const limit = context.query?.limit
    ? parseInt(context.query.limit as string, 10)
    : 10;

  // Fetch data from external API
  const res = await fetchPosts({ page: page - 1, limit });

  if (!res.ok) {
    return { notFound: true };
  }

  const { posts, pagination } = await res.json();

  // Pass data to the page via props
  return { props: { posts, pagination, page } };
}) satisfies GetServerSideProps<{
  posts: Post[];
  pagination: PostPagination;
  page: number;
}>;
