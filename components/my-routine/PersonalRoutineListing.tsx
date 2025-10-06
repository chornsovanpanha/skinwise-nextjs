import React from "react";
import ProductPlaceholder from "./ProductPlaceholder";
import { RoutineItem } from "@/types";

type PersonalRoutineListingProps = {
  items?: RoutineItem[] | undefined;
  onOpenDialog: () => void;
  renderItem: (items: RoutineItem, index: number) => React.ReactNode;
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
