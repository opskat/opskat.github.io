import Translate from "@docusaurus/Translate";
import { DownloadButton } from "./DownloadButton";
import { StarButton } from "./StarButton";

export function CTA() {
  return (
    <section
      id="get-started"
      className="relative scroll-mt-16 border-t border-border px-6 py-[100px]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 70% at 50% 40%, oklch(0.67 0.16 260 / 0.07), transparent 70%)",
        }}
      />
      <div className="relative mx-auto flex max-w-[760px] flex-col items-center text-center">
        <h2 className="text-[32px] font-extrabold leading-[1.15] tracking-tight sm:text-[38px]">
          <Translate id="cta.heading">Ready to put ops into one app?</Translate>
        </h2>
        <p className="mt-4 max-w-[560px] text-base leading-relaxed text-muted-foreground">
          <Translate id="cta.sub">
            Download the desktop app or install the opsctl CLI, and start managing your whole infrastructure with one tool.
          </Translate>
        </p>
        <div className="mt-7 flex flex-col items-center gap-3.5 sm:flex-row">
          <DownloadButton />
          <StarButton />
        </div>
      </div>
    </section>
  );
}
