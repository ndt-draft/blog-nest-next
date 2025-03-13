import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router";
import PrivateLayout from "@/layouts/private";
import PublicLayout from "@/layouts/public";
import Logout from "@/components/Logout";
import AsyncComponent from "@/components/AsyncComponent";

const Login = AsyncComponent(() => import("@/components/Login"));
const Posts = AsyncComponent(() => import("@/components/Posts"));
const PostNew = AsyncComponent(() => import("@/components/Posts/PostNew"));
const Categories = AsyncComponent(() => import("@/components/Categories"));
const PostEdit = AsyncComponent(() => import("@/components/Posts/PostEdit"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<App />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="admin" element={<PrivateLayout />}>
          <Route index element={<Posts />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/new" element={<PostNew />} />
          <Route path="posts/:id" element={<PostEdit />} />
          <Route path="categories" element={<Categories />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
