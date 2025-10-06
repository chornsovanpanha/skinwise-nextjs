"use client";
import { checkoutStripeAction } from "@/actions/stripe/checkout.action";
import { portalCustomerAction } from "@/actions/stripe/portal.action";
import Loading from "@/app/loading";
import Wrapper from "@/components/custom/layout/Wrapper";
import PricingListing from "@/components/pricing/PricingListing";
import { Typography } from "@/components/Typography";
import { userAtom } from "@/lib/atom/user.atom";
import { PlanType, UserWithSubscription } from "@/types";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
const Pricing = ({ profile }: { profile: UserWithSubscription }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const user = useAtomValue(userAtom);

  const handleManageSubscription = async () => {
    setLoading(true);

    const { data, error, success } = await portalCustomerAction({
      userId: profile?.id?.toString(),
    });

    if (data && success) {
      window.location.href = data;
    } else {
      router.push("/login");
      console.error(error);
    }
    setLoading(false);
  };
  const handleUpgradePremiere = async () => {
    setLoading(true);
    const { data, error, success } = await checkoutStripeAction({
      userId: user.id?.toString() ?? "",
    });

    if (data && success) {
      window.location.href = data; // redirect to Stripe checkout page
    } else {
      router.push("/login");
      console.error(error);
    }
    setLoading(false);
  };
  return (
    <main>
      {isLoading && <Loading />}
      <header className="bg-secondary w-full flex flex-col items-center justify-center py-10">
        <Typography as="p" variant="h4" className="text-primary">
          Choose Your Plan
        </Typography>
        {profile?.subscription?.plan == PlanType.PRO && (
          <Typography as="p" variant="h6" className="text-primary">
            You are a premium user
          </Typography>
        )}
      </header>

      <Wrapper maxHeight={false} className="mb-24 my-20">
        <div className="block sm:grid grid-cols-2 w-full gap-12 space-y-5">
          <PricingListing
            planType={
              (profile?.subscription?.plan as PlanType) ?? PlanType.FREE
            }
            onClick={
              profile?.subscription?.plan !== PlanType.PRO
                ? handleUpgradePremiere
                : handleManageSubscription
            }
          />
        </div>
      </Wrapper>
    </main>
  );
};

export default Pricing;
