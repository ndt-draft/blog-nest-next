import { getPosts } from "@/api";
import { PostPagination, Post } from "@/types/post";
import { Link } from "react-router";
import PostList from "./PostList";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { useState } from "react";

const Posts = () => {
  const [page, setPage] = useState(0);
  const { data, error } = useSWR<{ posts: Post[]; pagination: PostPagination }>(
    `/api/posts?page=${page}&limit=10`,
    () => getPosts({ page, limit: 10 })
  );

  if (error) return <div>Failed to load posts</div>;
  if (!data) return <div>Loading...</div>;

  const totalPages = Math.ceil(data.pagination.total / 10);

  const handleChangePage = (newPage: number) => {
    if (newPage < 0 || newPage >= totalPages) return;
    setPage(newPage);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline mb-4">Posts</h1>
      <Button className="cursor-pointer" asChild>
        <Link to="/admin/posts/new">Create New Post</Link>
      </Button>
      <PostList posts={data.posts} />
      <Pagination>
        <PaginationContent>
          <PaginationPrevious onClick={() => handleChangePage(page - 1)} />
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={page === index}
                onClick={() => handleChangePage(index)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationNext onClick={() => handleChangePage(page + 1)} />
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Posts;
