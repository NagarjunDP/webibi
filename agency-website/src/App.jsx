import { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SEO from './utils/seo';
import ErrorBoundary from './components/utils/ErrorBoundary';
import LoadingScreen from './components/ui/LoadingScreen';
import CustomCursor from './components/ui/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Refresh ScrollTrigger after layout changes/loading screen removal
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [isLoading]);

  return (
    <HelmetProvider>
      <SEO
        title="Home"
        description="We are a premium web design agency building futuristic websites that dominate search results."
        keywords="web design, SEO, React, agency, digital marketing, cyberpunk, luxury"
      />

      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <ErrorBoundary>
          <ReactLenis root>
            <div className="bg-void min-h-screen text-white selection:bg-electric-blue selection:text-black">
              <CustomCursor />
              <Navbar />

              <main>
                <Hero />
                <Services />
                <Portfolio />
                <Process />
                <Testimonials />
                <Contact />
              </main>

              <Footer />
            </div>
          </ReactLenis>
        </ErrorBoundary>
      )}
    </HelmetProvider>
  );
}

export default App;
