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
    onFocus(true);
    setDebounceSearch(e.target.value?.toLowerCase());
    if (!e.target.value && backUrl) {
      router.replace(backUrl ?? "/", {
        scroll: false,
      });
    } else {
      router.replace(`${queryParams}${encodeURIComponent(e.target.value)}`, {
        scroll: false,
      });
    }
  }
  const clearSingleParam = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    router.push(`${pathName}?${params.toString()}`);
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
    if (!q) {
      setDebounceSearch("");
      clearSingleParam();
    }
  }, [q]);

  return {
    handleTextChange,
    debounceSearch,
    q,
    pathName,
  };
};
