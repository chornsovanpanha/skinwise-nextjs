import { productSearchAction } from "@/actions/product/product.action";
import { TANSTACKQUERY } from "@/utils/constant/queryclient";
import { QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import LandingDefault from "./default";
export const revalidate = 60; // Rebuild page every 1 minute
export const metadata: Metadata = {
  title: "Home",
  description: "Skinwise landing home page",
};
export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [TANSTACKQUERY.PRODUCTS, ""],
    queryFn: () => productSearchAction({ search: "" }),
  });
  return <LandingDefault />;
}
