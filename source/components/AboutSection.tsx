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
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-gradient-cyber">Hologram</span>{' '}
            <span className="text-gradient-gold">Profile</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A quantitative trader turned blockchain architect, merging Wall Street rigor with 
            cyberpunk innovation. From mortgage FinTech systems to DeFi protocols, Python trading 
            bots to AI nutrition platforms—building the financial infrastructure of tomorrow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <Card
                key={skill.title}
                className="hologram-panel hover:border-primary/50 transition-all duration-300 hover:border-glow-cyan animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{skill.title}</h3>
                  <p className="text-muted-foreground text-sm">{skill.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <h3 className="text-3xl font-bold mb-8 text-gradient-cyber">
            Technologies & Tools
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {technologies.map((tech, index) => (
              <span
                key={tech}
                className="px-6 py-3 bg-muted/50 backdrop-blur border border-primary/30 rounded-full text-foreground font-medium hover:border-primary hover:bg-primary/10 transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
