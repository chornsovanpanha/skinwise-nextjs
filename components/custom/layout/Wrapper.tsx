import clsx from "clsx";
import React from "react";

const Wrapper = ({
  children,
  className,
  maxHeight = true,
}: {
  children: React.ReactNode;
  className?: string;
  maxHeight?: boolean;
}) => {
  return (
    <div
      className={clsx(
        `flex mx-auto container max-w-7xl justify-start px-6 sm:px-12 my-6 ${className}`,
        {
          "min-h-screen": maxHeight,
        }
      )}
    >
      {children}
    </div>
  );
};

export default Wrapper;
