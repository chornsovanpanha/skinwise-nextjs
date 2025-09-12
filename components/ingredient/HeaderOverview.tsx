import React from "react";
import { Typography } from "../Typography";

const HeaderOverview = ({ name }: { name: string }) => {
  return (
    <header>
      <Typography
        as="p"
        variant="default"
        className="text-secondary font-light"
      >
        Overview
      </Typography>
      <Typography as="p" variant="h5" className="text-secondary font-black">
        {name?.toUpperCase()}
      </Typography>
      <Typography
        as="p"
        variant="default"
        className="text-secondary font-light"
      >
        Retinol is a gold-standard ingredient for anti-aging. It is a form of
        Vitamin A and belongs to the class of retinoids that also
        includes tretinoin.
      </Typography>
    </header>
  );
};

export default HeaderOverview;
