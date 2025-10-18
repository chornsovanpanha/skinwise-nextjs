import { ProductCompareBg } from "@/assets";
import ComparisonSection from "@/components/comparison/ComparisonSection";
import RuleListing from "@/components/comparison/RuleListing";
import Wrapper from "@/components/custom/layout/Wrapper";
import PageHeader from "@/components/PageHeader";
import { Typography } from "@/components/Typography";

const Comparison = () => {
  return (
    <main>
      <PageHeader
        title="Product Comparison"
        showBackgroundImg={true}
        backgroundImage={ProductCompareBg}
      />
      <Wrapper className="flex-col space-y-12 h-fit">
        <header className="space-y-4">
          <Typography variant="h4" as="h5" className="text-secondary">
            Instruction
          </Typography>
          {/* Rule Header  */}
          <RuleListing />
        </header>
        {/* Comparison Section  */}
        <ComparisonSection />
      </Wrapper>
    </main>
  );
};

export default Comparison;
