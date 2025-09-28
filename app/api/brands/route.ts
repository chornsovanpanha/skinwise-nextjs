import { AppResponse } from "@/lib/axios/response";
import { checkApiKey } from "@/lib/middleware/check-apikey";
import prismaClient from "@/lib/prisma";
import { mapZodError } from "@/utils/formatter";
import { BrandFormValues, brandSchema } from "@/utils/schema";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function postHandler(req: NextRequest) {
  try {
    const body: BrandFormValues = await req.json();
    const parsed = brandSchema.parse(body);
    const result = await prismaClient.brand.create({
      data: {
        title: parsed.title,
        alias: parsed.alias,
        country: parsed.country,
      },
    });
    const response = new AppResponse({ data: result, status: 200 });
    if (result) {
      return NextResponse.json(response);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const response = new AppResponse({
        data: "ValidationError",
        status: 422,
        error: mapZodError(error),
      });

      return NextResponse.json(response, { status: 422 });
    }

    console.error("POST /brand error:", error);
    const response = new AppResponse({
      data: "",
      status: 422,
      error: "Internal Server Error",
    });

    return NextResponse.json(response, { status: 422 });
  }
}

export async function getHandler(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    // Get pagination params from query string, default to page 1 and limit 10
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const totalRecords = await prismaClient.brand.count();
    // Fetch paginated data
    const brands = await prismaClient.brand.findMany({
      orderBy: {
        id: "desc",
      },
      skip,
      take: limit,
    });

    // Prepare response with pagination info
    const response = new AppResponse({
      data: brands,
      status: 200,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      page,
      perPage: limit,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("GET /brand error:", error);

    const response = new AppResponse({
      data: "",
      status: 422,
      error: "Internal Server Error",
    });

    return NextResponse.json(response, { status: 422 });
  }
}

export const GET = checkApiKey(getHandler);
export const POST = checkApiKey(postHandler);
