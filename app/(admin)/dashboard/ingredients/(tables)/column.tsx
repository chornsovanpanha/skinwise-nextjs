import { SortableHeader } from "@/components/SortableHeader";
import { ColumnDef } from "@tanstack/react-table";
import ActionButton from "./ActionButton";
import { Ingredient } from "@prisma/client";

export const ingredientColumns: ColumnDef<Ingredient>[] = [
  {
    accessorKey: "id",
    enableSorting: true,
    header: ({ column }) => <SortableHeader column={column} title="ID" />,

    cell: ({ row }) => <span className="font-medium">{row.original.id}</span>,
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader column={column} title="Ingredient Name" />
    ),

    enableSorting: true,
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "action",
    enableSorting: false,
    header: ({ column }) => <SortableHeader column={column} title="Action" />,
    cell: ({ row }) => <ActionButton id={row.original?.id?.toString()} />,
  },
];
