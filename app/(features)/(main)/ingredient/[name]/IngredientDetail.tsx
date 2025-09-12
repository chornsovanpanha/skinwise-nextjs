"use client";
import AboutItem from "@/components/AboutItem";
import BadgeItem from "@/components/BadgeItem";
import BoxOutlineWrapper from "@/components/BoxOutlineWrapper";
import Wrapper from "@/components/custom/layout/Wrapper";
import HeaderOverview from "@/components/ingredient/HeaderOverview";
import ProductFoundListing from "@/components/ingredient/ProductFoundListing";
import SimilarIngredientListing from "@/components/ingredient/SimilarIngredientListing";
import PageHeader from "@/components/PageHeader";
import { Typography } from "@/components/Typography";
import clsx from "clsx";
import { AboutIngredients, positiveEffects } from "../data";

const IngredientDetail = ({ name }: { name: string }) => {
  return (
    <main className="mb-12">
      <PageHeader title="Overview" showBackgroundImg />
      {/* <PageHeader
        title="Good match"
        showBackgroundImg
        showPercentage
        desc="best ingredient for your face problem"
        subtitle="96%"
      /> */}

      <Wrapper className="flex-col sm:space-y-0 gap-4">
        {/* **** Header overview ****  */}
        <HeaderOverview name={name} />
        {/* **** About Ingredient ****  */}
        <BoxOutlineWrapper title={"About this ingredient"}>
          <main className="block sm:grid gap-4 grid-cols-3 space-y-6 sm:space-y-4">
            {AboutIngredients?.map((ingredient, index) => (
              <AboutItem data={ingredient} key={index} />
            ))}
          </main>
        </BoxOutlineWrapper>

        {/* **** Positive effects ****  */}
        <BoxOutlineWrapper title={"Positive effects"}>
          <main className="block sm:grid gap-4 grid-cols-3 space-y-6 ">
            {positiveEffects?.map((_, index) => (
              <BadgeItem key={index} type="positive" />
            ))}
          </main>
        </BoxOutlineWrapper>
        {/* **** Negative effects **** */}
        <BoxOutlineWrapper title={"Negative effects"} type="negative">
          <main className="block sm:grid gap-4 grid-cols-3 space-y-6">
            {positiveEffects?.map((_, index) => (
              <BadgeItem key={index} type="negative" />
            ))}
          </main>
        </BoxOutlineWrapper>

        {/* **** Similar Ingredients ****  */}
        <section className="ingredient py-12 space-y-4">
          <Typography
            as="h6"
            variant="subtitle1"
            className={clsx(" !text-md sm:!text-xl text-secondary")}
          >
            Similar Ingredient
          </Typography>
          <SimilarIngredientListing />
        </section>

        {/* **** Product Found in ****  */}
        <section className="space-y-6">
          <Typography
            as="h6"
            variant="subtitle1"
            className={clsx(" !text-md sm:!text-xl text-secondary")}
          >
            Products found in {name}
          </Typography>
          <ProductFoundListing />
        </section>
      </Wrapper>
    </main>
  );
};

export default IngredientDetail;
