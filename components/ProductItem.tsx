import { Product } from "@/types";
import Link from "next/link";
import { Typography } from "./Typography";
import ProductImage from "./product/ProductImage";
import clsx from "clsx";

const ProductItem = ({
  data,
  allowLink = true,
}: {
  data: Product;
  allowLink?: boolean;
}) => {
  const imageUrl = data.imageUrl;
  const brandName = data.brandName;

  return (
    <div className="group border border-primary rounded-xl overflow-hidden h-[480px] hover:cursor-pointer ">
      <Link
        className={clsx({
          "pointer-events-none": !allowLink,
        })}
        href={`/product/${data.name?.toLowerCase()?.slice(0, 10)}`}
      >
        {/* Image on top */}
        <div className="relative w-full h-96 group overflow-hidden bg-white">
          <ProductImage src={imageUrl} alt={data.name ?? "product-image"} />
        </div>
        {/* Content below */}
        <div className="px-4 py-2 h-full group-hover:bg-primary/40">
          <Typography
            as="p"
            variant="subtitle1"
            className="font-bold text-secondary line-clamp-2"
          >
            {data.name ?? "Unnamed Product"}
          </Typography>
          <Typography
            as="p"
            variant="default"
            className="font-bold text-secondary line-clamp-1"
          >
            Brand: {brandName}
          </Typography>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
