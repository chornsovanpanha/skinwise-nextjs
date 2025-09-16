import ProductCompareImage from "@/components/ProductCompareImage";
import { Typography } from "@/components/Typography";
import React from "react";

const ComparisonItem = () => {
  return (
    <section className=" w-full justify-center items-center">
      <ProductCompareImage
        imgUrl="https://storage.skinsort.com/vhfn18oeucujg2wmaqz2m4a6xy2a"
        showFlag
      />

      <div className="info w-full text-center">
        <Typography as="p" variant="h6" className="text-secondary">
          Low Ph Make up Cleaner
        </Typography>
        <Typography as="p" variant="caption" className="text-gray-5">
          Makeup Remover
        </Typography>
        <Typography as="p" variant="default" className="text-secondary">
          8 Ingredients
        </Typography>
      </div>
    </section>
  );
};

export default ComparisonItem;
