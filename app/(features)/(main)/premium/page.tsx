import { Metadata } from "next";
import Premium from "./Premium";
export const metadata: Metadata = {
  title: "Premium Plan",
  description: "This is a premium plan preview for user.",
};
const Page = () => {
  return <Premium />;
};

export default Page;
