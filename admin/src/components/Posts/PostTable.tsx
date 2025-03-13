import { Post } from "@/types/post";
import { Link } from "react-router";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

type Props = {
  posts: Post[];
};

const PostTable = ({ posts }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Content</TableHead>
          <TableHead>Categories</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>
              <Link className="text-blue-600" to={`/admin/posts/${post.id}`}>
                {post.title}
              </Link>
            </TableCell>
            <TableCell>{post.content}</TableCell>
            <TableCell>
              {post.categories.map((c) => c.name).join(", ")}
            </TableCell>
            <TableCell>{post.user.name}</TableCell>
            <TableCell>
              {new Date(post.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </TableCell>
            <TableCell>
              {post.updated_at &&
                new Date(post.updated_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PostTable;
