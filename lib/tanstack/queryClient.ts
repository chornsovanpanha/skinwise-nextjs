import { QueryClient, QueryClientConfig } from "@tanstack/react-query";

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
      retryOnMount: false,
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,
    },
  },
};
export const queryClient = new QueryClient({
  ...queryClientConfig,
});
