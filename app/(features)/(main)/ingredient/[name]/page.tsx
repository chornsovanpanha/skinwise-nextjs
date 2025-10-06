import { getUserAnalyse } from "@/data/gemini";
import { getIngredientDetail } from "@/data/ingredient";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import React from "react";
import IngredientDetail from "./IngredientDetail";
import { trackUserSearch } from "@/actions/track/track-action";
type Params = {
  params: Promise<{ name: string }>;
};
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const paramsResult = await params;
  const ingredient = await getIngredientDetail({ alias: paramsResult.name });
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
  const ingredient = await getIngredientDetail({ alias: paramsResult.name });

  if (!ingredient) {
    return notFound();
  }

  const result = await trackUserSearch();
  //User has reach their limit view product ,ingredients and comparison ...
  if (!result?.data?.success) {
    return redirect("/pricing");
  }
  const data = await getUserAnalyse({
    insideGroup: JSON.stringify(ingredient?.insideGroups ?? ""),
    userSkinType: "Oily",
  });

  return <IngredientDetail analysis={data} ingredient={ingredient} />;
};

export default Page;
