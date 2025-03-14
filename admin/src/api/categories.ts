import { apiFetch } from "./fetch";

export const getCategories = async () => {
  return apiFetch("/categories");
};
