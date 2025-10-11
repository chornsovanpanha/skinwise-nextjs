"use client";
import { BlockCompareCard } from "@/components/BlockCompareCard";
import { tempSelectProductAtom } from "@/lib/atom/compare";
import { Product } from "@/types";
import clsx from "clsx";
import { useAtom } from "jotai";
import { ArrowRightLeft } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import { ErrorDialog } from "../ErrorDialog";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import ComparisonSearchDialog from "./ComparisonSearchDialog";

const ComparisonSection = () => {
  const [showError, setShowError] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [tempIndex, setTempIndex] = useState(-1);
  const [tempSelectProduct, setTempSelectProduct] = useAtom(
    tempSelectProductAtom
  );
  const [selectProducts, setSelectProducts] = useState<Product[]>(
    tempSelectProduct ? [tempSelectProduct] : []
  );
  const onSelectProduct = (value: Product) => {
    const duplicate = selectProducts.find(
      (item) =>
        item.id === value.id ||
        item.name.toLowerCase() === value.name.toLowerCase()
    );
    if (duplicate) {
      setShowError(true);
      return;
    }
    setSelectProducts((prev) => {
      const newProducts = [...prev];
      if (tempIndex >= 0 && tempIndex < newProducts.length) {
        newProducts[tempIndex] = value;
      } else {
        newProducts.push(value);
      }
      return newProducts;
    });
  };
  const isAllowSearch = () => {
    const filteredArray = selectProducts.filter((item) => item);
    return filteredArray?.length >= 2 ? true : false;
  };

  useEffect(() => {
    return () => setTempSelectProduct(undefined);
  }, [setTempSelectProduct]);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        setTempIndex(-1);
      }}
    >
      <ErrorDialog
        open={showError}
        onClose={() => setShowError(false)}
        title="Duplicate Product"
        description="We cannot compare with the same product, Please search and select another one that is different."
      />
      <section className="compare block space-y-6 md:space-y-0 md:flex w-full gap-5 justify-between items-center">
        <BlockCompareCard
          imagePreview={selectProducts?.at(0)?.imageUrl}
          title="Click the plus icon"
          description="Pick your #1 Product"
          onClick={() => {
            setOpen(true);
            setTempIndex(0);
          }}
        />
        <div className="flex items-center justify-center w-full md:w-fit">
          <ArrowRightLeft className="w-8 h-8 md:w-10 md:h-10 text-primary" />
        </div>
        <BlockCompareCard
          imagePreview={selectProducts?.at(1)?.imageUrl}
          title="Click the plus icon"
          description="Pick your #2 Product"
          onClick={() => {
            setOpen(true);
            setTempIndex(1);
          }}
        />
      </section>
      <Button
        onClick={() => {
          router.push(
            `/comparison-result?compare=${selectProducts?.at(0)?.alias}-vs-${
              selectProducts?.at(1)?.alias
            }`
          );
        }}
        className={clsx(
          "bg-secondary hover:bg-secondary/85 py-8 rounded-3xl text-primary",
          {
            "cursor-not-allowed": selectProducts?.length <= 2,
            "cursor-pointer": selectProducts?.length == 2,
          }
        )}
        disabled={!isAllowSearch()}
      >
        Compare Product Now
      </Button>{" "}
      <ComparisonSearchDialog
        key={open + ""}
        onClose={() => setOpen(false)}
        onSelect={(product) => {
          onSelectProduct({
            brandName: product.brand?.title,
            id: product.id,
            imageUrl: product?.Image?.at(0)?.url ?? "",
            name: product?.name,
            alias: product?.alias ?? "",
          });
        }}
      />
    </Dialog>
  );
};

export default ComparisonSection;
