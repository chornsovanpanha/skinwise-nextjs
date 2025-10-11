import React from "react";

const Section = ({
  children,
  name,
  className,
}: {
  children: React.ReactNode;
  name?: string;
  className?: string;
}) => {
  return (
    <section
      className={`${name} space-y-4 border px-6 rounded-2xl py-10 ${className}`}
    >
      {children}
    </section>
  );
};

export default Section;
