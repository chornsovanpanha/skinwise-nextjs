import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { IngredientPayload } from "./type";

// GET all ingredients or by id
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      // Get ingredient by id
      const ingredient = await prisma.ingredient.findUnique({
        where: { id: Number(id) },
      });
      if (!ingredient) {
        return NextResponse.json(
          { error: "Ingredient not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(ingredient);
    }

    // Get all ingredients
    const ingredients = await prisma.ingredient.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(ingredients);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch ingredients" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: IngredientPayload = await req.json();

    if (!body.name || !body.alias) {
      return NextResponse.json(
        { error: "Name and alias are required" },
        { status: 400 }
      );
    }

    const ingredient = await prisma.ingredient.create({
      data: {
        name: body.name,
        alias: body.alias,
        desc: body.desc || "",
        about: body.about || "",
        products: body.products?.length
          ? {
              create: body.products.map((p) => ({
                product: { connect: { id: p.productId } },
                concentration: p.concentration || "",
                notes: p.notes || "",
                isKey: p.isKey || false,
              })),
            }
          : undefined,
        insideGroups: body.insideGroups?.length
          ? { create: body.insideGroups.map((g) => ({ title: g.title })) }
          : undefined,
        effects: body.effects?.length
          ? {
              create: body.effects.map((e) => ({
                type: e.type,
                title: e.title,
                shortDesc: e.shortDesc || "",
                desc: e.desc || "",
              })),
            }
          : undefined,
        similarFrom: body.similarFrom?.length
          ? { create: body.similarFrom.map((s) => ({ toId: s.toId! })) }
          : undefined,
        similarTo: body.similarTo?.length
          ? { create: body.similarTo.map((s) => ({ fromId: s.fromId! })) }
          : undefined,
      },
      include: {
        products: true,
        insideGroups: true,
        effects: true,
        similarFrom: true,
        similarTo: true,
      },
    });

    return NextResponse.json(ingredient, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create ingredient" },
      { status: 500 }
    );
  }
}

// Post Payload

// {
//   "name": "Retinol (Vitamin A)",
//   "alias": "retinol-vitamin-a",
//   "desc": "Boosts collagen and cell turnover",
//   "about": "Retinol is a derivative of Vitamin A that helps with anti-aging and acne.",
//   "products": [
//     {
//       "productId": 1,
//       "concentration": "0.5%",
//       "notes": "Use at night",
//       "isKey": true
//     },
//     {
//       "productId": 2,
//       "concentration": "1%",
//       "notes": "Start slowly"
//     }
//   ],
//   "insideGroups": [
//     { "title": "Active Ingredients" },
//     { "title": "Irritants" }
//   ],
//   "effects": [
//     { "type": "POSITIVE", "title": "Anti-aging", "shortDesc": "Reduces wrinkles" },
//     { "type": "NEGATIVE", "title": "Irritation", "shortDesc": "Can cause dryness" }
//   ],
//   "similarFrom": [
//     { "toId": 5 }
//   ],
//   "similarTo": [
//     { "fromId": 6 }
//   ]
// }

//PUT  Request

// {
//   "name": "Updated Retinol (Vitamin A)",
//   "alias": "updated-retinol-vitamin-a",
//   "desc": "Updated description for Retinol",
//   "about": "More detailed info about Retinol.",
//   "products": [
//     {
//       "productId": 3,
//       "concentration": "0.3%",
//       "notes": "Apply at night only",
//       "isKey": true
//     }
//   ],
//   "insideGroups": [
//     { "title": "Updated Active Ingredients" }
//   ],
//   "effects": [
//     { "type": "POSITIVE", "title": "Updated Anti-aging", "shortDesc": "Helps skin elasticity" }
//   ],
//   "similarFrom": [
//     { "toId": 2 }
//   ],
//   "similarTo": [
//     { "fromId": 1 }
//   ]
// }
