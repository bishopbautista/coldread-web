
'use client';
import { useState } from 'react';

export default function LineEditor({ onSave }: { onSave: (role:'Myself'|'Reader', text:string, audioUrl?:string)=>void }) {
  const [role, setRole] = useState<'Myself'|'Reader'>('Myself');
  const [text, setText] = useState('');
  return (
    <div className="card p-4 space-y-3">
      <div className="flex gap-2">
        <button className={`tab ${role==='Myself'?'bg-blue-600 text-white':''}`} onClick={()=>setRole('Myself')}>Myself</button>
        <button className={`tab ${role==='Reader'?'bg-blue-600 text-white':''}`} onClick={()=>setRole('Reader')}>Reader</button>
      </div>
      <textarea className="input h-24" placeholder="Type the line..." value={text} onChange={e=>setText(e.target.value)} />
      <button className="btn" onClick={()=>{ if(text.trim()) onSave(role, text.trim()); }}>Save Line</button>
    </div>
  );
}
