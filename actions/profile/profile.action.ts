import prismaClientTools from "@/lib/prisma";

export async function getMyProfileAction(id: number) {
  return prismaClientTools.user?.findUnique({
    where: {
      id: id,
    },
  });
}
