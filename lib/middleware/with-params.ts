import { Params } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { AppResponse } from "../axios/response";
export type ParamsRouteHandler = (
  req: NextRequest,
  context: Params
) => Promise<NextResponse>;

export function withParams(handler: ParamsRouteHandler) {
  return async function (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
  ) {
    const { id } = await context.params;

    if (!id || isNaN(Number(id)) || Number(id) <= 0) {
      const res = new AppResponse({
        data: "",
        status: 400,
        error: "Invalid Params Id format",
      });
      return NextResponse.json(res);
    }

    return handler(req, { params: { id } });
  };
}
