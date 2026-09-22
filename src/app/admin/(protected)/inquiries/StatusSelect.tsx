"use client";

import { useTransition } from "react";
import { updateInquiryStatus } from "./actions";

const LABELS: Record<string, string> = { new: "신규", contacted: "연락함", closed: "종료" };

export default function StatusSelect({ id, status }: { id: string; status: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={status}
      disabled={pending}
      onChange={(e) => startTransition(() => updateInquiryStatus(id, e.target.value))}
      className="border border-line px-2 py-1 text-small disabled:opacity-50"
    >
      {Object.entries(LABELS).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
