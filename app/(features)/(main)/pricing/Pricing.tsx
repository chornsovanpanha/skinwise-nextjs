"use client";
import { checkoutStripeAction } from "@/actions/stripe/checkout.action";
import Wrapper from "@/components/custom/layout/Wrapper";
import PricingListing from "@/components/pricing/PricingListing";
import { Typography } from "@/components/Typography";
import { useToast } from "@/hooks/use-toast";
import { userAtom } from "@/lib/atom/user.atom";
import { useAtomValue } from "jotai";
const Pricing = () => {
  const { show } = useToast();
  const user = useAtomValue(userAtom);
  const handleUpgradePremiere = async () => {
    const { data, error, success } = await checkoutStripeAction({
      userId: user.id?.toString(),
    });

    if (data && success) {
      window.location.href = data; // redirect to Stripe checkout page
    } else {
      show({ type: "error", message: JSON.stringify(error) });
      console.error(error);
    }
  };
  return (
    <main>
      <header className="bg-secondary w-full flex justify-center py-10">
        <Typography as="p" variant="h4" className="text-primary">
          Choose Your Plan
        </Typography>
      </header>
      <Wrapper maxHeight={false} className="mb-24 my-20">
        <div className="block sm:grid grid-cols-2 w-full gap-12 space-y-5">
          <PricingListing onClick={handleUpgradePremiere} />
        </div>
      </Wrapper>
    </main>
  );
};

export default Pricing;
