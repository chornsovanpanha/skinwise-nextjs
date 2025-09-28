import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import React from "react";
import AppInput from "./AppInput";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterTableHeaderProps {
  onSearch: (query: string) => void;
  onCreateItem: () => void;
  onSelectFilter: (filter: FilterOption) => void;
  filters?: FilterOption[];
  searchQuery?: string;
}

const FilterTableHeader: React.FC<FilterTableHeaderProps> = ({
  onSearch,
  onCreateItem,
  onSelectFilter,
  filters = [],
  searchQuery = "",
}) => {
  return (
    <div className="block sm:flex items-center h-full justify-between space-x-2 space-y-6 sm:space-y-0 mb-8 sm:mb-8">
      {/* Search input with icon */}
      <AppInput
        id="search"
        label=""
        onChange={(e) => onSearch(e.target.value?.toLowerCase())}
        value={searchQuery}
        type="text"
        className="px-10"
        icon={<Search size={16} />}
        placeholder="Search name ..."
      />

      {/* Filters and Create Item */}

      <div className="flex items-center space-x-2 sm:mt-0">
        {filters?.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center space-x-2 h-[43px]"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {filters.map((filter, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => onSelectFilter(filter)}
                >
                  {filter.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <Button
          variant="default"
          className="bg-secondary text-white flex items-center space-x-2 w-fit"
          onClick={onCreateItem}
        >
          <Plus className="h-4 w-4" />
          Create Item
        </Button>
      </div>
    </div>
  );
};

export default FilterTableHeader;
