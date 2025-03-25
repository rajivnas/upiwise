import { Hero } from "@/components/ui/landing/hero";
import { InteractivePreview } from "@/components/ui/landing/demo-preview";
import { SecurityBadges } from "@/components/ui/landing/security";
import { OnboardingSteps } from "@/components/ui/landing/steps";
import { FAQ } from "@/components/ui/landing/faq";
import { Testimonials } from "@/components/ui/landing/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <SecurityBadges />
      <InteractivePreview />
      <OnboardingSteps />
      <Testimonials />
      <FAQ />
    </>
  );
}
