
export type Line = {
  id: string;
  role: 'Myself' | 'Reader';
  text: string;
  audioUrl?: string;
};
export type Scene = {
  id: string;
  title: string;
  lines: Line[];
};

const KEY = 'coldread_scenes_v1';

export function loadScenes(): Scene[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveScenes(scenes: Scene[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(scenes));
}

export function createScene(title: string): Scene {
  const scenes = loadScenes();
  const s: Scene = { id: crypto.randomUUID(), title, lines: [] };
  scenes.push(s);
  saveScenes(scenes);
  return s;
}

export function getScene(id: string): Scene | undefined {
  return loadScenes().find(s => s.id === id);
}

export function upsertScene(scene: Scene) {
  const scenes = loadScenes();
  const idx = scenes.findIndex(s => s.id === scene.id);
  if (idx === -1) scenes.push(scene);
  else scenes[idx] = scene;
  saveScenes(scenes);
}
