import { Code2, Blocks, Wallet, Rocket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutSection() {
  const skills = [
    {
      icon: Code2,
      title: 'Smart Contracts',
      description: 'Expert in Solidity and secure smart contract development',
    },
    {
      icon: Blocks,
      title: 'Blockchain Architecture',
      description: 'Designing scalable and efficient blockchain solutions',
    },
    {
      icon: Wallet,
      title: 'DeFi & Web3',
      description: 'Building decentralized finance applications and Web3 integrations',
    },
    {
      icon: Rocket,
      title: '3D Experiences',
      description: 'Creating immersive 3D web experiences with Three.js',
    },
  ];

  const technologies = [
    'Solidity',
    'Ethereum',
    'Web3.js',
    'Hardhat',
    'React',
    'Three.js',
    'TypeScript',
    'Node.js',
    'IPFS',
    'Smart Contracts',
    'DeFi',
    'NFTs',
  ];

  return (
    <section id="about" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient-cyber">About</span>{' '}
            <span className="text-gradient-gold">Me</span>
          </h2>
        </div>

        {/* --- Main Two-Column Layout --- */}
        <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-12">
          {/* LEFT COLUMN — 3D Model + Technologies */}
          <div className="flex-1 flex flex-col items-center lg:items-start gap-8 sm:gap-12 w-full">
            {/* Profile Photo */}
            <div className="w-full max-w-md lg:max-w-xl aspect-square lg:aspect-[4/3] rounded-xl overflow-hidden shadow-lg animate-fade-in lg:translate-x-0 xl:translate-x-20">
              <img
                src="source/assets/pro2.png"
                alt="Profile"
                className="w-1500px h-full object-cover"
              />
            </div>

            {/* Technologies & Tools */}
            <div className="w-full">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gradient-cyber text-center lg:text-left">
                Technologies & Tools
              </h3>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 max-w-4xl">
                {technologies.map((tech, index) => (
                  <span
                    key={tech}
                    className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-muted/50 backdrop-blur border border-primary/30 rounded-full text-xs sm:text-sm md:text-base text-foreground font-medium hover:border-primary hover:bg-primary/10 transition-all animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Text + Skills */}
          <div className="flex-1 flex flex-col justify-center animate-fade-in text-center lg:text-left w-full">
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8">
              A quantitative trader turned blockchain architect, merging Wall Street rigor with
              cyberpunk innovation. From mortgage FinTech systems to DeFi protocols, Python trading
              bots to AI nutrition platforms—building the financial infrastructure of tomorrow.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <Card
                    key={skill.title}
                    className="hologram-panel hover:border-primary/50 transition-all duration-300 hover:border-glow-cyan animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-4 sm:p-6 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full mb-3 sm:mb-4">
                        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground">{skill.title}</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm">{skill.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}