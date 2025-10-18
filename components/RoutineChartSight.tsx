import clsx from "clsx";
import React, { useMemo } from "react";
import { Typography } from "./Typography";

type RoutineChartSightProps = {
  percentage: number;
  desc: string;
};
const   RoutineChartSight: React.FC<RoutineChartSightProps> = ({
  percentage,
  desc,
}) => {
  const renderScoreMatcher = useMemo(() => {
    if (percentage >= 95) return "Perfect Match";
    if (percentage >= 80) return "Good Match";
    if (percentage >= 70) return "Normal Match";
    return "Bad Match";
  }, [percentage]);

  return (
    <div
      className={clsx(
        "rounded-3xl px-10 py-6 flex items-center gap-4 w-fit cursor-text",
        {
          "bg-error-main/40": percentage <= 70,
          "bg-secondary": percentage > 70,
        }
      )}
    >
      <header>
        <Typography
          as="p"
          variant="h6"
          className={clsx({
            "text-error-text": percentage <= 70,
            "text-primary": percentage > 70,
          })}
        >
          {renderScoreMatcher}
        </Typography>

        <Typography
          as="p"
          variant="caption"
          className={clsx({
            "text-error-text": percentage <= 70,
            "text-gray-5": percentage > 70,
          })}
        >
          {desc}
        </Typography>
      </header>
      <div
        className={clsx(
          "box-container aspect-square w-20 rounded-full border-2 grid place-content-center justify-self-center",
          {
            "border-error-text": percentage <= 70,
            "border-primary": percentage > 70,
          }
        )}
      >
        <Typography
          as="p"
          variant="h6"
          className={clsx({
            "text-error-text": percentage <= 70,
            "text-primary": percentage > 70,
          })}
        >
          {percentage}%
        </Typography>
      </div>
    </div>
  );
};

export default RoutineChartSight;
