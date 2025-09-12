import React from "react";
import ProductDetail from "./ProductDetail";

type Params = {
  params: Promise<{ name: string }>;
};
const Page: React.FC<Params> = async ({ params }) => {
  const paramsResult = await params;
  return <ProductDetail name={paramsResult.name} />;
};

export default Page;
