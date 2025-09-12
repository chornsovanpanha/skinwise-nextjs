import React from "react";
import IngredientDetail from "./IngredientDetail";

type Params = {
  params: Promise<{ name: string }>;
};
const Page: React.FC<Params> = async ({ params }) => {
  const paramsResult = await params;
  return <IngredientDetail name={paramsResult.name} />;
};

export default Page;
