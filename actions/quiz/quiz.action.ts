"use server";
import prismaClient from "@/lib/prisma";
import { getUserIdFromSession } from "@/lib/sessions/session";
import { SkinType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateOrInsertQuizAction(payload: {
  skinType: SkinType;
  skinTypeDesc?: string;
  concerns: string[]; // e.g. ["Acne", "Wrinkles"]
}) {
  const userId = await getUserIdFromSession();

  if (!userId) {
    return {
      success: false,
      error: "User is not found by the provided id",
    };
  }

  const userProfile = await prismaClient.profile.findUnique({
    where: { userId: parseInt(userId) },
  });

  // Ensure all concerns exist in the SkinConcern table
  const concernRecords = await Promise.all(
    payload.concerns.map(async (name) =>
      prismaClient.skinConcern.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );

  const concernIds = concernRecords.map((c) => ({ id: c.id }));

  if (!userProfile) {
    // Create a new profile and connect concerns
    await prismaClient.profile.create({
      data: {
        userId: parseInt(userId),
        skinType: payload.skinType,
        skinTypeDesc: payload?.skinTypeDesc,
        concerns: {
          connect: concernIds,
        },
      },
    });
  } else {
    // Update skinType and replace all existing concerns
    await prismaClient.profile.update({
      where: { id: userProfile.id },
      data: {
        skinType: payload.skinType,
        skinTypeDesc: payload?.skinTypeDesc,
        concerns: {
          set: [], // remove all old connections
          connect: concernIds, // connect new concerns
        },
      },
    });
  }
  revalidatePath("/profile/overview");
  revalidatePath("/profile/edit-profile");
  revalidatePath("/profile/my-skin");

  return {
    success: true,
    error: "",
  };
}
