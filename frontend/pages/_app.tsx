import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import ClientLayout from "@/components/client-layout";
import { Toaster } from "@/components/ui/toaster";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClientLayout>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toaster />
    </ClientLayout>
  );
}
