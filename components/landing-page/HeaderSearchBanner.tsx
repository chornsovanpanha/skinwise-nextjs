"use client";
import { BannerLanding } from "@/assets";
import { useGlobalSearch } from "@/hooks/api/search/useGlobalSearch";
import { recentSearchProductAtom } from "@/lib/atom/search.atom";
import { ProductWithBrandAndImages, SearchType } from "@/types";
import { TANSTACKQUERY } from "@/utils/constant/queryclient";
import { useAtom } from "jotai";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { startTransition } from "react";
import SearchArea from "../SearchArea";
import { Typography } from "../Typography";

const HeaderSearchBanner = () => {
  const router = useRouter();
  const [recentSearch, setRecentSearch] = useAtom(recentSearchProductAtom);
  const searchParams = useSearchParams();
  const { data } = useGlobalSearch(TANSTACKQUERY.GLOBAL_SEARCH, {
    search: searchParams?.get("q") ?? "",
  });
  function handleTapItem(
    type: SearchType,
    alias: string,
    product?: ProductWithBrandAndImages
  ): void {
    if (type == "product" && product) {
      startTransition(() => {
        const duplicateProduct = recentSearch.find(
          (item) => item.id === product.id
        );
        if (!duplicateProduct) {
          if (recentSearch?.length >= 4) {
            setRecentSearch((prev) => {
              const newList = [...prev];
              newList.shift();
              newList.push(product);
              return newList;
            });
          } else {
            setRecentSearch((prev) => [...prev, product]);
          }
        }
        router.push(`/product/${alias}`);
      });
    }
  }

  return (
    <section className="w-full h-[590px] bg-gray-100 relative z-10">
      <div className="bg-secondary/40 w-full h-full absolute" />
      <Image
        src={BannerLanding}
        alt="banner"
        className="object-cover w-full h-full"
      />

      <div className="absolute top-0 bottom-0  left-0 right-0 flex justify-center items-center">
        <header className="text-center">
          <Typography variant="h2" className="text-primary">
            Find skincare that works
          </Typography>
          <Typography variant="body1" className="text-primary">
            see what’s inside any product
          </Typography>
          {/* Search area text  */}
          <SearchArea
            showRecent={recentSearch?.length > 0}
            handleTapItem={handleTapItem}
            ingredients={data?.ingredients}
            products={data?.products}
          />
        </header>
      </div>
    </section>
  );
};

export default HeaderSearchBanner;
