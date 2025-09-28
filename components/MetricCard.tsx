"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatter";
import clsx from "clsx";
import { ArrowDown, ArrowUp } from "lucide-react";
import CountUp from "react-countup";
import { MetricData } from "./MetricDataList";
import { Typography } from "./Typography";
const MetricCard = ({ ...props }: MetricData) => {
  const metrics = props;
  const sale = metrics.saleTotal;

  return (
    <Card className="w-full space-y-2 cursor-pointer hover:bg-gray-1">
      <CardHeader className="p-0">
        <CardTitle className="space-y-2">
          <div className="flex w-full gap-4 items-start">
            <Typography as="p" variant="subtitle2" className="grow">
              {metrics.title}
            </Typography>
          </div>
          <Typography as="p" variant="h4">
            {metrics.prefix != "%" && metrics.prefix}
            <CountUp end={parseFloat(metrics.value)} />
            {metrics.prefix === "%" && metrics.prefix}
          </Typography>
        </CardTitle>
      </CardHeader>

      {parseFloat(metrics?.value) > 0 ? (
        <CardContent className="flex gap-4 items-center flex-wrap p-0">
          <CardDescription className="flex flex-wrap">
            {metrics?.trend === "decrease" ? (
              <ArrowDown size={20} className="text-error-main" />
            ) : (
              <ArrowUp size={20} className="text-success-main" />
            )}

            {sale?.percentage && (
              <Typography
                as="p"
                variant="subtitle1"
                className={clsx({
                  "text-error-main": metrics?.trend === "decrease",
                  "text-success-main": metrics?.trend === "increase",
                })}
              >
                {sale?.percentage}%
              </Typography>
            )}
          </CardDescription>
          {metrics.saleTotal?.amount && (
            <Badge
              asChild
              variant={"default"}
              className={clsx(`bg-success-background text-success-main`, {
                "text-success-main bg-success-background":
                  metrics?.trend === "increase",
                "text-error-main bg-error-background":
                  metrics?.trend !== "increase",
              })}
            >
              <Typography as="p" variant="subtitle1">
                {metrics?.trend == "increase" ? "+" : "-"}$
                {formatCurrency(metrics.saleTotal?.amount ?? 0)}
              </Typography>
            </Badge>
          )}
        </CardContent>
      ) : null}

      <CardFooter className="p-0">
        <Typography as="p" variant="body2" className="text-gray-4">
          {metrics?.comparisonText}
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default MetricCard;
