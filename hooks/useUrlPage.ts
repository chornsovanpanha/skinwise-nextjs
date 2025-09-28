"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type UrlParams = {
  page?: number;
  limit?: number;
  search?: string;
};

export function useUrlPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current params
  const getUrlParams = useCallback((): UrlParams => {
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    return { page, limit, search };
  }, [searchParams]);

  // Update params
  const updateUrl = useCallback(
    (params: UrlParams) => {
      const current = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") {
          current.delete(key);
        } else {
          current.set(key, String(value));
        }
      });

      router.push(`${pathname}?${current.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const clearUrl = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  return {
    getUrlParams,
    updateUrl,
    clearUrl,
  };
}
