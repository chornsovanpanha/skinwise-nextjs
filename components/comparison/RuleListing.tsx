import { RULES } from "@/utils/constant/data";
import React from "react";
import { Typography } from "../Typography";
import { Badge } from "../ui/badge";

const RuleListing = () => {
  return (
    <ul className="space-y-8 sm:space-y-8">
      {RULES?.map((item, index) => (
        <li className="flex items-center gap-3" key={item}>
          <Badge className="rounded-full py-2.5 px-4">
            <Typography as="p" variant="subtitle1">
              {index + 1}
            </Typography>
          </Badge>
          <Typography variant="body1" as="p" className="text-secondary">
            {item}
          </Typography>
        </li>
      ))}
    </ul>
  );
};

export default RuleListing;
