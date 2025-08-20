import { NextRequest } from "next/server";
type Handler = (req: NextRequest, context?: unknown) => Promise<Response>;
export function checkApiKey(handler: Handler) {
  return async function (req: NextRequest) {
    const apiKey = req.headers.get("apiKey");
    if (!apiKey || apiKey?.toLowerCase() !== "skinwise-2025-xyz") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    return handler(req, { date: Date.now() });
  };
}
