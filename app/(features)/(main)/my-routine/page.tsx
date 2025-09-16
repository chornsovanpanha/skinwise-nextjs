import { Metadata } from "next";
import MyRoutine from "./MyRoutine";
export const metadata: Metadata = {
  title: "My routine builder",
  description: "Easily build skincare routine",
  keywords: [
    "SkinWise",
    "skincare routine",
    "routine",
    "my routine",
    "skin care",
    "beauty products",
    "skin wise",
  ],
};
const Page = () => {
  return <MyRoutine />;
};

export default Page;
