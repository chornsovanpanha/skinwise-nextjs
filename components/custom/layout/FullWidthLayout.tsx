import React from "react";

const FullWidthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center lg:justify-center min-h-screen bg-white text-gray-800 px-4 md:px-0 lg:px-0">
      {children}
    </div>
  );
};

export default FullWidthLayout;
