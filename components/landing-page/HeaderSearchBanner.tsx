"use client";
import { BannerLanding } from "@/assets";
import { SearchType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SearchArea from "../SearchArea";
import { Typography } from "../Typography";
import { searchPreviewListing } from "@/utils/mock";

const HeaderSearchBanner = () => {
  const router = useRouter();
  function handleTapItem(type: SearchType): void {
    router.push(
      type == "ingredient" ? "/ingredient/example" : "/product/example"
    );
  }
  return (
    <section className="w-full h-[590px] bg-gray-100 relative z-10">
      <div className="bg-secondary/40 w-full h-full absolute" />
      <Image
        src={BannerLanding}
        alt="banner"
        className="object-cover w-full h-full"
      />

      <div className="absolute top-0 bottom-0  left-0 right-0 flex justify-center items-center ">
        <header className="text-center">
          <Typography variant="h2" className="text-primary">
            Find skincare that works
          </Typography>
          <Typography variant="body1" className="text-primary">
            see what’s inside any product
          </Typography>
          {/* Search area text  */}
          <SearchArea
            showRecent
            handleTapItem={handleTapItem}
            ingredients={searchPreviewListing.ingredients}
            products={searchPreviewListing.products}
          />
        </header>
      </div>
    </section>
  );
};

export default HeaderSearchBanner;
