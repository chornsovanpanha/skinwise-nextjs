"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageDetailProps {
  src: string;
  alt: string;
  className?: string;
}

const ProductImageDetail = ({
  src,
  alt,
  className,
}: ProductImageDetailProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={200}
      height={200}
      className={`h-[320px] w-full object-contain transform transition-transform duration-300 ease-in-out hover:scale-110 ${className}`}
      onError={() => setImgSrc("/assets/images/no-img-card.png")}
    />
  );
};

export default ProductImageDetail;
