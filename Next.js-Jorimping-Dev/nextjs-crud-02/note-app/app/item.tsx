// 메모카드 (수정/삭제 버튼 포함)
"use client";

import { useRouter } from "next/navigation";
import type { Note } from "@/app/generated/prisma";

export default function Item({ note }: { note: Note }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("삭제할까요?")) return;
    await fetch(`/api/post?id=${note.id}`, { method: "DELETE" });
    router.refresh(); // 목록 새로고침
  };

  return (
    <div className="border-2 border-black p-3 rounded-md">
      <h2 className="mb-2 text-sm text-gray-500">ID: {note.id}</h2>
      <h1 className="text-xl font-semibold">{note.title}</h1>
      <p className="whitespace-pre-wrap">{note.content}</p>

      <div className="flex justify-end gap-3 mt-4 text-sm">
        <button className="font-semibold" onClick={() => router.push(`/update/${note.id}`)}>
          수정
        </button>
        <button className="font-semibold text-red-500" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </div>
  );
}