import { login, loginBody } from "@/api";
import LoginForm from "@/components/LoginForm";
import PageTitle from "@/components/PageTitle";
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
  }, [isLoggedIn, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageTitle>Login</PageTitle>
      <LoginForm onSubmit={handleLogin} />
    </>
  );
};

export default Login;
