import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Typography } from "./Typography";

interface DataPaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataPaginationProps<TData>) {
  const totalPageSize = table.getPageCount();
  const pageIndex = table.getState().pagination.pageIndex;

  return (
    <div className="flex items-center justify-end px-2 py-8">
      {/* Pagination controls */}
      <div className="flex items-center space-x-4 border-1 p-2 rounded-lg">
        {/* Rows per page */}
        <div className="flex items-center space-x-2 ">
          <Select
            value={`${table.getState().pagination.pageSize ?? 10}`}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="shadow-none focus-visible:ring-0 active:ring-0 border-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Per page</SelectLabel>
                {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize.toString()}>
                    {pageSize} per page
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Page navigation */}
        <div className="flex items-center space-x-1">
          <div className="flex items-center justify-center text-xs font-medium">
            <Typography variant="button">
              Page {pageIndex + 1} of {totalPageSize}
            </Typography>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
