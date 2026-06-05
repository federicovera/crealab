import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/auth";

export function GET(request: NextRequest) {
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || "localhost:3000";
  const proto = request.headers.get("x-forwarded-proto") || "http";
  const response = NextResponse.redirect(`${proto}://${host}/`);
  response.cookies.delete(COOKIE_NAME);
  return response;
}
