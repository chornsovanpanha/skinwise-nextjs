"use client";
import {
  createRoutine,
  deleteRoutineItem,
  updateRoutine,
} from "@/actions/routine/routine-action";
import Loading from "@/app/loading";
import { ProductRoutineBg } from "@/assets";
import ComparisonSearchDialog from "@/components/comparison/ComparisonSearchDialog";
import Wrapper from "@/components/custom/layout/Wrapper";
import MainProductItem from "@/components/MainProductItem";
import PersonalRoutineListing from "@/components/my-routine/PersonalRoutineListing";
import RoutineBuilderDialog from "@/components/my-routine/RoutineBuilderDialog";
import RoutineHeader from "@/components/my-routine/RoutineHeader";
import PageHeader from "@/components/PageHeader";
import { ShareableLinkDialog } from "@/components/ShareableLinkDialog";
import { Dialog } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  ProductWithBrandAndImages,
  ProfileRoutine,
  RoutineItem,
  RoutineType,
  SelectProduct,
} from "@/types";
import { FormValueRoutine } from "@/utils/schema/zod/routine";
import { useState } from "react";

const MyRoutine = ({
  profile,
  userId,
}: {
  profile?: ProfileRoutine | null;
  userId: number;
}) => {
  const [isLoading, setLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectProduct] = useState<
    SelectProduct | undefined
  >(undefined);
  const { show } = useToast();

  const routines = profile?.routines;
  const profileId = profile?.id;
  const onCloseDialog = () => {
    setOpen(false);
    setIsUpdated(false);
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
        userId: profile?.userId ?? userId,
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof Error)
        show({ type: "error", message: error.message });
    } finally {
      setSelectProduct(undefined);
    }
  }
  async function handleRoutineUpdate({
    product,
    payload,
    id,
    routineId,
  }: {
    product?: ProductWithBrandAndImages;
    payload: FormValueRoutine;
    id: string;
    routineId: string;
  }) {
    try {
      setLoading(true);

      const routine = await updateRoutine({
        payload: {
          productId: product?.id ?? 0,
          type: payload.type,
          usage: payload?.usage?.toString(),
          itemId: parseInt(id),
        },

        profileId: Number(profileId),
        routineId: Number(routineId),
      });

      if (routine?.success) {
        show({ type: "success", message: "Routine has been updated" });
      } else {
        show({
          type: "error",
          message: routine?.error || "Failed to update routine",
        });
      }
    } catch (error) {
      if (error instanceof Error)
        show({ type: "error", message: error.message });
    } finally {
      setLoading(false);
      setSelectProduct(undefined);
    }
  }

  const handleSelectProduct = (product: ProductWithBrandAndImages) => {
    setSelectProduct((pre) => ({
      ...pre,
      product: product,
    }));
    setOpen(true);
  };

  const handleUpsertRoutine = (values: FormValueRoutine, isEdit?: boolean) => {
    onCloseDialog();
    setSelectProduct(undefined);
    if (isEdit) {
      handleRoutineUpdate({
        payload: values,
        product: selectedProduct?.product,
        id: selectedProduct?.itemId ?? "-1",
        routineId: selectedProduct?.routineId ?? "",
      });
    } else {
      handleRoutineCreate({
        payload: values,
        product: selectedProduct?.product,
      });
    }
  };

  const handleDeleteRoutineItem = async () => {
    onCloseDialog();
    try {
      setLoading(true);

      const routine = await deleteRoutineItem({
        routineId: parseInt(selectedProduct?.routineId ?? ""),
        itemId: parseInt(selectedProduct?.itemId ?? ""),
        profileId: profileId ?? -1,
      });

      if (routine?.success) {
        show({ type: "success", message: "Routine has been deleted" });
      } else {
        show({
          type: "error",
          message: routine?.error || "Failed to delete routine",
        });
      }
    } catch (error) {
      if (error instanceof Error)
        show({ type: "error", message: error.message });
    } finally {
      setLoading(false);
      setSelectProduct(undefined);
    }
  };
  const handleSelectRoutineEdit = (item: RoutineItem) => {
    console.log("Edit item is", item);
    setOpen(true);
    setIsUpdated(true);
    setSelectProduct((pre) => ({
      ...pre,
      usage: item.usage,
      type: item.type,
      itemId: item?.id?.toString() ?? "",
      routineId: item?.routineId?.toString() ?? "",
      product: item.product as ProductWithBrandAndImages,
    }));
  };
  const morningRoutines: RoutineItem[] =
    routines
      ?.filter((data) => data.type === RoutineType.MORNING)
      ?.flatMap((routine) =>
        routine.items.map((item) => ({
          ...item,
          id: item.id,
          routineId: routine.id,
          type: routine.type as RoutineType,
        }))
      ) ?? [];

  const eveningRoutine: RoutineItem[] =
    routines
      ?.filter((data) => data.type === RoutineType.EVENING)
      ?.flatMap((routine) =>
        routine.items.map((item) => ({
          ...item,
          id: item.id,
          routineId: routine.id,
          type: routine.type as RoutineType,
        }))
      ) ?? [];

  return (
    <main>
      <Dialog
        onOpenChange={(value) => {
          setOpen(value);
          setIsUpdated(false);
          setSelectProduct(undefined);
        }}
        open={open}
      >
        {isLoading && <Loading />}
        <PageHeader
          title="My Routine"
          customDesc={<ShareableLinkDialog />}
          showBackgroundImg={true}
          backgroundImage={ProductRoutineBg}
        />
        <Wrapper className="flex-col space-y-12 h-fit w-full">
          {/* Morning routine  */}
          <section className="space-y-6">
            <RoutineHeader type={RoutineType.MORNING}>
              Morning Routine
            </RoutineHeader>
            <PersonalRoutineListing
              onOpenDialog={() => {
                setOpenSearch(true);
              }}
              items={morningRoutines}
              renderItem={(item, index) => (
                <div onClick={() => handleSelectRoutineEdit(item)} key={index}>
                  <MainProductItem
                    data={item?.product as ProductWithBrandAndImages}
                    allowLink={false}
                  />
                </div>
              )}
            />
          </section>
          {/* Evening routine  */}
          <section className="space-y-6">
            <RoutineHeader type={RoutineType.EVENING}>
              Evening Routine
            </RoutineHeader>
            <PersonalRoutineListing
              onOpenDialog={() => {
                setOpenSearch(true);
                setSelectProduct((pre) => ({
                  ...pre,
                  type: RoutineType.EVENING,
                }));
              }}
              items={eveningRoutine}
              renderItem={(item, index) => (
                <div onClick={() => handleSelectRoutineEdit(item)} key={index}>
                  <MainProductItem
                    data={item?.product as ProductWithBrandAndImages}
                    allowLink={false}
                  />
                </div>
              )}
            />
          </section>
        </Wrapper>

        <RoutineBuilderDialog
          isEditMode={isUpdated}
          key={`${open}-${isUpdated}`}
          selectProduct={selectedProduct?.product}
          onUpsert={(data, isEdit) => handleUpsertRoutine(data, isEdit)}
          onClose={onCloseDialog}
          onRemove={handleDeleteRoutineItem}
          type={selectedProduct?.type as RoutineType}
          usage={selectedProduct?.usage}
        />

        <Dialog open={openSearch} onOpenChange={setOpenSearch}>
          <ComparisonSearchDialog
            key={openSearch + ""}
            onClose={() => setOpenSearch(false)}
            onSelect={(value) => handleSelectProduct(value)}
          />
        </Dialog>
      </Dialog>
    </main>
  );
};

export default MyRoutine;
