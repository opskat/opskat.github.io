import type { ReactNode } from "react";
import Translate from "@docusaurus/Translate";
import {
  SquareTerminal,
  Database,
  Layers,
  Waypoints,
  KeyRound,
  MoveRight,
  MoveDown,
} from "lucide-react";

const tools: { icon: ReactNode; id: string; label: string }[] = [
  { icon: <SquareTerminal className="size-4" />, id: "value.tool.ssh", label: "SSH client" },
  { icon: <Database className="size-4" />, id: "value.tool.db", label: "Database GUI" },
  { icon: <Layers className="size-4" />, id: "value.tool.redis", label: "Redis tool" },
  { icon: <Waypoints className="size-4" />, id: "value.tool.bastion", label: "Bastion scripts" },
  { icon: <KeyRound className="size-4" />, id: "value.tool.pwd", label: "Password manager" },
];

const tags = [
  { id: "value.tag.terminal", label: "Terminal" },
  { id: "value.tag.db", label: "Database" },
  { id: "value.tag.middleware", label: "Middleware" },
  { id: "value.tag.cloud", label: "Cloud-native" },
];

export function ValueBand() {
  return (
    <section className="px-6 py-[88px]">
      <div className="mx-auto max-w-[1100px] text-center">
        <h2 className="text-[28px] font-bold tracking-tight sm:text-[33px]">
          <Translate id="value.heading">Stop opening five tools for one incident</Translate>
        </h2>
        <p className="mx-auto mt-3.5 max-w-[640px] text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          <Translate id="value.sub">
            One app for SSH, one for databases, one for Redis, scripts for bastions, sticky notes for passwords — now, one OpsKat does it all.
          </Translate>
        </p>

        <div className="mt-13 flex flex-col items-center justify-center gap-9 lg:flex-row lg:items-center">
          {/* Before: tools */}
          <div className="flex flex-col items-start gap-2.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/60">
              <Translate id="value.before">Before · 5 tools</Translate>
            </span>
            {tools.map((t) => (
              <div
                key={t.id}
                className="flex w-[208px] items-center gap-2.5 rounded-[9px] border border-border bg-card px-4 py-2.5"
              >
                <span className="text-muted-foreground/60">{t.icon}</span>
                <span className="text-sm text-muted-foreground">
                  <Translate id={t.id}>{t.label}</Translate>
                </span>
              </div>
            ))}
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center gap-1.5">
            <MoveRight className="hidden size-9 text-primary lg:block" />
            <MoveDown className="size-8 text-primary lg:hidden" />
            <span className="text-xs font-semibold text-muted-foreground/60">
              <Translate id="value.into">into one</Translate>
            </span>
          </div>

          {/* After: OpsKat card */}
          <div
            className="flex w-[288px] flex-col items-center gap-4 rounded-2xl border-[1.5px] border-primary bg-card px-7 py-8"
            style={{ boxShadow: "0 0 60px -12px oklch(0.67 0.16 260 / 0.4)" }}
          >
            <div className="flex items-center gap-2.5">
              <img src="/img/logo.png" alt="" width={40} height={40} className="rounded-[10px]" />
              <span className="text-2xl font-bold tracking-tight text-foreground">OpsKat</span>
            </div>
            <span className="text-[15px] text-muted-foreground">
              <Translate id="value.tagline">All-in-one ops workstation</Translate>
            </span>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {tags.map((t) => (
                <span
                  key={t.id}
                  className="rounded-full bg-primary/10 px-2.5 py-1 text-[11.5px] font-medium text-primary"
                >
                  <Translate id={t.id}>{t.label}</Translate>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
