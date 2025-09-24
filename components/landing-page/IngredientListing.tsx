"use client";
import { dummyIngredientLists } from "@/utils/mock";
import IngredientListItem from "../IngredientListItem";
import Wrapper from "../custom/layout/Wrapper";
const IngredientListing = () => {
  return (
    <Wrapper
      maxHeight={false}
      className="block sm:grid grid-cols-4 gap-4 overflow-x-scroll no-scrollbar"
    >
      {dummyIngredientLists?.map((ingredient) => (
        <IngredientListItem data={ingredient} key={ingredient.id} />
      ))}
    </Wrapper>
  );
};

export default IngredientListing;
