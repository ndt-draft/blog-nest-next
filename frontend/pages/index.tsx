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
  PaginationEllipsis,
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
  // const totalPages = Math.ceil(pagination.total / pagination.limit);
  const totalPages = 100;
  const maxVisiblePages = 5; // Maximum number of visible pages
  const startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

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
          {startPage > 1 && (
            <>
              <PaginationItem>
                <PaginationLink href={`/?page=1&limit=${pagination.limit}`}>
                  1
                </PaginationLink>
              </PaginationItem>
              {startPage > 2 && <PaginationEllipsis />}
            </>
          )}
          {[...Array(endPage - startPage + 1)].map((_, index) => {
            const currentPage = startPage + index;
            return (
              <PaginationItem key={currentPage}>
                <PaginationLink
                  href={`/?page=${currentPage}&limit=${pagination.limit}`}
                  isActive={page === currentPage}
                >
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <PaginationEllipsis />}
              <PaginationItem>
                <PaginationLink
                  href={`/?page=${totalPages}&limit=${pagination.limit}`}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
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
