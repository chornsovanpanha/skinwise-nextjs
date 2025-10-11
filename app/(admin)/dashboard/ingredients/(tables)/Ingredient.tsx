"use client";
import FilterTableHeader from "@/components/FilterTableHeader";
import { dummyIngredientLists } from "@/utils/mock";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IngredientDataTable } from "./IngredientTable";
import { ingredientColumns } from "./column";
import { FilterOptions } from "./type";

const Ingredient = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("");

  const filterOptions = [
    { label: "By Status: Active", value: "active" },
    { label: "By Status: Inactive", value: "inactive" },
    { label: "By Date", value: "date" },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  const handleFilterSelection = (filter: FilterOptions) => {
    setActiveFilter(filter?.value ?? "");
    console.log("Selected filter:", filter.label);
  };

  const handleCreateNewItem = () => {
    router.push("/dashboard/ingredients/form");
  };

  console.log(activeFilter);
  return (
    <main className="space-y-6 mt-6">
      <FilterTableHeader
        onSearch={handleSearch}
        onCreateItem={handleCreateNewItem}
        onSelectFilter={handleFilterSelection}
        filters={filterOptions}
        searchQuery={searchQuery}
      />
      <IngredientDataTable
        columns={ingredientColumns}
        showPaging
        data={dummyIngredientLists ?? []}
      />
    </main>
  );
};

export default Ingredient;
