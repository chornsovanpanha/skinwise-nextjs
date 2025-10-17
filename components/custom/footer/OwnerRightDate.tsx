import { Typography } from "@/components/Typography";
import React from "react";

const OwnerRightDate = () => {
  const year = new Date().getFullYear();
  return (
    <Typography as="p" variant="subtitle2" className="text-center mt-36">
      @ {year} Skinwise
    </Typography>
  );
};

export default OwnerRightDate;
