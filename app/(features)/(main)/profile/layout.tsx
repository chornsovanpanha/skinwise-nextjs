import { getMyProfileAction } from "@/actions/profile/profile.action";
import Wrapper from "@/components/custom/layout/Wrapper";
import TabWrapper from "@/components/TabWrapper";
import { getUserIdFromSession } from "@/lib/sessions/session";
import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  const userId = await getUserIdFromSession();
  const profile = await getMyProfileAction(userId ?? "");

  return (
    <Wrapper className="flex-col container max-w-3xl">
      {/* Pass the fetched data to TabWrapper */}
      <TabWrapper profile={profile}>{children}</TabWrapper>
    </Wrapper>
  );
};

export default RootLayout;
