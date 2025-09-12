import { IconMedicineSyrup } from "@tabler/icons-react";
import { TriangleAlert } from "lucide-react";
import React from "react";
import { Typography } from "./Typography";
import clsx from "clsx";
type BadgeItemProps = {
  type: "positive" | "negative";
};
const BadgeItem: React.FC<BadgeItemProps> = ({ type }) => {
  return (
    <div className="badge flex gap-2 items-center">
      <div
        className={clsx(
          "badge rounded-full w-10 h-10 bg-error-main/90 place-items-center justify-self-center grid",
          {
            "bg-primary": type == "positive",
            "bg-error-main/90": type == "negative",
          }
        )}
      >
        {type == "negative" ? (
          <TriangleAlert className="text-white w-5 h-5" />
        ) : (
          <IconMedicineSyrup className="text-secondary w-6 h-6" />
        )}
      </div>

      <div className="right gap-2 items-center">
        <Typography as="p" variant="subtitle1">
          Iretated
        </Typography>
        <Typography as="p" variant="caption">
          Damage your skin cell
        </Typography>
      </div>
    </div>
  );
};

export default BadgeItem;
