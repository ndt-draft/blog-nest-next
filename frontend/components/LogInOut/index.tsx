import auth from "@/lib/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LogInOut = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    setIsAuthenticated(auth.loggedIn());
  }, [router.pathname]);

  const toggleLogin = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (isAuthenticated) {
      auth.clear();
    }

    router.push("/login");
  };

  return (
    <a
      className="flex items-center gap-2 hover:bg-slate-200 px-4 text-sm rounded-full h-7"
      onClick={toggleLogin}
      href="#"
    >
      {isAuthenticated ? "Logout" : "Login"}
    </a>
  );
};

export default LogInOut;
