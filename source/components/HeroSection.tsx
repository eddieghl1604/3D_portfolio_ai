import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Scene3D from './Scene3D';
import ScrollingText from './ScrollingText';
import heroBg from '@/assets/hero-bg.jpg';

export default function HeroSection() {
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


      {/* 3D Scene */}
      <div className="absolute inset-0 z-10 opacity-60">
        <Scene3D />
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
                Blockchain Enthusiasts & 3D Developer
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight">
              <span className="text-gradient-neon glow-cyan">FinTech Innovator</span>
              <br />
              <span className="text-gradient-cyber glow-purple">Crypto Visionary</span>
              <br />
              <span className="text-gradient-gold glow-gold">Cyber-Era Builder</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto lg:mx-0 lg:max-w-none">
              Bridging traditional finance with decentralized future. Building next-gen trading systems,
              DeFi protocols, and immersive Web3 experiences at the intersection of Wall Street × Cyberpunk.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8">
              {['₿TC', 'ETH', 'SOL'].map((symbol) => (
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
            />
          </div>
        </div>
      </div>
               {/* Scrolling Text */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-black">
        <ScrollingText text="BLOCKCHAIN • DEFI • NFT • WEB3 • SMART CONTRACTS • CRYPTOCURRENCY • METAVERSE • BLOCKCHAIN • DEFI • NFT • WEB3" />
      </div>
    </section>
  );
}
