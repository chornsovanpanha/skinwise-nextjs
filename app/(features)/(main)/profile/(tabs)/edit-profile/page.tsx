import { getMyProfileAction } from "@/actions/profile/profile.action";
import { getUserIdFromSession } from "@/lib/sessions/session";
import { UserPrisma } from "@/types";
import { Metadata } from "next";
import EditProfileForm from "./EditProfileForm";
export const metadata: Metadata = {
  title: "Edit Profile",
  description: "Skinwise edit profile.",
};
const Page = async () => {
  // Fetch data on the server

  const userId = await getUserIdFromSession();
  const profile = await getMyProfileAction(userId ?? "");
  return <EditProfileForm initProfile={profile as UserPrisma} />;
};

export default Page;
