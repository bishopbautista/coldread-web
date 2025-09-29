
import "./../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "coldRead Web",
  description: "Rehearse lines with recording, teleprompter, and cue modes."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
