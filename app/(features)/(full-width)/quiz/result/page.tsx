import { globalSearchAction } from "@/actions/product/product.action";
import { getUserSkinTypeAndConcern } from "@/actions/profile/profile.action";
import { ProfileWithConcerns } from "@/types";
import { TANSTACKQUERY } from "@/utils/constant/queryclient";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ResultQuiz from "./ResultQuiz";

export default async function Page() {
  const userSkinType = await getUserSkinTypeAndConcern();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [TANSTACKQUERY.GLOBAL_SEARCH, ""],
    queryFn: () => globalSearchAction({ search: "" }),
  });

  const totalConcerns = userSkinType?.profile?.routines?.length;
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ResultQuiz
        totalConcerns={totalConcerns ?? 0}
        userSkinType={userSkinType?.profile as ProfileWithConcerns}
        profileId={userSkinType?.profile?.id}
        userId={userSkinType?.profile?.userId}
      />
    </HydrationBoundary>
  );
}
