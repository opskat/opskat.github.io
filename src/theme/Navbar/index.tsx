import React, { useState, useCallback } from "react";
import Link from "@docusaurus/Link";
import { useColorMode } from "@docusaurus/theme-common";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Translate from "@docusaurus/Translate";
import { useLocation } from "@docusaurus/router";
import { Sun, Moon, Menu, X, Globe, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

function Navbar(): React.ReactElement {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { colorMode, setColorMode } = useColorMode();
  const { i18n } = useDocusaurusContext();
  const location = useLocation();

  const currentLocale = i18n.currentLocale;
  const alternateLocale = currentLocale === "en" ? "zh-CN" : "en";
  const alternateLocaleLabel = currentLocale === "en" ? "中文" : "EN";

  const getAlternateLocalePath = useCallback(() => {
    const pathname = location.pathname;
    if (currentLocale === "en") {
      return `/zh-CN${pathname}`;
    }
    return pathname.replace(/^\/zh-CN/, "") || "/";
  }, [currentLocale, location.pathname]);

  const toggleColorMode = useCallback(() => {
    setColorMode(colorMode === "dark" ? "light" : "dark");
  }, [colorMode, setColorMode]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const navLinks = [
    {
      to: "/docs/getting-started/installation",
      label: <Translate id="navbar.docs">Docs</Translate>,
    },
    {
      to: "/docs/guide/ai-agent",
      label: <Translate id="navbar.guide">Guide</Translate>,
    },
    {
      to: "/docs/cli/overview",
      label: <Translate id="navbar.cli">CLI</Translate>,
    },
  ];

  return (
    <nav className="navbar fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/40 border-b border-border/50 !shadow-none !p-0">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6">
        {/* Left: Logo + Brand */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <img
            src="/img/logo.png"
            alt="OpsKat Logo"
            width={28}
            height={28}
            className="rounded-lg"
          />
          <span className="text-base font-bold text-foreground">OpsKat</span>
        </Link>

        {/* Center: Nav Links (hidden on mobile) */}
        <div className="hidden items-center gap-1 md:flex ml-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground no-underline transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          {/* Language Switcher — use href (not to) to bypass Docusaurus auto locale prefix */}
          <a
            href={getAlternateLocalePath()}
            className="hidden items-center gap-1 rounded-md px-2 py-1.5 text-sm text-muted-foreground no-underline transition-colors hover:bg-accent hover:text-foreground sm:flex"
          >
            <Globe className="size-4" />
            <span>{alternateLocaleLabel}</span>
          </a>

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleColorMode}
            aria-label="Toggle color mode"
          >
            {colorMode === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>

          {/* GitHub Link (hidden on mobile) */}
          <Link
            href="https://github.com/opskat/opskat"
            className="hidden rounded-md px-3 py-1.5 text-sm text-muted-foreground no-underline transition-colors hover:bg-accent hover:text-foreground sm:inline-flex"
          >
            GitHub
          </Link>

          {/* Download Button (hidden on mobile) */}
          <Button size="sm" className="hidden sm:inline-flex" asChild>
            <Link
              to="/docs/getting-started/installation"
              className="no-underline"
            >
              <Download className="size-3.5" />
              <Translate id="navbar.download">Download</Translate>
            </Link>
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="size-4" />
            ) : (
              <Menu className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-1 px-6 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground no-underline transition-colors hover:bg-accent hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile-only: Language Switcher */}
            <a
              href={getAlternateLocalePath()}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground no-underline transition-colors hover:bg-accent hover:text-foreground sm:hidden"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Globe className="size-4" />
              <span>{alternateLocaleLabel}</span>
            </a>

            {/* Mobile-only: GitHub */}
            <Link
              href="https://github.com/opskat/opskat"
              className="rounded-md px-3 py-2 text-sm text-muted-foreground no-underline transition-colors hover:bg-accent hover:text-foreground sm:hidden"
              onClick={() => setMobileMenuOpen(false)}
            >
              GitHub
            </Link>

            {/* Mobile-only: Download */}
            <div className="mt-1 sm:hidden">
              <Button size="sm" className="w-full" asChild>
                <Link
                  to="/docs/getting-started/installation"
                  className="no-underline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Download className="size-3.5" />
                  <Translate id="navbar.download">Download</Translate>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
