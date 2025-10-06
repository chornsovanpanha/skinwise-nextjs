"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { updateProfileAction } from "@/actions/profile/profile.action";
import Loading from "@/app/loading";
import AppInput from "@/components/AppInput";
import { Typography } from "@/components/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { userAtom } from "@/lib/atom/user.atom";
import { UserPrisma } from "@/types";
import {
  EditProfileFormValues,
  editProfileSchema,
} from "@/utils/schema/zod/profile";
import { useAtom } from "jotai";

const EditProfileForm = ({ initProfile }: { initProfile?: UserPrisma }) => {
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const { show } = useToast();
  const [loading, setLoading] = useState(false);
  // Image state and preview
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    currentUser?.photoUrl?.url ?? null
  );

  const fallAvatar = currentUser?.name
    ? currentUser.name[0] + currentUser.name[currentUser.name.length - 1]
    : "NA";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: currentUser?.name?.split(" ")?.[0] ?? "",
      lastName: currentUser?.name?.split(" ")?.slice(1).join(" ") ?? "",
      bio: currentUser?.bio ?? "",
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSizeInBytes = 2 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        show({
          type: "error",
          message: "File size must be below 2MB",
        });
        return;
      }
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (formValues: EditProfileFormValues) => {
    try {
      setLoading(true);
      const result = await updateProfileAction(
        parseInt(currentUser?.id ?? ""),
        formValues,
        imageFile
      );
      console.log("Profile updated:", result);
      if (result) {
        show({
          type: "success",
          message: "User profile has been updated",
        });
        setCurrentUser((pre) => ({
          ...pre,
          name: formValues.firstName + " " + formValues.lastName,
        }));
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reset({
      firstName: initProfile?.name?.split(" ")[0] ?? "",
      lastName: initProfile?.name?.split(" ").slice(1).join(" ") ?? "",
      bio: initProfile?.bio ?? "",
    });

    if (initProfile?.Image?.length) {
      setPreview(
        initProfile?.Image?.at(initProfile?.Image?.length - 1)?.url ?? ""
      );
    }
  }, [initProfile, reset]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {loading && <Loading />}
      <header className="block sm:flex flex-row gap-5 items-center space-y-6 sm:space-y-0">
        <div className="flex items-center gap-5">
          <Avatar className="h-30 w-30 mb-4">
            <AvatarImage src={preview ?? ""} referrerPolicy="no-referrer" />
            <AvatarFallback className="text-lg border">
              {fallAvatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2 relative">
            <Button type="button" className="text-secondary">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              />
              Select Photo
            </Button>
          </div>
        </div>

        <Typography as="p" variant="default" className="text-secondary">
          {currentUser.email}
        </Typography>
      </header>

      <section className="my-4 space-y-4">
        <AppInput
          id="firstName"
          label=""
          type="text"
          placeholder="First Name"
          className="bg-gray-1 py-6 placeholder:text-gray-4"
          {...register("firstName")}
          error={errors.firstName?.message}
        />
        <AppInput
          id="lastName"
          label=""
          type="text"
          placeholder="Last Name"
          className="bg-gray-1 py-6 placeholder:text-gray-4"
          {...register("lastName")}
          error={errors.lastName?.message}
        />
        <Textarea
          id="bio"
          rows={7}
          placeholder="Type your bio here..."
          className="resize-none h-40 bg-gray-1 placeholder:text-gray-4"
          {...register("bio")}
        />
        {errors.bio && (
          <Typography as="p" variant="default" className="text-red-500">
            {errors.bio.message}
          </Typography>
        )}
      </section>

      <Button type="submit">Save</Button>
    </form>
  );
};

export default EditProfileForm;
