import type { ReactNode } from "react";
import Translate from "@docusaurus/Translate";
import { SquareTerminal, Sparkles, Code, Braces, Gem } from "lucide-react";
import { WIN, TrafficLights } from "./Window";

function TerminalWindow({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div
      className="overflow-hidden rounded-xl"
      style={{
        background: WIN.bg,
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow: "0 30px 70px -28px rgba(0,0,0,0.66), 0 0 100px -40px rgba(92,124,250,0.18)",
      }}
    >
      <div className="flex items-center justify-between px-3.5 py-3" style={{ background: WIN.bar, borderBottom: `1px solid ${WIN.border}` }}>
        <TrafficLights />
        <span className="text-xs" style={{ color: WIN.dim }}>{title}</span>
        <div className="w-10" />
      </div>
      <div className="px-4 py-4 font-mono text-[12.5px] leading-[1.7]">{children}</div>
    </div>
  );
}

function MiniHead({ icon, titleId, title, descId, desc }: { icon: ReactNode; titleId: string; title: string; descId: string; desc: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-[34px] items-center justify-center rounded-[9px] bg-primary/10 text-primary">{icon}</span>
      <div className="flex flex-col">
        <span className="text-base font-semibold text-foreground">
          <Translate id={titleId}>{title}</Translate>
        </span>
        <span className="text-[13px] text-muted-foreground">
          <Translate id={descId}>{desc}</Translate>
        </span>
      </div>
    </div>
  );
}

const chips = [
  { icon: <Sparkles className="size-[15px]" />, label: "Claude Code" },
  { icon: <Code className="size-[15px]" />, label: "Codex" },
  { icon: <Braces className="size-[15px]" />, label: "OpenCode" },
  { icon: <Gem className="size-[15px]" />, label: "Gemini CLI" },
];

export function Automation() {
  const Cmt = ({ id, children }: { id: string; children: string }) => (
    <div style={{ color: WIN.faint }}># <Translate id={id}>{children}</Translate></div>
  );
  const Cmd = ({ children }: { children: ReactNode }) => (
    <div><span style={{ color: WIN.green, fontWeight: 600 }}>$</span> <span style={{ color: WIN.cmd }}>{children}</span></div>
  );

  return (
    <section className="section-alt px-6 py-[88px]">
      <div className="mx-auto max-w-[1120px]">
        <div className="text-center">
          <div className="text-[13px] font-bold uppercase tracking-[0.15em] text-primary">
            <Translate id="auto.eyebrow">Automation · CLI & AI</Translate>
          </div>
          <h2 className="mt-3 text-[28px] font-bold tracking-tight sm:text-[33px]">
            <Translate id="auto.heading">Script it, or hand it to AI in one sentence</Translate>
          </h2>
          <p className="mx-auto mt-3.5 max-w-[660px] text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            <Translate id="auto.sub">
              opsctl brings the whole workstation to your terminal and CI; when you want it, AI executes in natural language — both share the same connection pool, policy and audit.
            </Translate>
          </p>
        </div>

        <div className="mt-12 grid items-start gap-7 lg:grid-cols-2">
          {/* opsctl CLI */}
          <div className="flex flex-col gap-4">
            <MiniHead icon={<SquareTerminal className="size-[17px]" />} titleId="auto.cli.title" title="opsctl CLI" descId="auto.cli.desc" desc="Scripts · CI · batch" />
            <TerminalWindow title="opsctl">
              <Cmt id="auto.cli.c1">Run a remote command</Cmt>
              <Cmd>opsctl exec prod-web-1 -- nginx -t</Cmd>
              <div className="h-2" />
              <Cmt id="auto.cli.c2">Database query</Cmt>
              <Cmd>opsctl sql prod-mysql "SELECT count(*) FROM users"</Cmd>
              <div className="h-2" />
              <Cmt id="auto.cli.c3">Batch in parallel</Cmt>
              <Cmd>opsctl batch exec 'web-*' -- uptime</Cmd>
              <div style={{ color: WIN.green }}>✓ web-1 · web-2 · web-3 — 3/3</div>
            </TerminalWindow>
          </div>

          {/* AI assistant */}
          <div className="flex flex-col gap-4">
            <MiniHead icon={<Sparkles className="size-[17px]" />} titleId="auto.ai.title" title="AI ops assistant" descId="auto.ai.desc" desc="Driven by natural language" />
            <TerminalWindow title="opsctl — AI session">
              <div><span style={{ color: WIN.green, fontWeight: 600 }}>you&gt;</span> <span style={{ color: WIN.text }}><Translate id="auto.ai.you">Check nginx on prod-web-1 and reload if the config is valid</Translate></span></div>
              <div className="h-2" />
              <div><span style={{ color: WIN.blue, fontWeight: 600 }}>agent&gt;</span> <span style={{ color: WIN.text }}><Translate id="auto.ai.a1">Sure — I'll check it and reload once it passes.</Translate></span></div>
              <div style={{ color: WIN.faint }}>{"  ┌ run_command · prod-web-1"}</div>
              <div style={{ color: WIN.faint }}>{"  │ $ nginx -t  →  syntax ok"}</div>
              <div style={{ color: WIN.faint }}>{"  │ "}<Translate id="auto.ai.policy">🛡 policy: allowed · 📋 audit: logged</Translate></div>
              <div style={{ color: WIN.faint }}>{"  └ systemctl reload nginx  →  ✓"}</div>
              <div className="h-2" />
              <div><span style={{ color: WIN.blue, fontWeight: 600 }}>agent&gt;</span> <span style={{ color: WIN.text }}><Translate id="auto.ai.a2">Done. Config is valid and reloaded on prod-web-1.</Translate></span></div>
            </TerminalWindow>
          </div>
        </div>

        {/* Integration chips */}
        <div className="mt-9 flex flex-col items-center gap-3.5">
          <span className="text-sm text-muted-foreground">
            <Translate id="auto.integration">Or one-click install the Skill so your AI coding assistant runs ops through opsctl</Translate>
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {chips.map((c) => (
              <span key={c.label} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-[13px] font-medium text-foreground">
                <span className="text-primary">{c.icon}</span>
                {c.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
