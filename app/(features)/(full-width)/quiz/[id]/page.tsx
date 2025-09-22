import { Metadata } from "next";
import CompleteProfile from "./CompleteProfile";
export const metadata: Metadata = {
  title: "Quiz",
  description: "Skinwise personal quiz",
};
const Page = () => {
  return <CompleteProfile />;
};

export default Page;
