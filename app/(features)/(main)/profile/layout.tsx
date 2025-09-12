import Wrapper from "@/components/custom/layout/Wrapper";
import React from "react";
import TabWrapper from "../../../../components/TabWrapper";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper className="flex-col container max-w-3xl">
      <TabWrapper>{children}</TabWrapper>
    </Wrapper>
  );
};

export default RootLayout;
