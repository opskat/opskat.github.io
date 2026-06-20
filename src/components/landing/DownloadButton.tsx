import { useState, useEffect, useRef, useCallback } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Translate from "@docusaurus/Translate";
import { ChevronDown, Check } from "lucide-react";
import { FaApple, FaWindows, FaLinux } from "react-icons/fa6";
import type { IconType } from "react-icons";

interface ReleaseAsset {
  id: string;
  label: string;
  url: string;
}

interface ReleaseInfo {
  version: string;
  assets: ReleaseAsset[];
}

const FALLBACK_URL = "https://github.com/opskat/opskat/releases/latest";
const ALL_RELEASES_URL = "https://github.com/opskat/opskat/releases";

function osMeta(id: string): { Icon: IconType; name: string } {
  if (id.startsWith("windows")) return { Icon: FaWindows, name: "Windows" };
  if (id.startsWith("linux")) return { Icon: FaLinux, name: "Linux" };
  return { Icon: FaApple, name: "macOS" };
}

function detectPlatform(): string {
  if (typeof navigator === "undefined") return "darwin-arm64";
  const ua = navigator.userAgent.toLowerCase();
  const p =
    (navigator as any).userAgentData?.platform?.toLowerCase?.() ||
    navigator.platform?.toLowerCase() ||
    "";
  if (ua.includes("mac") || p.includes("mac")) return "darwin-arm64";
  if (ua.includes("win") || p.includes("win")) return "windows-amd64";
  if (ua.includes("linux")) return "linux-amd64";
  return "darwin-arm64";
}

export function DownloadButton() {
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState("darwin-arm64");
  const [release, setRelease] = useState<ReleaseInfo | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const releaseJsonUrl = useBaseUrl("/release.json");

  useEffect(() => {
    fetch(releaseJsonUrl)
      .then((r) => r.json())
      .then((data: ReleaseInfo) => setRelease(data))
      .catch(() => {});
  }, [releaseJsonUrl]);

  useEffect(() => {
    setCurrentId(detectPlatform());
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const assets = release?.assets || [];
  const current = assets.find((a) => a.id === currentId) || assets[0];
  const downloadUrl = current?.url || FALLBACK_URL;
  const version = release?.version || "";
  const { Icon: CurrentIcon, name: currentOs } = osMeta(currentId);

  const handleSelect = useCallback((a: ReleaseAsset) => {
    setCurrentId(a.id);
    setOpen(false);
    window.location.href = a.url;
  }, []);

  return (
    <div ref={ref} className="relative inline-flex">
      <div className="inline-flex overflow-hidden rounded-[10px] shadow-[0_8px_22px_-4px] shadow-primary/35">
        {/* Main download button */}
        <a
          href={downloadUrl}
          className="inline-flex items-center gap-2 bg-primary py-[11px] pl-[18px] pr-4 text-[15px] font-semibold text-primary-foreground no-underline transition-colors hover:bg-primary/90"
        >
          <CurrentIcon className="size-[17px] shrink-0" />
          <Translate
            id="hero.cta.download"
            values={{ os: currentOs }}
          >
            {"Download for {os}"}
          </Translate>
        </a>

        {/* Dropdown trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Select platform"
          className="inline-flex appearance-none items-center justify-center border-0 border-l border-solid border-primary-foreground/25 bg-primary px-2.5 text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <ChevronDown
            className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 top-full z-[60] mt-2 w-[264px] overflow-hidden rounded-xl border border-border bg-popover text-left text-popover-foreground shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
          {assets.map((a) => {
            const { Icon } = osMeta(a.id);
            const active = a.id === currentId;
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => handleSelect(a)}
                className={`flex w-full appearance-none items-center gap-2.5 border-0 bg-transparent px-4 py-2.5 text-left font-[inherit] text-[13.5px] transition-colors ${
                  active
                    ? "bg-primary/10 font-semibold text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <Icon
                  className={`size-[15px] shrink-0 ${active ? "text-primary" : "text-muted-foreground"}`}
                />
                <span className="flex-1">{a.label}</span>
                {active && <Check className="size-[15px] text-primary" />}
              </button>
            );
          })}
          <div className="flex items-center justify-between border-t border-border px-4 py-2">
            <span className="font-mono text-[11px] text-muted-foreground/70">
              {version}
            </span>
            <a
              href={ALL_RELEASES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-semibold text-primary no-underline hover:underline"
            >
              <Translate id="download.allReleases">All Releases →</Translate>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
