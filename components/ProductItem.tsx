import { Product } from "@/types";
import { Typography } from "./Typography";
import Image from "next/image";

const ProductItem = ({ data }: { data: Product }) => {
  return (
    <div className="border border-primary rounded-xl overflow-hidden h-[500px] hover:cursor-pointer">
      {/* Image on top */}
      <div className="relative w-full h-96 group overflow-hidden">
        <Image
          src={data?.imageUrl}
          alt={data.name}
          fill
          className="object-cover group-hover:scale-125 transition-transform ease-in-out duration-500"
        />
      </div>

      {/* Content below */}
      <div className="px-4 py-2 h-full ">
        <Typography
          as="p"
          variant="subtitle1"
          className="font-bold text-secondary line-clamp-2"
        >
          {data.name}
        </Typography>
        <Typography
          as="p"
          variant="default"
          className="font-bold text-secondary"
        >
          Brand : {data.brandName}
        </Typography>
      </div>
    </div>
  );
};

export default ProductItem;
