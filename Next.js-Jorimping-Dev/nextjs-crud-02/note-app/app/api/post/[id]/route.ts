// 수정페이지에서 기존 내용을 불러올때 사용
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // 최신 Next.js는 Promise
) {
  const { id } = await params;

  const note = await prisma.note.findUnique({
    where: { id: Number(id) },
  });

  if (!note) {
    return NextResponse.json({ message: "메모를 찾을 수 없습니다" }, { status: 404 });
  }

  return NextResponse.json({ note });
}