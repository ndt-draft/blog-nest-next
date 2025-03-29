import Image from "next/image";
import LogInOut from "./LogInOut";

const assetsPrefix = process.env.NEXT_PUBLIC_ASSETS_PREFIX || "";

const Footer: React.FC = () => {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center mb-8">
      <LogInOut />
      <a
        className="flex items-center gap-2 hover:bg-slate-200 px-4 text-sm rounded-full h-7"
        href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn
      </a>
      <a
        className="flex items-center gap-2 hover:bg-slate-200 px-4 text-sm rounded-full h-7"
        href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src={`${assetsPrefix}/window.svg`}
          alt="Window icon"
          width={16}
          height={16}
        />
        Examples
      </a>
      <a
        className="flex items-center gap-2 hover:bg-slate-200 px-4 text-sm rounded-full h-7"
        href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src={`${assetsPrefix}/globe.svg`}
          alt="Globe icon"
          width={16}
          height={16}
        />
        Go to nextjs.org →
      </a>
    </footer>
  );
};

export default Footer;
