"use client";
import { BlockCompareCard } from "@/components/BlockCompareCard";
import { Product } from "@/types";
import clsx from "clsx";
import { ArrowRightLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import ComparisonSearchDialog from "./ComparisonSearchDialog";

const ComparisonSection = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [tempIndex, setTempIndex] = useState(-1);
  const [selectProducts, setSelectProducts] = useState<Product[]>([]);
  const onSelectProduct = (value: Product) => {
    const mutateProduct = selectProducts;
    mutateProduct[tempIndex] = value;
    setSelectProducts(mutateProduct);
  };
  const isAllowSearch = () => {
    const filteredArray = selectProducts.filter((item) => item);
    return filteredArray?.length >= 2 ? true : false;
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        setTempIndex(-1);
      }}
    >
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
        <div className="grid justify-self-center">
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
          router.push("/comparison-result");
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
        onClose={() => setOpen(false)}
        onSelect={onSelectProduct}
      />
    </Dialog>
  );
};

export default ComparisonSection;
