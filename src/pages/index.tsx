import Layout from "@theme/Layout";
import { translate } from "@docusaurus/Translate";
import { Hero } from "@/components/landing/Hero";
import { TerminalDemo } from "@/components/landing/TerminalDemo";
import { Features } from "@/components/landing/Features";
import { AppPreview } from "@/components/landing/AppPreview";
import { CLISection } from "@/components/landing/CLISection";
import { CTA } from "@/components/landing/CTA";

export default function Home() {
  return (
    <Layout
      title={translate({
        id: "homepage.title",
        message: "AI-First Infrastructure Management",
      })}
      description={translate({
        id: "homepage.description",
        message:
          "AI-first desktop application for managing remote infrastructure with natural language.",
      })}
    >
      <main className="landing-page relative overflow-hidden">
        {/* Tech grid lines overlay — fades out toward bottom */}
        <div className="landing-grid pointer-events-none absolute inset-0 z-0" />

        {/* Ambient glow layer */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {/* Hero aurora — top center, large diffuse glow */}
          <div
            className="absolute -top-[200px] left-1/2 h-[900px] w-[1200px] -translate-x-1/2 opacity-70"
            style={{
              background:
                "conic-gradient(from 200deg at 50% 50%, oklch(0.55 0.18 260 / 0.18), oklch(0.5 0.15 280 / 0.12) 25%, transparent 40%, transparent 60%, oklch(0.6 0.12 240 / 0.08) 80%, oklch(0.55 0.18 260 / 0.18))",
              filter: "blur(80px)",
            }}
          />
          {/* Mid-page left accent — teal/green */}
          <div
            className="absolute top-[900px] -left-[200px] h-[700px] w-[700px] rounded-full"
            style={{
              background: "radial-gradient(ellipse, oklch(0.6 0.15 175 / 0.08) 0%, transparent 65%)",
              filter: "blur(40px)",
            }}
          />
          {/* Mid-page right accent — violet */}
          <div
            className="absolute top-[1600px] -right-[200px] h-[700px] w-[700px] rounded-full"
            style={{
              background: "radial-gradient(ellipse, oklch(0.55 0.18 290 / 0.08) 0%, transparent 65%)",
              filter: "blur(40px)",
            }}
          />
          {/* Bottom glow */}
          <div
            className="absolute top-[2400px] left-1/4 h-[600px] w-[800px] rounded-full"
            style={{
              background: "radial-gradient(ellipse, oklch(0.55 0.15 260 / 0.06) 0%, transparent 65%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        <div className="relative z-10">
          <Hero />
          <TerminalDemo />
          <Features />
          <AppPreview />
          <CLISection />
          <CTA />
        </div>
      </main>
    </Layout>
  );
}
