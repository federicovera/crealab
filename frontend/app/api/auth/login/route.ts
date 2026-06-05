import { NextRequest, NextResponse } from "next/server";
import { getActiveCourse } from "@/lib/auth";

const WP_URL = process.env.WP_URL || process.env.NEXT_PUBLIC_WP_URL || "";

export async function POST(request: NextRequest) {
  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json({ error: "Completá todos los campos" }, { status: 400 });
  }

  let wpRes: Response;
  try {
    wpRes = await fetch(`${WP_URL}/wp-json/jwt-auth/v1/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { error: "Error de conexión, intentá más tarde" },
      { status: 503 }
    );
  }

  if (!wpRes.ok) {
    return NextResponse.json(
      { error: "Usuario o contraseña incorrectos" },
      { status: 401 }
    );
  }

  const wpData = await wpRes.json();
  const token: string = wpData.token;

  const courseId = await getActiveCourse(token);
  const redirect = courseId ? `/curso/${courseId}` : "/dashboard";

  const response = NextResponse.json({ redirect });
  response.cookies.set("crealab_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return response;
}
