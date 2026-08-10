import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TransformationFilm } from "@/components/sections/TransformationFilm";
import { AudienceSection } from "@/components/sections/AudienceSection";
import { PersonalizationStudio } from "@/components/sections/PersonalizationStudio";
import { ProductReveal } from "@/components/sections/ProductReveal";
import { EmotionalStory } from "@/components/sections/EmotionalStory";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { StyleSelector } from "@/components/sections/StyleSelector";
import { SocialProof } from "@/components/sections/SocialProof";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <TransformationFilm />
        <AudienceSection />
        <PersonalizationStudio />
        <ProductReveal />
        <EmotionalStory />
        <HowItWorks />
        <StyleSelector />
        <SocialProof />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
