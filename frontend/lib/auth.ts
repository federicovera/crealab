import { cookies } from "next/headers";

const WP_URL = process.env.WP_URL || process.env.NEXT_PUBLIC_WP_URL || "";

export function getTokenFromCookie(): string | undefined {
  const cookieStore = cookies();
  return cookieStore.get("crealab_token")?.value;
}

export async function getActiveCourse(token: string): Promise<string | null> {
  try {
    const res = await fetch(`${WP_URL}/wp-json/wp/v2/users/me?context=edit`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const user = await res.json();
    const courseId = user.meta?.tutor_active_course_id;
    return courseId ? String(courseId) : null;
  } catch {
    return null;
  }
}
