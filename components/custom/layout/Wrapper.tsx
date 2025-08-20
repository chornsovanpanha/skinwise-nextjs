import React from "react";

const Wrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`flex mx-auto container max-w-7xl justify-start  min-h-screen px-6 sm:px-12 ${className} my-6`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
