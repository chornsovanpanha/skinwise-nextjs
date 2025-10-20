import { uploadFileStream } from "@/lib/firebase/storage";
import prisma from "@/lib/prisma";
import { EffectType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

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

interface ProductCreateInput {
  name: string;
  code?: string;
  alias?: string;
  desc?: string;
  rating?: number;
  brandId: number;
  ingredients?: ProductIngredientInput[];
  insideGroups?: InsideGroupInput[];
  effects?: ProductEffectInput[];
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Get JSON data for the product
    const data = formData.get("data");
    if (!data)
      return NextResponse.json(
        { error: "Missing product data" },
        { status: 400 }
      );

    const fields: ProductCreateInput = JSON.parse(data.toString());

    // Validate required fields
    if (!fields.name || !fields.brandId) {
      return NextResponse.json(
        { error: "Name and brandId are required" },
        { status: 400 }
      );
    }

    // Handle single uploaded image
    const file = formData.get("image") as File | null;
    const imageData: { url: string; altText?: string }[] = [];

    if (file) {
      const url = await uploadFileStream(file, "products", file.name);
      imageData.push({ url, altText: file.name });
    }

    // Create product with relations
    const product = await prisma.product.create({
      data: {
        name: fields.name,
        code: fields.code || "",
        alias: fields.alias || fields.name.toLowerCase().replace(/\s+/g, "-"),
        desc: fields.desc || "",
        rating: fields.rating || 0,
        brandId: fields.brandId,
        searchCount: 0,
        ingredients: {
          create: (fields.ingredients || []).map((i) => ({
            ingredient: { connect: { id: i.ingredientId } },
            concentration: i.concentration,
            notes: i.notes,
            isKey: i.isKey || false,
          })),
        },
        insideGroups: {
          create: (fields.insideGroups || []).map((g) => ({ title: g.title })),
        },
        effects: {
          create: (fields.effects || []).map((e) => ({
            type: e.type,
            title: e.title,
            shortDesc: e.shortDesc || "",
            desc: e.desc || "",
          })),
        },
        Image: {
          create: imageData,
        },
      },
      include: {
        ingredients: { include: { ingredient: true } },
        insideGroups: true,
        effects: true,
        Image: true,
        brand: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
