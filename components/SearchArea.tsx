import { useSearch } from "@/hooks/useSearch";
import { Product, SearchType } from "@/types";
import { useEffect, useRef, useState } from "react";
import AppInput from "./AppInput";
import RecentProductListing from "./landing-page/RecentProductListing";
import SearchPreviewListing from "./landing-page/SearchPreviewListing";
import { Ingredient } from "@prisma/client";

const SearchArea = ({
  className,
  ingredients,
  products,
  handleTapItem,
  showRecent,
}: {
  className?: string;
  handleTapItem: (type: SearchType) => void;
  products?: Product[];
  showRecent?: boolean;
  ingredients?: Ingredient[];
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { debounceSearch, handleTextChange, pathName, q } = useSearch({
    searchRef: searchRef,
    queryParams: `?q=`,
    onFocus: (value) => setIsFocused(value),
  });

  useEffect(() => {
    if (q) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
  }, [pathName, q]);
  return (
    <div className="search-area relative" ref={searchRef}>
      <AppInput
        id="search"
        autoCapitalize="none"
        autoComplete="off"
        label=""
        value={debounceSearch}
        onFocus={() => setIsFocused(true)}
        onChange={handleTextChange}
        type="text"
        className={`bg-secondary border-0 text-primary py-8 my-4 rounded-2xl z-50  ${className}`}
        placeholder="Type to search for product or ingredient...."
      />
      {isFocused && debounceSearch && (
        <SearchPreviewListing
          ingredients={ingredients}
          products={products}
          onPress={handleTapItem}
        />
      )}

      {showRecent && isFocused && !debounceSearch && (
        <RecentProductListing onPress={handleTapItem} />
      )}
    </div>
  );
};

export default SearchArea;
