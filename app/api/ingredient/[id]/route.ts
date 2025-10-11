import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// ------------------- GET ingredient -------------------
export async function GET(
  _: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // <-- await because params is a Promise

    const ingredient = await prisma.ingredient.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!ingredient) {
      return NextResponse.json(
        { error: "Ingredient not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(ingredient);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch ingredient" },
      { status: 500 }
    );
  }
}

// ------------------- UPDATE ingredient -------------------
type IngredientUpdatePayload = {
  name?: string;
  alias?: string;
  desc?: string;
  about?: string;
  products?: {
    productId: number;
    concentration?: string;
    notes?: string;
    isKey?: boolean;
  }[];
  insideGroups?: { title: string }[];
  effects?: {
    type: "POSITIVE" | "NEGATIVE";
    title: string;
    shortDesc?: string;
    desc?: string;
  }[];
  similarFrom?: { toId: number }[];
  similarTo?: { fromId: number }[];
};

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body: IngredientUpdatePayload = await req.json();

    const existing = await prisma.ingredient.findUnique({
      where: { id: Number(id) },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Ingredient not found" },
        { status: 404 }
      );
    }

    const updateData: Prisma.IngredientUpdateInput = {};

    if (body.name !== undefined) updateData.name = body.name;
    if (body.alias !== undefined) updateData.alias = body.alias;
    if (body.desc !== undefined) updateData.desc = body.desc;
    if (body.about !== undefined) updateData.about = body.about;

    if (body.products?.length) {
      updateData.products = {
        deleteMany: {},
        create: body.products.map((p) => ({
          product: { connect: { id: p.productId } },
          concentration: p.concentration ?? "",
          notes: p.notes ?? "",
          isKey: p.isKey ?? false,
        })),
      };
    }

    if (body.insideGroups?.length) {
      updateData.insideGroups = {
        deleteMany: {},
        create: body.insideGroups.map((g) => ({ title: g.title })),
      };
    }

    if (body.effects?.length) {
      updateData.effects = {
        deleteMany: {},
        create: body.effects.map((e) => ({
          type: e.type,
          title: e.title,
          shortDesc: e.shortDesc ?? "",
          desc: e.desc ?? "",
        })),
      };
    }

    if (body.similarFrom?.length) {
      updateData.similarFrom = {
        deleteMany: {},
        create: body.similarFrom.map((s) => ({ toId: s.toId })),
      };
    }

    if (body.similarTo?.length) {
      updateData.similarTo = {
        deleteMany: {},
        create: body.similarTo.map((s) => ({ fromId: s.fromId })),
      };
    }

    const updated = await prisma.ingredient.update({
      where: { id: Number(id) },
      data: updateData,
      include: {
        products: { include: { product: true } },
        insideGroups: true,
        effects: true,
        similarFrom: true,
        similarTo: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update ingredient" },
      { status: 500 }
    );
  }
}

// ------------------- DELETE ingredient -------------------
export async function DELETE(
  _: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const existing = await prisma.ingredient.findUnique({
      where: { id: Number(id) },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Ingredient not found" },
        { status: 404 }
      );
    }

    await prisma.productIngredient.deleteMany({
      where: {
        ingredientId: parseInt(id),
      },
    });
    await prisma.ingredientEffect.deleteMany({
      where: {
        ingredientId: parseInt(id),
      },
    });

    await prisma.ingredient.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      message: "Ingredient deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete ingredient" },
      { status: 500 }
    );
  }
}
