import Translate from "@docusaurus/Translate";
import { Button } from "@/components/ui/button";
import { DownloadButton } from "./DownloadButton";

export function CTA() {
  return (
    <section className="relative max-w-[1200px] mx-auto border-t border-solid border-border">
      {/* Subtle radial gradient behind CTA for emphasis */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 80% at 50% 50%, oklch(0.67 0.16 260 / 0.06), transparent 70%)",
        }}
      />
      <div className="relative text-center py-20 px-6">
        <h2 className="text-[32px] font-bold tracking-tight mb-3">
          <Translate id="cta.heading">Ready to get started?</Translate>
        </h2>
        <p className="text-[15px] text-muted-foreground mb-7">
          <Translate id="cta.subtitle">
            Download the desktop app or install the CLI to start managing your
            infrastructure with AI.
          </Translate>
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <DownloadButton />
          <Button variant="outline" className="py-3 px-7 text-[15px]" asChild>
            <a
              href="https://github.com/opskat/opskat"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Translate id="cta.github">View on GitHub</Translate>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
