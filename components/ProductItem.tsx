import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "./Typography";

const ProductItem = ({ data }: { data: Product }) => {
  return (
    <div className="group border border-primary rounded-xl overflow-hidden h-[480px] hover:cursor-pointer ">
      {/* Image on top */}
      <Link href={`/product/${data.name?.toLowerCase()?.slice(0, 10)}`}>
        <div className="relative w-full h-96 group overflow-hidden bg-white">
          <Image
            src={data?.imageUrl}
            alt={data.name}
            fill
            className="object-contain group-hover:scale-110 transition-transform ease-in-out duration-500"
          />
        </div>

        {/* Content below */}
        <div className="px-4 py-2 h-full group-hover:bg-primary/40">
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
            className="font-bold text-secondary line-clamp-1"
          >
            Brand : {data.brandName}
          </Typography>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
