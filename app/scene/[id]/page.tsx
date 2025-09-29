
'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import Recorder from '@/components/Recorder';
import LineEditor from '@/components/LineEditor';
import { getScene, upsertScene, Scene, Line } from '@/utils/storage';

export default function SceneDetail() {
  const { id } = useParams() as { id: string };
  const r = useRouter();
  const [scene, setScene] = useState<Scene | null>(null);
  const [lastTranscript, setLastTranscript] = useState('');

  useEffect(() => {
    const s = getScene(id);
    if (!s) { r.replace('/'); return; }
    setScene({ ...s });
  }, [id, r]);

  function saveLine(role: 'Myself'|'Reader', text: string, audioUrl?: string) {
    if (!scene) return;
    const line: Line = { id: crypto.randomUUID(), role, text, audioUrl };
    const next = { ...scene, lines: [...scene.lines, line] };
    setScene(next); upsertScene(next);
  }

  function recordDone(url: string) {
    saveLine('Reader', lastTranscript || 'Recorded line', url);
    setLastTranscript('');
  }

  if (!scene) return null;

  return (
    <main className="max-w-md mx-auto">
      <Nav title={scene.title} />
      <div className="p-4 space-y-4 pb-24">
        <div className="card p-3 flex items-center justify-between">
          <div className="text-sm text-neutral-300">Add a line</div>
          <Recorder onRecorded={(url)=>recordDone(url)} autoTranscribe onTranscript={setLastTranscript}/>
        </div>
        <LineEditor onSave={saveLine} />
        <div className="space-y-2">
          {scene.lines.map(l => (
            <div key={l.id} className="card p-3 flex items-center justify-between">
              <div>
                <div className="text-xs text-neutral-400">{l.role}</div>
                <div className="font-medium">{l.text}</div>
              </div>
              {l.audioUrl ? <audio controls src={l.audioUrl} /> : <div className="text-neutral-500">▶</div>}
            </div>
          ))}
        </div>
        <button
          className="btn w-full"
          onClick={() => r.push(`/rehearse/${scene.id}`)}
        >Rehearse</button>
      </div>
    </main>
  );
}
