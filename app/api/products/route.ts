import { AppResponse } from "@/lib/axios/response";
import prismaClient from "@/lib/prisma";
import { escapeLike } from "@/utils/formatter";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("pageSize") ?? 30);
  const search = searchParams.get("search") ?? "";
  const sortField = searchParams.get("sortField") ?? "id";
  const sortOrder = searchParams.get("sortOrder") ?? "asc";
  const escapedQuery = escapeLike(search);
  const keywords = escapedQuery.split(/\s+/);

  const products = await prismaClient.product.findMany({
    where: {
      AND: keywords.map((word) => ({
        name: {
          contains: word,
          mode: "insensitive",
        },
      })),
    },
    orderBy: {
      [sortField]: sortOrder as "asc" | "desc",
    },
    skip: (page - 1) * pageSize,
    include: {
      Image: true,
      ProductSkinMatch: true,
      ingredients: true,
      brand: true,
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

  return NextResponse.json(
    new AppResponse({
      data: products,
      status: 200,
      totalPages: total,
      page: page,
      perPage: pageSize,
    })
  );
}
