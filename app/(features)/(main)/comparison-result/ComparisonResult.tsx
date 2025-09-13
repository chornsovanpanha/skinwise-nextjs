import { ProductCompareBg } from "@/assets";
import Wrapper from "@/components/custom/layout/Wrapper";
import PageHeader from "@/components/PageHeader";
import { Typography } from "@/components/Typography";
import React from "react";

const ComparisonResult = () => {
  return (
    <main>
      <PageHeader
        title="Comparison Result"
        showBackgroundImg={true}
        backgroundImage={ProductCompareBg}
      />
      <Wrapper className="flex-col space-y-12 h-fit">
        <header className="space-y-4">
          <Typography variant="h4" as="h5" className="text-secondary">
            Instruction
          </Typography>
        </header>
      </Wrapper>
    </main>
  );
};

export default ComparisonResult;
