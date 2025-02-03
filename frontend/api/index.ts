const baseUrl = process.env.API_URL;

export const fetchPosts = () => {
  return fetch(`${baseUrl}/posts`);
};
