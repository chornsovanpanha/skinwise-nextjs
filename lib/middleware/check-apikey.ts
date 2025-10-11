import { NextRequest, NextResponse } from "next/server";
import { AppResponse } from "../axios/response";
import { AppEnv } from "@/config/env";
type Handler = (req: NextRequest) => void;
export function checkApiKey(handler: Handler) {
  return async function (req: NextRequest) {
    const apiKey = req.headers.get("apiKey");

    if (!apiKey || apiKey.toLowerCase() !== AppEnv.apiKey) {
      const response = new AppResponse({
        data: "",
        status: 401,
        error: "Missing Api Key",
      });

      return NextResponse.json(response, { status: 401 });
    }

    return handler(req);
  };
}
