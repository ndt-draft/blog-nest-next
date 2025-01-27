import Image from "next/image";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <Link href="/">
      <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
    </Link>
  );
};

export default Navbar;
