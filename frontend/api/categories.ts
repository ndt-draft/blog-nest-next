import { apiFetch } from "./fetch";

export const fetchCategories = () => {
  return apiFetch(`/categories`);
};

export const fetchCategory = (id?: string) => {
  if (!id) {
    return Promise.reject(new Error("Category ID is required"));
  }
  return apiFetch(`/categories/${id}`);
};
