import { Metadata } from "next";
import MySkin from "./MySkin";
export const metadata: Metadata = {
  title: "Your Skin",
  description: "Skinwise your skin.",
};
const Page = () => {
  return <MySkin />;
};

export default Page;
