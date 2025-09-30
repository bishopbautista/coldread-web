import TabBar from "@/components/TabBar";
import SceneList from "@/components/SceneList";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-neutral-900 text-neutral-100 flex justify-center">
      <div className="w-[80%] max-w-7xl py-6">
        <h1 className="text-3xl font-bold mb-2">coldRead Web</h1>
        <p className="text-neutral-400 mb-6">
          Rehearse lines, record, and practice with teleprompter.
        </p>
        <SceneList />
      </div>
      <TabBar />
    </main>
  );
}
