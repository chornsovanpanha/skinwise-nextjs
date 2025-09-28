"use client";

import {
  brandCreateAction,
  brandUpdateAction,
} from "@/actions/brand/brand.action";
import Loading from "@/app/loading";
import AppInput from "@/components/AppInput";
import { AppSelect } from "@/components/CustomSelect";
import NavigationBar from "@/components/NavigationBar";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { useBrandDetail } from "@/hooks/api/brands/useBrandDetail";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/tanstack/queryClient";
import { countryOptions } from "@/utils/constant/data";
import { TANSTACKQUERY } from "@/utils/constant/queryclient";
import { BrandFormValues, brandSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function BrandForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const brandId = searchParams.get("id");
  const { data, isLoading } = useBrandDetail(TANSTACKQUERY.BRAND_DETAIL, {
    id: brandId ?? "",
  });
  const [loading, setLoading] = useState(false);
  const { show } = useToast();
  const form = useForm<BrandFormValues>({
    mode: "onChange",
    resolver: zodResolver(brandSchema),
    defaultValues: {
      alias: data?.alias ?? "",
      title: data?.title ?? "",
      country: data?.country ?? "",
    },
  });

  const onSubmit = async (formValues: BrandFormValues) => {
    setLoading(true);
    const { error, success, data } = brandId
      ? await brandUpdateAction(brandId, formValues)
      : await brandCreateAction(formValues);

    if (success && data) {
      if (brandId) {
        queryClient.invalidateQueries({
          queryKey: [TANSTACKQUERY.BRAND_DETAIL, brandId],
        });
      }
      queryClient.invalidateQueries({ queryKey: [TANSTACKQUERY.BRAND] });
      show({
        type: "success",
        message: brandId ? "Brand has been updated" : "Brand has been created",
      });
      return startTransition(() => {
        form.reset();
        setLoading(false);
        router.back();
      });
    }
    console.log("response ", error, success);

    if (error || !success) {
      setLoading(false);
      show({
        type: "error",
        message: error ?? "Something went wrong",
      });
    }
  };
  useEffect(() => {
    const title = form.watch("title");
    if (title) {
      form.setValue("alias", title.toLowerCase().replace(/\s+/g, "-"), {
        shouldValidate: true,
      });
    }
  }, [form.watch("title")]);

  useEffect(() => {
    if (brandId && data) {
      form.reset({
        alias: data?.alias,
        title: data?.title,
        country: data?.country,
      });
    }
  }, [data, brandId]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Basic Info */}
      {isLoading && <Loading />}
      <header className="flex gap-2 items-center justify-between">
        {/* Submit */}
        <NavigationBar
          title="Create Brand"
          showBack
          onPress={() => {
            router.back();
          }}
        />
        <Button type="submit" className="w-fit" disabled={loading}>
          {loading ? "Loading..." : "Save"}
        </Button>
      </header>
      <Section className="block gap-4 ">
        <AppInput
          id="title"
          label="Brand Title"
          placeholder="Brand Title..."
          className="py-6"
          {...form.register("title")}
          error={form.formState.errors.title?.message ?? ""}
        />
        <AppInput
          id="alias"
          label="Brand Alias"
          disabled
          placeholder="Alias Name"
          className="py-6"
          {...form.register("alias")}
          error={form.formState.errors.alias?.message ?? ""}
        />
        <Controller
          name="country"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="mb-2">
              <AppSelect
                label="Select Country"
                placeholder="Choose a country"
                className="w-full"
                value={field.value}
                onValueChange={(val) => field.onChange(val)}
                options={countryOptions}
                error={fieldState.error?.message ?? ""}
              />
            </div>
          )}
        />
      </Section>
    </form>
  );
}
