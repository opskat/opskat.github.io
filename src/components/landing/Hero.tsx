import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import { Button } from "@/components/ui/button";
import { DownloadButton } from "./DownloadButton";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center px-6 pt-[120px] pb-20 text-center">
      {/* Soft top glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-[60px] h-[360px] w-[640px] -translate-x-1/2 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.67 0.16 260 / 0.18), transparent 65%)",
          filter: "blur(20px)",
        }}
      />

      {/* Badge */}
      <div className="relative z-10 mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-[13px] text-muted-foreground">
        <span className="inline-block size-2 rounded-full bg-success animate-pulse" />
        <Translate id="hero.badge">Open Source · Cross-platform · macOS / Linux / Windows</Translate>
      </div>

      {/* Headline */}
      <h1 className="relative z-10 mb-6 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-[58px]">
        <span className="text-primary">
          <Translate id="hero.h1.accent">All-in-one </Translate>
        </span>
        <span className="text-foreground">
          <Translate id="hero.h1.rest">server ops workstation</Translate>
        </span>
      </h1>

      {/* Subhead */}
      <p className="relative z-10 mb-8 max-w-[680px] text-[18px] leading-[1.6] text-muted-foreground">
        <Translate id="hero.sub">
          SSH and local terminals, MySQL / PostgreSQL / MongoDB databases, Redis / etcd / Kafka middleware, Kubernetes clusters — everything ops touches, unified in one cross-platform desktop app. And when you want it, AI executes for you in natural language, with policy and audit on every step.
        </Translate>
      </p>

      {/* CTAs */}
      <div className="relative z-20 mb-4 flex flex-col items-center gap-3.5 sm:flex-row">
        <DownloadButton />
        <Button variant="outline" size="lg" className="h-[46px] px-6 text-[15px]" asChild>
          <Link to="/docs/getting-started/quick-start" className="no-underline">
            <Translate id="hero.cta.docs">Read the Docs</Translate>
          </Link>
        </Button>
      </div>

      {/* Workspace visual */}
      <div className="relative z-10 mt-14 w-full max-w-[1180px]">
        <HeroVisual />
      </div>
    </section>
  );
}
