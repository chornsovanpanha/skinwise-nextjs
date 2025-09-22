import { recentProductsListing } from "@/utils/mock";
import SmallProductItem from "../SmallProductItem";
import { ScrollArea } from "../ui/scroll-area";

const RecentProductListing = () => {
  return (
    <div className="box-area absolute top-18 left-0 right-0 bg-white rounded-none rounded-b-2xl z-10 shadow pt-6">
      <ScrollArea className="h-[400px]">
        <h2 className=" text-lg  md:text-2xl font-bold mb-4">
          Recently viewed
        </h2>
        {recentProductsListing.map((product, index) => (
          <SmallProductItem
            onPress={() => {}}
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
