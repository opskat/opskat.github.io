import { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Translate from "@docusaurus/Translate";
import { Tag, Calendar, Package, ExternalLink } from "lucide-react";

interface ReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

interface Release {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  html_url: string;
  prerelease: boolean;
  assets: ReleaseAsset[];
}

const REPO = "opskat/opskat";

function formatDate(dateStr: string, locale: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString(locale === "zh-CN" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Split bilingual release body into English and Chinese sections.
 * The body typically contains both languages separated by a duplicate heading
 * (e.g., "## Opskat v1.0.0" appears twice — first English, then Chinese).
 */
function extractLocalizedBody(body: string, locale: string): string {
  if (!body) return "";

  // Find all "## " headings — if the same heading appears twice,
  // the first block is English, the second is Chinese
  const headingPattern = /^## .+$/m;
  const firstMatch = body.match(headingPattern);
  if (!firstMatch) return body;

  const firstHeading = firstMatch[0];
  const firstIdx = body.indexOf(firstHeading);
  const secondIdx = body.indexOf(firstHeading, firstIdx + firstHeading.length);

  if (secondIdx === -1) {
    // Only one language block — return as-is
    return body;
  }

  const englishBlock = body.substring(firstIdx, secondIdx).trim();
  const chineseBlock = body.substring(secondIdx).trim();

  // Remove the top-level heading (## Opskat vX.X.X) from the displayed content
  // since we already show the version in the card header
  const stripTopHeading = (text: string) =>
    text.replace(/^## .+\n+/, "").trim();

  if (locale === "zh-CN") {
    return stripTopHeading(chineseBlock);
  }
  return stripTopHeading(englishBlock);
}

/** Minimal markdown-to-HTML: headings, bold, lists, code, links */
function renderMarkdown(md: string): string {
  return md
    .replace(
      /^### (.+)$/gm,
      '<h4 class="text-base font-semibold mt-4 mb-2">$1</h4>'
    )
    .replace(
      /^## (.+)$/gm,
      '<h3 class="text-lg font-semibold mt-5 mb-2">$1</h3>'
    )
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(
      /`(.+?)`/g,
      '<code class="text-xs px-1 py-0.5 bg-secondary rounded font-mono">$1</code>'
    )
    .replace(
      /\[(.+?)\]\((https?:\/\/.+?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>'
    )
    .replace(
      /^[*-] (.+)$/gm,
      '<li class="ml-4 list-disc text-sm text-muted-foreground leading-relaxed">$1</li>'
    )
    .replace(
      /(<li.*<\/li>\n?)+/g,
      '<ul class="my-2 space-y-1">$&</ul>'
    )
    .replace(/\n{2,}/g, '<div class="h-2"></div>')
    .replace(/\n/g, "<br />");
}

function ReleaseSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border border-border rounded-xl p-6">
          <div className="h-6 bg-muted rounded w-40 mb-3" />
          <div className="h-4 bg-muted rounded w-24 mb-4" />
          <div className="space-y-2">
            <div className="h-3 bg-muted rounded w-full" />
            <div className="h-3 bg-muted rounded w-3/4" />
            <div className="h-3 bg-muted rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Changelog() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale;

  useEffect(() => {
    fetch(`https://api.github.com/repos/${REPO}/releases?per_page=30`, {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((r) => {
        if (!r.ok) throw new Error(`GitHub API: ${r.status}`);
        return r.json();
      })
      .then((data: Release[]) => {
        setReleases(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <Layout
      title={locale === "zh-CN" ? "更新日志" : "Changelog"}
      description={
        locale === "zh-CN"
          ? "OpsKat 版本发布历史和更新内容"
          : "OpsKat release history and changelog"
      }
    >
      <main className="max-w-[800px] mx-auto px-6 pt-28 pb-20">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            <Translate id="changelog.title">Changelog</Translate>
          </h1>
          <p className="text-muted-foreground">
            <Translate id="changelog.subtitle">
              Release history and what changed in each version.
            </Translate>
          </p>
        </div>

        {loading && <ReleaseSkeleton />}

        {error && (
          <div className="border border-border rounded-xl p-6 text-center">
            <p className="text-muted-foreground mb-3">
              <Translate id="changelog.error">
                Failed to load releases.
              </Translate>
            </p>
            <a
              href={`https://github.com/${REPO}/releases`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm inline-flex items-center gap-1"
            >
              <Translate id="changelog.viewOnGithub">
                View on GitHub
              </Translate>
              <ExternalLink className="size-3.5" />
            </a>
          </div>
        )}

        {!loading && !error && releases.length === 0 && (
          <div className="border border-border rounded-xl p-6 text-center text-muted-foreground">
            <Translate id="changelog.noReleases">
              No releases yet.
            </Translate>
          </div>
        )}

        <div className="space-y-6">
          {releases.map((release) => {
            const localizedBody = extractLocalizedBody(
              release.body,
              locale
            );

            return (
              <article
                key={release.id}
                className="border border-border rounded-xl overflow-hidden"
              >
                {/* Header */}
                <div className="px-6 py-4 border-b border-border bg-card">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Tag className="size-4 text-primary" />
                        {release.tag_name}
                      </h2>
                      {release.prerelease && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-warning/15 text-warning border border-warning/20">
                          pre-release
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3.5" />
                        {formatDate(release.published_at, locale)}
                      </span>
                      <a
                        href={release.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                      >
                        GitHub
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Body */}
                {localizedBody && (
                  <div
                    className="px-6 py-4 text-sm text-foreground/90 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: renderMarkdown(localizedBody),
                    }}
                  />
                )}

                {/* Assets */}
                {release.assets.length > 0 && (
                  <div className="px-6 py-3 border-t border-border bg-card/50">
                    <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground font-medium">
                      <Package className="size-3.5" />
                      <Translate id="changelog.downloads">
                        Downloads
                      </Translate>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {release.assets
                        .filter((a) => !a.name.endsWith(".txt"))
                        .map((asset) => (
                          <a
                            key={asset.name}
                            href={asset.browser_download_url}
                            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md bg-secondary hover:bg-accent text-muted-foreground hover:text-foreground transition-colors no-underline"
                          >
                            {asset.name}
                            <span className="text-[10px] opacity-60">
                              {formatSize(asset.size)}
                            </span>
                          </a>
                        ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </main>
    </Layout>
  );
}
