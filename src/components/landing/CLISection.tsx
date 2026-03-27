import Translate from "@docusaurus/Translate";

const features = [
  {
    id: "cli.feature.exec",
    text: "Execute commands across servers",
  },
  {
    id: "cli.feature.transfer",
    text: "File transfer (local, remote, cross-server)",
  },
  {
    id: "cli.feature.sql",
    text: "SQL and Redis queries",
  },
  {
    id: "cli.feature.ssh",
    text: "Interactive SSH sessions",
  },
  {
    id: "cli.feature.approval",
    text: "Pre-approval grant workflows",
  },
  {
    id: "cli.feature.pool",
    text: "Shared connection pool with desktop app",
  },
  {
    id: "cli.feature.ai_skill",
    text: "One-click Skill for Claude Code, Codex & Gemini CLI — AI manages your infra via opsctl",
  },
];

export function CLISection() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 pb-[100px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left column — text */}
        <div>
          <h2 className="text-[28px] font-bold tracking-tight mb-3">
            <Translate id="cli.heading">opsctl CLI</Translate>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            <Translate id="cli.description">
              A single Go binary that brings the full power of OpsKat to your
              terminal. Script common operations, integrate with CI pipelines,
              or drop into interactive sessions. Install the Skill in Claude
              Code, Codex, or Gemini CLI, and let AI coding assistants manage
              your infrastructure directly through opsctl — with full policy
              enforcement and audit logging.
            </Translate>
          </p>
          <div className="space-y-0">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="flex items-start gap-2.5 py-1.5 text-[13px] text-muted-foreground"
              >
                <span
                  className="font-semibold shrink-0 drop-shadow-[0_0_3px_oklch(0.72_0.19_155/0.4)]"
                  style={{ color: "oklch(0.72 0.19 155)" }}
                >
                  {"\u2713"}
                </span>
                <span>
                  <Translate id={feature.id}>{feature.text}</Translate>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — terminal window */}
        <div
          className="terminal-shine rounded-xl overflow-hidden"
          style={{
            background: "oklch(0.1 0.01 260)",
            border: "1px solid oklch(1 0 0 / 8%)",
            boxShadow:
              "0 0 0 1px oklch(1 0 0 / 4%), 0 16px 50px oklch(0 0 0 / 50%), 0 0 150px -20px oklch(0.67 0.16 260 / 0.1)",
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center px-4 py-3"
            style={{
              background: "oklch(0.12 0.01 260)",
              borderBottom: "1px solid oklch(1 0 0 / 8%)",
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="inline-block size-3 rounded-full"
                style={{ background: "#ff5f57" }}
              />
              <span
                className="inline-block size-3 rounded-full"
                style={{ background: "#febc2e" }}
              />
              <span
                className="inline-block size-3 rounded-full"
                style={{ background: "#28c840" }}
              />
            </div>
            <span
              className="flex-1 text-center text-xs"
              style={{ color: "oklch(0.55 0.01 260)" }}
            >
              opsctl
            </span>
            <div className="w-[52px]" />
          </div>

          {/* Terminal body */}
          <div
            className="font-mono px-6 py-5 whitespace-pre-wrap"
            style={{
              fontSize: "12px",
              lineHeight: "1.9",
              color: "oklch(0.92 0.005 260)",
            }}
          >
            <div style={{ color: "oklch(0.45 0.01 260)" }}>
              # Execute remote command
            </div>
            <div>
              <span style={{ color: "oklch(0.72 0.19 155)" }}>$</span>{" "}
              opsctl exec prod-web-1 -- nginx -t
            </div>
            <div className="h-[0.5em]" />
            <div style={{ color: "oklch(0.45 0.01 260)" }}>
              # File transfer
            </div>
            <div>
              <span style={{ color: "oklch(0.72 0.19 155)" }}>$</span>{" "}
              opsctl cp ./app.tar.gz prod-web-1:/opt/
            </div>
            <div className="h-[0.5em]" />
            <div style={{ color: "oklch(0.45 0.01 260)" }}>
              # SQL query
            </div>
            <div>
              <span style={{ color: "oklch(0.72 0.19 155)" }}>$</span>{" "}
              opsctl sql prod-mysql "SELECT count(*) FROM users"
            </div>
            <div className="h-[0.5em]" />
            <div style={{ color: "oklch(0.45 0.01 260)" }}>
              # Interactive SSH
            </div>
            <div>
              <span style={{ color: "oklch(0.72 0.19 155)" }}>$</span>{" "}
              opsctl ssh staging-app
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
