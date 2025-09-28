"use client";

import AppInput from "@/components/AppInput";
import { Button } from "@/components/ui/button";
import { useFieldArray, useForm } from "react-hook-form";

type EffectType = "POSITIVE" | "NEGATIVE";

type FormValues = {
  name: string;
  alias: string;
  desc?: string;
  about?: string;
  effects: { type: EffectType; title: string; desc?: string }[];
  insideGroups: { title: string; items: string[] }[];
  images: { url: string; altText?: string }[];
};

export default function IngredientForm() {
  const form = useForm<FormValues>({
    defaultValues: {
      effects: [{ type: "POSITIVE", title: "", desc: "" }],
      insideGroups: [{ title: "", items: [""] }],
      images: [{ url: "", altText: "" }],
    },
  });

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

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({ control: form.control, name: "images" });

  const onSubmit = (data: FormValues) => {
    console.log("Ingredient Form Data:", data);
    // Call your API to create/update ingredient
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Basic Info */}
      <AppInput
        id="name"
        label="Name"
        placeholder="Retinol (Vitamin A)"
        {...form.register("name")}
        error={form.formState.errors.name?.message ?? ""}
      />
      <AppInput
        id="alias"
        label="Alias"
        placeholder="retinol"
        {...form.register("alias")}
        error={form.formState.errors.alias?.message ?? ""}
      />
      <AppInput
        id="desc"
        label="Short Description"
        placeholder="Short description..."
        {...form.register("desc")}
        error={form.formState.errors.desc?.message ?? ""}
      />
      <AppInput
        id="about"
        label="About this ingredient"
        placeholder="Longer description..."
        {...form.register("about")}
        error={form.formState.errors.about?.message ?? ""}
      />

      {/* Effects */}
      <div className="space-y-2">
        <h3>Effects</h3>
        {effectFields.map((field, index) => (
          <div key={field.id} className="flex space-x-2 items-center">
            <select {...form.register(`effects.${index}.type` as const)}>
              <option value="POSITIVE">Positive</option>
              <option value="NEGATIVE">Negative</option>
            </select>
            <AppInput
              placeholder="Title"
              label=""
              {...form.register(`effects.${index}.title` as const)}
            />
            <AppInput
              label=""
              placeholder="Description"
              {...form.register(`effects.${index}.desc` as const)}
            />
            <Button type="button" onClick={() => removeEffect(index)}>
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            appendEffect({ type: "POSITIVE", title: "", desc: "" })
          }
        >
          Add Effect
        </Button>
      </div>

      {/* Inside Groups */}
      <div className="space-y-2">
        <h3>Inside Groups</h3>
        {groupFields.map((field, index) => (
          <div key={field.id} className="space-y-1 border p-2 rounded">
            <AppInput
              label=""
              placeholder="Group title"
              {...form.register(`insideGroups.${index}.title` as const)}
            />
            {field.items.map((item, i) => (
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
                    const updated = [...field.items];
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
              onClick={() => {
                form.setValue(`insideGroups.${index}.items`, [
                  ...field.items,
                  "",
                ]);
              }}
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
      </div>

      {/* Images */}
      <div className="space-y-2">
        <h3>Images</h3>
        {imageFields.map((field, index) => (
          <div key={field.id} className="flex space-x-2">
            <AppInput
              label=""
              placeholder="URL"
              {...form.register(`images.${index}.url` as const)}
            />
            <AppInput
              label=""
              placeholder="Alt text"
              {...form.register(`images.${index}.altText` as const)}
            />
            <Button type="button" onClick={() => removeImage(index)}>
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => appendImage({ url: "", altText: "" })}
        >
          Add Image
        </Button>
      </div>

      {/* Submit */}
      <Button type="submit">Save Ingredient</Button>
    </form>
  );
}
