import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import {
  Server,
  SquareTerminal,
  Cable,
  Database,
  Layers,
  Hexagon,
  Sparkles,
  Plus,
  ArrowRight,
} from "lucide-react";
import {
  SiMysql,
  SiPostgresql,
  SiSqlite,
  SiMongodb,
  SiRedis,
  SiEtcd,
  SiApachekafka,
  SiKubernetes,
} from "react-icons/si";

// Brand colors are tuned to stay legible on both the light (#fff) and
// dark (#161922) chip surfaces. Near-black logos (Kafka) inherit the
// theme foreground via `var(--foreground)` so they don't disappear in dark mode.
type Chip = { icon: ReactNode; label: string; labelId?: string; color?: string };
type Category = { icon: ReactNode; id: string; name: string; chips: Chip[] };

const logo = "size-[15px]";

const categories: Category[] = [
  {
    icon: <Server className="size-4" />,
    id: "res.cat.servers",
    name: "Servers & terminals",
    chips: [
      // SSH / serial / local terminal are connection types, not products — keep neutral glyphs.
      { icon: <Server className={logo} />, label: "SSH" },
      { icon: <SquareTerminal className={logo} />, label: "Local terminal", labelId: "res.chip.local" },
      { icon: <Cable className={logo} />, label: "Serial", labelId: "res.chip.serial" },
    ],
  },
  {
    icon: <Database className="size-4" />,
    id: "res.cat.db",
    name: "Databases",
    chips: [
      { icon: <SiMysql className={logo} />, label: "MySQL", color: "#00758F" },
      { icon: <SiPostgresql className={logo} />, label: "PostgreSQL", color: "#336791" },
      // No official SQL Server logo in Simple Icons — use the generic db glyph in MSSQL red.
      { icon: <Database className={logo} />, label: "SQL Server", color: "#CC2927" },
      { icon: <SiSqlite className={logo} />, label: "SQLite", color: "#0F80CC" },
      { icon: <SiMongodb className={logo} />, label: "MongoDB", color: "#47A248" },
    ],
  },
  {
    icon: <Layers className="size-4" />,
    id: "res.cat.middleware",
    name: "Cache & middleware",
    chips: [
      { icon: <SiRedis className={logo} />, label: "Redis", color: "#DC382D" },
      { icon: <SiEtcd className={logo} />, label: "etcd", color: "#419EDA" },
      { icon: <SiApachekafka className={logo} />, label: "Kafka", color: "var(--foreground)" },
    ],
  },
  {
    icon: <Hexagon className="size-4" />,
    id: "res.cat.cloud",
    name: "Cloud-native",
    chips: [{ icon: <SiKubernetes className={logo} />, label: "Kubernetes", color: "#326CE5" }],
  },
];

function ChipPill({ icon, label, labelId, color }: Chip) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-[13px] font-medium leading-none text-foreground">
      <span
        className={`inline-flex shrink-0 items-center ${color ? "" : "text-muted-foreground"}`}
        style={color ? { color } : undefined}
      >
        {icon}
      </span>
      <span className="leading-none">
        {labelId ? <Translate id={labelId}>{label}</Translate> : label}
      </span>
    </span>
  );
}

export function ResourcePanorama() {
  return (
    <section id="resources" className="section-alt scroll-mt-16 px-6 py-[88px]">
      <div className="mx-auto max-w-[1000px]">
        <div className="text-center">
          <h2 className="text-[28px] font-bold tracking-tight sm:text-[33px]">
            <Translate id="res.heading">One app connects your whole stack</Translate>
          </h2>
          <p className="mx-auto mt-3.5 max-w-[600px] text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            <Translate id="res.sub">
              From servers to databases, middleware and cloud-native clusters — managed in one place, and it keeps expanding every release.
            </Translate>
          </p>
        </div>

        <div className="mt-11">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col gap-3 border-b border-border py-[18px] sm:flex-row sm:items-center sm:gap-7"
            >
              <div className="flex w-[210px] shrink-0 items-center gap-2.5">
                <span className="flex size-[30px] items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {cat.icon}
                </span>
                <span className="text-[15px] font-semibold text-foreground">
                  <Translate id={cat.id}>{cat.name}</Translate>
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                {cat.chips.map((c) => (
                  <ChipPill key={c.label} {...c} />
                ))}
              </div>
            </div>
          ))}

          {/* Extensibility row */}
          <div className="flex flex-col gap-3 py-[18px] sm:flex-row sm:items-center sm:gap-7">
            <div className="flex w-[210px] shrink-0 items-center gap-2.5">
              <span className="flex size-[30px] items-center justify-center rounded-lg bg-success/10 text-success">
                <Sparkles className="size-4" />
              </span>
              <span className="text-[15px] font-semibold text-foreground">
                <Translate id="res.cat.more">Always expanding</Translate>
              </span>
            </div>
            <Link
              className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary/10 px-4.5 py-2.5 text-[13.5px] font-semibold text-primary no-underline transition-colors hover:bg-primary/15"
              href="/docs/changelog"
            >
              <Plus className="size-[15px]" />
              <Translate id="res.more.text">More asset types every release</Translate>
              <ArrowRight className="size-[15px]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
