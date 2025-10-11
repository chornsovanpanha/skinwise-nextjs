import { Metadata } from "next";
import Ingredient from "./(tables)/Ingredient";

export const metadata: Metadata = {
  title: "Ingredient",
  description: "Ingredient overview of admin dashboard",
};
const Page = () => {
  return <Ingredient />;
};

export default Page;
