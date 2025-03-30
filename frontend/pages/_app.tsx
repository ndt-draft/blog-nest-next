import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { Toaster } from "@/components/ui/toaster";

// for serverless handler dependencies
import "aws-serverless-express";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Toaster />
    </Layout>
  );
}
