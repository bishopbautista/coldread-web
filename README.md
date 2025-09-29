
# coldRead Web (MVP)

A web app to create scenes, record lines, rehearse with multiple modes, and use a teleprompter view.

## Features
- Create scenes & lines (assign **Myself** or **Reader**)
- Record audio via **MediaRecorder** (saved to in-memory URL for demo)
- Optional transcription via **Web Speech API** (Chrome recommended)
- Rehearse modes (On Tap, On Cue*, On Voice*, Non-Stop* — *stubs for now)
- Teleprompter with adjustable size & mirror
- Data stored in **localStorage** (MVP)

## Getting Started

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Roadmap
- Persist audio to backend (Supabase/S3) + DB (Postgres)
- True On Cue (keyword detection) and On Voice (VAD) modes
- Import/export scenes (JSON)
- Collab & share links
- PWA offline support
