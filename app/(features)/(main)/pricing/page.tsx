import { Metadata } from "next";
import Pricing from "./Pricing";
export const metadata: Metadata = {
  title: "Pricing Plan",
  description: "This is a pricing page preview for user.",
};
const Page = () => {
  return <Pricing />;
};

export default Page;
