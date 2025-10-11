import { productSearchAction } from "@/actions/product/product.action";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
export type ProductQueryParams = {
  search?: string;
};
const productQueryOption = (key: string, params?: ProductQueryParams) => {
  return {
    queryKey: [key, params?.search],
    enabled: true,
    staleTime: Infinity,
    // refetchOnMount: true,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
    queryFn: () => productSearchAction({ search: params?.search ?? "" }),
    placeholderData: keepPreviousData,
  };
};

export const useProductSearch = (key: string, params?: ProductQueryParams) => {
  const query = useQuery(productQueryOption(key, params));
  return {
    ...query,
    data: query.data?.data,
  };
};
