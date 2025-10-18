import { skinWisePlans } from "@/app/(features)/(main)/pricing/data";
import { PlanType } from "@/types";
import clsx from "clsx";
import { Typography } from "../Typography";
import { Button } from "../ui/button";
import { CardContent } from "../ui/card";

const PricingListing = ({
  onClick,
  planType,
}: {
  onClick: () => void;
  planType?: PlanType;
}) => {
  return skinWisePlans.map((plan) => (
    <section
      key={plan.name}
      className={clsx("w-full ", {
        "transform scale-100 xl:scale-110  transition-transform ease-in-out duration-300":
          plan.type == PlanType.PRO,
        "transform scale-100  xl:scale-100  transition-transform ease-in-out duration-300":
          plan.type == PlanType.FREE,
      })}
    >
      <div
        className={clsx(
          " border-4 rounded-3xl px-6  flex flex-col justify-center items-center space-y-5 py-20",
          {
            "border-secondary bg-secondary": plan.type == PlanType.PRO,
            "border-secondary": plan.type == PlanType.FREE,
          }
        )}
      >
        <header className="text-center">
          <Typography
            as="p"
            variant="h6"
            className={clsx("", {
              "text-secondary": plan.type == PlanType.FREE,
              "text-primary": plan.type == PlanType.PRO,
            })}
          >
            {plan.name.toUpperCase()}
          </Typography>
          <Typography
            as="p"
            variant="h1"
            className={clsx({
              "text-secondary": plan.type == PlanType.FREE,
              "text-primary": plan.type == PlanType.PRO,
            })}
          >
            ${plan.price.toFixed(2)}
          </Typography>
          <Typography
            as="p"
            variant="h6"
            className={clsx({
              "text-secondary": plan.type == PlanType.FREE,
              "text-primary": plan.type == PlanType.PRO,
            })}
          >
            {plan.billingCycle}
          </Typography>
        </header>

        <CardContent className="my-2">
          <ul className="list-disc list-inside space-y-2">
            {plan.features.map((feature, idx) => (
              <li
                key={idx}
                className={clsx({
                  "text-secondary": plan.type == PlanType.FREE,
                  "text-primary": plan.type == PlanType.PRO,
                })}
              >
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>

        <Button
          className={`w-fit bg-transparent border-4 rounded-4xl py-6 lg:py-7 mt-4  px-12 hover:bg-primary/50 ease-in-out transition-colors duration-200 ${
            plan.type == PlanType.FREE ? "border-secondary" : "border-primary"
          }`}
          variant={"outline"}
          onClick={onClick}
          disabled={planType == plan.type}
        >
          <Typography
            as="p"
            variant="h6"
            className={clsx({
              "text-secondary": plan.type == PlanType.FREE,
              "text-primary": plan.type == PlanType.PRO,
            })}
          >
            {planType == plan.type ? "CURRENT PLAN" : "GET THIS PLAN"}
          </Typography>
        </Button>
      </div>
    </section>
  ));
};

export default PricingListing;
