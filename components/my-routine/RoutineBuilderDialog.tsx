"use client";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { calendars, routines } from "@/utils/constant/data";
import clsx from "clsx";
import { X } from "lucide-react";
import SmallProductItem from "../SmallProductItem";
import { Typography } from "../Typography";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const RoutineBuilderDialog = ({
  productId,
  onRemove,
  onAdd,
  onClose,
}: {
  productId?: string;
  onAdd: () => void;
  onRemove: () => void;
  onClose?: () => void;
}) => {
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
            Add Routine
          </Typography>
          <X
            className="h-6 w-6 sm:h-9 sm:w-9 hover:bg-gray-1 hover:cursor-pointer hover:rounded-full p-1"
            onClick={onClose}
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
            <SmallProductItem
              className="bg-primary/20 rounded-xl"
              type={"routine"}
              product={{
                id: 1,
                name: "Sunforgettable Total Protection Face Shield Matte SPF 50 PA++",
                brandName: "Paula Choice",
                imageUrl:
                  "https://storage.skinsort.com/vhfn18oeucujg2wmaqz2m4a6xy2a",
              }}
              onPress={() => {}}
            />
          </section>
          {/* When do you use the product  */}
          <section className="often-product">
            <Typography as="p" variant="h6" className="text-secondary mb-4">
              When do you use this product?
            </Typography>
            <div className="space-x-4">
              {routines?.map((item, index) => (
                <Badge
                  key={index}
                  className="px-5 text-secondary bg-primary/50 cursor-pointer hover:bg-primary py-1.5"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </section>

          {/* How often do you use  */}
          <section className="calender">
            <Separator className="bg-gray-2 mb-4" />
            <Typography as="p" variant="h6" className="text-secondary mb-4">
              How often you use ?
            </Typography>
            <div className="space-x-4">
              {calendars?.map((item, index) => (
                <Badge
                  key={index}
                  className="text-secondary bg-primary/50 cursor-pointer hover:bg-primary rounded-full"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </section>
        </main>
      </DialogDescription>
      <DialogFooter className="mb-4 px-4 w-full">
        <footer className="w-full">
          <Separator className="bg-gray-2" />
          <Button
            onClick={() => (productId ? onAdd() : onRemove())}
            className={clsx("w-full text- sm:text-lg", {
              "bg-error-main/50 text-white hover:bg-error-main/70": productId,
              "bg-secondary text-primary hover:bg-secondary/90": !productId,
            })}
          >
            {productId ? "Remove from routine" : "Add to my routine"}
          </Button>
        </footer>
      </DialogFooter>
    </DialogContent>
  );
};

export default RoutineBuilderDialog;
