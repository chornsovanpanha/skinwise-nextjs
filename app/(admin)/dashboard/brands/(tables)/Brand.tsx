"use client";
import Loading from "@/app/loading";
import FilterTableHeader from "@/components/FilterTableHeader";
import { useBrandListing } from "@/hooks/api/brands/useBrand";
import { useUrlPage } from "@/hooks/useUrlPage";
import { TANSTACKQUERY } from "@/utils/constant/queryclient";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BrandDataTable } from "./BrandTable";
import { brandColumns } from "./column";
import { FilterOptions } from "./type";

const Brand = () => {
  const { getUrlParams, updateUrl } = useUrlPage();
  const { search } = getUrlParams();
  // const [paging, setPaging] = useState({
  //   page: 1,
  //   perPage: 10,
  // });

  const { data, isLoading, error } = useBrandListing(TANSTACKQUERY.BRAND, {
    limit: "30",
  });

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(search ?? "");
  const handleSearch = (query: string) => {
    setSearchQuery(query?.toLowerCase());
    updateUrl({ search: query.toLowerCase() });
    console.log("Searching for:", query);
  };

  // const onChangePage = (page: number, perPage: number) => {
  //   // updateUrl({ limit: perPage, page: page });
  //   setPaging({ page: page, perPage: perPage });
  // };
  const handleFilterSelection = (filter: FilterOptions) => {
    console.log("Selected filter:", filter.label);
  };

  const handleCreateNewItem = () => {
    router.push("/dashboard/brands/form");
  };

  if (error) {
    throw error;
  }
  return (
    <main className="space-y-6 mt-6">
      {isLoading && <Loading />}
      <FilterTableHeader
        onSearch={handleSearch}
        onCreateItem={handleCreateNewItem}
        onSelectFilter={handleFilterSelection}
        searchQuery={searchQuery}
      />

      <BrandDataTable
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        columns={brandColumns}
        showPaging
        // page={paging?.page ?? 1}
        // perPage={paging?.perPage ?? 10}
        // onPageChange={onChangePage}
        // totalRecords={totalRecords ?? 0}
        data={data || []}
      />
    </main>
  );
};

export default Brand;
