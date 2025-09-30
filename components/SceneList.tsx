return (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-semibold">Your Scenes</h2>
      <button className="btn" onClick={add}>＋ New Scene</button>
    </div>

    {scenes.length === 0 && (
      <div className="text-neutral-400">No scenes yet. Create one to get started.</div>
    )}

    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {scenes.map(s => (
        <Link
          key={s.id}
          href={`/scene/${s.id}`}
          className="bg-neutral-800 rounded-xl border border-neutral-700 hover:border-blue-500 transition p-4 flex flex-col justify-between"
        >
          <div className="flex-1">
            <div className="font-medium text-lg mb-1">{s.title}</div>
            <div className="text-xs text-neutral-400">
              {/* placeholder for createdAt, will add later */}
              {new Date().toLocaleDateString()}
            </div>
          </div>
          <div className="text-blue-400 text-sm mt-3">
            {s.lines.length} {s.lines.length === 1 ? "Line" : "Lines"}
          </div>
        </Link>
      ))}
    </div>
  </div>
);
