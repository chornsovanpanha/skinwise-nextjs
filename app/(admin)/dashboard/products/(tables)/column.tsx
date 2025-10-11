import { SortableHeader } from "@/components/SortableHeader";
import { Product } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import ActionButton from "./ActionButton";

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    enableSorting: true,
    header: ({ column }) => <SortableHeader column={column} title="ID" />,

    cell: ({ row }) => <span className="font-medium">{row.original.id}</span>,
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader column={column} title="Product Name" />
    ),

    enableSorting: true,
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "brandName",
    enableSorting: true,
    header: ({ column }) => (
      <SortableHeader column={column} title="Brand Name" />
    ),

    cell: ({ row }) => (
      <span className="font-medium">{row.original.brandName}</span>
    ),
  },
  {
    accessorKey: "action",
    enableSorting: false,
    header: ({ column }) => <SortableHeader column={column} title="Action" />,
    cell: ({ row }) => <ActionButton id={row.original?.id?.toString()} />,
  },
];
