
'use client';
import { useEffect, useRef, useState } from 'react';

export default function Teleprompter({ text }: { text: string }) {
  const [size, setSize] = useState(36);
  const [mirror, setMirror] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // auto scroll demo
    const el = boxRef.current;
    if (!el) return;
    let y = 0;
    const id = setInterval(() => {
      y += 0.5;
      el.scrollTo({ top: y });
    }, 30);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="card p-4 h-[60vh] overflow-y-auto" ref={boxRef} style={{ transform: mirror ? 'scaleX(-1)' : 'none' }}>
      <div style={{ fontSize: size }} className="leading-relaxed whitespace-pre-wrap text-center">
        {text}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <button className="icon-btn" onClick={() => setSize(s => Math.max(18, s-2))}>A-</button>
        <button className="icon-btn" onClick={() => setSize(s => s+2)}>A+</button>
        <button className="icon-btn" onClick={() => setMirror(m => !m)}>⧉</button>
      </div>
    </div>
  );
}
