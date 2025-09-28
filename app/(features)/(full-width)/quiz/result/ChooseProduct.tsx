import RoutineBuilderDialog from "@/components/my-routine/RoutineBuilderDialog";
import SearchArea from "@/components/SearchArea";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { SearchType } from "@/types";
import { popularProductListings } from "@/utils/mock";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const ChooseProduct = ({
  currentIndex,
  onContinue,
}: {
  currentIndex: number;
  onContinue: () => void;
}) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchAreaKey, setSearchAreaKey] = useState(0);
  const [open, setOpen] = useState(false);
  const clearSingleParam = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    router.push(`${pathName}?${params.toString()}`);
  };
  const onCloseDialog = () => {
    setOpen(false);
    setSearchAreaKey((pre) => pre + 1);
    clearSingleParam();
  };

  function handleTapItem(type: SearchType): void {
    console.log(type);
    setOpen(true);
  }
  return (
<<<<<<< HEAD
    <section className="result flex flex-col  space-y-4 w-full  sm:w-xl">
=======
    <section className="result flex flex-col  space-y-4">
>>>>>>> origin/main
      <Dialog onOpenChange={setOpen} open={open}>
        <SearchArea
          key={searchAreaKey}
          showRecent={false}
          products={popularProductListings}
          className="bg-white w-full  border border-gray-5 placeholder:text-gray-5 text-gray-6"
          handleTapItem={handleTapItem}
        />
        <Button
          onClick={onContinue}
          type="button"
          className="w-[100%] bg-secondary hover:bg-secondary/90 text-primary rounded-2xl"
        >
          I have finished adding my skincare routine {currentIndex}
        </Button>
        <RoutineBuilderDialog
          onAdd={onCloseDialog}
          onClose={onCloseDialog}
          onRemove={onCloseDialog}
        />
      </Dialog>
    </section>
  );
};

export default ChooseProduct;
