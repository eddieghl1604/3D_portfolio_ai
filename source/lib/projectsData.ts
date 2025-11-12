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
    title: 'Modern Portfolio Website',
    description: 'A cutting-edge, responsive portfolio website featuring cyberpunk aesthetics, 3D interactive elements, real-time crypto ticker, and seamless user experience with advanced animations and modern UI/UX design.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Three.js', 'Framer Motion', 'EmailJS'],
    liveUrl: '#',
    githubUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
    status: 'completed',
    overview: 'A fully responsive, modern portfolio website showcasing professional work, skills, and projects. Built with cutting-edge web technologies, featuring immersive 3D graphics, smooth animations, and a cyberpunk-inspired design aesthetic. The site includes interactive sections for projects, skills, blog posts, and a functional contact form with email integration.',
    objectives: [
      'Create a visually stunning portfolio that stands out with unique cyberpunk aesthetics',
      'Implement smooth, performant animations and transitions throughout the site',
      'Build responsive design that works seamlessly across all device sizes',
      'Integrate 3D interactive elements using Three.js for enhanced user engagement',
      'Develop a functional contact form with EmailJS integration',
      'Optimize performance with code splitting and lazy loading',
      'Implement SEO best practices for better discoverability',
      'Add error tracking and analytics for monitoring site performance'
    ],
    keyFeatures: [
      'Cyberpunk-inspired UI with neon accents and holographic effects',
      'Interactive 3D elements using React Three Fiber and Spline',
      'Real-time cryptocurrency price ticker integration',
      'Smooth scroll animations and page transitions',
      'Responsive navigation with mobile menu',
      'Project showcase with filtering and detail pages',
      'Skills section with animated progress indicators',
      'Contact form with EmailJS integration and validation',
      'Dark theme with customizable color schemes',
      'SEO optimized with meta tags and structured data',
      'Error tracking with Sentry integration',
      'Performance optimized with lazy loading and code splitting'
    ],
    technicalSpecs: {
      architecture: 'Single Page Application (SPA) built with React and React Router for client-side routing. Component-based architecture with reusable UI components from Shadcn UI library.',
      frontend: [
        'React 18.3',
        'TypeScript',
        'Vite',
        'Tailwind CSS',
        'Framer Motion',
        'React Router DOM',
        'Shadcn UI Components',
        'Lucide React Icons'
      ],
      backend: [
        'EmailJS for contact form handling',
        'Sentry for error tracking',
        'Google Analytics integration'
      ],
      database: 'No database required - static site with external API integrations',
      deployment: 'Deployed on Vercel/Netlify with environment variables for API keys. Build process uses Vite for optimized production bundles.'
    },
    developmentProcess: [
      'Designed wireframes and UI mockups with cyberpunk aesthetic in mind',
      'Set up Vite + React + TypeScript project with Tailwind CSS configuration',
      'Implemented responsive navigation component with mobile menu',
      'Created hero section with animated text effects and 3D background elements',
      'Built project showcase section with filtering capabilities',
      'Developed project detail pages with comprehensive information display',
      'Integrated Three.js and React Three Fiber for 3D interactive elements',
      'Implemented contact form with EmailJS integration and form validation',
      'Added real-time crypto ticker using external API',
      'Optimized performance with lazy loading and code splitting',
      'Implemented SEO best practices with meta tags and structured data',
      'Added error tracking with Sentry and analytics with Google Analytics',
      'Conducted cross-browser testing and responsive design validation',
      'Deployed to production with environment variable configuration'
    ],
    performanceMetrics: [
      { label: 'Lighthouse Performance Score', value: '95+' },
      { label: 'First Contentful Paint', value: '< 1.5s' },
      { label: 'Time to Interactive', value: '< 3s' },
      { label: 'Bundle Size', value: '< 500KB' }
    ],
    challenges: [
      {
        challenge: 'Implementing smooth 3D animations without impacting performance',
        solution: 'Used React Three Fiber for efficient 3D rendering, implemented lazy loading for 3D components, and optimized models for web. Added performance monitoring to ensure smooth 60fps animations.'
      },
      {
        challenge: 'Creating responsive design that works across all device sizes',
        solution: 'Used Tailwind CSS responsive utilities, implemented mobile-first design approach, and tested on multiple devices. Created adaptive layouts that adjust seamlessly from mobile to desktop.'
      },
      {
        challenge: 'Integrating multiple external services (EmailJS, Sentry, Analytics) without bloating the bundle',
        solution: 'Used dynamic imports for non-critical services, implemented code splitting, and loaded analytics scripts asynchronously. Only loaded services when needed to reduce initial bundle size.'
      },
      {
        challenge: 'Ensuring SEO optimization for a single-page application',
        solution: 'Implemented React Router with proper meta tag management, added structured data (JSON-LD), created dynamic Open Graph tags, and ensured proper semantic HTML structure throughout the site.'
      }
    ],
    futureImprovements: [
      'Add blog functionality with markdown support',
      'Implement dark/light theme toggle',
      'Add multi-language support (i18n)',
      'Create admin dashboard for content management',
      'Add project filtering by multiple technologies',
      'Implement search functionality across projects and blog posts',
      'Add more interactive 3D elements and animations',
      'Integrate CMS for easier content updates',
      'Add portfolio analytics dashboard',
      'Implement progressive web app (PWA) features'
    ],
    galleryImages: [
      '/assets/cover.png',
      '/assets/blog.png',
      '/assets/skill.png'
    ],
    outcomes: {
      bullets: [
        'Successfully launched a modern, visually striking portfolio website',
        'Achieved excellent performance scores with Lighthouse',
        'Implemented seamless user experience across all devices',
        'Integrated multiple third-party services without performance degradation',
        'Created reusable component library for future projects',
        'Established strong SEO foundation for better discoverability'
      ],
      metrics: [
        '95+ Lighthouse Performance Score',
        'Fully responsive across all device sizes',
        'Zero critical accessibility issues',
        'Sub-3 second load time on average connection'
      ]
    }
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


