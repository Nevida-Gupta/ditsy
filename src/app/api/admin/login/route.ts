import { NextResponse } from "next/server";
import { adminToken } from "@/lib/server/admin";

export async function POST(req: Request) {
  const form = await req.formData();
  const ok = process.env.ADMIN_PASSWORD && form.get("password") === process.env.ADMIN_PASSWORD;
  const res = NextResponse.redirect(new URL(ok ? "/admin" : "/admin/login?error=1", req.url), 303);
  if (ok) res.cookies.set("ditsy_admin", await adminToken(), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 12 });
  return res;
}
