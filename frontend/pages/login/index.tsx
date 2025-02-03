import { login, loginBody } from "@/api";
import LoginForm from "@/components/LoginForm";
import auth from "@/lib/auth";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const handleLogin = async ({ email, password }: loginBody) => {
    const res = await login({ email, password });

    // need to show error later
    if (!res.ok) {
      return;
    }

    const { access_token } = await res.json();

    // save token
    auth.setItem("token", access_token);

    // redirect to home
    router.push("/");
  };

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
