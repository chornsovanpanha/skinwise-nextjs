import { SortableHeader } from "@/components/SortableHeader";
import { Brand } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import ActionButton from "./ActionButton";
import { countryCodeToFlag } from "@/utils/formatter";
import clsx from "clsx";

export const brandColumns: ColumnDef<Brand>[] = [
  {
    accessorKey: "id",
    enableSorting: true,
    header: ({ column }) => <SortableHeader column={column} title="ID" />,

    cell: ({ row }) => <span className="font-medium">{row.original.id}</span>,
  },

  {
    accessorKey: "title",
    filterFn: "includesString",
    header: ({ column }) => (
      <SortableHeader column={column} title="Brand Name" />
    ),

    enableSorting: true,
    cell: ({ row }) => (
      <span className="font-medium">{row.original.title}</span>
    ),
  },
  {
    accessorKey: "alias",
    enableSorting: true,
    header: ({ column }) => (
      <SortableHeader column={column} title="Alias Name" />
    ),

    cell: ({ row }) => (
      <span className="font-medium">{row.original.alias}</span>
    ),
  },
  {
    accessorKey: "country",
    enableSorting: true,
    header: ({ column }) => <SortableHeader column={column} title="Country" />,

    cell: ({ row }) => (
      <span
        className={clsx("font-medium", {
          "text-3xl": row.original.country,
        })}
      >
        {row.original.country
          ? countryCodeToFlag(row.original.country ?? "")
          : "N/A"}
      </span>
    ),
  },
  {
    accessorKey: "action",
    enableSorting: false,
    header: ({ column }) => <SortableHeader column={column} title="Action" />,
    cell: ({ row }) => <ActionButton id={row.original?.id?.toString()} />,
  },
];
