import Layout from "@theme/Layout";
import { translate } from "@docusaurus/Translate";
import { Hero } from "@/components/landing/Hero";
import { ValueBand } from "@/components/landing/ValueBand";
import { ResourcePanorama } from "@/components/landing/ResourcePanorama";
import { Features } from "@/components/landing/Features";
import { Showcase } from "@/components/landing/Showcase";
import { Automation } from "@/components/landing/Automation";
import { CTA } from "@/components/landing/CTA";

export default function Home() {
  return (
    <Layout
      title={translate({
        id: "homepage.title",
        message: "All-in-one Server Ops Workstation",
      })}
      description={translate({
        id: "homepage.description",
        message:
          "One cross-platform desktop app for SSH, databases, Redis, Kafka and Kubernetes — with policy, audit and an optional AI assistant.",
      })}
    >
      <main className="landing-page relative overflow-hidden">
        <div className="relative z-10">
          <Hero />
          <ValueBand />
          <ResourcePanorama />
          <Features />
          <Showcase />
          <Automation />
          <CTA />
        </div>
      </main>
    </Layout>
  );
}
