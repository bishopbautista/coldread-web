'use client';
import { useEffect, useState } from 'react';
import { loadScenes, createScene } from '@/utils/storage';
import Link from 'next/link';

export default function SceneList() {
  const [scenes, setScenes] = useState<any[]>([]);
  useEffect(() => { setScenes(loadScenes()); }, []);

  function add() {
    const title = prompt('Scene title');
    if (!title) return;
    const s = createScene(title);
    setScenes(loadScenes());
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Your Scenes</h2>
        <button className="btn" onClick={add}>＋ New Scene</button>
      </div>

<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {scenes.length === 0 && (
          <div className="text-neutral-400">No scenes yet. Create one to get started.</div>
        )}

        {scenes.map(s => (
          <Link
            key={s.id}
            href={`/scene/${s.id}`}
            className="bg-neutral-800 rounded-xl border border-neutral-700 hover:border-blue-500 transition p-4 flex flex-col justify-between"
          >
            <div className="flex-1">
              <div className="font-medium text-lg mb-1">{s.title}</div>
              <div className="text-xs text-neutral-400">
                {new Date().toLocaleDateString()} {/* Replace with real createdAt */}
              </div>
            </div>
            <div className="text-blue-400 text-sm mt-3">
              {s.lines.length} Lines
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
