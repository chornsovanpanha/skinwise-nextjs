"use client";

import { AppSelect } from "@/components/CustomSelect";
import ProfileSkinConcernListing from "@/components/profile/ProfileSkinConcernListing";
import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { userAtom } from "@/lib/atom/user.atom";
import { skinFormSchema } from "@/utils/schema/zod/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { skinTypeDummy } from "../../data";
import Loading from "@/app/loading";
import { useToast } from "@/hooks/use-toast";
import { UpdateSkinTypeOrConcernAction } from "@/actions/profile/profile.action";

type SkinFormValues = {
  skinType: string;
  concerns: string[];
};

const MySkin = () => {
  const [loading, setLoading] = useState(false);
  const { show } = useToast();
  const currentUser = useAtomValue(userAtom);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SkinFormValues>({
    resolver: zodResolver(skinFormSchema),
    defaultValues: {
      skinType: currentUser.skinType || "",
      concerns: currentUser.skinConcerns || [],
    },
  });

  const onSubmit: SubmitHandler<SkinFormValues> = async (data) => {
    console.log("Form Data:", data);
    try {
      setLoading(true);
      const result = await UpdateSkinTypeOrConcernAction(
        parseInt(currentUser?.id ?? ""),
        data
      );
      console.log("Profile updated:", result);
      if (result) {
        show({
          type: "success",
          message: "User profile has been updated",
        });
      } else {
        show({
          type: "error",
          message: "Updated profile failed",
        });
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      show({
        type: "error",
        message: "Updated profile failed",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reset({
      skinType: currentUser?.skinType || "",
      concerns: currentUser?.skinConcerns || [],
    });
  }, [reset, currentUser]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {loading && <Loading />}
      <section className="skin-type flex flex-row w-full justify-between items-center">
        <Typography as="p" variant="body1" className="text-secondary">
          Skin type
        </Typography>
        <div>
          <Controller
            name="skinType"
            control={control}
            render={({ field, formState }) => (
              <AppSelect
                error={formState.errors?.skinType?.message ?? ""}
                placeholder="Your Skin Type"
                className="w-full"
                value={field.value}
                options={skinTypeDummy}
                onValueChange={(val) => field.onChange(val)}
              />
            )}
          />
        </div>
      </section>

      <Separator className="my-6 bg-primary" />

      <section className="concern">
        <Typography as="p" variant="body1" className="text-secondary">
          Skin concerns
        </Typography>

        {errors?.concerns?.message && (
          <Typography className="text-error-main my-2" variant="caption" as="p">
            *{errors?.concerns?.message}
          </Typography>
        )}
        <Controller
          name="concerns"
          control={control}
          render={({ field }) => (
            <ProfileSkinConcernListing
              selected={field.value}
              onSelected={(val: string[]) => field.onChange(val)}
            />
          )}
        />
      </section>

      <Button
        type="submit"
        className="flex-1 text-sm sm:text-md mt-4 bg-secondary text-primary hover:bg-secondary/90"
      >
        Save Changes
      </Button>
    </form>
  );
};

export default MySkin;
