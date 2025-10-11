import { IngredientSimilarToWithFrom } from "@/types";
import IngredientListItem from "../IngredientSearchItem";

const SimilarIngredientListing = ({
  data,
}: {
  data: IngredientSimilarToWithFrom[];
}) => {
  return (
    <main className="block sm:grid md:grid-cols-2 lg:grid-cols-4 ">
      {data?.map((ingredient, index) => (
        <IngredientListItem data={ingredient?.from} key={index} />
      ))}
    </main>
  );
};

export default SimilarIngredientListing;
