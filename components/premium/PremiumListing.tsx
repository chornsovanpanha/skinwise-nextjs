import { skinWisePlans } from "@/app/(features)/(main)/premium/data";
import clsx from "clsx";
import { Typography } from "../Typography";
import { Button } from "../ui/button";
import { CardContent } from "../ui/card";

const PremiumListing = () => {
  return skinWisePlans.map((plan) => (
    <section
      key={plan.name}
      className={clsx(
        "w-full hover:scale-105 transition-transform ease-in-out duration-300"
      )}
    >
      <div
        className={clsx(
          " border-4 rounded-3xl px-6  flex flex-col justify-center items-center space-y-5 py-20",
          {
            "border-secondary bg-secondary": plan.type == "premium",
            "border-primary": plan.type == "free",
          }
        )}
      >
        <header className="text-center">
          <Typography as="p" variant="h6" className="text-primary">
            {plan.name.toUpperCase()}
          </Typography>
          <Typography as="p" variant="h1" className="text-primary">
            ${plan.price.toFixed(2)}
          </Typography>
          <Typography as="p" variant="h6" className="text-primary">
            {plan.billingCycle}
          </Typography>
        </header>

        <CardContent className="my-2">
          <ul className="list-disc list-inside">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="text-primary">
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>

        <Button
          className="w-fit bg-transparent border-primary border-4 rounded-4xl py-8 mt-4  px-12 hover:bg-primary/50 ease-in-out transition-colors duration-200"
          variant={"outline"}
        >
          <Typography as="p" variant="h6" className="text-primary">
            {plan.isCurrentPlan ? "CURRENT PLAN" : "GET THIS PLAN"}
          </Typography>
        </Button>
      </div>
    </section>
  ));
};

export default PremiumListing;
