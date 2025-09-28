import { Metadata } from "next";
import ProductForm from "./ProductForm";
export const metadata: Metadata = {
  title: "Create Product",
  description: "Form overview of admin dashboard",
};
const Page = () => {
  return <ProductForm />;
};

export default Page;
