import type { ReactNode } from "react";
import Translate from "@docusaurus/Translate";
import {
  SquareTerminal,
  Database,
  Boxes,
  ListTree,
  ShieldCheck,
  Terminal,
  KeyRound,
  PackageOpen,
  Sparkles,
} from "lucide-react";

type Feature = {
  icon: ReactNode;
  titleId: string;
  title: string;
  descId: string;
  desc: string;
};

const features: Feature[] = [
  {
    icon: <SquareTerminal className="size-[21px]" />,
    titleId: "feat.terminal.title",
    title: "Multi-protocol terminal",
    descId: "feat.terminal.desc",
    desc: "SSH + local shell / PowerShell / WSL, with split panes, SFTP, jump-host chains, port forwarding and ZMODEM drag-and-drop upload.",
  },
  {
    icon: <Database className="size-[21px]" />,
    titleId: "feat.query.title",
    title: "Query & data management",
    descId: "feat.query.desc",
    desc: "MySQL / PostgreSQL / SQL Server / SQLite share one SQL editor; MongoDB, Redis, etcd and Kafka each get a dedicated panel.",
  },
  {
    icon: <Boxes className="size-[21px]" />,
    titleId: "feat.cluster.title",
    title: "Cluster & middleware",
    descId: "feat.cluster.desc",
    desc: "Kubernetes resources, Kafka topics / consumer groups, Redis / etcd panels — managed in one place.",
  },
  {
    icon: <ListTree className="size-[21px]" />,
    titleId: "feat.assets.title",
    title: "Asset management",
    descId: "feat.assets.desc",
    desc: "A grouped, tree-structured inventory with one-click import from SSH config, Tabby and WindTerm.",
  },
  {
    icon: <ShieldCheck className="size-[21px]" />,
    titleId: "feat.policy.title",
    title: "Policy & audit",
    descId: "feat.policy.desc",
    desc: "Allow / deny rules across commands, SQL, Redis, Mongo, Kafka, K8s and etcd, with full audit logging and approvals.",
  },
  {
    icon: <Terminal className="size-[21px]" />,
    titleId: "feat.cli.title",
    title: "opsctl CLI",
    descId: "feat.cli.desc",
    desc: "A single Go binary on the same core — shares the desktop connection pool, scriptable and CI-ready.",
  },
  {
    icon: <KeyRound className="size-[21px]" />,
    titleId: "feat.creds.title",
    title: "Secure credentials",
    descId: "feat.creds.desc",
    desc: "Credentials encrypted with Argon2id + AES-256-GCM; the master key lives in your OS keyring. Local-first.",
  },
  {
    icon: <PackageOpen className="size-[21px]" />,
    titleId: "feat.cross.title",
    title: "Cross-platform · open source",
    descId: "feat.cross.desc",
    desc: "Native on macOS / Windows / Linux, GPL-3.0 open source, your data stays local and under your control.",
  },
  {
    icon: <Sparkles className="size-[21px]" />,
    titleId: "feat.ai.title",
    title: "AI ops assistant",
    descId: "feat.ai.desc",
    desc: "Drive ops in natural language, integrated with Claude Code, Codex, OpenCode and Gemini CLI — all under the same policy and audit.",
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-16 px-6 py-[88px]">
      <div className="mx-auto max-w-[1120px]">
        <div className="text-center">
          <div className="text-[13px] font-bold uppercase tracking-[0.15em] text-primary">
            <Translate id="feat.eyebrow">Core capabilities</Translate>
          </div>
          <h2 className="mt-3 text-[28px] font-bold tracking-tight sm:text-[33px]">
            <Translate id="feat.heading">One workstation across the whole ops workflow</Translate>
          </h2>
          <p className="mx-auto mt-3.5 max-w-[560px] text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            <Translate id="feat.sub">
              The resource wall answers “what can it manage”; this answers “what can it do”.
            </Translate>
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.titleId}
              className="feature-card-glow rounded-2xl border border-border bg-card p-[22px] transition-all duration-300"
            >
              <div className="mb-3.5 flex size-[42px] items-center justify-center rounded-[11px] bg-primary/10 text-primary">
                {f.icon}
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                <Translate id={f.titleId}>{f.title}</Translate>
              </h3>
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">
                <Translate id={f.descId}>{f.desc}</Translate>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
