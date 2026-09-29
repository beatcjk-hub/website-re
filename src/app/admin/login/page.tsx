"use client";

import { useActionState } from "react";
import { loginWithPassword, type LoginResult } from "./actions";

const initial: LoginResult | null = null;

/** 관리자 로그인. 비밀번호만 입력하면 된다 (관리자 이메일은 서버에 고정되어 있다). */
export default function AdminLoginPage() {
  const [result, formAction, pending] = useActionState(loginWithPassword, initial);

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
      <h1 className="font-display text-heading-1 font-bold">ADMIN</h1>
      <p className="mt-2 text-small text-stone-600">비밀번호를 입력해 주세요.</p>

      <form action={formAction} className="mt-8 space-y-4">
        <input
          name="password"
          type="password"
          required
          autoFocus
          placeholder="비밀번호"
          className="w-full border-b border-ink/30 bg-transparent py-3 text-body outline-none focus:border-ink"
        />
        <button
          type="submit"
          disabled={pending}
          className="min-h-11 w-full border border-ink bg-ink px-6 py-3 text-small text-paper hover:bg-banana hover:border-banana hover:text-ink disabled:opacity-50"
        >
          {pending ? "확인 중…" : "로그인"}
        </button>
      </form>

      {result && !result.ok && (
        <p role="alert" className="mt-6 text-small text-red-700">
          {result.message}
        </p>
      )}
    </div>
  );
}
