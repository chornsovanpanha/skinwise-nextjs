"use client";
import FilterTableHeader from "@/components/FilterTableHeader";
import { popularProductListings } from "@/utils/mock";
import { useState } from "react";
import { ProductDataTable } from "./ProductTable";
import { productColumns } from "./column";
import { FilterOptions } from "./type";
import { useRouter } from "next/navigation";

const Product = () => {
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
    router.push("/dashboard/products/create");
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
      <ProductDataTable
        columns={productColumns}
        showPaging
        data={popularProductListings ?? []}
      />
    </main>
  );
};

export default Product;
