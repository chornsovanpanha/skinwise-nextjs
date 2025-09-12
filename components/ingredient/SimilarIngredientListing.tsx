import { similarIngredients } from "@/app/(features)/(main)/ingredient/data";
import IngredientListItem from "../IngredientListItem";

const SimilarIngredientListing = () => {
  return (
    <main className="block sm:grid md:grid-cols-2 lg:grid-cols-4 ">
      {similarIngredients?.map((ingredient) => (
        <IngredientListItem
          data={ingredient}
          key={ingredient.id}
          onPress={() => {}}
        />
      ))}
    </main>
  );
};

export default SimilarIngredientListing;
