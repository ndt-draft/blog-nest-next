import { apiFetch } from "./fetch";

export type loginBody = {
  email: string;
  password: string;
};

export const login = (bodyParams: loginBody) => {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(bodyParams),
  });
};
