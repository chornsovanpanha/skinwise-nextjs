import Image from "next/image";
import React from "react";
import { Typography } from "./Typography";
import { getFlagEmoji } from "@/utils/formatter";
type ProductCompareImageProps = {
  imgUrl: string;
  showFlag?: boolean;
};
const ProductCompareImage: React.FC<ProductCompareImageProps> = ({
  imgUrl,
  showFlag = false,
}) => {
  return (
    <section className="product-img mb-6 md:mb-0 overflow-hidden border border-primary rounded-xl w-full relative">
      <Image
        src={
          imgUrl ?? "https://storage.skinsort.com/vhfn18oeucujg2wmaqz2m4a6xy2a"
        }
        alt={imgUrl}
        width={100}
        height={100}
        className="h-full w-full object-contain  transform transition-transform duration-300 ease-in-out hover:scale-110"
      />
      {showFlag && (
        <Typography className="mb-4 z-[10] text-center absolute bottom-0 left-0 right-0 text-secondary">
          USD brand {getFlagEmoji("US")}
        </Typography>
      )}
    </section>
  );
};

export default ProductCompareImage;
