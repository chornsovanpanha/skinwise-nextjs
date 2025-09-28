import { brandListingAction } from "@/actions/brand/brand.action";
import { Brand } from "@/types";
import {
  keepPreviousData,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
export type BrandQueryParams = {
  page?: string;
  limit?: string;
};
const brandingQueryOptions = (
  key: string,
  params?: BrandQueryParams
): UseQueryOptions<{
  data: Brand[] | undefined;
  totalRecords: number;
} | null> => {
  return {
    queryKey: [key, params?.limit, params?.page],
    enabled: true,
    staleTime: Infinity,
    queryFn: () => brandListingAction(params),
    placeholderData: keepPreviousData,
  };
};

export const useBrandListing = (key: string, params?: BrandQueryParams) => {
  const query = useQuery(brandingQueryOptions(key, params));
  return {
    ...query,
    data: query.data?.data,
    totalRecords: query.data?.totalRecords,
  };
};
