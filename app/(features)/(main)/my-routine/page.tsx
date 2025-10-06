import { getMyProfileAction } from "@/actions/profile/profile.action";
import { getRoutineByUser } from "@/data/routine";
import { getUserIdFromSession } from "@/lib/sessions/session";
import { PlanType, UserWithSubscription } from "@/types";
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
    userId: paramsUserId ? paramsUserId?.toString() : userId!,
  });
  if (!userRoutine) {
    return notFound();
  }
  const profile = (await getMyProfileAction(
    paramsUserId ? paramsUserId?.toString() : userId!
  )) as UserWithSubscription;

  const allowEdit = paramsUserId
    ? paramsUserId == userId
    : userId != undefined && userId != null;

  console.log("Params id is", paramsUserId);
  return (
    <MyRoutine
      allowEdit={allowEdit}
      profile={userRoutine}
      name={profile?.name ?? "N/A"}
      planType={profile?.subscription?.plan as PlanType}
      userId={
        paramsUserId
          ? parseInt(paramsUserId?.toString() as string)
          : parseInt(userId!)
      }
    />
  );
};

export default Page;
