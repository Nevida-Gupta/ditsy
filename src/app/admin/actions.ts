"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { update } from "@/lib/server/store";
import { adminToken } from "@/lib/server/admin";

async function assertAdmin() {
  if (!process.env.ADMIN_PASSWORD || cookies().get("ditsy_admin")?.value !== (await adminToken())) throw new Error("Not authorised");
}

export async function setOrderStatus(form: FormData) {
  await assertAdmin();
  await update("orders", String(form.get("id")), { status: String(form.get("status")) } as never);
  revalidatePath("/admin");
}
export async function setEnquiryStatus(form: FormData) {
  await assertAdmin();
  await update("enquiries", String(form.get("id")), { status: String(form.get("status")) } as never);
  revalidatePath("/admin");
}
export async function setReviewStatus(form: FormData) {
  await assertAdmin();
  await update("reviews", String(form.get("id")), { status: String(form.get("status")) } as never);
  revalidatePath("/admin");
}
