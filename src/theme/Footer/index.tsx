import React from "react";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";

type FooterLink = {
  label: string;
  labelId?: string;
  to?: string;
  href?: string;
};

const columns: { titleId: string; title: string; links: FooterLink[] }[] = [
  {
    titleId: "footer.col.product",
    title: "Product",
    links: [
      { labelId: "footer.features", label: "Features", to: "/#features" },
      { labelId: "footer.resources", label: "Resources", to: "/#resources" },
      { labelId: "footer.changelog", label: "Changelog", to: "/docs/changelog" },
      { labelId: "footer.download", label: "Download", to: "/#get-started" },
    ],
  },
  {
    titleId: "footer.col.docs",
    title: "Docs",
    links: [
      { labelId: "footer.quickstart", label: "Quick Start", to: "/docs/getting-started/quick-start" },
      { labelId: "footer.install", label: "Installation", to: "/docs/getting-started/installation" },
      { labelId: "footer.guide", label: "Guide", to: "/docs/guide/asset-management" },
      { labelId: "footer.cli", label: "opsctl CLI", to: "/docs/cli/overview" },
    ],
  },
  {
    titleId: "footer.col.community",
    title: "Community",
    links: [
      { label: "GitHub", href: "https://github.com/opskat/opskat" },
      { labelId: "footer.issues", label: "Issues", href: "https://github.com/opskat/opskat/issues" },
      { labelId: "footer.contributing", label: "Contributing", to: "/docs/development/contributing" },
      { labelId: "footer.releases", label: "Releases", href: "https://github.com/opskat/opskat/releases" },
    ],
  },
];

const LINK_CLASS =
  "text-[13.5px] text-muted-foreground no-underline transition-colors hover:text-foreground";

function Footer(): React.ReactElement {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-[1248px] px-6 py-12">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          {/* Brand */}
          <div className="flex max-w-[320px] flex-col items-start gap-3.5">
            <Link to="/" className="flex items-center gap-2 no-underline">
              <img src="/img/logo.png" alt="OpsKat" width={28} height={28} className="rounded-lg" />
              <span className="text-base font-bold tracking-tight text-foreground">OpsKat</span>
            </Link>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              <Translate id="footer.tagline">
                The all-in-one server ops workstation. SSH, databases, middleware and cloud-native — managed in one place. Open source · cross-platform.
              </Translate>
            </p>
          </div>

          {/* Link columns */}
          <div className="flex flex-wrap gap-x-16 gap-y-8">
            {columns.map((col) => (
              <div key={col.titleId} className="flex flex-col items-start gap-3">
                <span className="text-[13px] font-bold text-foreground">
                  <Translate id={col.titleId}>{col.title}</Translate>
                </span>
                {col.links.map((link, i) => {
                  const content = link.labelId ? (
                    <Translate id={link.labelId}>{link.label}</Translate>
                  ) : (
                    link.label
                  );
                  return link.href ? (
                    <Link key={i} href={link.href} className={LINK_CLASS}>
                      {content}
                    </Link>
                  ) : (
                    <Link key={i} to={link.to!} className={LINK_CLASS}>
                      {content}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Whisker divider */}
        <div className="mt-9 flex items-center gap-3.5">
          <div className="h-px flex-1 bg-border" />
          <img src="/img/logo.png" alt="" width={20} height={20} className="rounded-md opacity-80" />
          <div className="h-px flex-1 bg-border" />
        </div>

        <p className="mt-7 text-center text-[12.5px] text-muted-foreground/70">
          <Translate id="footer.copyright">© 2026 OpsKat · GPL-3.0 License · Made with terminal & cats 🐾</Translate>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
