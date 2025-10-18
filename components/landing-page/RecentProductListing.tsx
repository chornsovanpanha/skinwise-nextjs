import { recentSearchProductAtom } from "@/lib/atom/search.atom";
import { ProductWithBrandAndImages, SearchType } from "@/types";
import { useAtomValue } from "jotai";
import SmallProductItem from "../SmallProductItem";
import { ScrollArea } from "../ui/scroll-area";

const RecentProductListing = ({
  onPress,
}: {
  onPress: (
    type: SearchType,
    alias: string,
    product?: ProductWithBrandAndImages
  ) => void;
}) => {
  const recentSearch = useAtomValue(recentSearchProductAtom);
  return (
    <div className="box-area absolute top-18 left-0 right-0 bg-white rounded-none rounded-b-2xl z-10 shadow pt-6 mx-4 sm:w-full sm:mx-0">
      <ScrollArea className="h-[400px]">
        <h2 className=" text-lg  md:text-xl font-bold mb-4">Recently viewed</h2>
        {recentSearch?.map((product, index) => (
          <SmallProductItem
            onPress={() => onPress("product", product.alias ?? "", product)}
            key={index}
            product={product}
            showBrand
            type="routine"
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export default RecentProductListing;
