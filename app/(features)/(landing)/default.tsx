import AboutUs from "@/components/landing-page/AboutUs";
import BestProduct from "@/components/landing-page/BestProduct";
import ExploreIngredient from "@/components/landing-page/ExploreIngredient";
import HeaderBanner from "@/components/landing-page/HeaderBanner";

const LandingDefault = () => {
  return (
    <main className="w-full ">
      {/*  ******* Header Banner Section *******  */}
      <HeaderBanner />
      {/* ******* Body Section *******  */}
      <section className="flex flex-col space-y-4">
        <BestProduct />
        <ExploreIngredient />
        <AboutUs />
      </section>
    </main>
  );
};

export default LandingDefault;
