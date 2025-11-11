# Portfolio Website - Eddie Gan

A modern, responsive portfolio website showcasing blockchain development expertise, 3D web experiences, and innovative projects. Built with React, TypeScript, and cutting-edge web technologies.

## 🌟 Features

### Core Sections
- **Hero Section** - Eye-catching introduction with 3D interactive elements
- **About Section** - Personal introduction with profile image and technologies
- **Skills Section** - Comprehensive display of technical skills and expertise
- **Projects Section** - Showcase of portfolio projects with detailed views
- **Blog Section** - Blog posts and articles
- **Contact Section** - Contact form with EmailJS integration and 3D coin animation

### Interactive Features
- 🎨 **3D Elements** - Interactive 3D cube and coin animations using HTML/Three.js
- 🌐 **Multi-language Support** - i18n support for English, Chinese, Spanish, French, and German
- 🎭 **Particle Field** - Animated particle background effects
- 📊 **Crypto Ticker** - Real-time cryptocurrency price ticker
- 🌓 **Dark Mode** - Theme switching with smooth transitions
- 📱 **Fully Responsive** - Mobile-first design optimized for all devices
- ⚡ **Loading Screen** - Smooth loading animation on initial page load
- 🔝 **Back to Top** - Smooth scroll to top button
- 🎯 **Smooth Scrolling** - Enhanced navigation with smooth scroll behavior

### Technical Features
- **SEO Optimized** - Meta tags, Open Graph, and Twitter Card support
- **Error Tracking** - Sentry integration for error monitoring
- **Form Validation** - React Hook Form with Zod validation
- **Rate Limiting** - Contact form rate limiting to prevent spam
- **Image Lightbox** - Gallery view for project images
- **Project Detail Pages** - Dedicated pages for each project

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.3** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite 7.2** - Build tool and dev server
- **React Router DOM 6.30** - Client-side routing

### UI & Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Radix UI** - Accessible component primitives
- **Framer Motion 11.18** - Animation library
- **Lucide React** - Icon library

### 3D & Graphics
- **Three.js 0.160** - 3D graphics library
- **@react-three/fiber 8.18** - React renderer for Three.js
- **@react-three/drei 9.122** - Useful helpers for react-three-fiber
- **@splinetool/react-spline 4.1** - Spline 3D integration

### Forms & Validation
- **React Hook Form 7.61** - Form state management
- **Zod 3.25** - Schema validation
- **@hookform/resolvers 3.10** - Validation resolvers

### Additional Libraries
- **@tanstack/react-query 5.83** - Data fetching and caching
- **@emailjs/browser 4.4** - Email service integration
- **@sentry/react 10.23** - Error tracking and monitoring
- **next-themes 0.3** - Theme management
- **date-fns 3.6** - Date utility library
- **react-markdown 10.1** - Markdown rendering

## 📁 Project Structure

```
Portfolio/
├── public/                 # Static assets (copied as-is to dist/)
│   ├── assets/            # Images and media files
│   │   ├── xrypto.png
│   │   └── pro2.png
│   ├── components/        # HTML components (3D models)
│   │   ├── 3d_cube.html
│   │   └── 3d_coin.html
│   └── favicon/           # Favicon files
│       └── xrypto.ico
│
├── source/                # Source code
│   ├── components/        # React components
│   │   ├── AboutSection.tsx
│   │   ├── BackToTop.tsx
│   │   ├── BlogSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── CryptoTicker.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── Navigation.tsx
│   │   ├── ParticleField.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── SEO.tsx
│   │   ├── SkillsSection.tsx
│   │   └── ui/            # shadcn/ui components
│   │
│   ├── hooks/             # Custom React hooks
│   │   ├── useActiveSection.ts
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   │
│   ├── lib/               # Utility libraries
│   │   ├── analytics.ts
│   │   ├── cryptoOptimization.ts
│   │   ├── i18n.ts        # Internationalization
│   │   ├── projectsData.ts
│   │   ├── rateLimiter.ts
│   │   ├── retryLogic.ts
│   │   ├── sanitization.ts
│   │   ├── sentry.ts
│   │   └── utils.ts
│   │
│   ├── pages/             # Page components
│   │   ├── Index.tsx
│   │   ├── NotFound.tsx
│   │   └── ProjectDetail.tsx
│   │
│   └── server/            # Entry point and app setup
│       ├── App.tsx
│       ├── main.tsx
│       ├── App.css
│       └── index.css
│
├── dist/                  # Build output (generated)
│
├── index.html             # HTML entry point
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **Git** (for cloning the repository)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables** (optional)
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SENTRY_DSN=your_sentry_dsn_here
   VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   ```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:8080`

### Building for Production

Build the project for production:

```bash
npm run build
# or
yarn build
```

The build output will be in the `dist/` directory.

Preview the production build:

```bash
npm run preview
# or
yarn preview
```

### Linting

Run ESLint to check for code issues:

```bash
npm run lint
# or
yarn lint
```

## 🌐 Deployment

### Vercel Deployment

This project is configured for easy deployment on Vercel:

1. **Push to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Vercel will auto-detect Vite settings

3. **Configure Build Settings** (if needed)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Environment Variables**
   - Add your environment variables in Vercel dashboard
   - Settings → Environment Variables

5. **Deploy**
   - Click "Deploy" and wait for the build to complete
   - Your site will be live at `your-project.vercel.app`

### Important Notes for Deployment

- **Static Assets**: All files in the `public/` directory are copied to the root of `dist/` during build
- **Path References**: Use absolute paths starting with `/` for public assets (e.g., `/assets/image.png`)
- **3D HTML Files**: Place HTML files in `public/components/` and reference as `/components/file.html`

## 📝 Configuration

### Vite Configuration

The project uses Vite with the following key settings:

- **Port**: 8080
- **Host**: `::` (all interfaces)
- **Path Alias**: `@` → `./source`
- **Plugins**: React SWC, Component Tagger (dev only)

### Tailwind Configuration

- **Dark Mode**: Class-based
- **Content**: All files in `source/**/*.{ts,tsx}`
- **Custom Animations**: float, glow-pulse, slide-left, fade-in, pulse-glow
- **Custom Colors**: Primary, secondary, accent, and more with CSS variables

### TypeScript Configuration

- **Strict Mode**: Disabled for flexibility
- **Path Aliases**: `@/*` → `./source/*`
- **Module Resolution**: Node

## 🎨 Customization

### Adding Projects

Edit `source/lib/projectsData.ts` to add or modify projects:

```typescript
{
  title: 'Your Project Title',
  description: 'Project description',
  technologies: ['React', 'TypeScript'],
  liveUrl: 'https://your-project.com',
  githubUrl: 'https://github.com/your-username/project',
  imageUrl: '/assets/project-image.jpg',
  status: 'completed' // or 'in-progress' or 'coming-soon'
}
```

### Adding Languages

Edit `source/lib/i18n.ts` to add new language support:

1. Add language code to `Language` type
2. Add translations object to `translations` record
3. Update language switcher component if needed

### Styling

- **Colors**: Modify CSS variables in `source/server/index.css`
- **Components**: Edit component files in `source/components/`
- **Animations**: Add custom animations in `tailwind.config.ts`

## 🔧 Troubleshooting

### Common Issues

1. **404 Errors for Static Assets**
   - Ensure files are in the `public/` directory
   - Use absolute paths starting with `/` (e.g., `/assets/image.png`)

2. **Build Errors**
   - Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
   - Clear Vite cache: `rm -rf node_modules/.vite`

3. **TypeScript Errors**
   - Check `tsconfig.json` settings
   - Ensure all dependencies are installed

4. **Sentry Warning**
   - Add `VITE_SENTRY_DSN` to your `.env` file or Vercel environment variables

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Three.js Documentation](https://threejs.org)
- [Vercel Deployment Guide](https://vercel.com/docs)

## 📄 License

This project is private and proprietary.

## 👤 Author

**Eddie Gan**
- Blockchain Developer & 3D Specialist
- Portfolio: [Your Portfolio URL]
- Email: [Your Email]

---

Built with ❤️ using React, TypeScript, and modern web technologies.
