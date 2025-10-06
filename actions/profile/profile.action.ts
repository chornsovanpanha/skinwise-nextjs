"use server";
import { uploadFileStream } from "@/lib/firebase/storage";
import prismaClient from "@/lib/prisma";
import { getUserIdFromSession } from "@/lib/sessions/session";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
export type EditProfileFormValues = {
  firstName?: string;
  lastName?: string;
  bio?: string;
};

export async function getMyProfileAction(id: string) {
  if (!id) {
    return;
  }
  return prismaClient.user?.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      subscription: true,
      Image: true,
      profile: {
        include: {
          concerns: true,
        },
      },
    },
  });
}

export async function getUserSkinTypeAndConcern() {
  const userId = await getUserIdFromSession();
  if (userId) {
    return prismaClient.user?.findUnique({
      where: {
        id: parseInt(userId),
      },
      include: {
        profile: {
          include: {
            concerns: true,
          },
        },
      },
    });
  }
  return null;
}

export async function updateProfileAction(
  userId: number,
  data: EditProfileFormValues,
  file?: File | null
) {
  let uploadUrl: string | undefined;

  if (file) {
    uploadUrl = await uploadFileStream(file, "images", file.name);
    console.log("Upload URL is:", uploadUrl);
  }

  const updateData: Prisma.UserUpdateInput = {
    bio: data?.bio,
    name: `${data?.firstName ?? ""} ${data?.lastName ?? ""}`.trim(),
  };

  if (uploadUrl) {
    await prismaClient.$transaction([
      prismaClient.image.deleteMany({
        where: { userId },
      }),
      prismaClient.image.create({
        data: {
          url: uploadUrl,
          user: { connect: { id: userId } },
        },
      }),
    ]);
  }
  const result = await prismaClient.user.update({
    where: { id: userId },
    data: updateData,
    include: {
      Image: true,
    },
  });

  revalidatePath("/profile/edit-profile");
  revalidatePath("/profile/overview");

  return result;
}
