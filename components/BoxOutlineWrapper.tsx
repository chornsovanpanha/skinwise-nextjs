import React from "react";
import { Typography } from "./Typography";
import clsx from "clsx";

const BoxOutlineWrapper = ({
  children,
  className,
  title,
  type = "positive",
}: {
  children: React.ReactNode;
  className?: string;
  title: string;
  type?: "positive" | "negative";
}) => {
  return (
    <section
      className={`about-ingredient  border-2 my-4 ${
        type == "positive" ? "border-primary" : "border-error-main"
      } px-6 py-8 rounded-3xl ${className}`}
    >
      <header className="mb-7">
        <Typography
          as="h6"
          variant="subtitle1"
          className={clsx(" !text-md sm:!text-xl", {
            "text-secondary": type == "positive",
            "text-error-main": type == "negative",
          })}
        >
          {title}
        </Typography>
      </header>
      {children}
    </section>
  );
};

export default BoxOutlineWrapper;
