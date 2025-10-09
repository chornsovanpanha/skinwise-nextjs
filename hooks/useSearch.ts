import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, RefObject, useEffect, useState } from "react";

export const useSearch = ({
  searchRef,
  queryParams,
  backUrl,
  onFocus,
}: {
  searchRef: RefObject<HTMLDivElement | null>;
  queryParams?: string;
  backUrl?: string;
  onFocus: (value: boolean) => void;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get("q") || "";
  const [debounceSearch, setDebounceSearch] = useState(q ?? "");
  const pathName = usePathname();
  function handleTextChange(e: ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;

    onFocus(true);
    setDebounceSearch(e.target.value);
    const newUrl = value
      ? `${queryParams}${encodeURIComponent(value)}`
      : backUrl ?? "/";

    if (!e.target.value && backUrl) {
      window.history.replaceState(null, "", newUrl);
    } else {
      window.history.replaceState(null, "", newUrl);
    }
  }
  const clearSingleParam = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");

    const newQuery = params.toString();
    const newUrl = newQuery ? `${pathName}?${newQuery}` : pathName;

    router.push(newUrl, { scroll: false });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        onFocus(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!debounceSearch) {
      // setDebounceSearch("");
      clearSingleParam();
    }
  }, [debounceSearch]);

  return {
    handleTextChange,
    debounceSearch,
    q,
    pathName,
  };
};
