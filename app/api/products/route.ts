import prismaClient from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("pageSize") ?? 10);
  const search = searchParams.get("search") ?? "";
  const sortField = searchParams.get("sortField") ?? "id";
  const sortOrder = searchParams.get("sortOrder") ?? "asc";

  const products = await prismaClient.product.findMany({
    where: {
      name: { contains: search, mode: "insensitive" },
    },
    orderBy: {
      [sortField]: sortOrder as "asc" | "desc",
    },
    skip: (page - 1) * pageSize,
    include: {
      Image: true,
      ProductSkinMatch: true,
      ingredients: true,
      insideGroups: true,
      effects: true,
      RoutineItem: true,
    },
    take: pageSize,
  });

  const total = await prismaClient.product.count({
    where: {
      name: { contains: search, mode: "insensitive" },
    },
  });

  return NextResponse.json({ products, total });
}
