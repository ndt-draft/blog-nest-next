const BLOG_AUTH = "BLOG_ADMIN";

const auth = {
  get: () => {
    if (typeof window !== "undefined") {
      try {
        const authData = JSON.parse(localStorage.getItem(BLOG_AUTH) || "");
        return authData;
      } catch (e) {
        console.log("error get auth", e);
      }
    }

    return {};
  },
  set: (data: object) => {
    try {
      localStorage.setItem(BLOG_AUTH, JSON.stringify(data));
    } catch (e) {
      console.log("error set auth", e);
    }
  },
  clear: () => {
    localStorage.removeItem(BLOG_AUTH);
  },
  getItem: (key: string) => {
    try {
      const authData = auth.get();
      return authData[key];
    } catch (e) {
      console.log("error getItem", key, e);
    }
    return null;
  },
  setItem: (key: string, value: unknown) => {
    try {
      const authData = auth.get();
      authData[key] = value;
      auth.set(authData);
    } catch (e) {
      console.log("error setItem", key, e);
    }
  },
  loggedIn: (): boolean => {
    return auth.getItem("token");
  },
};

export default auth;
