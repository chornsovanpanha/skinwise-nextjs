"use client";
import { tempSelectProductAtom } from "@/lib/atom/compare";
import { ProductWithDetail } from "@/types";
import { useSetAtom } from "jotai";
import { useRouter } from "nextjs-toploader/app";

const CompareBtn = ({ product }: { product?: ProductWithDetail }) => {
  const router = useRouter();
  const setTempProduct = useSetAtom(tempSelectProductAtom);
  return (
    <div
      onClick={() => {
        setTempProduct({
          alias: product?.alias ?? "",
          brandName: product?.brand?.title ?? "",
          id: product?.id ?? -1,
          imageUrl: product?.Image?.at(0)?.url ?? "",
          name: product?.name ?? "",
        });
        router.push(`/comparison?primary`);
      }}
      className="rounded-full bg-secondary text-primary px-8 hover:bg-secondary/80 py-2.5 hover:cursor-pointer"
    >
      Compare
    </div>
  );
};

export default CompareBtn;
