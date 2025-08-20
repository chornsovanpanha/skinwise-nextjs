import { checkApiKey } from "@/lib/middleware/check-apikey";
import { NextRequest } from "next/server";

async function handler(req: NextRequest, context?: unknown) {
  console.log(req.headers?.get("apiKey"));
  console.log("Context", context);

  return Response.json({ message: "Healthy", statusCode: 200 });
}

export const GET = checkApiKey(handler);
