import { IconMedicineSyrup } from "@tabler/icons-react";
import clsx from "clsx";
import { TriangleAlert } from "lucide-react";
import React from "react";
import { Typography } from "./Typography";
type BadgeItemProps = {
  type: "positive" | "negative";
  icon?: React.ReactNode;
  className?: string;
  customTitle?: React.ReactNode;
  title?: string;
  subtitle?: string;
};
const BadgeItem: React.FC<BadgeItemProps> = ({
  title,
  subtitle,
  type,
  icon,
  className,
  customTitle,
}) => {
  return (
    <div className="badge flex gap-2 items-center">
      {customTitle && customTitle}
      <div
        className={clsx(
          "badge rounded-full w-10 h-10 bg-error-main/90 place-items-center justify-self-center grid",
          {
            "bg-primary": type == "positive",
            "bg-error-main/90": type == "negative",
          },
          className
        )}
      >
        {type == "negative" ? (
          icon ? (
            icon
          ) : (
            <TriangleAlert className="text-white w-5 h-5" />
          )
        ) : icon ? (
          icon
        ) : (
          <IconMedicineSyrup className="text-secondary w-6 h-6" />
        )}
      </div>

      <div className="right gap-2 items-center">
        <Typography as="p" variant="subtitle1" className="text-secondary">
          {title ?? "Unnamed Title"}
        </Typography>
        <Typography as="p" variant="caption" className="text-secondary">
          {subtitle ?? "Unnamed Desc"}
        </Typography>
      </div>
    </div>
  );
};

export default BadgeItem;
