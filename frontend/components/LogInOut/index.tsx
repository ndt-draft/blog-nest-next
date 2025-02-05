import auth from "@/lib/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LogInOut = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    setIsAuthenticated(auth.loggedIn());
  }, [router.pathname]);

  const toggleLogin = (e: React.FormEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (isAuthenticated) {
      auth.clear();
    }

    router.push("/login");
  };

  return (
    <a
      className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      onClick={toggleLogin}
      href="/login"
    >
      {isAuthenticated ? "Logout" : "Login"}
    </a>
  );
};

export default LogInOut;
