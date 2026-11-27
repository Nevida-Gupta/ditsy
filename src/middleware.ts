import { NextResponse, type NextRequest } from "next/server";
import { adminToken } from "@/lib/server/admin";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin/login")) return NextResponse.next();
  const ok = process.env.ADMIN_PASSWORD && req.cookies.get("ditsy_admin")?.value === (await adminToken());
  if (!ok) return NextResponse.redirect(new URL("/admin/login", req.url));
  return NextResponse.next();
}
export const config = { matcher: ["/admin/:path*"] };
