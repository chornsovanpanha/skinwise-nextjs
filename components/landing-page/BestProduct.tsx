import { getPopularProducts } from "@/data";
import HeaderOverview from "./HeaderOverview";
import PopularProductListing from "./PopularProductListing";
import { ProductWithBrandAndImages } from "@/types";

const BestProduct = async () => {
  const products = await getPopularProducts();

  return (
    <main className="flex-col my-12">
      <HeaderOverview
        orientation="right"
        shortDesc="top product searched this month"
        shortDescPrimary="favor by user"
        title="Best Product"
        titlePrimary="Ingredient"
      />

      {/* Products Section */}
      <section className="products bg-primary/50  py-12 left-0 ">
        <PopularProductListing
          products={(products as ProductWithBrandAndImages[]) ?? []}
        />
      </section>
    </main>
  );
};

export default BestProduct;
