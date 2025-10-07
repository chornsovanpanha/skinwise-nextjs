import { ScrollArea } from "@/components/ui/scroll-area";
import { ProductWithBrandAndImages, SearchType } from "@/types";
import { Ingredient } from "@prisma/client";
import IngredientListItem from "../IngredientListItem";
import SmallProductItem from "../SmallProductItem";
import { Typography } from "../Typography";

const SearchPreviewListing = ({
  onPress,
  products,
  ingredients,
}: {
  onPress: (
    type: SearchType,
    alias: string,
    product?: ProductWithBrandAndImages
  ) => void;
  products?: ProductWithBrandAndImages[];
  ingredients?: Ingredient[];
}) => {
  return (
    <div className="box-area absolute top-18 left-0 right-0 bg-white rounded-none rounded-b-2xl z-10 shadow pt-6">
      <ScrollArea className="h-[400px]">
        {ingredients?.map((ingred) => (
          <IngredientListItem data={ingred} key={ingred.id} />
        ))}
        {!products?.length && (
          <div className="space-y-2 flex flex-col justify-center items-center">
            <Typography variant="h6" className="text-secondary">
              Not Found
            </Typography>
            <Typography variant="default" className="text-secondary/80">
              We could not find any related product matching your search.
            </Typography>
          </div>
        )}
        {products?.map((product) => (
          <SmallProductItem
            showBrand={true}
            product={product}
            type="routine"
            onPress={() => onPress("product", product?.alias ?? "", product)}
            key={product.id}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export default SearchPreviewListing;
