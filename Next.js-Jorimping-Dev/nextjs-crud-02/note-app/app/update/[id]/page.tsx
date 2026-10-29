"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdatePage() {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // 기존 내용 불러오기
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/post/${id}`);
      if (!res.ok) {
        router.push("/");
        return;
      }
      const json = await res.json();
      setTitle(json.note.title);
      setContent(json.note.content ?? "");
    };
    getData();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await fetch("/api/post", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title, content }),
      });
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[500px] mx-auto pt-20 flex flex-col gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded-md"
        required
      />
      <textarea
        rows={10}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-2 rounded-md"
      />
      <button disabled={isLoading} className="border rounded-md p-2">
        {isLoading ? "수정 중..." : "수정하기"}
      </button>
    </form>
  );
}