import React from "react";
import { Typography } from "../Typography";

type ComparisonHeaderProps = {
  icon: React.ReactNode;
  title: string;
  className?: string;
};
const ComparisonHeader: React.FC<ComparisonHeaderProps> = ({
  icon,
  title,
  className = "text-secondary",
}) => {
  return (
    <header className="flex gap-2 items-center">
      {icon}
      <Typography as="h6" variant="h5" className={`${className}`}>
        {title}
      </Typography>
    </header>
  );
};

export default ComparisonHeader;
