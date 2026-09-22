"use client";

import { useActionState } from "react";
import { sendMagicLink, type SendLinkResult } from "./actions";

const initial: SendLinkResult | null = null;

/** 관리자 로그인. 비밀번호 대신 이메일로 받는 매직 링크를 클릭하는 방식이라 비밀번호를 따로 저장/관리할 필요가 없다. */
export default function AdminLoginPage() {
  const [result, formAction, pending] = useActionState(sendMagicLink, initial);

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
      <h1 className="font-display text-heading-1 font-bold">ADMIN</h1>
      <p className="mt-2 text-small text-stone-600">관리자 이메일을 입력하면 로그인 링크를 보내드립니다.</p>

      <form action={formAction} className="mt-8 space-y-4">
        <input
          name="email"
          type="email"
          required
          placeholder="you@eb-ds.com"
          className="w-full border-b border-ink/30 bg-transparent py-3 text-body outline-none focus:border-ink"
        />
        <button
          type="submit"
          disabled={pending}
          className="min-h-11 w-full border border-ink bg-ink px-6 py-3 text-small text-paper hover:bg-banana hover:border-banana hover:text-ink disabled:opacity-50"
        >
          {pending ? "전송 중…" : "로그인 링크 받기"}
        </button>
      </form>

      {result && (
        <p role="status" className={`mt-6 text-small ${result.ok ? "text-stone-600" : "text-red-700"}`}>
          {result.message}
        </p>
      )}
    </div>
  );
}
