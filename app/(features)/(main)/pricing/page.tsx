import { Metadata } from "next";
import Pricing from "./Pricing";
import { UserWithSubscription } from "@/types";
import { getUserIdFromSession } from "@/lib/sessions/session";
import { getMyProfileAction } from "@/actions/profile/profile.action";
export const metadata: Metadata = {
  title: "Pricing Plan",
  description: "This is a pricing page preview for user.",
};
const Page = async () => {
  const userId = await getUserIdFromSession();
  const profile = (await getMyProfileAction(
    userId ?? ""
  )) as UserWithSubscription;
  return <Pricing profile={profile} />;
};

export default Page;
