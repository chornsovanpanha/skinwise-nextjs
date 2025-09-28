"use client";
import Image from "next/image";
import { useState } from "react";

const ProductImage = ({ src, alt }: { src: string; alt: string }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className="object-contain scale-100 group-hover:scale-110 transition-transform ease-in-out duration-500"
      onError={() => setImgSrc("/assets/images/no-image.jpg")}
    />
  );
};
export default ProductImage;
