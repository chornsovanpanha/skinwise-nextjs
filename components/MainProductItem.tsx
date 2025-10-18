import { ProductWithBrandAndImages } from "@/types";
import { calendars } from "@/utils/constant/data";
import clsx from "clsx";
import Link from "next/link";
import { Typography } from "./Typography";
import ProductImage from "./product/ProductImage";
import { Badge } from "./ui/badge";

const MainProductItem = ({
  data,
  allowLink = true,
  showCalendar = false,
  usages,
}: {
  data: ProductWithBrandAndImages;
  allowLink?: boolean;
  showCalendar?: boolean;
  usages?: string[];
}) => {
  const imageUrl = data.Image?.[0]?.url;
  const brandName = data.brand?.title ?? "Unknown Brand";

  return (
    <div className="group border border-primary rounded-xl overflow-hidden h-[480px] hover:cursor-pointer ">
      <Link
        prefetch={false}
        href={`/product/${data.alias}`}
        className={clsx({
          "pointer-events-none": !allowLink,
        })}
      >
        {/* Image on top */}
        <div className="relative w-full h-[350px] group overflow-hidden bg-white">
          <ProductImage src={imageUrl} alt={data.alias ?? "product-image"} />
        </div>
        {/* Content below */}

        <div className="px-4 py-2 h-full group-hover:bg-primary/40 space-y-2">
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
          {showCalendar && usages && (
            <div className="space-x-2 flex items-center mt-1">
              {calendars?.map((item, index) => {
                return (
                  <Badge
                    key={index}
                    className={clsx(
                      "text-secondary bg-primary/50 cursor-pointer hover:bg-primary rounded-full",
                      {
                        "border-2 border-primary bg-secondary text-primary hover:text-primary hover:bg-secondary":
                          usages?.includes(item),
                      }
                    )}
                  >
                    {item}
                  </Badge>
                );
              })}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default MainProductItem;
