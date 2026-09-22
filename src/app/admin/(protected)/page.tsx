import { redirect } from "next/navigation";

/** /admin 방문 시 기본으로 문의 목록을 보여준다. */
export default function AdminIndexPage() {
  redirect("/admin/inquiries");
}
