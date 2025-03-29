import Image from "next/image";
import Link from "next/link";

const assetsPrefix = process.env.NEXT_PUBLIC_ASSETS_PREFIX || "";

const Navbar: React.FC = () => {
  return (
    <div className="py-8">
      <Link href="/">
        <Image
          className="dark:invert"
          src={`${assetsPrefix}/next.svg`}
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </Link>
    </div>
  );
};

export default Navbar;
