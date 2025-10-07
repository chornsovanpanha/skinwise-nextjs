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
import { AnalyseData, IngredientWithSimilar, PlanType } from "@/types";
import clsx from "clsx";

type IngredientDetailProps = {
  ingredient: IngredientWithSimilar;
  analysis?: AnalyseData | null;
  planType?: PlanType;
};
const IngredientDetail: React.FC<IngredientDetailProps> = ({
  ingredient,
  analysis,
  planType,
}) => {
  const positiveEffects = ingredient.effects.filter(
    (effect) => effect.type == "POSITIVE"
  );
  const negativeEffects = ingredient.effects.filter(
    (effect) => effect.type == "NEGATIVE"
  );

  return (
    <main className="mb-12">
      {/* <PageHeader title="Overview" showBackgroundImg /> */}
      <PageHeader
        title={
          analysis?.score && planType == PlanType.PRO
            ? analysis?.scoreDesc
            : "Overview"
        }
        showBackgroundImg
        showPercentage
        desc={
          planType == PlanType.PRO ? analysis?.shortDesc ?? "N/A" : undefined
        }
        subtitle={
          analysis && planType == PlanType.PRO ? `${analysis?.score}%` : ""
        }
      />

      <Wrapper className="flex-col sm:space-y-0 gap-4">
        {/* **** Header overview ****  */}
        <HeaderOverview
          name={ingredient?.name ?? name ?? ""}
          desc={ingredient.desc ?? "N/A"}
        />
        {/* **** About Ingredient ****  */}
        {ingredient && !!ingredient?.insideGroups?.length && (
          <BoxOutlineWrapper
            title={"About this ingredient"}
            className="hover-box"
          >
            <main className="block sm:grid gap-4 grid-cols-3 space-y-6 sm:space-y-4">
              {ingredient?.insideGroups?.map((ingredient, index) => (
                <AboutItem data={ingredient?.title} key={index} />
              ))}
            </main>
          </BoxOutlineWrapper>
        )}

        {/* **** Positive effects ****  */}
        {ingredient && !!positiveEffects?.length && (
          <BoxOutlineWrapper title={"Positive effects"} className="hover-box">
            <main className="block sm:grid gap-4 grid-cols-3 space-y-6 ">
              {positiveEffects?.map((item, index) => (
                <BadgeItem
                  key={index}
                  type="positive"
                  title={item.title}
                  subtitle={item.shortDesc ?? ""}
                />
              ))}
            </main>
          </BoxOutlineWrapper>
        )}
        {/* **** Negative effects **** */}
        {ingredient && !!negativeEffects?.length && (
          <BoxOutlineWrapper
            title={"Negative effects"}
            type="negative"
            className="hover-box"
          >
            <main className="block sm:grid gap-4 grid-cols-3 space-y-6">
              {negativeEffects?.map((item, index) => (
                <BadgeItem
                  key={index}
                  type="negative"
                  title={item.title}
                  subtitle={item.shortDesc ?? ""}
                />
              ))}
            </main>
          </BoxOutlineWrapper>
        )}

        {/* **** Similar Ingredients ****  */}
        {ingredient && !!ingredient?.similarTo?.length && (
          <section className="ingredient py-12 space-y-4">
            <Typography
              as="h6"
              variant="subtitle1"
              className={clsx(" !text-md sm:!text-xl text-secondary")}
            >
              Similar Ingredient
            </Typography>
            <SimilarIngredientListing data={ingredient?.similarTo} />
          </section>
        )}

        {/* **** Product Found in ****  */}
        {ingredient && !!ingredient?.products?.length && (
          <section className="space-y-6">
            <Typography
              as="h6"
              variant="subtitle1"
              className={clsx(" !text-md sm:!text-xl text-secondary")}
            >
              Products found in {ingredient?.name}
            </Typography>
            <ProductFoundListing products={ingredient?.products} />
          </section>
        )}
      </Wrapper>
    </main>
  );
};

export default IngredientDetail;
