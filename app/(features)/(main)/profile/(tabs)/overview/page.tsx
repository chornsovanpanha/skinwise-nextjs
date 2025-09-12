import type { Metadata } from "next";
import ProfileOverview from "./ProfileOverview";

export const metadata: Metadata = {
  title: "Account Overview",
  description: "Skinwise account overview.",
};
const Page = () => {
  return <ProfileOverview />;
};

export default Page;
