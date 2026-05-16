import { Code2, Blocks, Wallet, Rocket, Server, Cloud, Palette, GitBranch, TrendingUp, Code, Bitcoin, LucideIcon } from 'lucide-react';
import type { SiteMode } from '@/context/ModeContext';

export interface HeroContent {
  badge: string;
  titleLines: { text: string; className: string }[];
  description: string;
  tags: string[];
}

export interface AboutSkillCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface AboutContent {
  paragraph: string;
  skillCards: AboutSkillCard[];
  technologies: string[];
}

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  color: string;
  skills: { name: string; level: number }[];
}

export interface SectionHeading {
  subtitle: string;
}

export interface ModeContent {
  hero: HeroContent;
  about: AboutContent;
  skillsSubtitle: string;
  skillCategories: SkillCategory[];
  projectsSubtitle: string;
  scrollingText: string;
  resumeFile: string;
  resumeDownloadName: string;
}

export const siteContent: Record<SiteMode, ModeContent> = {
  web3: {
    hero: {
      badge: 'Blockchain Enthusiast & 3D Developer',
      titleLines: [
        { text: 'FinTech Innovator', className: 'text-gradient-neon glow-cyan' },
        { text: 'Crypto Visionary', className: 'text-gradient-cyber glow-purple' },
        { text: 'Cyber-Era Builder', className: 'text-gradient-gold glow-gold' },
      ],
      description:
        'Bridging traditional finance with a decentralized future. Building next-gen trading systems, DeFi protocols, and immersive Web3 experiences at the intersection of Wall Street × Cyberpunk.',
      tags: ['₿TC', 'ETH', 'SOL'],
    },
    about: {
      paragraph:
        'A quantitative trader turned blockchain architect, merging Wall Street rigor with cyberpunk innovation. From DeFi protocols to Python trading bots and AI platforms—building the financial infrastructure of tomorrow.',
      skillCards: [
        { icon: Code2, title: 'Smart Contracts', description: 'Expert in Solidity and secure smart contract development' },
        { icon: Blocks, title: 'Blockchain Architecture', description: 'Designing scalable and efficient blockchain solutions' },
        { icon: Wallet, title: 'DeFi & Web3', description: 'Building decentralized finance apps and Web3 integrations' },
        { icon: Rocket, title: '3D Experiences', description: 'Creating immersive 3D web experiences with Three.js' },
      ],
      technologies: ['Solidity', 'Ethereum', 'Web3.js', 'Hardhat', 'React', 'Three.js', 'TypeScript', 'Node.js', 'IPFS', 'Smart Contracts', 'DeFi', 'NFTs'],
    },
    skillsSubtitle: 'Multi-Dimensional Expertise Matrix',
    skillCategories: [
      {
        title: 'Finance & Trading',
        icon: TrendingUp,
        color: 'text-gradient-gold',
        skills: [
          { name: 'Quantitative Analysis', level: 95 },
          { name: 'Risk Management', level: 90 },
          { name: 'Market Microstructure', level: 85 },
          { name: 'Portfolio Optimization', level: 88 },
        ],
      },
      {
        title: 'Technology',
        icon: Code,
        color: 'text-gradient-cyber',
        skills: [
          { name: 'Python / TypeScript', level: 92 },
          { name: 'React / Next.js', level: 88 },
          { name: 'Three.js / WebGL', level: 85 },
          { name: 'Node.js / APIs', level: 90 },
        ],
      },
      {
        title: 'Blockchain',
        icon: Bitcoin,
        color: 'text-gradient-neon',
        skills: [
          { name: 'Smart Contracts', level: 87 },
          { name: 'DeFi Protocols', level: 90 },
          { name: 'Web3 Integration', level: 92 },
          { name: 'Tokenomics', level: 85 },
        ],
      },
    ],
    projectsSubtitle: 'Innovative blockchain solutions and immersive digital experiences',
    scrollingText:
      'BLOCKCHAIN • DEFI • NFT • WEB3 • SMART CONTRACTS • CRYPTOCURRENCY • METAVERSE • BLOCKCHAIN • DEFI • NFT • WEB3',
    resumeFile: '/assets/Eddie-resume- web3.pdf',
    resumeDownloadName: 'EddieGan-Web3-Resume.pdf',
  },
  web2: {
    hero: {
      badge: 'Full-Stack Software Engineer',
      titleLines: [
        { text: 'Full-Stack Engineer', className: 'text-gradient-cyber' },
        { text: 'Product Builder', className: 'text-gradient-cyber' },
        { text: 'Problem Solver', className: 'text-gradient-gold' },
      ],
      description:
        'Crafting fast, accessible, and delightful web applications. Turning complex problems into clean, scalable products with modern engineering practices and a strong eye for UX.',
      tags: ['TypeScript', 'React', 'Node.js'],
    },
    about: {
      paragraph:
        'A full-stack software engineer focused on building reliable, user-centered web products. From responsive front-ends to robust APIs and cloud infrastructure—shipping maintainable software that scales with the business.',
      skillCards: [
        { icon: Code2, title: 'Frontend Engineering', description: 'Building responsive, accessible UIs with React & TypeScript' },
        { icon: Server, title: 'Backend & APIs', description: 'Designing scalable REST/GraphQL services and data models' },
        { icon: Cloud, title: 'Cloud & DevOps', description: 'CI/CD pipelines, containerization, and cloud deployments' },
        { icon: Palette, title: 'UI/UX & Performance', description: 'Pixel-perfect interfaces with strong performance budgets' },
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'GraphQL', 'Tailwind CSS', 'AWS', 'Docker', 'Jest', 'CI/CD', 'REST APIs'],
    },
    skillsSubtitle: 'Full-Stack Engineering Toolkit',
    skillCategories: [
      {
        title: 'Frontend',
        icon: Code,
        color: 'text-gradient-cyber',
        skills: [
          { name: 'React / Next.js', level: 93 },
          { name: 'TypeScript', level: 92 },
          { name: 'Tailwind / CSS', level: 90 },
          { name: 'Accessibility (a11y)', level: 85 },
        ],
      },
      {
        title: 'Backend',
        icon: Server,
        color: 'text-gradient-gold',
        skills: [
          { name: 'Node.js / Express', level: 90 },
          { name: 'REST / GraphQL APIs', level: 88 },
          { name: 'PostgreSQL / SQL', level: 86 },
          { name: 'Auth & Security', level: 84 },
        ],
      },
      {
        title: 'Engineering & Cloud',
        icon: GitBranch,
        color: 'text-gradient-cyber',
        skills: [
          { name: 'CI/CD & Git', level: 91 },
          { name: 'Docker / Containers', level: 85 },
          { name: 'AWS / Cloud', level: 83 },
          { name: 'Testing (Jest/Vitest)', level: 87 },
        ],
      },
    ],
    projectsSubtitle: 'Production-grade web applications and engineering solutions',
    scrollingText:
      'REACT • TYPESCRIPT • NODE.JS • NEXT.JS • CLOUD • REST APIs • GRAPHQL • UI/UX • CI/CD • REACT • TYPESCRIPT • NODE.JS',
    resumeFile: '/assets/Eddie-resume- web3.pdf',
    resumeDownloadName: 'EddieGan-Resume.pdf',
  },
};

export function getModeContent(mode: SiteMode): ModeContent {
  return siteContent[mode];
}
