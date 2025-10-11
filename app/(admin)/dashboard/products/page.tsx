import { Metadata } from "next";
import Product from "./(tables)/Product";

export const metadata: Metadata = {
  title: "Product",
  description: "Product overview of admin dashboard",
};
const Page = () => {
  return <Product />;
};

export default Page;
