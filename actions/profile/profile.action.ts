import prismaClient from "@/lib/prisma";

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
    },
  });
}
