import { ProductWithBrandAndImages } from "@/types";
import { Plus } from "lucide-react";
import Image from "next/image";
import { Typography } from "./Typography";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const SmallProductItem = ({
  product,
  onPress,
  showBrand,
  type = "product",
  className,
}: {
  product: ProductWithBrandAndImages;
  showBrand?: boolean;
  onPress: () => void;
  className?: string;
  type?: "routine" | "product";
}) => {
  return (
    <div
      onClick={onPress}
      className={`flex gap-4 items-start space-y-6  px-4 py-4 cursor-pointer hover:bg-primary/20 ${className} `}
    >
      {/* Image on top */}
      <Card className="relative w-full h-20 group overflow-hidden bg-white flex-1/5">
        <Image
          src={product?.Image?.at(0)?.url ?? ""}
          alt={product.name}
          fill
          className="object-contain group-hover:scale-110 transition-transform ease-in-out duration-500"
        />
      </Card>
      <div className="content flex-4/5">
        <li className="rounded-lg hover:bg-muted cursor-pointer transition text-secondary list-none text-left">
          {product.name}
        </li>
        {type == "product" && (
          <Typography
            as="p"
            variant="caption"
            className="text-secondary text-left"
          >
            {product?.ingredients?.length}{" "}
            {product?.ingredients?.length > 1 ? "ingredients" : "ingredient"}
          </Typography>
        )}
        {showBrand && (
          <Typography
            as="p"
            variant="caption"
            className="text-secondary text-left"
          >
            {product.brand?.title}
          </Typography>
        )}
      </div>

      {type == "product" && (
        <Button className="rounded-full" type="button" onClick={onPress}>
          <Plus />
        </Button>
      )}
    </div>
  );
};

export default SmallProductItem;
