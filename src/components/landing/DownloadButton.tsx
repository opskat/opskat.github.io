import { useState, useEffect, useRef, useCallback } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Translate from "@docusaurus/Translate";
import { Button } from "@/components/ui/button";
import { Download, ChevronDown } from "lucide-react";

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

function detectPlatform(): string {
  if (typeof navigator === "undefined") return "darwin-arm64";
  const ua = navigator.userAgent.toLowerCase();
  const p =
    (navigator as any).userAgentData?.platform?.toLowerCase?.() ||
    navigator.platform?.toLowerCase() ||
    "";

  if (ua.includes("mac") || p.includes("mac")) {
    const arch =
      (navigator as any).userAgentData?.architecture?.toLowerCase?.() || "";
    if (arch === "arm") return "darwin-arm64";
    return "darwin-arm64";
  }
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

  // Fetch release info
  useEffect(() => {
    fetch(releaseJsonUrl)
      .then((r) => r.json())
      .then((data: ReleaseInfo) => setRelease(data))
      .catch(() => {});
  }, [releaseJsonUrl]);

  // Detect platform
  useEffect(() => {
    setCurrentId(detectPlatform());
  }, []);

  // Close on outside click
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

  const handleSelect = useCallback(
    (a: ReleaseAsset) => {
      setCurrentId(a.id);
      setOpen(false);
      window.location.href = a.url;
    },
    []
  );

  return (
    <div ref={ref} className="relative inline-flex">
      {/* Main download button */}
      <Button
        size="lg"
        className="shadow-lg shadow-primary/25 rounded-r-none pr-3"
        asChild
      >
        <a href={downloadUrl} className="no-underline">
          <Download className="size-4" />
          <Translate id="hero.cta.download.prefix">Download for</Translate>
          {" "}{current?.label || "macOS"}
        </a>
      </Button>

      {/* Dropdown trigger */}
      <Button
        size="lg"
        className="shadow-lg shadow-primary/25 rounded-l-none border-l border-primary-foreground/20 px-2"
        onClick={() => setOpen((v) => !v)}
        aria-label="Select platform"
      >
        <ChevronDown
          className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </Button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute top-full right-0 mt-2 min-w-[220px] rounded-lg border border-solid border-border bg-card shadow-xl z-50 overflow-hidden">
          {assets.map((a) => (
            <button
              key={a.id}
              className={`appearance-none border-0 bg-transparent font-[inherit] flex items-center gap-2.5 px-4 py-2.5 text-sm w-full text-left transition-colors cursor-pointer ${
                a.id === currentId
                  ? "bg-accent text-foreground font-medium"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
              onClick={() => handleSelect(a)}
            >
              <Download className="size-3.5 shrink-0" />
              {a.label}
            </button>
          ))}
          {version && (
            <div className="border-t border-solid border-border px-4 py-2 text-xs text-muted-foreground">
              {version}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
