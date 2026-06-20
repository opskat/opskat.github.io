import React, { useState, useCallback } from "react";
import Link from "@docusaurus/Link";
import { useColorMode } from "@docusaurus/theme-common";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Translate from "@docusaurus/Translate";
import { useLocation } from "@docusaurus/router";
import { Sun, Moon, Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StarButton } from "@/components/landing/StarButton";

function Navbar(): React.ReactElement {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { colorMode, setColorMode } = useColorMode();
  const { i18n } = useDocusaurusContext();
  const location = useLocation();

  const currentLocale = i18n.currentLocale;
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

  const navLinks: { to?: string; href?: string; label: React.ReactNode }[] = [
    { to: "/#features", label: <Translate id="navbar.features">Features</Translate> },
    { to: "/#resources", label: <Translate id="navbar.resources">Resources</Translate> },
    { to: "/docs/getting-started/quick-start", label: <Translate id="navbar.docs">Docs</Translate> },
    { to: "/docs/changelog", label: <Translate id="navbar.changelog">Changelog</Translate> },
  ];

  return (
    <nav className="navbar fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/60 !shadow-none !p-0">
      <div className="flex h-14 w-full items-center justify-between px-6 lg:px-10">
        {/* Left: Logo + Brand */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <img
            src="/img/logo.png"
            alt="OpsKat Logo"
            width={28}
            height={28}
            className="rounded-lg"
          />
          <span className="text-base font-bold text-foreground tracking-tight">
            OpsKat
          </span>
        </Link>

        {/* Right: Links + Actions (right-grouped, per design) */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Nav Links (hidden on mobile) */}
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.to!}
                className="text-sm font-medium text-muted-foreground no-underline transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

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

          {/* Language Switcher */}
          <a
            href={getAlternateLocalePath()}
            className="hidden items-center gap-1 rounded-md px-2 py-1.5 text-sm text-muted-foreground no-underline transition-colors hover:bg-accent hover:text-foreground sm:flex"
          >
            <Globe className="size-4" />
            <span>{alternateLocaleLabel}</span>
          </a>

          {/* GitHub Star Button (hidden on mobile) */}
          <div className="hidden sm:block">
            <StarButton />
          </div>

          {/* Download Button (hidden on mobile) */}
          <Button size="sm" className="hidden h-8 px-4 sm:inline-flex" asChild>
            <Link to="/#get-started" className="no-underline">
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
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex w-full flex-col gap-1 px-6 py-3 lg:px-10">
            {navLinks.map((link, i) =>
              link.href ? (
                <Link
                  key={i}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground no-underline transition-colors hover:bg-accent hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={i}
                  to={link.to!}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground no-underline transition-colors hover:bg-accent hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}

            <a
              href={getAlternateLocalePath()}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground no-underline transition-colors hover:bg-accent hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Globe className="size-4" />
              <span>{alternateLocaleLabel}</span>
            </a>

            <div className="mt-2 flex items-center gap-3">
              <StarButton />
              <Button size="sm" className="flex-1" asChild>
                <Link
                  to="/#get-started"
                  className="no-underline"
                  onClick={() => setMobileMenuOpen(false)}
                >
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
