"use client";
import { BannerLanding } from "@/assets";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import AppInput from "../AppInput";
import { Typography } from "../Typography";
import SearchPreviewListing from "./SearchPreviewListing";

const HeaderSearchBanner = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [debounceSearch, setDebounceSearch] = useState(q ?? "");
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const pathName = usePathname();
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (q) {
      setIsFocused(true);
    }
  }, [pathName, q]);

  function handleTextChange(e: ChangeEvent<HTMLInputElement>): void {
    setIsFocused(true);
    setDebounceSearch(e.target.value?.toLowerCase());
    if (!e.target.value) {
      router.replace(`/`, {
        scroll: false,
      });
    } else {
      router.replace(`?q=${encodeURIComponent(e.target.value)}`, {
        scroll: false,
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

      <div className="absolute top-0 bottom-0  left-0 right-0 flex justify-center items-center ">
        <header className="text-center">
          <Typography variant="h2" className="text-primary">
            Find skincare that works
          </Typography>
          <Typography variant="body1" className="text-primary">
            see what’s inside any product
          </Typography>
          {/* Search area text  */}
          <div className="search-area relative" ref={searchRef}>
            <AppInput
              id="search"
              label=""
              value={debounceSearch}
              onFocus={() => setIsFocused(true)}
              onChange={handleTextChange}
              type="text"
              className=" bg-secondary border-0 text-primary py-8 my-4 rounded-2xl z-50"
              placeholder="Type to search for product or ingredient...."
            />
            {debounceSearch && isFocused && (
              <SearchPreviewListing
                onPress={(type) => {
                  router.push(
                    type == "ingredient"
                      ? "/ingredient/example"
                      : "/product/example"
                  );
                }}
              />
            )}
          </div>
        </header>
      </div>
    </section>
  );
};

export default HeaderSearchBanner;
