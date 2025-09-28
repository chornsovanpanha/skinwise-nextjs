"use client";
import AppInput from "@/components/AppInput";
import { AppSelect } from "@/components/CustomSelect";
import { IngredientDialogForm } from "@/components/IngredientDialogForm";
import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { dummyIngredientLists } from "@/utils/mock";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { IngredientDataTable } from "../../ingredients/(tables)/IngredientTable";
import { ingredientColumns } from "../../ingredients/(tables)/column";

type EffectType = "POSITIVE" | "NEGATIVE";

type FormValues = {
  name: string;
  code?: string;
  alias?: string;
  desc?: string;
  brandId: string;
  categoryId: string;
  ingredients: { name: string; alias: string; concentration?: string }[];
  effects: { type: EffectType; title: string; desc?: string }[];
  insideGroups: { title: string; items: string[] }[];
};

export default function ProductForm() {
  const form = useForm<FormValues>({
    defaultValues: {
      ingredients: [{ name: "", alias: "", concentration: "" }],
      effects: [{ type: "POSITIVE", title: "", desc: "" }],
      insideGroups: [{ title: "", items: [""] }],
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({ control: form.control, name: "ingredients" });

  const {
    fields: effectFields,
    append: appendEffect,
    remove: removeEffect,
  } = useFieldArray({ control: form.control, name: "effects" });

  const {
    fields: groupFields,
    append: appendGroup,
    remove: removeGroup,
  } = useFieldArray({ control: form.control, name: "insideGroups" });

  const onSubmit = (data: FormValues) => {
    console.log("Form Data", data);
    // Call API to create product
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mb-12">
      {/* Basic Product Info */}
      <div className="block sm:grid items-center grid-cols-2 gap-4">
        <AppInput
          id="name"
          className="py-5"
          label="Product Name"
          placeholder="Enter product name"
          {...form.register("name")}
          error={form.formState.errors.name?.message ?? ""}
        />

        <AppInput
          id="alias"
          className="py-5"
          label="Alias"
          placeholder="Optional alias"
          {...form.register("alias")}
          error={form.formState.errors.alias?.message ?? ""}
        />
      </div>

      <div className="block sm:grid items-start grid-cols-2 gap-4">
        <AppInput
          id="desc"
          label="Description"
          className="py-5"
          placeholder="Enter product description"
          {...form.register("desc")}
          error={form.formState.errors.desc?.message ?? ""}
        />

        <Controller
          control={form.control}
          name="brandId"
          render={({ field }) => (
            <div>
              <AppSelect
                label="Brand"
                error={form.formState.errors.brandId?.message ?? ""}
                placeholder="Brand"
                className="w-full"
                value={field.value}
                onValueChange={field.onChange}
                options={[
                  { label: "Skin-001", value: "skin-001" },
                  { label: "Skin-002", value: "skin-002" },
                ]}
              />
            </div>
          )}
        />
      </div>

      {/* Ingredients Section */}
      <div className="space-y-2">
        <header className="flex flex-row justify-between mb-4 items-center">
          <h3 className="font-semibold">Ingredients</h3>
          <IngredientDialogForm />
        </header>
        <IngredientDataTable
          columns={ingredientColumns}
          showPaging={false}
          data={dummyIngredientLists ?? []}
        />
      </div>

      {/* Effects Section */}
      <div className="space-y-2  flex-row items-center border px-5 py-8 rounded-xl">
        <header className="flex flex-row justify-between mb-4 items-center">
          <h3 className="font-semibold">Product Effect</h3>
          <Button
            type="button"
            onClick={() =>
              appendEffect({ type: "POSITIVE", title: "", desc: "" })
            }
          >
            Add Effect
          </Button>
        </header>
        {effectFields.map((field, index) => (
          <div
            key={field.id}
            className="block flex-wrap space-x-2 items-start mb-6"
          >
            {/* replace native select with Controller + AppSelect */}

            <div className="block sm:grid items-start md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Controller
                control={form.control}
                name={`effects.${index}.type`}
                render={({ field }) => (
                  <div className="mb-2">
                    <AppSelect
                      label="Select Type"
                      placeholder="Effect type"
                      className="w-full"
                      value={field.value}
                      onValueChange={field.onChange}
                      options={[
                        { label: "Positive", value: "POSITIVE" },
                        { label: "Negative", value: "NEGATIVE" },
                      ]}
                      error={
                        form.formState.errors.effects?.[index]?.type?.message ??
                        ""
                      }
                    />
                  </div>
                )}
              />

              <AppInput
                id={`effects.${index}.title`}
                label="Title"
                className="w-full py-5"
                placeholder="Effect title"
                {...form.register(`effects.${index}.title` as const)}
              />

              <div className="w-full lg:col-span-1 md:col-span-full">
                <AppInput
                  id={`effects.${index}.desc`}
                  label="Description"
                  className="w-full py-5"
                  placeholder="Optional description"
                  {...form.register(`effects.${index}.desc` as const)}
                />
              </div>
            </div>

            <Button
              type="button"
              onClick={() => removeEffect(index)}
              className="bg-error-background text-error-main hover:bg-error-background/50"
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      {/* Inside Groups Section */}
      {/* <div className="space-y-2">
        <header className="flex flex-row justify-between mb-4 items-center">
          <h3 className="font-semibold">Inside Groups</h3>
          <Button
            type="button"
            onClick={() =>
              appendEffect({ type: "POSITIVE", title: "", desc: "" })
            }
          >
            Add Effect
          </Button>
        </header>

        {groupFields.map((group, index) => (
          <div key={group.id} className="space-y-1 border p-2 rounded">
            <AppInput
              id={`insideGroups.${index}.title`}
              label="Group Title"
              placeholder="Group title"
              {...form.register(`insideGroups.${index}.title` as const)}
            />

            {group.items.map((_, i) => (
              <div key={i} className="flex space-x-2">
                <AppInput
                  label=""
                  placeholder="Item"
                  {...form.register(
                    `insideGroups.${index}.items.${i}` as const
                  )}
                />
                <Button
                  type="button"
                  onClick={() => {
                    const updated = [...group.items];
                    updated.splice(i, 1);
                    form.setValue(`insideGroups.${index}.items`, updated);
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}

            <Button
              type="button"
              onClick={() =>
                form.setValue(`insideGroups.${index}.items`, [
                  ...group.items,
                  "",
                ])
              }
            >
              Add Item
            </Button>

            <Button type="button" onClick={() => removeGroup(index)}>
              Remove Group
            </Button>
          </div>
        ))}

        <Button
          type="button"
          onClick={() => appendGroup({ title: "", items: [""] })}
        >
          Add Group
        </Button>
      </div> */}

      {/* Submit */}
      <Button type="submit" className="w-full  py-8 rounded-2xl">
        <Typography variant="body1">Create Product</Typography>
      </Button>
    </form>
  );
}
