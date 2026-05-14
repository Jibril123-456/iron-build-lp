import type { Metadata } from "next";
import { TrackerClient } from "./TrackerClient";

export const metadata: Metadata = {
  title: "Tracker de Progression · Iron Build™",
  description: "Suis ta prise de masse semaine par semaine sur 8 semaines.",
  robots: { index: false, follow: false },
};

export default function TrackerPage() {
  return <TrackerClient />;
}
