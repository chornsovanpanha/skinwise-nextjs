import { trackUserSearch } from "@/actions/track/track-action";
import { getProductComparison } from "@/data/comparison";
import { analysisProductComparison } from "@/data/gemini";
import { getUserIdFromSession } from "@/lib/sessions/session";
import { PlanType } from "@/types";
import { ProductSummaryType, ResponseAnalyse } from "@/types/response";
import { splitComparisonSlug } from "@/utils/formatter";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import ComparisonResult from "./ComparisonResult";
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> => {
  const search = await searchParams;
  const comparison = search?.compare ?? "";
  const { primary, secondary } = splitComparisonSlug(comparison.toString());
  // If comparison is missing or invalid
  if (!primary || !secondary) {
    return {
      title: "Product Comparison Not Found | SkinWise",
      description:
        "The products you tried to compare were not found. Please select valid skincare products to compare.",
    };
  }
  const title = `${primary} vs ${secondary}`;
  const description = `Compare ${primary} and ${secondary} side by side to find the best skincare product for your skin.`;

  return {
    title,
    description,
  };
};

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const search = await searchParams;
  const userId = await getUserIdFromSession();

  const subscription = await trackUserSearch();
  //User has reach their limit view product ,ingredients and comparison ...
  if (!subscription?.data?.success && userId) {
    return redirect("/pricing");
  }
  const comparison = search?.compare ?? "";
  const { primary, secondary } = splitComparisonSlug(comparison?.toString());
  const productComparisons = await getProductComparison({
    primaryAlias: primary,
    secondaryAlias: secondary,
  });

  if (productComparisons?.length <= 1 || primary === secondary) {
    return notFound();
  }

  const primaryProduct = productComparisons?.at(0);
  const secondaryProduct = productComparisons?.at(1);

  let analysis;

  if (subscription.data?.planType == PlanType.PRO) {
    analysis = await analysisProductComparison(
      {
        keyPrimary: primaryProduct?.ingredients?.toString(),
        keySecondary: secondaryProduct?.ingredients?.toString(),
        productBrandPrimary: primaryProduct?.brand?.title,
        productBrandSecondary: secondaryProduct?.brand?.title,
        productPrimaryName: primaryProduct?.name,
        productSecondaryName: secondaryProduct?.name,
      },
      userId ?? ""
    );
  }

  const toProductSummaries = (analysis?: ResponseAnalyse | null) => {
    console.log("Analy sis is", analysis);
    if (!analysis) return [];

    return [
      {
        id: 1,
        title: "Summary What they are",
        desc: analysis.summary,
      },
      {
        id: 2,
        title: "Best for",
        desc: analysis.recommendation,
      },
      {
        id: 3,
        title: "Feature",
        desc: analysis.feature,
      },
    ];
  };

  return (
    <ComparisonResult
      planType={subscription.data?.planType ?? PlanType.FREE}
      data={productComparisons}
      productSummaries={
        (toProductSummaries(analysis) as ProductSummaryType[]) ?? []
      }
    />
  );
};

export default Page;
