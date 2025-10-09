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
  if (!profileId) {
    await prismaClient.profile.create({
      data: {
        user: { connect: { id: userId } },
        routines: {
          create: [
            {
              type: payload.type,
              items: {
                create: [
                  {
                    productId: payload.productId,
                    usage: payload.usage,
                  },
                ],
              },
            },
          ],
        },
      },
      include: { routines: true },
    });
    revalidatePath("/my-routine");
    return { error: "", success: true };
  }

  // Check if the product already exists in the routine type
  const existingRoutine = await prismaClient.routine.findFirst({
    where: {
      type: payload.type,
      profileId,
      items: { some: { productId: payload.productId } },
    },
  });

  if (existingRoutine) {
    return {
      error: `Product already exists in ${payload.type} routine`,
      success: false,
    };
  }

  // Safe to create the routine for the given type
  await prismaClient.routine.create({
    data: {
      type: payload.type,
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
    if (payload.type) {
      const existingRoutine = await prismaClient.routine.findFirst({
        where: {
          type: payload.type,
          profileId,
          items: { some: { productId: payload.productId } },
        },
      });

      if (existingRoutine) {
        return {
          success: false,
          error: `Product already exists in ${payload.type} routine`,
        };
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

    // If that was the last item, delete the routine as well
    if (routine.items.length === 1) {
      await prismaClient.routine.delete({
        where: { id: routineId },
      });
    }

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
