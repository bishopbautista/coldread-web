import SceneList from "@/components/SceneList";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-neutral-900 text-neutral-100 flex justify-center">
      <div className="w-[80%] max-w-7xl">
        <SceneList />
      </div>
    </main>
  );
}
