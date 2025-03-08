import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Posts from "@/components/Posts";
import Login from "@/components/Login";
import { BrowserRouter, Route, Routes } from "react-router";
import PrivateLayout from "@/layouts/private.tsx";
import PublicLayout from "@/layouts/public.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<PublicLayout />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="admin" element={<PrivateLayout />}>
          <Route index element={<Posts />} />
          <Route path="posts" element={<Posts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
