import { KeyCountries } from "@/types";
import { getCountryFullName, getFlagEmoji } from "@/utils/formatter";
import Image from "next/image";
import React from "react";
import { Typography } from "./Typography";
type ProductCompareImageProps = {
  imgUrl: string;
  showFlag?: boolean;
  country: string;
};
const ProductCompareImage: React.FC<ProductCompareImageProps> = ({
  imgUrl,
  showFlag = false,
  country,
}) => {
  return (
    <section className="product-img mb-6 md:mb-0 overflow-hidden border border-primary rounded-xl w-full relative h-full">
      <Image
        src={
          imgUrl ?? "https://storage.skinsort.com/vhfn18oeucujg2wmaqz2m4a6xy2a"
        }
        alt={imgUrl}
        width={350}
        height={350}
        className="h-full w-full object-contain  transform transition-transform duration-300 ease-in-out scale-80 hover:scale-85"
      />
      {showFlag && country && (
        <Typography className="mb-4 z-[10] text-center absolute bottom-[-5] left-0 right-0 text-secondary">
          {getCountryFullName(country as KeyCountries)} brand{" "}
          {getFlagEmoji(country)}
        </Typography>
      )}
    </section>
  );
};

export default ProductCompareImage;
