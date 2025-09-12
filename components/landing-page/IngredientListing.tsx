"use client";
import { dummyIngredientLists } from "@/utils/mock";
import { useRouter } from "next/navigation";
import IngredientListItem from "../IngredientListItem";
import Wrapper from "../custom/layout/Wrapper";
const IngredientListing = () => {
  const router = useRouter();
  const handleClickIngredient = (item: (typeof dummyIngredientLists)[0]) => {
    router.push(`/ingredient/${item.name?.toLowerCase()}`);
  };
  return (
    <Wrapper
      maxHeight={false}
      className="block sm:grid grid-cols-4 gap-4 overflow-x-scroll no-scrollbar"
    >
      {dummyIngredientLists?.map((ingredient) => (
        <IngredientListItem
          data={ingredient}
          key={ingredient.id}
          onPress={() => handleClickIngredient(ingredient)}
        />
      ))}
    </Wrapper>
  );
};

export default IngredientListing;
