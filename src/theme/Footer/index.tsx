import React from "react";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";

function Footer(): React.ReactElement {
  return (
    <footer className="relative border-t border-border">
      {/* Gradient top border line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, oklch(0.67 0.16 260 / 0.2), transparent)",
        }}
      />
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        {/* Left: Copyright */}
        <p className="text-xs text-muted-foreground">
          OpsKat &copy; 2025-2026
        </p>

        {/* Right: Links */}
        <div className="flex items-center gap-x-6">
          <Link
            to="/docs/getting-started/installation"
            className="text-xs text-muted-foreground no-underline transition-colors hover:text-foreground"
          >
            <Translate id="footer.documentation">Documentation</Translate>
          </Link>
          <Link
            href="https://github.com/opskat/opskat"
            className="text-xs text-muted-foreground no-underline transition-colors hover:text-foreground"
          >
            GitHub
          </Link>
          <Link
            to="/changelog"
            className="text-xs text-muted-foreground no-underline transition-colors hover:text-foreground"
          >
            <Translate id="footer.releaseNotes">Changelog</Translate>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
