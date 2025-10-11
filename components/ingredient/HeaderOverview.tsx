import React from "react";
import { Typography } from "../Typography";

const HeaderOverview = ({ name, desc }: { name: string; desc: string }) => {
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
        {desc}
      </Typography>
    </header>
  );
};

export default HeaderOverview;
