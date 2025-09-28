import { getBrandIdAction } from "@/actions/brand/brand.action";
import { Brand } from "@/types";
import {
  keepPreviousData,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
export type BrandQueryParams = {
  id?: string;
};
const brandingQueryDetail = (
  key: string,
  params?: BrandQueryParams
): UseQueryOptions<{
  data: Brand | undefined;
} | null> => {
  return {
    queryKey: [key, params?.id],
    enabled: !!params?.id,
    staleTime: Infinity,
    queryFn: () => getBrandIdAction({ id: params?.id ?? "" }),
    placeholderData: keepPreviousData,
  };
};

export const useBrandDetail = (key: string, params?: BrandQueryParams) => {
  const query = useQuery(brandingQueryDetail(key, params));
  return {
    ...query,
    data: query.data?.data,
  };
};
