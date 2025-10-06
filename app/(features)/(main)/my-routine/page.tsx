import { getRoutineByUser } from "@/data/routine";
import { getUserIdFromSession } from "@/lib/sessions/session";
import { Metadata } from "next";
import { notFound } from "next/navigation";
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
const Page = async () => {
  const userId = await getUserIdFromSession();
  const userRoutine = await getRoutineByUser({ userId: userId ?? "" });
  if (!userId) {
    return notFound();
  }

  return <MyRoutine profile={userRoutine} userId={parseInt(userId)} />;
};

export default Page;
