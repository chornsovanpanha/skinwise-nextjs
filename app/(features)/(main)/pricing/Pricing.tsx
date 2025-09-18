import Wrapper from "@/components/custom/layout/Wrapper";
import PricingListing from "@/components/pricing/PricingListing";
import { Typography } from "@/components/Typography";
const Pricing = () => {
  return (
    <main>
      <header className="bg-secondary w-full flex justify-center py-10">
        <Typography as="p" variant="h4" className="text-primary">
          Choose Your Plan
        </Typography>
      </header>
      <Wrapper maxHeight={false} className="mb-24 my-20">
        <div className="block sm:grid grid-cols-2 w-full gap-12 space-y-5">
          <PricingListing />
        </div>
      </Wrapper>
    </main>
  );
};

export default Pricing;
