"use client";

import AppInput from "@/components/AppInput"; // ✅ import your AppInput
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { IngredientFormValues, ingredientSchema } from "@/utils/schema";

export function IngredientDialogForm() {
  const [open, setOpen] = useState(false);

  const form = useForm<IngredientFormValues>({
    resolver: zodResolver(ingredientSchema),
    defaultValues: {
      name: "",
      desc: "",
      about: "",
      alias: "",
    },
  });

  const onSubmit = (values: IngredientFormValues) => {
    console.log("Submitted:", values);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Ingredient</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Ingredient</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Name field */}
          <AppInput
            id="name"
            label="Name"
            placeholder="e.g. Retinol (Vitamin A)"
            {...form.register("name")}
            error={form.formState.errors.name?.message ?? ""}
          />

          {/* Alias field */}
          <AppInput
            id="alias"
            label="Alias"
            placeholder="retinol"
            {...form.register("alias")}
            error={form.formState.errors.alias?.message ?? ""}
          />

          {/* Short Description replaced with AppInput */}
          <AppInput
            id="desc"
            label="Short Description"
            placeholder="Short description..."
            {...form.register("desc")}
            error={form.formState.errors.desc?.message ?? ""}
          />
          <Label htmlFor={"about"} className="mb-3">
            About Description
          </Label>
          <Textarea
            placeholder="Longer about text..."
            id="about"
            {...form.register("about")}
            rows={7}
            className="resize-none h-40  placeholder:text-gray-4 bg-white"
          />

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
