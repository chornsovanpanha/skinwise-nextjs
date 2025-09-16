import { Product } from "@/types";
import React from "react";
import ProductPlaceholder from "./ProductPlaceholder";

type PersonalRoutineListingProps = {
  items: Product[];
  onOpenDialog: () => void;
  renderItem: (items: Product, index: number) => React.ReactNode;
};
const PersonalRoutineListing: React.FC<PersonalRoutineListingProps> = ({
  items,
  renderItem,
  onOpenDialog,
}) => {
  return (
    <div className="space-y-4 sm:space-y-0  md:grid-cols-2 sm:grid lg:grid-cols-3 gap-4">
      {items?.map((data, index) => renderItem(data, index))}

      <ProductPlaceholder onClick={onOpenDialog} />
    </div>
  );
};

export default PersonalRoutineListing;
