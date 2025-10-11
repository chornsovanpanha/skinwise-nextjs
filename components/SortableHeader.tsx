"use client";

import { Button } from "@/components/ui/button";
import { Column } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";

type SortableHeaderProps<TData> = {
  column: Column<TData, unknown>;
  title: string;
};

export function SortableHeader<TData>({
  column,
  title,
}: SortableHeaderProps<TData>) {
  const isSorted = column.getIsSorted();

  return (
    <Button
      variant="ghost"
      className="hover:bg-transparent mx-[-10]"
      onClick={() => column.toggleSorting(isSorted === "asc")}
    >
      <span>{title}</span>
      {column?.getCanSort() && (
        <ChevronsUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
      )}
    </Button>
  );
}
