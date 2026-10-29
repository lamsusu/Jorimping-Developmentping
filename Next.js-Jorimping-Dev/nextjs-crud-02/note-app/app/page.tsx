import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import Item from "./item";

// DB에서 목록을 가져오는 부분 (요청마다 새로 실행)
async function NoteList() {
  await connection(); // 캐시하지 말고 매 요청마다 실행

  const notes = await prisma.note.findMany({
    orderBy: { createdAt: "desc" },
  });

  if (notes.length === 0) {
    return <p className="mt-8 text-gray-500">아직 메모가 없어요.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-5 mt-8">
      {notes.map((note) => (
        <Item key={note.id} note={note} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="w-[1200px] mx-auto py-20">
      <Link
        href="/create"
        className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-md text-white"
      >
        새 메모
      </Link>

      <Suspense fallback={<p className="mt-8">불러오는 중...</p>}>
        <NoteList />
      </Suspense>
    </div>
  );
}