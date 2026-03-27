import Translate from "@docusaurus/Translate";
import {
  Bot,
  Cable,
  Database,
  ShieldCheck,
  ClipboardList,
  Puzzle,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    titleId: "features.ai_agent.title",
    title: "AI Agent",
    descId: "features.ai_agent.desc",
    desc: "Multi-turn conversations with tool calling. Supports OpenAI-compatible API and Anthropic API, with model presets and context auto-compression.",
  },
  {
    icon: Cable,
    titleId: "features.ssh_terminal.title",
    title: "SSH Terminal",
    descId: "features.ssh_terminal.desc",
    desc: "Interactive terminal with split pane, SFTP browser, jump host chains, port forwarding, and SOCKS proxy.",
  },
  {
    icon: Database,
    titleId: "features.query_editor.title",
    title: "Query Editor",
    descId: "features.query_editor.desc",
    desc: "SQL editor for MySQL/PostgreSQL via SSH tunnel. Redis command execution with key browser.",
  },
  {
    icon: ShieldCheck,
    titleId: "features.policy.title",
    title: "Policy Enforcement",
    descId: "features.policy.desc",
    desc: "Allow/deny rules for SSH commands, SQL statements, and Redis operations. Built-in and custom policy groups.",
  },
  {
    icon: ClipboardList,
    titleId: "features.audit.title",
    title: "Audit & Approval",
    descId: "features.audit.desc",
    desc: "Every action logged with decision tracking. Grant/approval workflow for opsctl with command pattern pre-approval.",
  },
  {
    icon: Puzzle,
    titleId: "features.ai_tool.title",
    title: "AI Tool Integration",
    descId: "features.ai_tool.desc",
    desc: "One-click skill installation teaches Claude Code, Codex, and Gemini CLI how to use opsctl for infrastructure management.",
  },
];

export function Features() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 pb-[100px]">
      {/* Section header */}
      <div className="text-center mb-12">
        <h2 className="text-[32px] font-bold tracking-tight mb-3">
          <Translate id="features.heading">
            Everything you need for ops
          </Translate>
        </h2>
        <p className="text-[15px] text-muted-foreground max-w-[500px] mx-auto">
          <Translate id="features.subtitle">
            A unified platform combining AI, terminal, database tools, and
            policy enforcement in one application.
          </Translate>
        </p>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => (
          <div
            key={feature.titleId}
            className="feature-card-glow p-6 bg-card border border-border rounded-xl transition-all duration-300 hover:scale-[1.01]"
          >
            <div className="w-10 h-10 rounded-[10px] bg-primary/10 text-primary flex items-center justify-center mb-4 shadow-[0_0_15px_-3px] shadow-primary/10">
              <feature.icon className="size-5" />
            </div>
            <h3 className="text-[15px] font-semibold mb-2">
              <Translate id={feature.titleId}>{feature.title}</Translate>
            </h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              <Translate id={feature.descId}>{feature.desc}</Translate>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
