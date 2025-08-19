import { Post, PostPagination } from "@/types/post";
import { GetStaticProps, GetStaticPaths } from "next";
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

export default function Page({
  posts,
  pagination,
  page,
}: {
  posts: Post[];
  pagination: PostPagination;
  page: number;
}) {
  const totalPages = Math.ceil(pagination.total / pagination.limit);
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
                href={`/page/${page - 1}`}
              />
            </PaginationItem>
          )}
          {startPage > 1 && (
            <>
              <PaginationItem>
                <PaginationLink href={`/page/1`}>
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
                  href={`/page/${currentPage}`}
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
                  href={`/page/${totalPages}`}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          {page + 1 <= totalPages && (
            <PaginationItem>
              <PaginationNext
                href={`/page/${page + 1}`}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { page } = context.params || {};
  const currentPage = parseInt(page as string, 10) || 1;
  const limit = 10; // Default limit

  // Fetch data from external API
  const res = await fetchPosts({ page: currentPage - 1, limit });

  if (!res.ok) {
    return { notFound: true };
  }

  const { posts, pagination } = await res.json();

  // Pass data to the page via props
  return { props: { posts, pagination, page: currentPage } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const limit = 10; // Default limit

  // Fetch the total number of posts to calculate the number of pages
  const res = await fetchPosts({ page: 0, limit });

  if (!res.ok) {
    return { paths: [], fallback: false };
  }

  const { pagination } = await res.json();
  const totalPages = Math.ceil(pagination.total / pagination.limit);

  // Generate paths for each page
  const paths = Array.from({ length: totalPages }, (_, index) => ({
    params: { page: (index + 1).toString() },
  }));

  return { paths, fallback: false };
};