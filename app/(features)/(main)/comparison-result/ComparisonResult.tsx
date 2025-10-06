"use client";
import { ProductCompareBg } from "@/assets";
import BadgeItem from "@/components/BadgeItem";
import BoxOutlineWrapper from "@/components/BoxOutlineWrapper";
import ComparisonHeader from "@/components/comparison/ComparisonHeader";
import ComparisonItem from "@/components/comparison/ComparisonItem";
import Wrapper from "@/components/custom/layout/Wrapper";
import PageHeader from "@/components/PageHeader";
import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { ProductComparison } from "@/types";
import { ProductSummaryType } from "@/types/response";
import { IconFlask, IconTestPipe } from "@tabler/icons-react";
import {
  ArrowRightLeft,
  BadgeAlert,
  BadgeCheck,
  BookOpen,
  Command,
} from "lucide-react";
import { useRouter } from "next/navigation";

const ComparisonResult = ({
  data,
  productSummaries,
}: {
  data?: ProductComparison[];
  productSummaries?: ProductSummaryType[];
}) => {
  const router = useRouter();
  const primaryProduct = data?.at(0);
  const secondaryProduct = data?.at(1);
  const positivePirmaryEffects = primaryProduct?.effects.filter(
    (effect) => effect.type == "POSITIVE"
  );
  const positiveSecondaryEffects = secondaryProduct?.effects.filter(
    (effect) => effect.type == "POSITIVE"
  );
  const negativePirmaryEffects = primaryProduct?.effects.filter(
    (effect) => effect.type == "NEGATIVE"
  );
  const negativeSecondaryEffects = secondaryProduct?.effects.filter(
    (effect) => effect.type == "NEGATIVE"
  );

  const primaryKeyIngredients = primaryProduct?.ingredients?.filter(
    (ingred) => ingred.isKey
  );
  const secondaryKeyIngredient = secondaryProduct?.ingredients?.filter(
    (ingred) => ingred.isKey
  );

  return (
    <main>
      <PageHeader
        title={`Comparison Result`}
        showBackgroundImg={true}
        backgroundImage={ProductCompareBg}
      />
      <Wrapper className="flex-col space-y-12 h-fit w-full">
        {/* Product Header overview  */}
        <header className="space-y-4 block md:flex w-full gap-12 items-center">
          <ComparisonItem
            brandName={primaryProduct?.brand?.title ?? ""}
            imgUrl={primaryProduct?.Image?.at(0)?.url ?? ""}
            ingredientsCount={primaryProduct?.ingredients?.length ?? 0}
            title={primaryProduct?.name ?? "Unnamed Product"}
            showFlag
            country={primaryProduct?.brand?.country ?? ""}
          />
          <div className="grid justify-self-center col-span-1  place-items-center gap-4">
            <ArrowRightLeft className="w-8 h-8 md:w-10 md:h-10 text-primary" />
            <Button
              className="text-secondary rounded-2xl"
              onClick={() => {
                router.push("/product-comparison");
              }}
            >
              New Comparison
            </Button>
          </div>
          <ComparisonItem
            brandName={primaryProduct?.brand?.country ?? ""}
            imgUrl={secondaryProduct?.Image?.at(0)?.url ?? ""}
            ingredientsCount={secondaryProduct?.ingredients?.length ?? 0}
            title={secondaryProduct?.name ?? "Unnamed Product"}
            showFlag
            country={primaryProduct?.brand?.country ?? ""}
          />
        </header>

        {/* **** Positive Comparison effects ****  */}
        <section className="postiive block space-y-4 sm:space-y-0 gap-4">
          <ComparisonHeader
            icon={<BadgeCheck className="w-6 h-6 sm:w-10 sm:h-10" />}
            title="Benefit"
          />
          <div className="compare block space-y-4 sm:space-y-0 sm:flex gap-4">
            <BoxOutlineWrapper title={""} className="flex-1/2 hover-box">
              <main className="block sm:grid gap-4 grid-cols-2 space-y-6 w-full ">
                {positivePirmaryEffects?.map((item, index) => (
                  <BadgeItem
                    key={index}
                    type="positive"
                    title={item.title}
                    subtitle={item.shortDesc ?? ""}
                  />
                ))}
                {positivePirmaryEffects?.length == 0 && (
                  <BadgeItem
                    key={"1"}
                    type="positive"
                    title={"No Information"}
                    subtitle={"N/A"}
                  />
                )}
              </main>
            </BoxOutlineWrapper>
            <BoxOutlineWrapper title={""} className="flex-1/2 hover-box">
              <main className="block sm:grid gap-4 grid-cols-2 space-y-6 w-full ">
                {positiveSecondaryEffects?.map((item, index) => (
                  <BadgeItem
                    key={index}
                    type="positive"
                    title={item.title}
                    subtitle={item.shortDesc ?? ""}
                  />
                ))}
                {positiveSecondaryEffects?.length == 0 && (
                  <BadgeItem
                    key={"1"}
                    type="positive"
                    title={"No Information"}
                    subtitle={"N/A"}
                  />
                )}
              </main>
            </BoxOutlineWrapper>
          </div>
        </section>

        {/* **** Concern Comparison effects ****  */}
        <section className="negative block space-y-4 sm:space-y-0 gap-4">
          <ComparisonHeader
            className="text-error-main"
            icon={
              <BadgeAlert className="w-6 h-6 sm:w-10 sm:h-10 text-error-main" />
            }
            title="Concern"
          />
          <div className="compare block space-y-4 sm:space-y-0 sm:flex gap-4">
            <BoxOutlineWrapper
              title={""}
              className="flex-1/2 hover-box"
              type="negative"
            >
              <main className="block sm:grid gap-4 grid-cols-2 space-y-6 w-full ">
                {negativePirmaryEffects?.map((item, index) => (
                  <BadgeItem
                    key={index}
                    type="negative"
                    title={item.title}
                    subtitle={item.shortDesc ?? ""}
                  />
                ))}
                {negativePirmaryEffects?.length == 0 && (
                  <BadgeItem
                    key={"1"}
                    type="negative"
                    title={"No Information"}
                    subtitle={"N/A"}
                  />
                )}
              </main>
            </BoxOutlineWrapper>

            <BoxOutlineWrapper
              title={""}
              className="flex-1/2 hover-box"
              type="negative"
            >
              <main className="block sm:grid gap-4 grid-cols-2 space-y-6 w-full ">
                {negativeSecondaryEffects?.map((item, index) => (
                  <BadgeItem
                    key={index}
                    type="negative"
                    title={item.title}
                    subtitle={item.shortDesc ?? ""}
                  />
                ))}
                {negativeSecondaryEffects?.length == 0 && (
                  <BadgeItem
                    key={"1"}
                    type="negative"
                    title={"No Information"}
                    subtitle={"N/A"}
                  />
                )}
              </main>
            </BoxOutlineWrapper>
          </div>
        </section>

        {/* **** Overview Comparison effects ****  */}
        <section className="negative block space-y-4 sm:space-y-0 gap-4">
          <ComparisonHeader
            icon={<BookOpen className="w-6 h-6 sm:w-10 sm:h-10" />}
            title="Overview"
          />
          <div className="compare block space-y-4 sm:space-y-0 sm:flex gap-4">
            <BoxOutlineWrapper title={""} className="flex-1">
              <main className="block sm:grid gap-4 space-y-6 w-full ">
                {productSummaries?.map((compare, index) => (
                  <li className="list-none" key={index}>
                    <Typography
                      variant="h6"
                      as="p"
                      className="text-secondary font-bold"
                    >
                      {compare.title}
                    </Typography>
                    <Typography
                      variant="default"
                      as="p"
                      className="text-secondary"
                    >
                      {compare.desc}
                    </Typography>
                  </li>
                ))}
              </main>
            </BoxOutlineWrapper>
          </div>
        </section>

        {/* **** Key Ingredients  ****  */}
        <section className="key-ingredients block space-y-4 sm:space-y-0 gap-4">
          <ComparisonHeader
            icon={<BookOpen className="w-6 h-6 sm:w-10 sm:h-10" />}
            title="Key Ingredients"
          />
          <div className="compare block space-y-4 sm:space-y-0 sm:flex gap-4">
            <main className="block sm:grid sm:grid-cols-2 gap-4 space-y-6 sm:space-y-0 w-full my-4">
              {/* Left product key item  */}
              {!!primaryKeyIngredients?.length && (
                <section className="border-2 border-primary px-4 py-4 rounded-2xl hover-box">
                  {primaryKeyIngredients?.map((ingred, index) => (
                    <BadgeItem
                      key={index}
                      title={ingred.ingredient?.name ?? ""}
                      subtitle={ingred.ingredient?.desc ?? ""}
                      type="positive"
                      icon={<Command />}
                    />
                  ))}
                </section>
              )}
              {/* Right product key item  */}
              {!!secondaryKeyIngredient?.length && (
                <section className="border-2 border-primary px-4 py-4 rounded-2xl hover-box">
                  {secondaryKeyIngredient?.map((ingred, index) => (
                    <BadgeItem
                      key={index}
                      title={ingred.ingredient?.name ?? ""}
                      subtitle={ingred.ingredient?.desc ?? ""}
                      type="positive"
                      icon={<Command />}
                    />
                  ))}
                </section>
              )}
            </main>
          </div>
        </section>

        {/* **** Ingredient side by side  ****  */}
        <section className="ingredients block space-y-4 sm:space-y-0 gap-4">
          <ComparisonHeader
            icon={<IconFlask className="w-6 h-6 sm:w-10 sm:h-10" />}
            title="Ingredient side by side"
          />
          <div className="compare block space-y-4 sm:space-y-0 sm:flex gap-4">
            <BoxOutlineWrapper title={""} className="flex-1/2 hover-box">
              <header className="text-center mb-6">
                <Typography
                  variant="h6"
                  as="p"
                  className="text-secondary font-bold"
                >
                  {primaryProduct?.name}
                </Typography>
                {primaryProduct?.ingredients && (
                  <Typography
                    variant="caption"
                    as="p"
                    className="text-secondary font-bold"
                  >
                    {primaryProduct?.ingredients.length}{" "}
                    {primaryProduct?.ingredients.length > 1
                      ? "Ingredients"
                      : "Ingredient"}
                  </Typography>
                )}
              </header>
              <main className="block sm:grid gap-4 grid-cols-2 w-full space-y-6 sm:space-y-0">
                {primaryProduct?.ingredients?.map((item, index) => (
                  <BadgeItem
                    className={"bg-transparent"}
                    key={index}
                    subtitle={item.ingredient?.desc ?? ""}
                    title={item.ingredient?.name ?? ""}
                    type="positive"
                    icon={<IconTestPipe />}
                  />
                ))}
                {!primaryProduct?.ingredients?.length && (
                  <BadgeItem
                    className={"bg-transparent"}
                    subtitle={"N/A"}
                    title={"No Information"}
                    type="positive"
                    icon={<IconTestPipe />}
                  />
                )}
              </main>
            </BoxOutlineWrapper>
            <BoxOutlineWrapper
              title={""}
              className="flex-1/2 hover:scale-102 transform transition-transform duration-300 ease-in-out "
            >
              <header className="text-center mb-6">
                <Typography
                  variant="h6"
                  as="p"
                  className="text-secondary font-bold"
                >
                  {secondaryProduct?.name}
                </Typography>

                {secondaryProduct?.ingredients && (
                  <Typography
                    variant="caption"
                    as="p"
                    className="text-secondary font-bold"
                  >
                    {secondaryProduct?.ingredients.length}{" "}
                    {secondaryProduct?.ingredients.length > 1
                      ? "Ingredients"
                      : "Ingredient"}
                  </Typography>
                )}
              </header>
              <main className="block sm:grid gap-4 grid-cols-2 space-y-6 sm:space-y-0 w-full">
                {secondaryProduct?.ingredients?.map((item, index) => (
                  <BadgeItem
                    className={"bg-transparent"}
                    key={index}
                    subtitle={item.ingredient?.desc ?? ""}
                    title={item.ingredient?.name ?? ""}
                    type="positive"
                    icon={<IconTestPipe />}
                  />
                ))}
                {!secondaryProduct?.ingredients?.length && (
                  <BadgeItem
                    className={"bg-transparent"}
                    subtitle={"N/A"}
                    title={"No Information"}
                    type="positive"
                    icon={<IconTestPipe />}
                  />
                )}
              </main>
            </BoxOutlineWrapper>
          </div>
        </section>
      </Wrapper>
    </main>
  );
};

export default ComparisonResult;
