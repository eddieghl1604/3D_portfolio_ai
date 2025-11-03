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
      <div className="relative z-30 container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Blockchain Developer & 3D Specialist
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <span className="text-gradient-neon glow-cyan">FinTech Innovator</span>
            <br />
            <span className="text-gradient-cyber glow-purple">Crypto Visionary</span>
            <br />
            <span className="text-gradient-gold glow-gold">Cyber-Era Builder</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Bridging traditional finance with decentralized future. Building next-gen trading systems, 
            DeFi protocols, and immersive Web3 experiences at the intersection of Wall Street × Cyberpunk.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['₿TC', 'ETH', 'SOL'].map((symbol) => (
              <div
                key={symbol}
                className="hologram-panel px-6 py-3 rounded-lg animate-float"
              >
                <span className="text-primary font-bold text-lg">{symbol}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground border-glow-cyan group"
            >
              View Projects
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary/50 hover:bg-primary/10"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>

      {/* Scrolling Text */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <ScrollingText text="BLOCKCHAIN • DEFI • NFT • WEB3 • SMART CONTRACTS • CRYPTOCURRENCY • METAVERSE • BLOCKCHAIN • DEFI • NFT • WEB3" />
      </div>
    </section>
  );
}
