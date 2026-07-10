import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import { Database, Play, CircleCheck, ArrowRight, ShieldAlert } from "lucide-react";
import { WIN, TrafficLights } from "./Window";

function Eyebrow({ id, children }: { id: string; children: ReactNode }) {
  return (
    <div className="text-[13px] font-bold uppercase tracking-[0.15em] text-primary">
      <Translate id={id}>{children as string}</Translate>
    </div>
  );
}

function ShowcaseText({
  eyebrowId,
  eyebrow,
  titleId,
  title,
  descId,
  desc,
  bullets,
  linkId,
  linkText,
  linkTo,
}: {
  eyebrowId: string;
  eyebrow: string;
  titleId: string;
  title: string;
  descId: string;
  desc: string;
  bullets: { id: string; text: string }[];
  linkId: string;
  linkText: string;
  linkTo: string;
}) {
  return (
    <div className="flex max-w-[460px] flex-col items-start gap-4">
      <Eyebrow id={eyebrowId}>{eyebrow}</Eyebrow>
      <h3 className="text-[26px] font-bold leading-tight tracking-tight text-foreground sm:text-[28px]">
        <Translate id={titleId}>{title}</Translate>
      </h3>
      <p className="text-[15.5px] leading-relaxed text-muted-foreground">
        <Translate id={descId}>{desc}</Translate>
      </p>
      <div className="mt-1 flex flex-col gap-2.5">
        {bullets.map((b) => (
          <div key={b.id} className="flex items-start gap-2.5">
            <CircleCheck className="mt-px size-[18px] shrink-0 text-success" />
            <span className="text-[14.5px] leading-snug text-muted-foreground">
              <Translate id={b.id}>{b.text}</Translate>
            </span>
          </div>
        ))}
      </div>
      <Link to={linkTo} className="mt-1 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-primary no-underline hover:underline">
        <Translate id={linkId}>{linkText}</Translate>
        <ArrowRight className="size-[15px]" />
      </Link>
    </div>
  );
}

function ProductWindow({ title, glow, children }: { title: ReactNode; glow: string; children: ReactNode }) {
  return (
    <div
      className="overflow-hidden rounded-xl"
      style={{
        background: WIN.bg,
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow: `0 30px 70px -28px rgba(0,0,0,0.66), 0 0 100px -40px ${glow}`,
      }}
    >
      <div className="flex items-center justify-between px-3.5 py-3" style={{ background: WIN.bar, borderBottom: `1px solid ${WIN.border}` }}>
        <TrafficLights />
        <span className="text-xs" style={{ color: WIN.dim }}>{title}</span>
        <div className="w-10" />
      </div>
      {children}
    </div>
  );
}

const KW = WIN.blue;
const STR = "#c3e88d";

function SqlEditor() {
  const Cell = ({ w, children, head }: { w?: number; children: ReactNode; head?: boolean }) => (
    <div className="px-3 py-2" style={{ width: w, flex: w ? undefined : 1 }}>
      <span className="font-mono text-[11.5px]" style={{ color: head ? WIN.faint : WIN.text, fontWeight: head ? 600 : 400 }}>
        {children}
      </span>
    </div>
  );
  const rows = [
    ["1", "Ada Lovelace", "ada@calc.io", "2026-06-18"],
    ["2", "Linus T.", "linus@kernel.org", "2026-06-17"],
    ["3", "Grace Hopper", "grace@navy.mil", "2026-06-15"],
    ["4", "Alan Turing", "alan@bletchley.uk", "2026-06-12"],
  ];
  return (
    <ProductWindow
      title={<Translate id="query.window.title">Query editor — prod-mysql</Translate>}
      glow="rgba(92,124,250,0.18)"
    >
      {/* toolbar */}
      <div className="flex items-center justify-between px-3.5 py-2" style={{ background: WIN.bar, borderBottom: `1px solid ${WIN.border}` }}>
        <span className="flex items-center gap-1.5 rounded-md px-2.5 py-1" style={{ background: WIN.active }}>
          <Database className="size-3" style={{ color: KW }} />
          <span className="font-mono text-[11.5px]" style={{ color: WIN.text }}>prod-mysql · users</span>
        </span>
        <span className="flex items-center gap-1.5 rounded-md px-3 py-1.5" style={{ background: "#1c3a2e" }}>
          <Play className="size-3" style={{ color: WIN.green }} />
          <span className="text-[12px] font-semibold" style={{ color: WIN.green }}>
            <Translate id="query.run">Run</Translate>
          </span>
        </span>
      </div>
      {/* editor */}
      <div className="px-4 py-3.5 font-mono text-[12.5px] leading-[1.6]">
        <div><span style={{ color: KW }}>SELECT </span><span style={{ color: WIN.text }}>id, name, email, created_at</span></div>
        <div><span style={{ color: KW }}>FROM </span><span style={{ color: WIN.text }}>users</span></div>
        <div><span style={{ color: KW }}>WHERE </span><span style={{ color: WIN.text }}>status = </span><span style={{ color: STR }}>'active'</span></div>
        <div><span style={{ color: KW }}>ORDER BY </span><span style={{ color: WIN.text }}>created_at </span><span style={{ color: KW }}>DESC LIMIT </span><span style={{ color: WIN.text }}>5;</span></div>
      </div>
      {/* result table */}
      <div style={{ borderTop: `1px solid ${WIN.border}` }}>
        <div className="flex" style={{ background: "#12151d", borderBottom: `1px solid ${WIN.border}` }}>
          <Cell w={56} head>id</Cell>
          <Cell w={120} head>name</Cell>
          <Cell head>email</Cell>
          <Cell w={130} head>created_at</Cell>
        </div>
        {rows.map((r) => (
          <div key={r[0]} className="flex" style={{ borderBottom: `1px solid ${WIN.border}` }}>
            <Cell w={56}><span style={{ color: WIN.faint }}>{r[0]}</span></Cell>
            <Cell w={120}>{r[1]}</Cell>
            <Cell>{r[2]}</Cell>
            <Cell w={130}>{r[3]}</Cell>
          </div>
        ))}
      </div>
    </ProductWindow>
  );
}

function AuditLog() {
  const pills: Record<string, { bg: string; fg: string; id: string; text: string }> = {
    allow: { bg: "#16321f", fg: "#52d39a", id: "audit.allow", text: "Allowed" },
    deny: { bg: "#3a1d1d", fg: "#ff7b7b", id: "audit.deny", text: "Blocked" },
    approved: { bg: "#1b2740", fg: "#7c93ff", id: "audit.approved", text: "Approved" },
  };
  const rows: [string, string, string, keyof typeof pills][] = [
    ["14:23", "prod-web-1", "systemctl reload nginx", "allow"],
    ["14:21", "prod-mysql", "DROP TABLE orders", "deny"],
    ["14:18", "prod-web-1", "rm -rf /var/tmp/cache", "approved"],
    ["14:05", "redis-cache", "FLUSHALL", "deny"],
    ["13:52", "prod-cluster", "kubectl get pods -A", "allow"],
  ];
  return (
    <ProductWindow
      title={<Translate id="audit.window.title">Audit log · Today</Translate>}
      glow="rgba(52,211,154,0.15)"
    >
      <div className="flex" style={{ background: "#12151d", borderBottom: `1px solid ${WIN.border}` }}>
        <div className="px-3 py-2" style={{ width: 62 }}><span className="font-mono text-[11px] font-semibold" style={{ color: WIN.faint }}><Translate id="audit.col.time">time</Translate></span></div>
        <div className="px-3 py-2" style={{ width: 108 }}><span className="font-mono text-[11px] font-semibold" style={{ color: WIN.faint }}><Translate id="audit.col.asset">asset</Translate></span></div>
        <div className="px-3 py-2 flex-1"><span className="font-mono text-[11px] font-semibold" style={{ color: WIN.faint }}><Translate id="audit.col.cmd">command</Translate></span></div>
        <div className="px-3 py-2" style={{ width: 86 }}><span className="font-mono text-[11px] font-semibold" style={{ color: WIN.faint }}><Translate id="audit.col.decision">decision</Translate></span></div>
      </div>
      {rows.map((r, i) => {
        const p = pills[r[3]];
        return (
          <div key={i} className="flex items-center" style={{ borderBottom: `1px solid ${WIN.border}` }}>
            <div className="px-3 py-2.5" style={{ width: 62 }}><span className="font-mono text-[11px]" style={{ color: WIN.faint }}>{r[0]}</span></div>
            <div className="px-3 py-2.5" style={{ width: 108 }}><span className="font-mono text-[11px]" style={{ color: WIN.dim }}>{r[1]}</span></div>
            <div className="px-3 py-2.5 flex-1"><span className="font-mono text-[11.5px]" style={{ color: r[3] === "deny" ? "#ff7b7b" : WIN.text }}>{r[2]}</span></div>
            <div className="px-2.5 py-2.5" style={{ width: 86 }}>
              <span className="rounded-full px-2.5 py-1 text-[10.5px] font-semibold" style={{ background: p.bg, color: p.fg }}>
                <Translate id={p.id}>{p.text}</Translate>
              </span>
            </div>
          </div>
        );
      })}
      {/* approval banner */}
      <div className="flex items-center justify-between gap-3 px-3.5 py-3" style={{ background: "#15171f", borderTop: `1px solid ${WIN.border}` }}>
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="size-4" style={{ color: WIN.amber }} />
          <div className="flex flex-col gap-px">
            <span className="text-[11.5px] font-semibold" style={{ color: WIN.text }}>
              <Translate id="audit.request">opsctl requests to run</Translate>
            </span>
            <span className="font-mono text-[10.5px]" style={{ color: WIN.dim }}>systemctl restart app · prod-web-1</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md px-3 py-1.5 text-[12px] font-semibold" style={{ border: `1px solid ${WIN.border}`, color: WIN.dim }}>
            <Translate id="audit.deny.btn">Deny</Translate>
          </span>
          <span className="rounded-md px-3 py-1.5 text-[12px] font-semibold" style={{ background: "#1c3a2e", color: WIN.green }}>
            <Translate id="audit.approve.btn">Approve</Translate>
          </span>
        </div>
      </div>
    </ProductWindow>
  );
}

export function Showcase() {
  return (
    <section className="px-6 py-[88px]">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-24">
        {/* Query row — text left, window right */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <ShowcaseText
            eyebrowId="query.eyebrow" eyebrow="Data query"
            titleId="query.title" title="One SQL editor across every relational database"
            descId="query.desc"
            desc="MySQL, PostgreSQL, SQL Server and SQLite share one SQL editor and can connect over an SSH tunnel; MongoDB, Redis, etcd, Kafka and object storage each get their own dedicated panel."
            bullets={[
              { id: "query.b1", text: "SQL highlighting and paged execution" },
              { id: "query.b2", text: "Filter / sort / one-click export of results" },
              { id: "query.b3", text: "Read-only connection protection" },
            ]}
            linkId="query.link" linkText="Read the Query Editor docs" linkTo="/docs/guide/query-editor"
          />
          <SqlEditor />
        </div>

        {/* Audit row — window left, text right (text first on mobile) */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1"><AuditLog /></div>
          <div className="order-1 lg:order-2 lg:justify-self-end">
            <ShowcaseText
              eyebrowId="audit.eyebrow" eyebrow="Stays in control"
              titleId="audit.title" title="Guarded operations carry policy and a paper trail"
              descId="audit.desc"
              desc="Supported AI and opsctl operations pass their policy and approval path, then record the tool result and decision context in the audit log."
              bullets={[
                { id: "audit.b1", text: "Built-in + custom policy groups, inherited by asset / group" },
                { id: "audit.b2", text: "Dangerous commands auto-blocked or double-confirmed" },
                { id: "audit.b3", text: "Tool audit records source, result and decision context" },
              ]}
              linkId="audit.link" linkText="Read the Policy & Audit docs" linkTo="/docs/guide/policy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
