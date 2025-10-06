import { globalSearchAction } from "@/actions/product/product.action";
import { ProductIngredientResponse } from "@/types";
import {
  keepPreviousData,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
export type GlobalQueryParams = {
  search?: string;
};
const globalQueryOptions = (
  key: string,
  params?: GlobalQueryParams
): UseQueryOptions<{
  data: ProductIngredientResponse | undefined;
}> => {
  return {
    queryKey: [key, params?.search],
    enabled: !!params?.search,
    staleTime: Infinity,
    queryFn: () => globalSearchAction({ search: params?.search ?? "" }),
    placeholderData: keepPreviousData,
  };
};

export const useGlobalSearch = (key: string, params?: GlobalQueryParams) => {
  const query = useQuery(globalQueryOptions(key, params));
  return {
    ...query,
    data: query.data?.data,
  };
};
