import prismaClientTools from "@/lib/prisma";

export async function getMyProfileAction(id: string) {
  if (!id) {
    return;
  }
  return prismaClientTools.user?.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      subscription: true,
    },
  });
}
