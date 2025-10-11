import prismaClient from "@/lib/prisma";

type Params = {
  userId: string;
};
export async function getRoutineByUser({ userId }: Params) {
  return prismaClient.profile?.findUnique({
    where: {
      userId: parseInt(userId),
    },
    include: {
      routines: {
        include: {
          items: {
            include: {
              product: {
                include: {
                  brand: true,
                  Image: true,
                },
              },
            },
          },
        },
      },
    },
  });
}
