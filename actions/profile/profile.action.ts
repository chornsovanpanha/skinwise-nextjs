"use server";
import { uploadFileStream } from "@/lib/firebase/storage";
import prismaClient from "@/lib/prisma";
import { getUserIdFromSession } from "@/lib/sessions/session";
import { SkinFormValues } from "@/utils/schema/zod/profile";
import { Prisma, SkinConcern, SkinType } from "@prisma/client";
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
            routines: true,
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

export async function UpdateSkinTypeOrConcernAction(
  userId: number,
  updateData: SkinFormValues
) {
  let user = await prismaClient.user.findUnique({
    where: { id: userId },
    include: {
      profile: {
        include: { concerns: true },
      },
    },
  });

  if (!user?.profile) {
    user = await prismaClient.user.update({
      where: { id: userId },
      data: {
        profile: {
          create: {},
        },
      },
      include: {
        profile: { include: { concerns: true } },
      },
    });
  }

  // Update profile with new skinType and replace skinConcerns
  // Remove old concerns and create new ones based on names
  const updatedProfile = await prismaClient.profile.update({
    where: { id: user.profile!.id },
    data: {
      skinType: updateData.skinType as SkinType,
      concerns: {
        // 'deleteMany' removes all existing relations first
        deleteMany: {},
        // 'create' adds new concerns
        create: updateData.concerns.map((name) => ({
          name,
        })),
      },
    },
  });

  // Revalidate paths
  revalidatePath("/profile/edit-profile");
  revalidatePath("/profile/overview");
  revalidatePath("/profile/my-skin");

  return updatedProfile;
}
