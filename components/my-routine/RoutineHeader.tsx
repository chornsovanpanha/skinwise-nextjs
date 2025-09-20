import { Typography } from "@/components/Typography";
import { RoutineType } from "@/types";
import { IconMoon, IconSun } from "@tabler/icons-react";
import React from "react";

const RoutineHeader = ({
  children,
  type,
}: {
  children: React.ReactNode;
  type: RoutineType;
}) => {
  return (
    <div className="flex w-full gap-2 items-center">
      <Typography
        as="p"
        variant="subtitle1"
        className="text-secondary text-lg sm:!text-xl"
      >
        {children}
      </Typography>
      {type == RoutineType.MORNING ? (
        <IconSun className="w-8 h-8" />
      ) : (
        <IconMoon className="w-8 h-8" />
      )}
    </div>
  );
};

export default RoutineHeader;
