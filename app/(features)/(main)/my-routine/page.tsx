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
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const search = await searchParams;
  const paramsUserId = search?.id ?? "";
  const userId = await getUserIdFromSession();
  if (!userId && !paramsUserId) {
    return notFound();
  }
  const userRoutine = await getRoutineByUser({
    userId: userId ?? paramsUserId?.toString() ?? "",
  });
  if (!userRoutine) {
    return notFound();
  }
  const allowEdit = paramsUserId ? paramsUserId == userId : !!userId;
  return (
    <MyRoutine
      allowEdit={allowEdit}
      profile={userRoutine}
      userId={parseInt(userId ?? paramsUserId?.toString() ?? "")}
    />
  );
};

export default Page;
