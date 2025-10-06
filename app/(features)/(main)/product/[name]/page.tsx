import { getProductDetail } from "@/data";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import ProductDetail from "./ProductDetail";
import { getUserAnalyse } from "@/data/gemini";

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

  const data = await getUserAnalyse({
    insideGroup: JSON.stringify(product?.insideGroups ?? ""),
    userSkinType: "Normal Skin",
  });

  if (!product) {
    return notFound();
  }

  return <ProductDetail product={product} analysis={data} />;
};

export default Page;
