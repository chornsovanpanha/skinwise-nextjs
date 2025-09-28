import { Metadata } from "next";
import BrandForm from "./BrandForm";

export const metadata: Metadata = {
  title: "Brand Form",
  description: "Brand overview of admin dashboard",
};
const Page = () => {
  return <BrandForm />;
};

export default Page;
