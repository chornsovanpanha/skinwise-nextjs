import { createRoutine } from "@/actions/routine/routine-action";
import Loading from "@/app/loading";
import LucidLoading from "@/components/LucidLoading";
import RoutineBuilderDialog from "@/components/my-routine/RoutineBuilderDialog";
import SearchArea from "@/components/SearchArea";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { useGlobalSearch } from "@/hooks/api/search/useGlobalSearch";
import { useToast } from "@/hooks/use-toast";
import { ProductWithBrandAndImages, SearchType, SelectProduct } from "@/types";
import { TANSTACKQUERY } from "@/utils/constant/queryclient";
import { FormValueRoutine } from "@/utils/schema/zod/routine";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const ChooseProduct = ({
  onContinue,
  profileId,
  userId,
}: {
  onContinue: () => void;
  profileId?: number;
  userId?: number;
}) => {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const { show } = useToast();
  const [searchAreaKey, setSearchAreaKey] = useState(0);
  const [open, setOpen] = useState(false);
  const { data } = useGlobalSearch(TANSTACKQUERY.GLOBAL_SEARCH, {
    search: searchParams?.get("q") ?? "",
  });

  const [selectedProduct, setSelectProduct] = useState<
    SelectProduct | undefined
  >(undefined);

  const onCloseDialog = () => {
    setOpen(false);
    setSearchAreaKey((pre) => pre + 1);
    // clearSingleParam();
  };

  async function handleRoutineCreate({
    product,
    payload,
  }: {
    product?: ProductWithBrandAndImages;
    payload: FormValueRoutine;
  }) {
    try {
      setLoading(true);
      const routine = await createRoutine({
        payload: {
          productId: product?.id ?? 0,
          type: payload?.type, // Evening Morning
          usage: payload?.usage?.toString(), // Mon, Fri
        },
        profileId: profileId,
        userId: userId,
      });

      if (routine && routine.success) {
        show({ type: "success", message: "Routine has been added" });
      }

      if (routine?.error && !routine.success) {
        show({
          type: "error",
          message: routine.error || "Routine failed to add",
        });
      }
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      setLoading(false);
      if (error instanceof Error)
        show({ type: "error", message: error.message });
    } finally {
      setSelectProduct(undefined);
    }
  }

  function handleTapItem(
    type: SearchType,
    _: string,
    product?: ProductWithBrandAndImages
  ): void {
    console.log(type);
    setOpen(true);
    setSelectProduct((pre) => ({ ...pre, product: product }));
  }

  const handleUpsertRoutine = (values: FormValueRoutine) => {
    onCloseDialog();
    setSelectProduct(undefined);
    handleRoutineCreate({
      payload: values,
      product: selectedProduct?.product,
    });
  };

  return (
    <section className="result flex flex-col  space-y-4 w-full  sm:w-xl">
      {loading && <Loading />}
      <Dialog onOpenChange={setOpen} open={open}>
        <SearchArea
          key={searchAreaKey}
          showRecent={false}
          products={data?.products}
          className="bg-white w-full  border border-gray-5 placeholder:text-gray-5 text-gray-6"
          handleTapItem={handleTapItem}
        />
        <Button
          onClick={onContinue}
          type="button"
          disabled={loading}
          className="w-[100%] bg-secondary hover:bg-secondary/90 text-primary rounded-2xl"
        >
          {loading ? (
            <LucidLoading />
          ) : (
            `I have finished adding my skincare routine`
          )}
        </Button>
        <RoutineBuilderDialog
          onUpsert={(data) => {
            handleUpsertRoutine(data);
          }}
          onClose={onCloseDialog}
          key={`${open}`}
          selectProduct={selectedProduct?.product}
          onRemove={onCloseDialog}
        />
      </Dialog>
    </section>
  );
};

export default ChooseProduct;
