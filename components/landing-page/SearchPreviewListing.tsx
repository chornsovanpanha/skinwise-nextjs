import { SearchType } from "@/types";
import { searchPreviewListing } from "@/utils/mock";
import IngredientListItem from "../IngredientListItem";
import SmallProductItem from "../SmallProductItem";

const SearchPreviewListing = ({
  onPress,
}: {
  onPress: (type: SearchType) => void;
}) => {
  return (
    <div className="box-area absolute top-18 left-0 right-0 bg-white rounded-none rounded-b-2xl z-10 shadow pt-6">
      {searchPreviewListing?.ingredients?.map((ingred) => (
        <IngredientListItem
          data={ingred}
          key={ingred.id}
          onPress={() => onPress("ingredient")}
        />
      ))}
      {searchPreviewListing?.products?.map((product) => (
        <SmallProductItem
          showBrand={true}
          product={product}
          type="routine"
          onPress={() => onPress("product")}
          key={product.id}
        />
      ))}
    </div>
  );
};

export default SearchPreviewListing;
