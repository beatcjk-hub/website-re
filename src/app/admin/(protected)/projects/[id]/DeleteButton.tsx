"use client";

export default function DeleteButton({ action, title }: { action: () => void; title: string }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`"${title}"을(를) 정말 삭제할까요? 되돌릴 수 없습니다.`)) e.preventDefault();
      }}
    >
      <button type="submit" className="text-small text-red-700 hover:underline">
        삭제
      </button>
    </form>
  );
}
