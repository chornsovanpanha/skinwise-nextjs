import { Metadata } from "next";
import IngredientForm from "./IngredientForm";

export const metadata: Metadata = {
  title: "Ingredient",
  description: "Ingredient overview of admin dashboard",
};
const Page = () => {
  return <IngredientForm />;
};

export default Page;
