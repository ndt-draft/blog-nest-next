import { login, loginBody } from "@/api";
import LoginForm from "@/components/LoginForm";
import { useToast } from "@/hooks/use-toast";
import auth from "@/lib/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Login = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLogin = async ({ email, password }: loginBody) => {
    const res = await login({ email, password });

    // need to show error later
    if (!res.ok) {
      const { message, error } = await res.json();
      toast({
        variant: "destructive",
        title: error,
        description: message,
      });
      return;
    }

    const { access_token } = await res.json();

    // save token
    auth.setItem("token", access_token);

    // redirect to home
    router.push("/");
  };

  const isLoggedIn = !!auth.getItem("token");

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/");
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Login
      </h2>
      <LoginForm onSubmit={handleLogin} />
    </>
  );
};

export default Login;
