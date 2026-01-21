import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/sections/hero";
import { ValueProposition } from "@/components/sections/value-proposition";
import { ProcessSteps } from "@/components/sections/process";
import { ComparisonTable } from "@/components/sections/comparison";
import { CTABanner } from "@/components/sections/cta-banner";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <ValueProposition />
      <ProcessSteps />
      <ComparisonTable />
      <CTABanner />
    </main>
  );
}
