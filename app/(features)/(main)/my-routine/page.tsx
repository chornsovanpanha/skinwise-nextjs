import { productSearchAction } from "@/actions/product/product.action";
import { getMyProfileAction } from "@/actions/profile/profile.action";
import { getRoutineByUser } from "@/data/routine";
import { getUserIdFromSession } from "@/lib/sessions/session";
import { PlanType, UserWithSubscription } from "@/types";
import { TANSTACKQUERY } from "@/utils/constant/queryclient";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
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
  const initSearch = search?.search ?? "";
  const userId = await getUserIdFromSession();

  if (!userId && !paramsUserId) {
    return notFound();
  }
  const userRoutine = await getRoutineByUser({
    userId: paramsUserId ? paramsUserId?.toString() : userId!,
  });

  const profile = (await getMyProfileAction(
    paramsUserId ? paramsUserId?.toString() : userId!
  )) as UserWithSubscription;

  const allowEdit = paramsUserId
    ? paramsUserId == userId
    : userId != undefined && userId != null;

  console.log("Params id is", paramsUserId);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [TANSTACKQUERY.PRODUCTS, ""],
    queryFn: () =>
      productSearchAction({ search: initSearch?.toString() ?? "" }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
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
    </HydrationBoundary>
  );
};

export default Page;
