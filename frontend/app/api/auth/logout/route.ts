import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/auth";

export function GET(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/";
  url.search = "";
  const response = NextResponse.redirect(url);
  response.cookies.delete(COOKIE_NAME);
  return response;
}
