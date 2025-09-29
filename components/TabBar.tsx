
"use client";
import { useRouter } from "next/navigation";

export default function TabBar() {
  const r = useRouter();
  return (
    <div className="tabbar">
      <button className="tab" onClick={() => r.push("/")}>Scenes</button>
      <button className="tab" onClick={() => r.push("/rehearse/demo")}>Rehearse</button>
      <button className="tab" onClick={() => alert("Settings coming soon")}>Settings</button>
    </div>
  );
}
