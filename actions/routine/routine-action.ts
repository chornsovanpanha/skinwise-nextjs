"use server";
import prismaClient from "@/lib/prisma";
import { getUserIdFromSession } from "@/lib/sessions/session";
import { RoutineType } from "@prisma/client";
import { revalidatePath } from "next/cache";

type Params = {
  profileId?: number;
  payload: {
    productId: number;
    type: RoutineType;
    usage: string;
    itemId?: number;
  };
  userId?: number;
};

export async function createRoutine({
  payload,
  profileId,
  userId,
}: Params): Promise<{ error: string; success: boolean }> {
  const typesToCreate =
    payload.type === RoutineType.BOTH
      ? [RoutineType.MORNING, RoutineType.EVENING]
      : [payload.type];

  // Case: user profile not yet created
  if (!profileId) {
    await prismaClient.profile.create({
      data: {
        user: { connect: { id: userId } },
        routines: {
          create: typesToCreate.map((type) => ({
            type,
            items: {
              create: [
                {
                  productId: payload.productId,
                  usage: payload.usage,
                },
              ],
            },
          })),
        },
      },
      include: { routines: true },
    });

    return { error: "", success: true };
  }

  for (const type of typesToCreate) {
    // Check if product already exists in this shift type
    const existingRoutine = await prismaClient.routine.findFirst({
      where: {
        type,
        profileId,
        items: { some: { productId: payload.productId } },
      },
    });

    if (existingRoutine) {
      return {
        error: `Product already exists in ${type} routine`,
        success: false,
      };
    }

    // Safe to create routine
    await prismaClient.routine.create({
      data: {
        type,
        profile: { connect: { id: profileId } },
        items: {
          create: [
            {
              productId: payload.productId,
              usage: payload.usage,
            },
          ],
        },
      },
    });
  }

  revalidatePath("/my-routine");
  return { error: "", success: true };
}

export async function updateRoutine({
  payload,
  profileId,
  routineId,
}: {
  payload: {
    productId: number;
    type?: RoutineType;
    usage?: string;
    itemId: number;
  };
  profileId: number;
  routineId: number;
}) {
  try {
    // Update the routine type (if provided) and the nested item
    const typesToCreate =
      payload.type === RoutineType.BOTH
        ? [RoutineType.MORNING, RoutineType.EVENING]
        : [payload.type];
    if (payload.type == RoutineType.BOTH) {
      for (const type of typesToCreate) {
        // Check if product already exists in this shift type
        const existingRoutine = await prismaClient.routine.findFirst({
          where: {
            type,
            profileId,
            items: { some: { productId: payload.productId } },
          },
        });

        if (existingRoutine) {
          return {
            error: `Product already exists in ${type} routine`,
            success: false,
          };
        }
      }
    }
    await prismaClient.routine.update({
      where: { id: routineId, profileId },
      data: {
        type: payload.type as RoutineType,
        items: {
          update: {
            where: { id: payload.itemId },
            data: {
              product: { connect: { id: payload.productId } },
              usage: payload.usage,
            },
          },
        },
      },
    });

    revalidatePath("/my-routine");
    return { success: true, error: "" };
  } catch (error) {
    console.error("Update Routine Error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update routine and item",
    };
  }
}

export async function deleteRoutineItem({
  routineId,
  itemId,
  profileId,
}: {
  routineId: number;
  itemId: number;
  profileId: number;
}) {
  try {
    // Make sure the routine belongs to this profile
    const routine = await prismaClient.routine.findFirst({
      where: { id: routineId, profileId },
      include: { items: true },
    });

    if (!routine) {
      return { success: false, error: "Routine not found for this profile" };
    }

    // Check if the item exists
    const item = routine.items.find((i) => i.id === itemId);
    if (!item) {
      return { success: false, error: "Routine item not found" };
    }

    // Delete the item
    await prismaClient.routineItem.delete({
      where: { id: itemId },
    });

    revalidatePath("/my-routine");

    return { success: true, error: "" };
  } catch (error) {
    console.error("Delete RoutineItem Error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to delete routine item",
    };
  }
}

export async function getCurrentUserRoutine() {
  const userId = await getUserIdFromSession();

  if (userId) {
    const data = await prismaClient.user?.findUnique({
      where: {
        id: parseInt(userId),
      },
      include: {
        profile: {
          include: {
            concerns: true,
            routines: {
              include: {
                items: {
                  include: {
                    product: {
                      include: {
                        Image: true,
                      },
                    },
                    routine: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return data?.profile?.routines;
  }
}
