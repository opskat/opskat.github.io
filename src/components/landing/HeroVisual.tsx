import type { ReactNode } from "react";
import Translate from "@docusaurus/Translate";
import {
  PanelsTopLeft,
  FolderSync,
  KeyRound,
  ScrollText,
  Bot,
  Settings,
  Server,
  Database,
  Layers,
  Network,
  RadioTower,
  Hexagon,
  Search,
  Plus,
  FolderOpen,
  Upload,
  Folder,
  FileArchive,
  FileCode,
  FileText,
  FileCog,
  CornerLeftUp,
  X,
} from "lucide-react";
import { WIN, TrafficLights } from "./Window";

function RailIcon({ children, active }: { children: ReactNode; active?: boolean }) {
  return (
    <div
      className="flex size-[38px] items-center justify-center rounded-[9px]"
      style={{ background: active ? WIN.active : "transparent", color: active ? WIN.text : WIN.dim }}
    >
      {children}
    </div>
  );
}

function TreeGroup({ name, count, collapsed }: { name: ReactNode; count: number; collapsed?: boolean }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5" style={{ color: WIN.dim }}>
      <span style={{ fontSize: 9, color: WIN.faint }}>{collapsed ? "▸" : "▾"}</span>
      <span className="text-[11.5px] font-semibold">{name}</span>
      <span className="ml-auto text-[10px]" style={{ color: WIN.faint }}>{count}</span>
    </div>
  );
}

function TreeAsset({
  name,
  icon,
  active,
  connected,
}: {
  name: string;
  icon: ReactNode;
  active?: boolean;
  connected?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-2 py-[5px] pl-7 pr-3"
      style={{ background: active ? WIN.active : "transparent", color: active ? WIN.text : WIN.dim }}
    >
      <span className="inline-block size-1.5 rounded-full" style={{ background: connected ? WIN.green : "#3a4150" }} />
      <span className="[&_svg]:size-[13px]">{icon}</span>
      <span className="text-[11.5px]">{name}</span>
    </div>
  );
}

function Tab({ label, icon, active }: { label: string; icon: ReactNode; active?: boolean }) {
  return (
    <div
      className="flex items-center gap-1.5 px-3 py-[11px] text-[12.5px]"
      style={{
        color: active ? WIN.text : WIN.dim,
        borderBottom: active ? `2px solid ${WIN.blue}` : "2px solid transparent",
      }}
    >
      <span style={{ color: active ? WIN.green : WIN.faint }} className="[&_svg]:size-[13px]">{icon}</span>
      {label}
      {active && <X className="size-3" style={{ color: WIN.faint }} />}
    </div>
  );
}

function FileRow({ icon, name, size, color }: { icon: ReactNode; name: string; size: string; color?: string }) {
  return (
    <div className="flex items-center gap-2.5 px-3 py-1.5">
      <span style={{ color: color || WIN.dim }} className="[&_svg]:size-[14px]">{icon}</span>
      <span className="font-mono text-[11.5px]" style={{ color: color ? WIN.text : WIN.dim }}>{name}</span>
      <span className="ml-auto font-mono text-[10.5px]" style={{ color: WIN.faint }}>{size}</span>
    </div>
  );
}

export function HeroVisual() {
  return (
    <div
      className="overflow-hidden rounded-[14px] text-left"
      style={{
        background: WIN.bg,
        border: `1px solid rgba(255,255,255,0.15)`,
        boxShadow: "0 40px 90px -30px rgba(0,0,0,0.8), 0 0 120px -40px rgba(92,124,250,0.2)",
      }}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-3" style={{ background: WIN.bar, borderBottom: `1px solid ${WIN.border}` }}>
        <TrafficLights />
        <span className="text-xs" style={{ color: WIN.dim }}>
          <Translate id="preview.title">OpsKat — Unified workspace</Translate>
        </span>
        <div className="w-[52px]" />
      </div>

      {/* App body */}
      <div className="flex" style={{ minHeight: 540 }}>
        {/* Icon rail */}
        <div className="flex w-14 shrink-0 flex-col items-center gap-1.5 py-3.5" style={{ background: WIN.rail, borderRight: `1px solid ${WIN.border}` }}>
          <img src="/img/logo.png" alt="" width={28} height={28} className="mb-2 rounded-lg" />
          <RailIcon active><PanelsTopLeft className="size-[18px]" /></RailIcon>
          <RailIcon><FolderSync className="size-[18px]" /></RailIcon>
          <RailIcon><KeyRound className="size-[18px]" /></RailIcon>
          <RailIcon><ScrollText className="size-[18px]" /></RailIcon>
          <div className="flex-1" />
          <RailIcon><Bot className="size-[18px]" /></RailIcon>
          <RailIcon><Settings className="size-[18px]" /></RailIcon>
        </div>

        {/* Asset tree */}
        <div className="hidden w-56 shrink-0 flex-col md:flex" style={{ background: WIN.panel, borderRight: `1px solid ${WIN.border}` }}>
          <div className="flex items-center justify-between px-3 py-2.5">
            <span className="text-[11px] font-semibold tracking-wider" style={{ color: WIN.faint }}>
              <Translate id="preview.assets">Asset inventory</Translate>
            </span>
            <Plus className="size-[15px]" style={{ color: WIN.dim }} />
          </div>
          <div className="px-2 pb-2">
            <div className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5" style={{ background: WIN.bg, border: `1px solid ${WIN.border}` }}>
              <Search className="size-[13px]" style={{ color: WIN.faint }} />
              <span className="text-[12px]" style={{ color: WIN.faint }}>
                <Translate id="preview.search">Search assets...</Translate>
              </span>
            </div>
          </div>
          <div className="py-1">
            <TreeGroup name={<Translate id="preview.group.production">Production</Translate>} count={3} />
            <TreeAsset name="prod-web-1" icon={<Server />} active connected />
            <TreeAsset name="prod-web-2" icon={<Server />} />
            <TreeAsset name="prod-mysql" icon={<Database />} connected />
            <TreeGroup name={<Translate id="preview.group.middleware">Middleware</Translate>} count={3} />
            <TreeAsset name="redis-cache" icon={<Layers />} connected />
            <TreeAsset name="etcd-01" icon={<Network />} />
            <TreeAsset name="kafka-main" icon={<RadioTower />} connected />
            <TreeGroup name={<Translate id="preview.group.cloud">Cloud-native</Translate>} count={1} />
            <TreeAsset name="prod-cluster" icon={<Hexagon />} connected />
            <TreeGroup name={<Translate id="preview.group.testing">Testing</Translate>} count={2} collapsed />
          </div>
        </div>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center" style={{ borderBottom: `1px solid ${WIN.border}` }}>
            <Tab label="prod-web-1" icon={<Server />} active />
            <Tab label="prod-mysql" icon={<Database />} />
            <Tab label="redis-cache" icon={<Layers />} />
            <Tab label="prod-cluster" icon={<Hexagon />} />
          </div>
          <div className="flex-1 px-4 py-3.5 font-mono text-[12.5px] leading-[1.7]" style={{ color: WIN.text }}>
            <div><span style={{ color: WIN.green }}>root@prod-web-1:~$</span> <span style={{ color: WIN.cmd }}>df -h</span></div>
            <div style={{ color: WIN.faint }}>Filesystem      Size  Used  Avail  Use%  Mounted on</div>
            <div>/dev/sda1        50G   23G    25G   48%  /</div>
            <div>/dev/sdb1       200G  142G    48G   75%  /data</div>
            <div><span style={{ color: WIN.green }}>root@prod-web-1:~$</span> <span style={{ color: WIN.cmd }}>systemctl status nginx</span></div>
            <div>● nginx.service - A high performance web server</div>
            <div style={{ color: WIN.green }}>   Active: active (running) since Mon 2026-06-15</div>
            <div><span style={{ color: WIN.green }}>root@prod-web-1:~$</span> <span className="ml-0.5 inline-block h-3.5 w-[7px] animate-pulse align-middle" style={{ background: WIN.green }} /></div>
          </div>
          <div className="flex items-center justify-between px-3.5 py-1.5 font-mono text-[10.5px]" style={{ borderTop: `1px solid ${WIN.border}`, color: WIN.faint }}>
            <span className="flex items-center gap-1.5">
              <span className="inline-block size-1.5 rounded-full" style={{ background: WIN.green }} />
              prod-web-1 · root@10.0.1.10
            </span>
            <span>SSH · UTF-8 · 80×24</span>
          </div>
        </div>

        {/* SFTP panel */}
        <div className="hidden w-[250px] shrink-0 flex-col lg:flex" style={{ background: WIN.panel, borderLeft: `1px solid ${WIN.border}` }}>
          <div className="flex items-center justify-between px-3 py-2.5" style={{ borderBottom: `1px solid ${WIN.border}` }}>
            <span className="flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: WIN.text }}>
              <FolderOpen className="size-3.5" style={{ color: WIN.dim }} />
              SFTP · /opt/app
            </span>
            <Upload className="size-3.5" style={{ color: WIN.dim }} />
          </div>
          <div className="py-1">
            <FileRow icon={<CornerLeftUp />} name=".." size="" />
            <FileRow icon={<Folder />} name="releases/" size="—" color={WIN.blue} />
            <FileRow icon={<Folder />} name="shared/" size="—" color={WIN.blue} />
            <FileRow icon={<FileArchive />} name="app-v2.3.1.tar.gz" size="24 MB" color={WIN.text} />
            <FileRow icon={<FileCode />} name="docker-compose.yml" size="1.4 KB" color={WIN.text} />
            <FileRow icon={<FileText />} name="deploy.log" size="312 KB" color={WIN.text} />
            <FileRow icon={<FileCog />} name=".env.production" size="820 B" color={WIN.text} />
          </div>
        </div>
      </div>
    </div>
  );
}
