import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import Posts from "@/components/Posts";
import Login from "@/components/Login";
import { BrowserRouter, Route, Routes } from "react-router";
import PrivateLayout from "@/layouts/private";
import PublicLayout from "@/layouts/public";
import Categories from "@/components/Categories";
import Logout from "./components/Logout";

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
          <Route path="categories" element={<Categories />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
