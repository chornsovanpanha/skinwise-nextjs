import { getUserAnalyse } from "@/data/gemini";
import { getIngredientDetail } from "@/data/ingredient";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import IngredientDetail from "./IngredientDetail";
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
  const data = await getUserAnalyse({
    insideGroup: JSON.stringify(ingredient?.insideGroups ?? ""),
    userSkinType: "Oily",
  });

  if (!ingredient) {
    return notFound();
  }

  console.log("Data is >>>", data);

  return <IngredientDetail analysis={data} ingredient={ingredient} />;
};

export default Page;
