import Image from "next/image";
import Link from "next/link";

interface LogoProps {}

const Logo = ({}: LogoProps) => {
  return (
    <Link
      className="relative block w-full aspect-square cursor-pointer"
      href="/main"
    >
      <Image fill src="/logo.png" alt="" />
    </Link>
  );
};

export default Logo;
