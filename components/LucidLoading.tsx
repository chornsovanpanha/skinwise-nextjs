import { LoaderCircle } from "lucide-react";

const LucidLoading = ({ color = "white" }: { color?: string }) => {
  return (
    <LoaderCircle
      className={`animate-spin text-white`}
      color={color}
      // size={24}
    />
  );
};

export default LucidLoading;
