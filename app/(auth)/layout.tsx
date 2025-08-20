import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      {children}
    </div>
  );
};

export default RootLayout;
