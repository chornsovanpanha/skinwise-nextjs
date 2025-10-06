import { getCurrentUserRoutine } from "@/actions/routine/routine-action";
import type { Metadata } from "next";
import ProfileOverview from "./ProfileOverview";

export const metadata: Metadata = {
  title: "Account Overview",
  description: "Skinwise account overview.",
};
const Page = async () => {
  const routines = await getCurrentUserRoutine();
  // console.log(routines?.at(0)?.items)
  return <ProfileOverview profileRoutine={routines} />;
};

export default Page;
