import Navbar from "./navbar";
import Footer from "./footer";
import { Poppins, Slabo_27px } from "next/font/google";
import React, { ReactNode } from "react";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const slabo = Slabo_27px({
  variable: "--font-slabo",
  subsets: ["latin"],
  weight: ["400"],
});

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      className={`${poppins.variable} ${slabo.variable} min-h-screen w-1/2 mx-auto font-[family-name:var(--font-poppins)]`}
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
