
"use client";
import { useRouter } from "next/navigation";

export default function Nav({ title }: { title: string }) {
  const r = useRouter();
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between bg-neutral-900/80 backdrop-blur border-b border-neutral-800 px-4 py-3">
      <button onClick={() => r.back()} className="text-blue-400">&lt; Back</button>
      <div className="font-semibold">{title}</div>
      <div className="text-blue-400">＋</div>
    </div>
  );
}
