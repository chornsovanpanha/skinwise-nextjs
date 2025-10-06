"use client";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductWithBrandAndImages } from "@/types";
import { calendars, routines } from "@/utils/constant/data";
import {
  FormValueRoutine,
  routineUserSchema,
} from "@/utils/schema/zod/routine";
import { zodResolver } from "@hookform/resolvers/zod";
import { RoutineType } from "@prisma/client";
import clsx from "clsx";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import SmallProductItem from "../SmallProductItem";
import { Typography } from "../Typography";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const RoutineBuilderDialog = ({
  onRemove,
  onUpsert,
  selectProduct,
  onClose,

  isEditMode,
  type,
  usage,
}: {
  isEditMode?: boolean;
  onUpsert: (data: FormValueRoutine, isEdit?: boolean) => void;
  onRemove: () => void;
  onClose?: () => void;
  selectProduct?: ProductWithBrandAndImages;
  type?: string;
  usage?: string;
}) => {
  const { formState, reset, trigger, watch, setValue, getValues } =
    useForm<FormValueRoutine>({
      defaultValues: {
        usage: [],
        type: "MORNING",
      },
      mode: "onChange",
      resolver: zodResolver(routineUserSchema),
    });

  const handleValidation = () => {
    trigger();
    if (formState.isValid) {
      //Validation success
      const data = getValues();
      onUpsert(data, isEditMode);
    }
  };

  useEffect(() => {
    console.log("Type is", type, usage);
    if (type || usage) {
      reset({
        type: type as RoutineType,
        usage: usage?.split(",") ?? [],
      });
    }
  }, [type, usage, reset, trigger]);

  return (
    <DialogContent
      aria-description="dialog-search-product"
      aria-describedby="dialog"
      onMouseDown={(e) => e.stopPropagation()}
      className="z-[12000] md:max-w-xl w-full p-0 rounded-2xl overflow-hidden border-0 max-w-md [&>button]:hidden"
    >
      {/* Header without extra padding */}
      <DialogHeader className="p-0 bg-white py-4 px-4">
        <DialogTitle className="text-secondary flex justify-between w-full items-start">
          <Typography
            as="p"
            variant="h6"
            className="text-secondary mb-4 font-bold pt-2"
          >
            {isEditMode ? "Update Routine" : "Add Routine"}
          </Typography>
          <X
            className="h-6 w-6 sm:h-9 sm:w-9 hover:bg-gray-1 hover:cursor-pointer hover:rounded-full p-1"
            onClick={() => {
              if (onClose) onClose();
              reset();
            }}
          />
        </DialogTitle>
        <Separator className="bg-gray-2" />
      </DialogHeader>

      {/* Scrollable product list */}
      <DialogDescription asChild>
        <main className="min-h-[420px] px-4 space-y-5">
          {/* Header product overview  */}
          <section>
            <Typography
              as="p"
              variant="default"
              className="text-secondary mb-4"
            >
              Your selected product
            </Typography>
            {selectProduct && (
              <SmallProductItem
                className="bg-primary/20 rounded-xl"
                type={"routine"}
                showBrand
                product={selectProduct}
                onPress={() => {}}
              />
            )}
          </section>
          {/* When do you use the product  */}
          <section className="often-product">
            <Typography as="p" variant="h6" className="text-secondary mb-4">
              When do you use this product?
            </Typography>
            <div className="space-x-4">
              {routines?.map((item, index) => (
                <Badge
                  onClick={() => {
                    setValue("type", item, { shouldValidate: true });
                  }}
                  key={index}
                  className={clsx(
                    "px-5 text-secondary bg-primary/50 cursor-pointer hover:bg-primary py-1.5",
                    {
                      "border-2 border-primary bg-secondary text-primary hover:text-primary hover:bg-secondary":
                        watch("type") == item,
                    }
                  )}
                >
                  {item}
                </Badge>
              ))}
            </div>
            {formState.errors?.type && (
              <Typography variant="caption" className="text-error-main mt-3">
                * {formState.errors?.type?.message}
              </Typography>
            )}
          </section>

          {/* How often do you use  */}
          <section className="calender">
            <Separator className="bg-gray-2 mb-4" />
            <Typography as="p" variant="h6" className="text-secondary mb-4">
              How often you use ?
            </Typography>
            <div className="space-x-4">
              {calendars?.map((item, index) => {
                const selected = watch("usage")?.includes(item);

                return (
                  <Badge
                    key={index}
                    onClick={() => {
                      const current = watch("usage") || [];
                      const newValue = selected
                        ? current.filter((i) => i !== item) // remove if already selected
                        : [...current, item]; // add if not selected

                      setValue("usage", newValue, { shouldValidate: true });
                    }}
                    className={clsx(
                      "text-secondary bg-primary/50 cursor-pointer hover:bg-primary rounded-full",
                      {
                        "border-2 border-primary bg-secondary text-primary hover:text-primary hover:bg-secondary":
                          selected,
                      }
                    )}
                  >
                    {item}
                  </Badge>
                );
              })}
            </div>
            {formState.errors?.usage && (
              <Typography variant="caption" className="text-error-main mt-3">
                * {formState.errors?.usage?.message}
              </Typography>
            )}
          </section>
        </main>
      </DialogDescription>
      <DialogFooter className="mb-4 px-4 w-full">
        <footer className="w-full flex items-center justify-between gap-3">
          {isEditMode && (
            <Button
              type="button"
              onClick={onRemove}
              className={clsx(
                "flex-1 text-sm sm:text-lg",
                isEditMode
                  ? "bg-error-main/50 text-white hover:bg-error-main/70"
                  : "bg-secondary text-primary hover:bg-secondary/90"
              )}
            >
              Remove from routine
            </Button>
          )}

          <Button
            type="button"
            onClick={handleValidation}
            className={clsx(
              "flex-1 text-sm sm:text-lg",
              "bg-secondary text-primary hover:bg-secondary/90"
            )}
          >
            {isEditMode ? "Save Changes" : "Add to my routine"}
          </Button>
        </footer>
      </DialogFooter>
    </DialogContent>
  );
};

export default RoutineBuilderDialog;
