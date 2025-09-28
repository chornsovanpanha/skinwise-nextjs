"use client";
import { Ingredient } from "@prisma/client";
import IngredientListItem from "../IngredientListItem";
import Wrapper from "../custom/layout/Wrapper";
type IngredientListingProps = {
  data: Ingredient[];
};
const IngredientListing: React.FC<IngredientListingProps> = ({ data }) => {
  return (
    <Wrapper
      maxHeight={false}
      className="block sm:grid grid-cols-4 gap-4 overflow-x-scroll no-scrollbar"
    >
      {data?.map((ingredient) => (
        <IngredientListItem data={ingredient} key={ingredient.id} />
      ))}
    </Wrapper>
  );
};

export default IngredientListing;
