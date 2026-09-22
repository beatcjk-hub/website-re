"use server";

import { revalidatePath } from "next/cache";
import { getAdminUser } from "@/lib/supabase/auth-server";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const STATUSES = ["new", "contacted", "closed"] as const;

/** 문의 상태를 바꾼다. 관리자 본인 확인은 여기서도 한 번 더 한다 — 화면 보호만으로는 안 되고, 쓰기 작업마다 직접 확인해야 안전하다. */
export async function updateInquiryStatus(id: string, status: string) {
  const user = await getAdminUser();
  if (!user) throw new Error("관리자만 할 수 있습니다.");
  if (!STATUSES.includes(status as (typeof STATUSES)[number])) throw new Error("잘못된 상태값입니다.");

  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase가 연결되어 있지 않습니다.");

  const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/inquiries");
}
