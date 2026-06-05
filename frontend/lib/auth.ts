import { cookies } from "next/headers";

const WP_URL = process.env.WP_URL || process.env.NEXT_PUBLIC_WP_URL || "";
export const COOKIE_NAME = "crealab_token";

export async function getTokenFromCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export async function getActiveCourse(token: string): Promise<string | null> {
  if (!token?.trim()) return null;
  if (!WP_URL) {
    console.error("[auth] WP_URL is not set — check WP_URL or NEXT_PUBLIC_WP_URL env vars");
    return null;
  }
  try {
    const res = await fetch(`${WP_URL}/wp-json/wp/v2/users/me?context=edit`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) {
      console.warn(`[auth] WordPress returned ${res.status} for users/me`);
      return null;
    }
    const user = await res.json();
    const courseId = user?.meta?.tutor_active_course_id;
    return courseId ? String(courseId) : null;
  } catch {
    return null;
  }
}
