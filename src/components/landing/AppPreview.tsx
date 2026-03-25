import Translate from "@docusaurus/Translate";

/* ── Inline SVG icons for the sidebar (16x16, hardcoded dark theme) ── */

function HomeIcon({ active }: { active?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: active ? "oklch(0.93 0.005 260)" : "oklch(0.63 0.01 260)" }}
    >
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}

function ArrowRightLeftIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: "oklch(0.63 0.01 260)" }}
    >
      <path d="M8 3 4 7l4 4" />
      <path d="M4 7h16" />
      <path d="m16 21 4-4-4-4" />
      <path d="M20 17H4" />
    </svg>
  );
}

function KeyRoundIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: "oklch(0.63 0.01 260)" }}
    >
      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  );
}

function ScrollTextIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: "oklch(0.63 0.01 260)" }}
    >
      <path d="M15 12h-5" />
      <path d="M15 8h-5" />
      <path d="M19 17V5a2 2 0 0 0-2-2H4" />
      <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2" />
    </svg>
  );
}

function BotIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: "oklch(0.63 0.01 260)" }}
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: "oklch(0.63 0.01 260)" }}
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/* ── Sidebar nav item ── */

function SidebarIcon({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <div
      className="relative flex items-center justify-center w-[36px] h-[36px] rounded-lg cursor-default"
      style={{
        background: active ? "oklch(0.23 0.018 260)" : "transparent",
      }}
    >
      {active && (
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[18px] rounded-r-full"
          style={{ background: "var(--primary)", boxShadow: "0 0 8px oklch(0.67 0.16 260 / 0.4)" }}
        />
      )}
      {children}
    </div>
  );
}

/* ── Tree item components ── */

function TreeGroup({
  name,
  count,
  collapsed,
  children,
}: {
  name: string;
  count: number;
  collapsed?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <div
        className="flex items-center gap-1.5 px-3 py-[5px] text-[11px] cursor-default select-none"
        style={{ color: "oklch(0.75 0.01 260)" }}
      >
        <span style={{ fontSize: "8px", color: "oklch(0.5 0.01 260)" }}>
          {collapsed ? "\u25B8" : "\u25BE"}
        </span>
        <span>{name}</span>
        <span
          className="ml-auto text-[10px]"
          style={{ color: "oklch(0.45 0.01 260)" }}
        >
          {count}
        </span>
      </div>
      {!collapsed && children}
    </div>
  );
}

function TreeAsset({
  name,
  active,
  connected,
}: {
  name: string;
  active?: boolean;
  connected?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-1.5 px-3 py-[4px] pl-7 text-[11px] cursor-default select-none"
      style={{
        background: active ? "oklch(0.23 0.018 260)" : "transparent",
        color: active ? "oklch(0.93 0.005 260)" : "oklch(0.65 0.01 260)",
      }}
    >
      <span style={{ fontSize: "10px" }}>
        {connected ? (
          <span
            className="inline-block size-[5px] rounded-full mr-0.5 animate-pulse"
            style={{ background: "oklch(0.72 0.19 155)" }}
          />
        ) : (
          <span
            className="inline-block size-[5px] rounded-full mr-0.5"
            style={{ background: "oklch(0.4 0.01 260)" }}
          />
        )}
      </span>
      {name}
    </div>
  );
}

/* ── Conversation item ── */

function ConversationItem({ title, time }: { title: string; time: string }) {
  return (
    <div
      className="px-3 py-2.5 cursor-default"
      style={{ borderBottom: "1px solid oklch(1 0 0 / 6%)" }}
    >
      <div
        className="text-[11px] font-semibold truncate"
        style={{ color: "oklch(0.82 0.005 260)" }}
      >
        {title}
      </div>
      <div className="text-[10px] mt-0.5" style={{ color: "oklch(0.45 0.01 260)" }}>
        {time}
      </div>
    </div>
  );
}

/* ── Main component ── */

export function AppPreview() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 pb-[100px]">
      {/* Section header */}
      <div className="text-center mb-12">
        <h2 className="text-[32px] font-bold tracking-tight mb-3">
          <Translate id="apppreview.heading">Desktop + CLI, same core</Translate>
        </h2>
        <p className="text-[15px] text-muted-foreground max-w-[500px] mx-auto">
          <Translate id="apppreview.subtitle">
            One desktop app for visual workflows, one Go binary for scripting
            and CI — both share the same connection pool and policy engine.
          </Translate>
        </p>
      </div>

      {/* App window frame */}
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
            OpsKat
          </span>
          <div className="w-[52px]" />
        </div>

        {/* App layout */}
        <div className="flex" style={{ minHeight: "380px" }}>
          {/* 1. Icon sidebar */}
          <div
            className="flex flex-col items-center py-3 gap-1 shrink-0"
            style={{
              width: "56px",
              background: "oklch(0.115 0.012 260)",
              borderRight: "1px solid oklch(1 0 0 / 6%)",
            }}
          >
            {/* Logo */}
            <div
              className="flex items-center justify-center rounded-lg mb-3 text-[13px] font-bold"
              style={{
                width: "28px",
                height: "28px",
                background: "var(--primary)",
                color: "oklch(0.98 0.003 260)",
              }}
            >
              O
            </div>

            {/* Nav icons */}
            <SidebarIcon active>
              <HomeIcon active />
            </SidebarIcon>
            <SidebarIcon>
              <ArrowRightLeftIcon />
            </SidebarIcon>
            <SidebarIcon>
              <KeyRoundIcon />
            </SidebarIcon>
            <SidebarIcon>
              <ScrollTextIcon />
            </SidebarIcon>

            <div className="flex-1" />

            <SidebarIcon>
              <BotIcon />
            </SidebarIcon>
            <SidebarIcon>
              <SettingsIcon />
            </SidebarIcon>
          </div>

          {/* 2. Asset tree */}
          <div
            className="shrink-0 overflow-hidden hidden md:block"
            style={{
              width: "200px",
              background: "oklch(0.125 0.012 260)",
              borderRight: "1px solid oklch(1 0 0 / 6%)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-3 py-2"
              style={{ borderBottom: "1px solid oklch(1 0 0 / 6%)" }}
            >
              <span
                className="text-[10px] font-semibold tracking-wider"
                style={{ color: "oklch(0.5 0.01 260)" }}
              >
                ASSETS
              </span>
              <div className="flex items-center gap-1">
                <span
                  className="text-[14px] cursor-default"
                  style={{ color: "oklch(0.5 0.01 260)" }}
                >
                  +
                </span>
              </div>
            </div>

            {/* Search */}
            <div className="px-2 py-2">
              <div
                className="rounded text-[10px] px-2 flex items-center"
                style={{
                  height: "24px",
                  background: "oklch(0.115 0.012 260)",
                  border: "1px solid oklch(1 0 0 / 8%)",
                  color: "oklch(0.45 0.01 260)",
                }}
              >
                Search...
              </div>
            </div>

            {/* Tree */}
            <div className="py-1">
              <TreeGroup name="Production" count={3}>
                <TreeAsset name="prod-web-1" active connected />
                <TreeAsset name="prod-web-2" />
                <TreeAsset name="prod-mysql" />
              </TreeGroup>
              <TreeGroup name="Staging" count={2}>
                <TreeAsset name="staging-app" />
                <TreeAsset name="staging-db" />
              </TreeGroup>
              <TreeGroup name="Redis" count={1} collapsed />
            </div>
          </div>

          {/* 3. Main content */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Tab bar */}
            <div
              className="flex items-center shrink-0"
              style={{ borderBottom: "1px solid oklch(1 0 0 / 6%)" }}
            >
              {/* Active tab */}
              <div
                className="flex items-center gap-1.5 px-3 py-2 text-xs relative cursor-default"
                style={{ color: "oklch(0.93 0.005 260)" }}
              >
                prod-web-1
                <span
                  className="text-[10px] ml-1 cursor-default"
                  style={{ color: "oklch(0.45 0.01 260)" }}
                >
                  &#x2715;
                </span>
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: "var(--primary)" }}
                />
              </div>
              {/* AI Chat tab */}
              <div
                className="flex items-center gap-1 px-3 py-2 text-xs cursor-default"
                style={{ color: "oklch(0.5 0.01 260)" }}
              >
                <span style={{ fontSize: "11px" }}>{"\uD83D\uDCAC"}</span>
                AI Chat
              </div>
              {/* prod-mysql tab */}
              <div
                className="flex items-center px-3 py-2 text-xs cursor-default"
                style={{ color: "oklch(0.5 0.01 260)" }}
              >
                prod-mysql
              </div>
            </div>

            {/* Terminal pane */}
            <div
              className="flex-1 font-mono text-xs px-4 py-3 overflow-hidden whitespace-pre"
              style={{ color: "oklch(0.75 0.05 260)" }}
            >
              <div>
                <span style={{ color: "oklch(0.72 0.19 155)" }}>
                  root@prod-web-1:~$
                </span>{" "}
                <span style={{ color: "oklch(0.92 0.005 260)" }}>df -h</span>
              </div>
              <div style={{ color: "oklch(0.55 0.01 260)" }}>
                {"Filesystem      Size  Used  Avail  Use%  Mounted on"}
              </div>
              <div>
                {"/dev/sda1        50G   23G    25G   48%  /"}
              </div>
              <div>
                {"/dev/sdb1       200G  142G    48G   75%  /data"}
              </div>
              <div>
                <span style={{ color: "oklch(0.72 0.19 155)" }}>
                  root@prod-web-1:~$
                </span>{" "}
                <span style={{ color: "oklch(0.92 0.005 260)" }}>uptime</span>
              </div>
              <div>
                {" 14:23:01 up 127 days, 3:42, 1 user, load average: 0.12, 0.08, 0.05"}
              </div>
              <div>
                <span style={{ color: "oklch(0.72 0.19 155)" }}>
                  root@prod-web-1:~$
                </span>{" "}
                <span
                  className="inline-block w-[7px] h-[14px] animate-pulse"
                  style={{ background: "oklch(0.72 0.19 155)" }}
                />
              </div>
            </div>

            {/* Bottom toolbar */}
            <div
              className="flex items-center justify-between px-3 py-1 text-[10px] shrink-0"
              style={{
                borderTop: "1px solid oklch(1 0 0 / 6%)",
                color: "oklch(0.45 0.01 260)",
              }}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="inline-block size-[6px] rounded-full"
                  style={{ background: "oklch(0.72 0.19 155)" }}
                />
                prod-web-1 &middot; root@10.0.1.10
              </div>
              <div>UTF-8 &middot; 80x24</div>
            </div>
          </div>

          {/* 4. Conversation list panel */}
          <div
            className="shrink-0 overflow-hidden hidden lg:block"
            style={{
              width: "220px",
              background: "oklch(0.115 0.012 260)",
              borderLeft: "1px solid oklch(1 0 0 / 6%)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-3 py-2"
              style={{ borderBottom: "1px solid oklch(1 0 0 / 6%)" }}
            >
              <div className="flex items-center gap-1.5">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "oklch(0.63 0.01 260)" }}
                >
                  <path d="M12 8V4H8" />
                  <rect width="16" height="12" x="4" y="8" rx="2" />
                  <path d="M2 14h2" />
                  <path d="M20 14h2" />
                  <path d="M15 13v2" />
                  <path d="M9 13v2" />
                </svg>
                <span
                  className="text-[12px] font-semibold"
                  style={{ color: "oklch(0.82 0.005 260)" }}
                >
                  AI
                </span>
              </div>
              <div
                className="flex items-center gap-2 text-[12px]"
                style={{ color: "oklch(0.5 0.01 260)" }}
              >
                <span className="cursor-default">+</span>
                <span className="cursor-default">&#x2715;</span>
              </div>
            </div>

            {/* Conversations */}
            <ConversationItem title="Check nginx and reload" time="3 min ago" />
            <ConversationItem title="Deploy v2.3.1 to staging" time="1 hour ago" />
            <ConversationItem title="Analyze slow queries" time="Yesterday" />
            <ConversationItem title="Setup Redis cluster" time="3/22" />
          </div>
        </div>
      </div>
    </section>
  );
}
