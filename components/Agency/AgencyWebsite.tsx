import { Header } from "./Authority/Header";
import { Hero } from "./Authority/Hero";
import { Trust } from "./Authority/Trust";
import { Features } from "./Authority/Features";
import { ControlPreview } from "./Authority/ControlPreview";
import { SEOSection } from "./Authority/SEOSection";
import { Pricing } from "./Authority/Pricing";
import { Portfolio } from "./Authority/Portfolio";
import Process from "./Authority/Process";
import { Contact } from "./Authority/Contact";
import { Footer } from "./Authority/Footer";
import FloatingCTA from "./Authority/FloatingCTA";

export default function AgencyWebsite() {
    return (
        <main className="min-h-screen bg-[#F7F7F8] text-[#0B0D12] selection:bg-primary/20 selection:text-primary font-sans">
            <Header />
            <Hero />
            <Trust />
            <Portfolio />
            <Process />
            <Features />
            <ControlPreview />
            <SEOSection />
            <Pricing />
            <Contact />
            <Footer />
            <FloatingCTA />
        </main>
    );
}
