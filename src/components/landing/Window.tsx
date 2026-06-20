import type { ReactNode } from "react";

/** Fixed dark palette for product/terminal window mockups.
 *  These stay dark in both light and dark site themes (the windows are
 *  product screenshots and pop against either page background). */
export const WIN = {
  bg: "#0d0f15",
  bar: "#11141b",
  panel: "#11141d",
  rail: "#0f1219",
  border: "rgba(255,255,255,0.09)",
  borderStrong: "rgba(255,255,255,0.15)",
  text: "#d6dae6",
  cmd: "#eef1f8",
  dim: "#7b8294",
  faint: "#565d6e",
  green: "#34d39a",
  blue: "#7c93ff",
  amber: "#e3b341",
  red: "#ff7b7b",
  active: "#1b2030",
} as const;

export function TrafficLights() {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-block size-3 rounded-full" style={{ background: "#ff5f57" }} />
      <span className="inline-block size-3 rounded-full" style={{ background: "#febc2e" }} />
      <span className="inline-block size-3 rounded-full" style={{ background: "#28c840" }} />
    </div>
  );
}

export function WindowFrame({
  title,
  children,
  className = "",
  glow = "rgba(92,124,250,0.18)",
}: {
  title: ReactNode;
  children: ReactNode;
  className?: string;
  glow?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl ${className}`}
      style={{
        background: WIN.bg,
        border: `1px solid ${WIN.borderStrong}`,
        boxShadow: `0 30px 70px -28px rgba(0,0,0,0.66), 0 0 100px -40px ${glow}`,
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ background: WIN.bar, borderBottom: `1px solid ${WIN.border}` }}
      >
        <TrafficLights />
        <span className="text-xs" style={{ color: WIN.dim }}>
          {title}
        </span>
        <div className="w-[52px]" />
      </div>
      {children}
    </div>
  );
}
