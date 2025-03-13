import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import { handleLogin } from "@/api";
import auth from "@/lib/auth";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

function Login(): React.JSX.Element {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  // 2. Define a submit handler.
  async function onSubmitForm(values: z.infer<typeof formSchema>) {
    toast.promise(handleLogin(values), {
      loading: "Logging in...",
      success: (data) => {
        auth.set({ token: data.access_token });
        navigate("/admin");
        return "Logged in successfully";
      },
      error: "Failed to login",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitForm)}
        className="w-80 space-y-8 m-auto"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        <Link className="ml-2" to="/">
          Back To Home
        </Link>
      </form>
    </Form>
  );
}

export default Login;
