import Image from "next/image";
import { FC } from "react";

interface LogoProps {
  size?: number; // width & height in px
  src: string; // image source (SVG, PNG, etc.)
  alt?: string;
  className?: string;
}

const Logo: FC<LogoProps> = ({
  size = 40,
  src,
  alt = "Logo",
  className = "",
}) => {
  return (
    <div
      className={`rounded-full overflow-hidden bg-primary/60 flex items-center justify-center ${className} p-5 pr-6`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="object-contain"
      />
    </div>
  );
};

export default Logo;
