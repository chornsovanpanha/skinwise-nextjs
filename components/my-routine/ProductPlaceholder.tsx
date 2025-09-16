import { PlusCircleIcon } from "lucide-react";
import { Typography } from "../Typography";

const ProductPlaceholder = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="group border border-primary rounded-xl overflow-hidden h-[480px] hover:cursor-pointer items-center flex justify-center hover:bg-primary/20 "
    >
      <main className="flex flex-col items-center space-y-3">
        <PlusCircleIcon className="w-10 h-10 text-primary" />
        <Typography variant="default" className="text-primary">
          Add another product
        </Typography>
      </main>
    </div>
  );
};

export default ProductPlaceholder;
