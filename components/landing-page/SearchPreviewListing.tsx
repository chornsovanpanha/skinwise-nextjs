import { ScrollArea } from "@/components/ui/scroll-area";
import { Ingredient, Product, SearchType } from "@/types";
import IngredientListItem from "../IngredientListItem";
import SmallProductItem from "../SmallProductItem";

const SearchPreviewListing = ({
  onPress,
  products,
  ingredients,
}: {
  onPress: (type: SearchType) => void;
  products?: Product[];
  ingredients?: Ingredient[];
}) => {
  return (
    <div className="box-area absolute top-18 left-0 right-0 bg-white rounded-none rounded-b-2xl z-10 shadow pt-6">
      <ScrollArea className="h-[400px]">
        {ingredients?.map((ingred) => (
          <IngredientListItem
            data={ingred}
            key={ingred.id}
            onPress={() => onPress("ingredient")}
          />
        ))}
        {products?.map((product) => (
          <SmallProductItem
            showBrand={true}
            product={product}
            type="routine"
            onPress={() => onPress("product")}
            key={product.id}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export default SearchPreviewListing;
