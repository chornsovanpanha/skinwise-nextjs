import prisma from "@/lib/prisma";
import { EffectType, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// ------------------- TYPES -------------------
interface ProductIngredientInput {
  ingredientId: number;
  concentration?: string;
  notes?: string;
  isKey?: boolean;
}

interface InsideGroupInput {
  title: string;
}

interface ProductEffectInput {
  type: EffectType;
  title: string;
  shortDesc?: string;
  desc?: string;
}

interface ProductUpdateInput {
  name?: string;
  code?: string;
  alias?: string;
  desc?: string;
  rating?: number;
  brandId?: number;
  ingredients?: ProductIngredientInput[];
  insideGroups?: InsideGroupInput[];
  effects?: ProductEffectInput[];
}

// ------------------- GET PRODUCT -------------------
export async function GET(
  _: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        brand: true,
        ingredients: { include: { ingredient: true } },
        insideGroups: true,
        effects: true,
        Image: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// ------------------- UPDATE PRODUCT -------------------
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body: Partial<ProductUpdateInput & { brandId?: number }> =
      await req.json();

    const existing = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        ingredients: true,
        insideGroups: true,
        effects: true,
      },
    });

    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const updateData: Prisma.ProductUpdateInput = {};

    if (body.name !== undefined) updateData.name = body.name;
    if (body.code !== undefined) updateData.code = body.code;
    if (body.alias !== undefined) updateData.alias = body.alias;
    if (body.desc !== undefined) updateData.desc = body.desc;
    if (body.rating !== undefined) updateData.rating = body.rating;

    if (body.brandId !== undefined) {
      updateData.brand = { connect: { id: body.brandId } };
    }

    if (body.ingredients?.length) {
      updateData.ingredients = {
        deleteMany: {},
        create: body.ingredients.map((i) => ({
          ingredient: { connect: { id: i.ingredientId } },
          concentration: i.concentration || "",
          notes: i.notes || "",
          isKey: i.isKey || false,
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
          title: e.title || "",
          shortDesc: e.shortDesc || "",
          desc: e.desc || "",
        })),
      };
    }

    const updated = await prisma.product.update({
      where: { id: Number(id) },
      data: updateData,
      include: {
        brand: true,
        ingredients: { include: { ingredient: true } },
        insideGroups: true,
        effects: true,
        Image: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// ------------------- DELETE PRODUCT -------------------
export async function DELETE(
  _: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const existing = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await prisma.product.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

// {
//   "name": "Updated Product Name",
//   "code": "PRD-001-UPD",
//   "alias": "updated-product-name",
//   "desc": "This is the updated description of the product",
//   "rating": 4,
//   "brandId": 2,
//   "ingredients": [
//     {
//       "ingredientId": 1,
//       "concentration": "5%",
//       "notes": "Use in morning",
//       "isKey": true
//     },
//     {
//       "ingredientId": 2,
//       "concentration": "2%",
//       "notes": "Use in evening",
//       "isKey": false
//     }
//   ],
//   "insideGroups": [
//     { "title": "Group A" },
//     { "title": "Group B" }
//   ],
//   "effects": [
//     {
//       "type": "POSITIVE",
//       "title": "Brightening Effect",
//       "shortDesc": "Helps brighten skin",
//       "desc": "Long description about brightening"
//     },
//     {
//       "type": "NEGATIVE",
//       "title": "Drying",
//       "shortDesc": "May cause dryness",
//       "desc": "Long description about potential dryness"
//     }
//   ]
// }

// ------------------- DELETE PRODUCT -------------------
