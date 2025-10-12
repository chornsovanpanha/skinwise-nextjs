import { AppResponse } from "@/lib/axios/response";
import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("search");

  if (!query) {
    return NextResponse.json(
      new AppResponse({
        data: [],
        status: 400,
        error: "Search params is required",
      })
    );
  }
  const products = await prismaClient.product.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    orderBy: {
      searchCount: "desc",
    },
    include: {
      brand: true,
      Image: {
        select: {
          url: true,
          altText: true,
        },
      },
    },
    take: 12,
  });

  const ingredients = await prismaClient.ingredient.findMany({
    where: {
      name: {
        startsWith: query,
        mode: "insensitive",
      },
    },
    orderBy: {
      searchCount: "desc",
    },
    take: 25,
  });
  return NextResponse.json(
    new AppResponse({
      data: {
        products,
        ingredients,
      },
      status: 200,
    })
  );
}
