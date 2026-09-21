"use server";

import { InquiryStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "../db";
import { requireUser } from "../auth";

const updateSchema = z.object({
  status: z.nativeEnum(InquiryStatus),
  notes: z.string().max(4000).optional().default(""),
});

export async function updateInquiry(id: string, formData: FormData) {
  await requireUser();
  const parsed = updateSchema.parse({ status: formData.get("status"), notes: formData.get("notes") ?? "" });
  await db.inquiry.update({ where: { id }, data: { status: parsed.status, notes: parsed.notes || null } });
  revalidatePath("/admin/inquiries");
  revalidatePath(`/admin/inquiries/${id}`);
  revalidatePath("/admin");
}

export async function deleteInquiry(id: string) {
  await requireUser();
  await db.inquiry.delete({ where: { id } });
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
}
