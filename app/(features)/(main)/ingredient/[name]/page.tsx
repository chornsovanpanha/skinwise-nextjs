import { trackUserSearch } from "@/actions/track/track-action";
import { getUserIngredientAnalyse } from "@/data/gemini";
import { getIngredientDetail } from "@/data/ingredient";
import { PlanType } from "@/types";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import React from "react";
import IngredientDetail from "./IngredientDetail";
type Params = {
  params: Promise<{ name: string }>;
};
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const paramsResult = await params;
  const ingredient = await getIngredientDetail({
    alias: paramsResult.name,
    updateCount: false,
  });
  if (!ingredient) {
    return {
      title: "Ingredient Not Found",
      description:
        "Sorry, we couldn’t find the ingredient you are looking for.",
    };
  }

  return {
    title: `${ingredient.name || paramsResult.name}`,
    description:
      ingredient.desc?.slice(0, 100) || "Ingredient details and information.",
    openGraph: {
      title: `${ingredient.name || paramsResult.name}`,
      description:
        ingredient.desc?.slice(0, 160) || "Ingredient details and information.",
    },
    twitter: {
      card: "summary_large_image",
      title: `${ingredient.name || paramsResult.name}`,
      description:
        ingredient.desc?.slice(0, 160) || "Ingredient details and information.",
    },
  };
}

const Page: React.FC<Params> = async ({ params }) => {
  const paramsResult = await params;
  const result = await trackUserSearch();
  //User has reach their limit view product ,ingredients and comparison ...
  if (!result?.data?.success) {
    return redirect("/pricing");
  }
  const ingredient = await getIngredientDetail({ alias: paramsResult.name });
  if (!ingredient) {
    return notFound();
  }

  let data;

  if (result?.data?.planType === PlanType.PRO && result.data?.skinType) {
    data = await getUserIngredientAnalyse({
      skinConcerns: result.data?.skinConcern?.toString() ?? "",
      userSkinType: result.data.skinType ?? "Unknown",
      name: ingredient.name ?? "",
    });
  }

  return (
    <IngredientDetail
      analysis={data}
      ingredient={ingredient}
      planType={result?.data?.planType}
    />
  );
};

export default Page;
