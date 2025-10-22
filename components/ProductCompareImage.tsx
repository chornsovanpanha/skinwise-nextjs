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
      <div className="w-fit h-[400px]   border border-gray-300 rounded-xl overflow-hidden flex items-center justify-center">
        <Image
          src={imgUrl || ""}
          alt="Product image"
          width={400}
          height={400}
          className="object-contain h-full scale-80 transition-transform duration-300 ease-in-out hover:scale-85"
        />
      </div>
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
