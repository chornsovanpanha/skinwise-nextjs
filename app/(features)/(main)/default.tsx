import AboutUs from "@/components/landing-page/AboutUs";
import BestProduct from "@/components/landing-page/BestProduct";
import ExploreIngredient from "@/components/landing-page/ExploreIngredient";
import HeaderSearchBanner from "@/components/landing-page/HeaderSearchBanner";
import ExploreIngredientSkeleton from "@/components/skeleton/ExploreIngredientSkeleton";
import { Suspense } from "react";

const LandingDefault = async () => {
  return (
    <main className="w-full ">
      {/*  ******* Header Banner Section *******  */}
      <HeaderSearchBanner />

      {/* ******* Body Section *******  */}
      <section className="flex flex-col space-y-4">
        <Suspense fallback={<ExploreIngredientSkeleton />}>
          <BestProduct />
        </Suspense>
        <Suspense fallback={<ExploreIngredientSkeleton />}>
          <ExploreIngredient />
        </Suspense>
        <AboutUs />
      </section>
    </main>
  );
};

export default LandingDefault;
