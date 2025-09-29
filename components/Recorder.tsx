
'use client';
import { useEffect, useRef, useState } from 'react';

type Props = {
  onRecorded: (blobUrl: string, blob: Blob) => void;
  autoTranscribe?: boolean;
  onTranscript?: (text: string) => void;
};

export default function Recorder({ onRecorded, autoTranscribe = false, onTranscript }: Props) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recording, setRecording] = useState(false);
  const [support, setSupport] = useState<{mic:boolean; speech:boolean}>({mic:false,speech:false});

  useEffect(() => {
    setSupport({
      mic: !!navigator.mediaDevices?.getUserMedia,
      speech: 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
    });
  }, []);

  async function start() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const rec = new MediaRecorder(stream);
    mediaRecorderRef.current = rec;
    chunksRef.current = [];
    rec.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    rec.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);
      onRecorded(url, blob);
    };
    rec.start();
    setRecording(true);

    if (autoTranscribe && support.speech) {
      const SR: any = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recog = new SR();
      recog.continuous = true;
      recog.interimResults = true;
      recog.onresult = (e: any) => {
        let final = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          if (e.results[i].isFinal) final += e.results[i][0].transcript;
        }
        if (final && onTranscript) onTranscript(final.trim());
      };
      try { recog.start(); } catch {}
      (rec as any)._recog = recog;
    }
  }

  function stop() {
    mediaRecorderRef.current?.stop();
    (mediaRecorderRef.current as any)?._recog?.stop?.();
    setRecording(false);
  }

  return (
    <div className="flex items-center gap-3">
      {!support.mic && <div className="text-red-400">Microphone not supported.</div>}
      <button className="btn" onClick={recording ? stop : start}>
        {recording ? 'Stop Recording' : 'Record Line'}
      </button>
    </div>
  );
}
