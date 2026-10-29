import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 목록 조회
export async function GET() {
  const notes = await prisma.note.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ notes });
}

// 생성
export async function POST(req: NextRequest) {
  const { title, content } = await req.json();

  const note = await prisma.note.create({
    data: { title, content },
  });

  return NextResponse.json({ note });
}

// 수정
export async function PUT(req: NextRequest) {
  const { id, title, content } = await req.json();

  const note = await prisma.note.update({
    where: { id: Number(id) },
    data: { title, content },
  });

  return NextResponse.json({ note });
}

// 삭제 (/api/post?id=3)
export async function DELETE(req: NextRequest) {
  const id = Number(req.nextUrl.searchParams.get("id"));

  if (!id) {
    return NextResponse.json({ message: "id가 필요합니다" }, { status: 400 });
  }

  await prisma.note.delete({ where: { id } });

  return NextResponse.json({ message: "삭제 완료" });
}