import { Product } from "@/types";
import Image from "next/image";
import { Typography } from "./Typography";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

const SmallProductItem = ({
  product,
  onPress,
}: {
  product: Product;
  onPress: () => void;
}) => {
  return (
    <div className="flex gap-4 items-start space-y-6  px-4 py-4 cursor-pointer hover:bg-primary/20">
      {/* Image on top */}
      <Card className="relative w-full h-20 group overflow-hidden bg-white flex-1/5">
        <Image
          src={product?.imageUrl}
          alt={product.name}
          fill
          className="object-contain group-hover:scale-110 transition-transform ease-in-out duration-500"
        />
      </Card>
      <div className="content flex-4/5">
        <li className="rounded-lg hover:bg-muted cursor-pointer transition text-secondary">
          {product.name}
        </li>
        <Typography as="p" variant="caption" className="text-secondary">
          110 ingredients
        </Typography>
      </div>

      <Button className="rounded-full" type="button" onClick={onPress}>
        <Plus />
      </Button>
    </div>
  );
};

export default SmallProductItem;
