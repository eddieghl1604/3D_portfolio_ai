import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import BlogSection from '@/components/BlogSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import ParticleField from '@/components/ParticleField';
import CryptoTicker from '@/components/CryptoTicker';
import SEO from '@/components/SEO';
import BackToTop from '@/components/BackToTop';

const Index = () => {
  const location = useLocation();
  // Skip loading screen if navigating from another route (internal navigation)
  const skipLoading = location.state?.skipLoading === true;
  const [loading, setLoading] = useState(!skipLoading);

  useEffect(() => {
    // If we're skipping loading, handle scroll immediately
    if (skipLoading && !loading) {
      const scrollTo = location.state?.scrollTo;
      const hash = location.hash;
      const targetId = scrollTo || (hash ? hash.substring(1) : null);
      
      if (targetId) {
        // Wait for DOM to be ready, then scroll
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }

    // Prevent scroll during loading
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [loading, skipLoading, location.hash, location.state]);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="relative">
      <SEO />
      <ParticleField />
      <CryptoTicker />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <BlogSection />
      <ContactSection />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
