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
import { IconFlask, IconTestPipe } from "@tabler/icons-react";
import {
  ArrowRightLeft,
  BadgeAlert,
  BadgeCheck,
  BookOpen,
  Command,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { positiveEffects } from "../ingredient/data";
import { productSummaries } from "./data";

const ComparisonResult = () => {
  const router = useRouter();
  return (
    <main>
      <PageHeader
        title="Comparison Result"
        showBackgroundImg={true}
        backgroundImage={ProductCompareBg}
      />
      <Wrapper className="flex-col space-y-12 h-fit w-full">
        {/* Product Header overview  */}
        <header className="space-y-4 block md:flex w-full gap-12 items-center">
          <ComparisonItem />
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
          <ComparisonItem />
        </header>

        {/* **** Positive Comparison effects ****  */}
        <section className="postiive block space-y-4 sm:space-y-0 gap-4">
          <ComparisonHeader
            icon={<BadgeCheck className="w-6 h-6 sm:w-10 sm:h-10" />}
            title="Benefit"
          />
          <div className="compare block space-y-4 sm:space-y-0 sm:flex gap-4">
            <BoxOutlineWrapper title={""} className="flex-1/2">
              <main className="block sm:grid gap-4 grid-cols-2 space-y-6 w-full ">
                {positiveEffects?.map((_, index) => (
                  <BadgeItem key={index} type="positive" />
                ))}
              </main>
            </BoxOutlineWrapper>
            <BoxOutlineWrapper title={""} className="flex-1/2">
              <main className="block sm:grid gap-4 grid-cols-2 space-y-6 w-full ">
                {positiveEffects?.map((_, index) => (
                  <BadgeItem key={index} type="positive" />
                ))}
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
            <BoxOutlineWrapper title={""} className="flex-1/2" type="negative">
              <main className="block sm:grid gap-4 grid-cols-2 space-y-6 w-full ">
                {positiveEffects?.map((_, index) => (
                  <BadgeItem key={index} type="negative" />
                ))}
              </main>
            </BoxOutlineWrapper>
            <BoxOutlineWrapper title={""} className="flex-1/2">
              <main className="block sm:grid gap-4 grid-cols-2 space-y-6 w-full ">
                {positiveEffects?.map((_, index) => (
                  <BadgeItem key={index} type="positive" />
                ))}
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
              <section className="border-2 border-primary px-4 py-4 rounded-2xl">
                <BadgeItem type="positive" icon={<Command />} />
              </section>
              {/* Right product key item  */}
              <section className="border-2 border-primary px-4 py-4 rounded-2xl">
                <BadgeItem type="positive" icon={<Command />} />
              </section>
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
            <BoxOutlineWrapper title={""} className="flex-1/2">
              <header className="text-center mb-6">
                <Typography
                  variant="h6"
                  as="p"
                  className="text-secondary font-bold"
                >
                  Centella sunscreen
                </Typography>
                <Typography
                  variant="caption"
                  as="p"
                  className="text-secondary font-bold"
                >
                  8 Ingredients
                </Typography>
              </header>
              <main className="block sm:grid gap-4 grid-cols-2 space-y-6 w-full ">
                {positiveEffects?.map((_, index) => (
                  <BadgeItem
                    className={"bg-transparent"}
                    key={index}
                    type="positive"
                    icon={<IconTestPipe />}
                  />
                ))}
              </main>
            </BoxOutlineWrapper>
            <BoxOutlineWrapper title={""} className="flex-1/2">
              <header className="text-center mb-6">
                <Typography
                  variant="h6"
                  as="p"
                  className="text-secondary font-bold"
                >
                  Low Ph Makeup
                </Typography>
                <Typography
                  variant="caption"
                  as="p"
                  className="text-secondary font-bold"
                >
                  8 Ingredients
                </Typography>
              </header>
              <main className="block sm:grid gap-4 grid-cols-2 space-y-6 w-full ">
                {positiveEffects?.map((_, index) => (
                  <BadgeItem
                    className={"bg-transparent"}
                    key={index}
                    type="positive"
                    icon={<IconTestPipe />}
                  />
                ))}
              </main>
            </BoxOutlineWrapper>
          </div>
        </section>
      </Wrapper>
    </main>
  );
};

export default ComparisonResult;
