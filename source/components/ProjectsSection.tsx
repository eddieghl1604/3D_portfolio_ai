import ProjectCard from './ProjectCard';

export default function ProjectsSection() {
  const projects = [
    {
      title: 'Mortgage FinTech SOP System',
      description: 'Enterprise-grade standard operating procedure platform for mortgage workflows, automated compliance tracking, and real-time risk assessment.',
      technologies: ['Python', 'React', 'PostgreSQL', 'AWS'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: 'Crypto Market Analysis Dashboard',
      description: 'Real-time crypto analytics platform with AI-powered sentiment analysis, technical indicators, and automated trading signals.',
      technologies: ['Python', 'TensorFlow', 'WebSocket', 'D3.js'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: 'Python Trading Bot',
      description: 'High-frequency algorithmic trading system with backtesting engine, risk management, and multi-exchange integration.',
      technologies: ['Python', 'Pandas', 'CCXT', 'Redis'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: 'AI Nutrition Subscription Platform',
      description: 'AI-driven personalized nutrition planning with machine learning meal recommendations and subscription management.',
      technologies: ['Python', 'FastAPI', 'Next.js', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: 'DeFi Yield Optimizer',
      description: 'Automated yield farming protocol with smart contract vaults, multi-chain support, and gas optimization.',
      technologies: ['Solidity', 'Hardhat', 'React', 'Web3.js'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: 'Web3 Portfolio Tracker',
      description: 'Cross-chain portfolio management with NFT valuation, DeFi position tracking, and tax reporting.',
      technologies: ['TypeScript', 'GraphQL', 'The Graph', 'Next.js'],
      liveUrl: '#',
      githubUrl: '#',
    },
  ];

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-gradient-cyber">Featured</span>{' '}
            <span className="text-gradient-gold">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Innovative blockchain solutions and immersive digital experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
