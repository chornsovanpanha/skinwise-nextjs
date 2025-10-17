import ProductCompareImage from "@/components/ProductCompareImage";
import { Typography } from "@/components/Typography";
import Link from "next/link";
import React from "react";

export type ComparisonItemProps = {
  imgUrl: string;
  showFlag?: boolean;
  country?: string;
  title: string;
  alias: string;
  brandName: string;
  ingredientsCount: number;
};

const ComparisonItem: React.FC<ComparisonItemProps> = ({
  imgUrl,
  showFlag = false,
  title,
  alias,
  country,
  brandName,
  ingredientsCount,
}) => {
  return (
    <Link href={`/product/${alias}`}>
      <section className="w-full flex flex-col justify-center items-center h-[480px]">
        <ProductCompareImage
          imgUrl={imgUrl}
          showFlag={showFlag}
          country={country ?? ""}
        />

        <div className="info w-full text-center mt-2">
          <Typography as="p" variant="h6" className="text-secondary">
            {title}
          </Typography>
          <Typography as="p" variant="caption" className="text-gray-5">
            {brandName}
          </Typography>
          <Typography as="p" variant="default" className="text-secondary">
            {ingredientsCount} Ingredients
          </Typography>
        </div>
      </section>
    </Link>
  );
};

export default ComparisonItem;
