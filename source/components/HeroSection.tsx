import { lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ScrollingText from './ScrollingText';
import heroBg from '@/assets/hero-bg.jpg';
import { useMode } from '@/context/ModeContext';
import { getModeContent } from '@/lib/siteContent';
import SafeBoundary from './SafeBoundary';

// Lazy load heavy 3D component
const Scene3D = lazy(() => import('./Scene3D'));

export default function HeroSection() {
  const { mode } = useMode();
  const { hero, scrollingText } = getModeContent(mode);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
        }}
      />


      {/* 3D Scene - Lazy loaded for performance */}
      <div className="absolute inset-0 z-10 opacity-60">
        <SafeBoundary>
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </SafeBoundary>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background z-20" />

      {/* Content */}
      <div className="relative z-30 container mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 items-center animate-fade-in">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1 -mt-4 sm:-mt-0">
            <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 border border-primary/30 rounded-full">
              <span className="text-primary text-xs sm:text-sm font-semibold uppercase tracking-wider">
                {hero.badge}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight">
              {hero.titleLines.map((line, i) => (
                <span key={line.text}>
                  <span className={line.className}>{line.text}</span>
                  {i < hero.titleLines.length - 1 && <br />}
                </span>
              ))}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto lg:mx-0 lg:max-w-none">
              {hero.description}
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8">
              {hero.tags.map((symbol) => (
                <div
                  key={symbol}
                  className="hologram-panel px-4 sm:px-6 py-2 sm:py-3 rounded-lg animate-float"
                >
                  <span className="text-primary font-bold text-sm sm:text-lg">{symbol}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 sm:gap-4">
              <a href="#projects" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground border-glow-cyan group"
                >
                  View Projects
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>

              <a href="#contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-primary/50 hover:bg-primary/10"
                >
                  Get in Touch
                </Button>
              </a>
            </div>
          </div>

          {/* Right Spline 3D Model */}
          <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-full lg:min-h-[500px] order-1 lg:order-2 mt-8 sm:mt-12 lg:mt-0 mb-4 sm:mb-0">
            <iframe
              src='/components/3d_cube.html'
              frameBorder='0'
              width='100%'
              height='100%'
              title="3D Model"
              className="rounded-lg lg:rounded-none"
              style={{ minHeight: '400px' }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
               {/* Scrolling Text */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-black">
        <ScrollingText text={scrollingText} />
      </div>
    </section>
  );
}
