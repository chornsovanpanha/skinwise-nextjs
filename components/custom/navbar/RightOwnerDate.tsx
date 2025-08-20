"use client";

const RightOwnerDate = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return (
    <div className="flex flex-col items-center space-y-1 text-center border-t-1 border-gray-200 pt-4">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Skinwise
      </p>
    </div>
  );
};

export default RightOwnerDate;
