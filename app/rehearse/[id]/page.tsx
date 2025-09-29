
'use client';
import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getScene, Scene } from '@/utils/storage';
import Nav from '@/components/Nav';
import Teleprompter from '@/components/Teleprompter';

type Mode = 'On Cue' | 'On Voice' | 'On Tap' | 'Non-Stop';

export default function Rehearse() {
  const { id } = useParams() as { id: string };
  const r = useRouter();
  const [scene, setScene] = useState<Scene | null>(null);
  const [idx, setIdx] = useState(0);
  const [mode, setMode] = useState<Mode>('On Tap');

  useEffect(() => {
    const s = getScene(id);
    if (!s) { r.replace('/'); return; }
    setScene(s);
  }, [id, r]);

  const current = scene?.lines[idx];
  const myselfText = useMemo(() => (scene?.lines.filter(l=>l.role==='Myself').map(l=>l.text).join('\n\n') || ''), [scene]);

  function next() { if (!scene) return; setIdx(i => Math.min(scene.lines.length-1, i+1)); }
  function prev() { setIdx(i => Math.max(0, i-1)); }

  if (!scene) return null;

  return (
    <main className="max-w-md mx-auto">
      <Nav title={`Rehearse • ${mode}`} />
      <div className="p-4 space-y-4 pb-24">
        <div className="card p-3 flex items-center justify-between">
          <div className="text-sm">Line {idx+1} / {scene.lines.length}</div>
          <div className="flex gap-2">
            {(['On Tap','On Cue','On Voice','Non-Stop'] as Mode[]).map(m => (
              <button key={m} className={`tab ${mode===m?'bg-blue-600 text-white':''}`} onClick={()=>setMode(m)}>{m}</button>
            ))}
          </div>
        </div>

        <div className="card p-4">
          <div className="text-xs text-neutral-400 mb-1">{current?.role}</div>
          <div className="text-lg font-medium whitespace-pre-wrap">{current?.text}</div>
          {current?.audioUrl && <audio className="mt-2 w-full" controls src={current.audioUrl} />}
        </div>

        <Teleprompter text={myselfText} />

        <div className="flex justify-between gap-3">
          <button className="tab flex-1 text-center" onClick={prev}>⏮ Prev</button>
          <button className="btn flex-1 justify-center" onClick={next}>⏭ Next</button>
        </div>
      </div>
    </main>
  );
}
