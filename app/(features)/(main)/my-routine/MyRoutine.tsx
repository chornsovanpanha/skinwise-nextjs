"use client";
import { ProductRoutineBg } from "@/assets";
import Wrapper from "@/components/custom/layout/Wrapper";
import PersonalRoutineListing from "@/components/my-routine/PersonalRoutineListing";
import RoutineHeader from "@/components/my-routine/RoutineHeader";
import PageHeader from "@/components/PageHeader";
import ProductItem from "@/components/ProductItem";
import { eveningRoutineProducts, morningRoutineProducts } from "./data";
import RoutineBuilderDialog from "@/components/my-routine/RoutineBuilderDialog";
import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const MyRoutine = () => {
  const [open, setOpen] = useState(false);
  const onCloseDialog = () => {
    setOpen(false);
  };
  return (
    <main>
      <Dialog onOpenChange={setOpen} open={open}>
        <PageHeader
          title="My Routine"
          customDesc={
            <Button className="w-full mt-2 rounded-2xl">Share</Button>
          }
          showBackgroundImg={true}
          backgroundImage={ProductRoutineBg}
        />
        <Wrapper className="flex-col space-y-12 h-fit w-full">
          {/* Morning routine  */}
          <section className="space-y-6">
            <RoutineHeader type="morning">Morning Routine</RoutineHeader>
            <PersonalRoutineListing
              onOpenDialog={() => setOpen(true)}
              items={morningRoutineProducts}
              renderItem={(item, index) => (
                <ProductItem data={item} key={index} />
              )}
            />
          </section>
          {/* Evening routine  */}
          <section className="space-y-6">
            <RoutineHeader type="evening">Evening Routine</RoutineHeader>
            <PersonalRoutineListing
              onOpenDialog={() => setOpen(true)}
              items={eveningRoutineProducts}
              renderItem={(item, index) => (
                <ProductItem data={item} key={index} />
              )}
            />
          </section>
        </Wrapper>
        <RoutineBuilderDialog
          productId="sd"
          onAdd={onCloseDialog}
          onClose={onCloseDialog}
          onRemove={onCloseDialog}
        />
      </Dialog>
    </main>
  );
};

export default MyRoutine;
