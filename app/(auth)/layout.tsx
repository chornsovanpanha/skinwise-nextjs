import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-1 bg-primary/20">
      {children}
    </div>
  );
};

export default RootLayout;
