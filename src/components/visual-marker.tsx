import type { ReactNode } from "react";

type VisualMarkerName = "assessment" | "calendar" | "conversation" | "venue" | "post";

const paths: Record<VisualMarkerName, ReactNode> = {
  assessment: <><path d="M5 6h14" /><path d="M7 6v5" /><path d="M17 6v5" /><path d="M4 11h6l-3 4-3-4Z" /><path d="M14 11h6l-3 4-3-4Z" /><path d="M12 6v12" /><path d="M8 18h8" /></>,
  calendar: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M7 3v4M17 3v4M4 10h16" /><path d="M8 14h3M8 17h5" /></>,
  conversation: <><path d="M5 6.5h14v10H10l-4 3v-3H5z" /><path d="M8 10h8M8 13h5" /></>,
  venue: <><path d="M4 20h16" /><path d="M6 20V9h12v11" /><path d="M9 9V5h6v4" /><path d="M9 13h2M13 13h2M9 17h2M13 17h2" /></>,
  post: <><rect x="4" y="6" width="16" height="12" rx="2" /><path d="m5 8 7 5 7-5" /><path d="M8 4h8" /></>,
};

export function VisualMarker({ name, label }: { name: VisualMarkerName; label: string }) {
  return <span className="visual-marker" role="img" aria-label={label}>
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">{paths[name]}</svg>
  </span>;
}
