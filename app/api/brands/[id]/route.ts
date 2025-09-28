import { AppResponse } from "@/lib/axios/response";
import { withParams } from "@/lib/middleware/with-params";
import prismaClient from "@/lib/prisma";
import { getPrismaErrorMessage, mapZodError } from "@/utils/formatter";
import { updateBrandSchema } from "@/utils/schema";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

async function getHandlerById(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const brands = await prismaClient.brand.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    console.log("Method: ", req.method);
    const response = new AppResponse({ data: brands, status: 200 });

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
async function deleteHandlerById(
  _: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const deleted = await prismaClient.brand.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(new AppResponse({ data: deleted, status: 200 }));
  } catch (error) {
    console.error("DELETE /brand error:", error);

    return NextResponse.json(
      new AppResponse({
        data: null,
        status: 500,
        error: error ?? "Internal Server Error",
      }),
      { status: 500 }
    );
  }
}
async function updateHandlerById(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const body = await req.json();
    const parsed = updateBrandSchema.parse(body);
    const updated = await prismaClient.brand.update({
      where: { id: parseInt(id) },
      data: {
        title: parsed?.title,
        alias: parsed?.alias,
        country: parsed?.country,
      },
    });

    return NextResponse.json(new AppResponse({ data: updated, status: 200 }));
  } catch (error) {
    console.error("PATCH /brand error:", error);
    if (error instanceof z.ZodError) {
      const response = new AppResponse({
        data: "ValidationError",
        status: 422,
        error: mapZodError(error),
      });

      return NextResponse.json(response, { status: 422 });
    }
    const msg = getPrismaErrorMessage(error);
    const response = new AppResponse({
      data: "",
      status: 422,
      error: msg ?? "Internal Server Error",
    });

    return NextResponse.json(response, { status: 422 });
  }
}
export const PUT = withParams(updateHandlerById);

export const DELETE = withParams(deleteHandlerById);

export const GET = withParams(getHandlerById);
