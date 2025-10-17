import { getPartialIngredients } from "@/data/ingredient";
import HeaderOverview from "./HeaderOverview";
import IngredientListing from "./IngredientListing";

const ExploreIngredient = async () => {
  const ingredients = await getPartialIngredients();
  return (
    <main className="flex-col my-12">
      <HeaderOverview
        orientation="left"
        shortDesc="Top searched ingredient this month"
        shortDescPrimary="favor by user"
        title="Explore"
        titlePrimary="Ingredient"
      />

      {/* Ingredients Section */}
      <section className="products bg-primary/10  py-12 left-0">
        <IngredientListing data={ingredients} />
      </section>
    </main>
  );
};

export default ExploreIngredient;
