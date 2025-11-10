export interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  videoUrl?: string;
  iframeUrl?: string;
  problem?: string;
  solution?: string;
  outcomes?: {
    bullets: string[];
    metrics?: string[];
  };
  // Enhanced fields for detailed view
  galleryImages?: string[];
  overview?: string;
  objectives?: string[];
  keyFeatures?: string[];
  technicalSpecs?: {
    architecture?: string;
    frontend?: string[];
    backend?: string[];
    database?: string;
    deployment?: string;
  };
  developmentProcess?: string[];
  performanceMetrics?: Array<{ label: string; value: string }>;
  challenges?: Array<{ challenge: string; solution: string }>;
  futureImprovements?: string[];
  relatedProjects?: string[];
  // Status field
  status?: 'completed' | 'in-progress' | 'coming-soon';
}

// Generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Single source of truth for all projects
export const projectsData: Project[] = [
  {
    title: 'Mortgage FinTech SOP System',
    description: 'Enterprise-grade standard operating procedure platform for mortgage workflows, automated compliance tracking, and real-time risk assessment.',
    technologies: ['Python', 'React', 'PostgreSQL', 'AWS'],
    liveUrl: '#',
    githubUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    status: 'in-progress',
  },
  {
    title: 'Crypto Market Analysis Dashboard',
    description: 'Real-time crypto analytics platform with AI-powered sentiment analysis, technical indicators, and automated trading signals.',
    technologies: ['Python', 'TensorFlow', 'WebSocket', 'D3.js'],
    liveUrl: '#',
    githubUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
    status: 'in-progress',
  },
  {
    title: 'Python Trading Bot',
    description: 'High-frequency algorithmic trading system with backtesting engine, risk management, and multi-exchange integration.',
    technologies: ['Python', 'Pandas', 'CCXT', 'Redis'],
    liveUrl: '#',
    githubUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
    status: 'in-progress',
  },
  {
    title: 'AI Nutrition Subscription Platform',
    description: 'AI-driven personalized nutrition planning with machine learning meal recommendations and subscription management.',
    technologies: ['Python', 'FastAPI', 'Next.js', 'Stripe'],
    liveUrl: '#',
    githubUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop',
    status: 'coming-soon',
  },
  {
    title: 'DeFi Yield Optimizer',
    description: 'Automated yield farming protocol with smart contract vaults, multi-chain support, and gas optimization.',
    technologies: ['Solidity', 'Hardhat', 'React', 'Web3.js'],
    liveUrl: '#',
    githubUrl: '#',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1733342554594-102b8e2d0623?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1431',
    status: 'coming-soon',
  },
  {
    title: 'Web3 Portfolio Tracker',
    description: 'Cross-chain portfolio management with NFT valuation, DeFi position tracking, and tax reporting.',
    technologies: ['TypeScript', 'GraphQL', 'The Graph', 'Next.js'],
    liveUrl: '#',
    githubUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=600&fit=crop',
    status: 'coming-soon',
  },
];

// Helper function to get project by slug
export const getProjectBySlug = (slug: string): Project | undefined => {
  return projectsData.find((project) => generateSlug(project.title) === slug);
};

// Get all project slugs for routing
export const getAllProjectSlugs = (): string[] => {
  return projectsData.map((project) => generateSlug(project.title));
};


