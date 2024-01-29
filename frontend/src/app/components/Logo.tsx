import Image from "next/image";
import Link from "next/link";

export default function Logo({
  src,
  children,
  width,
  height,
}: {
  src: string | null;
  children?: React.ReactNode;
  width?: number;
  height?: number;
}) {
  return (
    <Link
      href="/"
      aria-label="Back to homepage"
      className="flex items-center p-2"
    >
      {src && <Image src={src} alt="logo" width={width || 45} height={height || 45} />}
      <div className="ml-2">{children}</div>
    </Link>
  );
}
