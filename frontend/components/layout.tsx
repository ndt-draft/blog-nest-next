import Navbar from "./navbar";
import Footer from "./footer";
import { Geist, Geist_Mono } from "next/font/google";
import React, { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen w-1/2 mx-auto font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="">
        <Navbar />
        <div className="flex flex-col gap-8 mb-8">{children}</div>
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
