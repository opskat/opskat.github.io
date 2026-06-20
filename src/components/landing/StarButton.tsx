import { useState, useEffect } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Translate from "@docusaurus/Translate";
import { Star } from "lucide-react";

const REPO_URL = "https://github.com/opskat/opskat";

function GithubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  );
}

function formatStars(n: number): string {
  if (n < 1000) return String(n);
  const s = (n / 1000).toFixed(1).replace(/\.0$/, "");
  return `${s}k`;
}

/**
 * GitHub star button — split pill showing a live star count.
 * The count is read from /release.json (the `stars` field), which CI refreshes
 * from the GitHub API alongside the release info (see scripts/fetch-release.mjs).
 */
export function StarButton({ className = "" }: { className?: string }) {
  const [stars, setStars] = useState<number | null>(null);
  const releaseUrl = useBaseUrl("/release.json");

  useEffect(() => {
    fetch(releaseUrl)
      .then((r) => r.json())
      .then((d: { stars?: number }) => setStars(d.stars ?? 0))
      .catch(() => {});
  }, [releaseUrl]);

  return (
    <a
      href={REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center overflow-hidden rounded-lg border border-border bg-card no-underline shadow-sm transition-colors hover:border-border/70 ${className}`}
      aria-label="Star OpsKat on GitHub"
    >
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5">
        <GithubMark className="size-[13px] text-foreground" />
        <span className="text-[12.5px] font-semibold leading-none text-foreground">
          <Translate id="star.label">Star</Translate>
        </span>
      </span>
      <span className="inline-flex items-center gap-1 border-l border-border bg-secondary px-2.5 py-1.5">
        <Star className="size-3 text-muted-foreground" />
        <span className="text-[12.5px] font-semibold tabular-nums leading-none text-foreground">
          {stars == null ? "0" : formatStars(stars)}
        </span>
      </span>
    </a>
  );
}
