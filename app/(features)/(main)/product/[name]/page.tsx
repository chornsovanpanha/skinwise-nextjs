import { getProductDetail } from "@/data";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import React from "react";
import ProductDetail from "./ProductDetail";
import { getUserAnalyse } from "@/data/gemini";
import { trackUserSearch } from "@/actions/track/track-action";
import { PlanType } from "@/types";

type Params = {
  params: Promise<{ name: string }>;
};
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const paramsResult = await params;
  const product = await getProductDetail({ alias: paramsResult.name });
  if (!product) {
    return {
      title: "Product Not Found",
      description: "Sorry, we couldn’t find the product you are looking for.",
    };
  }

  return {
    title: `${product.name || paramsResult.name}`,
    description:
      product.desc?.slice(0, 100) || "Product details and information.",
    openGraph: {
      title: `${product.name || paramsResult.name}`,
      description:
        product.desc?.slice(0, 160) || "Product details and information.",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name || paramsResult.name}`,
      description:
        product.desc?.slice(0, 160) || "Product details and information.",
    },
  };
}
const Page: React.FC<Params> = async ({ params }) => {
  const paramsResult = await params;
  const product = await getProductDetail({ alias: paramsResult.name });
  if (!product) {
    return notFound();
  }
  let data;
  const result = await trackUserSearch();
  //User has reach their limit view product ,ingredients and comparison ...
  if (!result?.data?.success) {
    return redirect("/pricing");
  }

  if (result?.data?.planType === PlanType.PRO && result.data?.skinType) {
    data = await getUserAnalyse({
      insideGroup: JSON.stringify(product?.insideGroups ?? ""),
      userSkinType: "Normal Skin",
    });
  }

  return (
    <ProductDetail
      product={product}
      analysis={data}
      planType={result?.data?.planType}
    />
  );
};

export default Page;
