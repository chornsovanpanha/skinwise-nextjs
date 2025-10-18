import { productSearchAction } from "@/actions/product/product.action";
import { TANSTACKQUERY } from "@/utils/constant/queryclient";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import Comparison from "./Comparison";

export const metadata: Metadata = {
  title: "Product Compare",
  description:
    "Easily compare skincare products side by side with SkinWise. Discover which products best match your skin needs with clear comparisons.",
  keywords: [
    "SkinWise",
    "skincare compare",
    "product comparison",
    "skin care",
    "beauty products",
    "skin wise",
  ],
  openGraph: {
    title: "SkinWise Product Compare",
    description:
      "Compare skincare products side by side and find the perfect match for your skin.",
    url: "https://yourdomain.com/compare",
    siteName: "SkinWise",
    images: [
      {
        url: "https://yourdomain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "SkinWise Product Comparison",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkinWise Product Compare",
    description:
      "Compare skincare products easily and find the perfect one for your skin.",
    images: ["https://yourdomain.com/og-image.png"],
  },
};
//Server side tanstack query
const Page = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [TANSTACKQUERY.PRODUCTS, ""],
    queryFn: () => productSearchAction({ search: "" }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Comparison />
    </HydrationBoundary>
  );
};

export default Page;
