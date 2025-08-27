import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { syncClerkUser } from "../lib/syncClerkUser";

// Role-based middleware
export async function roleMiddleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return NextResponse.redirect("/sign-in");

  const userId = authHeader.replace("Bearer ", "");
  if (!userId) return NextResponse.redirect("/sign-in");

  const dbUser = await syncClerkUser(userId);

  const url = req.nextUrl.pathname;

  if (url.startsWith("/admin") && dbUser.role !== "admin") {
    return NextResponse.redirect("/unauthorized");
  }
  if (url.startsWith("/review") && dbUser.role !== "reviewer") {
    return NextResponse.redirect("/unauthorized");
  }
  if (url.startsWith("/applicant") && dbUser.role !== "applicant") {
    return NextResponse.redirect("/unauthorized");
  }

  return NextResponse.next();
}
