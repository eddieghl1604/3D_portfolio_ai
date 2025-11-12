# 🚀 Deployment Checklist

This checklist ensures your portfolio website is ready for deployment.

## ✅ Pre-Deployment Checklist

### 1. Environment Variables

- [ ] **Create `.env` file** from `.env.example`
- [ ] **EmailJS Configuration** (Required for contact form):
  - [ ] `VITE_EMAILJS_PUBLIC_KEY` - Set from EmailJS dashboard
  - [ ] `VITE_EMAILJS_SERVICE_ID` - Set from EmailJS dashboard
  - [ ] `VITE_EMAILJS_TEMPLATE_ID` - Set from EmailJS dashboard
  - [ ] `VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID` - Optional, for auto-reply emails
  - [ ] `VITE_YOUR_EMAIL` - Optional, defaults to eddieghl1604@gmail.com

- [ ] **Sentry Configuration** (Optional but recommended):
  - [ ] `VITE_SENTRY_DSN` - Set your Sentry DSN (already provided in .env.example)

- [ ] **Google Analytics** (Optional):
  - [ ] `VITE_GA_ID` - Set your Google Analytics Measurement ID

### 2. Build Configuration

- [ ] **Verify `package.json`** has correct build scripts:
  - [x] `npm run build` - Production build
  - [x] `npm run preview` - Preview production build locally

- [ ] **Verify `vite.config.ts`** is properly configured:
  - [x] Path aliases (`@/*` pointing to `./source/*`)
  - [x] React plugin configured
  - [x] Build output directory (default: `dist/`)

### 3. Security & Privacy

- [ ] **Verify `.gitignore`** excludes sensitive files:
  - [x] `.env` files are ignored
  - [x] `node_modules/` is ignored
  - [x] `dist/` is ignored

- [ ] **No hardcoded secrets** in source code:
  - [x] All API keys use environment variables
  - [x] No sensitive data in committed files

### 4. Code Quality

- [ ] **Run linting**: `npm run lint`
- [ ] **Test build locally**: `npm run build`
- [ ] **Preview build**: `npm run preview`
- [ ] **Check for console errors** in browser

### 5. Content & Assets

- [ ] **All project images** are accessible (using Unsplash URLs or local assets)
- [ ] **Resume file** path is correct: `/assets/EddieCVGan.pdf`
- [ ] **Favicon** is set: `/favicon/xrypto.ico`
- [ ] **Project status** is correctly set (in-progress/coming-soon/completed)

### 6. SEO & Metadata

- [ ] **Update `index.html`**:
  - [ ] Canonical URL: Update `https://yourportfolio.com` to your actual domain
  - [ ] Open Graph image: Update to your actual image URL
  - [ ] Twitter card: Update to your actual Twitter handle
  - [ ] Meta description is accurate

### 7. Testing

- [ ] **Contact form** works with EmailJS
- [ ] **Navigation** works correctly (all links functional)
- [ ] **Project detail pages** load correctly
- [ ] **Responsive design** works on mobile/tablet/desktop
- [ ] **Loading screen** appears on initial load
- [ ] **Crypto ticker** displays correctly (if visible)
- [ ] **All external links** open in new tabs where appropriate

---

## 📦 Build & Deploy

### Local Build Test

```bash
# Install dependencies (if not already done)
npm install

# Build for production
npm run build

# Preview the build locally
npm run preview
```

### Deployment Platforms

#### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

#### Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set environment variables in Netlify dashboard

#### GitHub Pages
1. Build: `npm run build`
2. Deploy `dist/` folder to `gh-pages` branch
3. Set base path in `vite.config.ts` if needed

---

## 🔍 Post-Deployment Checklist

### 1. Functionality Verification

- [ ] **Homepage** loads correctly
- [ ] **All sections** are accessible (Hero, About, Skills, Projects, Blog, Contact)
- [ ] **Contact form** submits successfully
- [ ] **Project detail pages** load and display correctly
- [ ] **Navigation** works smoothly
- [ ] **Footer links** work correctly

### 2. Performance

- [ ] **Page load time** is acceptable (< 3 seconds)
- [ ] **Images** are optimized and load quickly
- [ ] **No console errors** in browser DevTools
- [ ] **Lighthouse score** is good (90+)

### 3. SEO

- [ ] **Meta tags** are correct
- [ ] **Open Graph** tags work (test with Facebook Debugger)
- [ ] **Twitter Card** works (test with Twitter Card Validator)
- [ ] **Sitemap** is generated (if using a generator)
- [ ] **robots.txt** is configured (if needed)

### 4. Analytics & Monitoring

- [ ] **Sentry** is capturing errors (check Sentry dashboard)
- [ ] **Google Analytics** is tracking (if configured)
- [ ] **Contact form** emails are being received

### 5. Security

- [ ] **HTTPS** is enabled
- [ ] **Environment variables** are not exposed in client-side code
- [ ] **Rate limiting** is working (test contact form spam)

---

## 🐛 Troubleshooting

### Build Fails
- Check for TypeScript errors: `npm run build`
- Verify all dependencies are installed: `npm install`
- Check for missing environment variables

### Contact Form Not Working
- Verify EmailJS environment variables are set
- Check EmailJS dashboard for service/template IDs
- Test EmailJS connection in browser console

### Images Not Loading
- Verify image URLs are accessible
- Check if using absolute URLs (Unsplash) or correct relative paths
- Ensure images are in `public/` or `source/assets/` directories

### Sentry Not Working
- Verify `VITE_SENTRY_DSN` is set correctly
- Check browser console for Sentry initialization messages
- Verify Sentry package is installed: `@sentry/react`

---

## 📝 Environment Variables Reference

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `VITE_EMAILJS_PUBLIC_KEY` | ✅ Yes | EmailJS public key | - |
| `VITE_EMAILJS_SERVICE_ID` | ✅ Yes | EmailJS service ID | - |
| `VITE_EMAILJS_TEMPLATE_ID` | ✅ Yes | EmailJS template ID | - |
| `VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID` | ❌ No | Auto-reply template ID | - |
| `VITE_YOUR_EMAIL` | ❌ No | Your email for auto-reply | eddieghl1604@gmail.com |
| `VITE_SENTRY_DSN` | ❌ No | Sentry DSN for error tracking | - |
| `VITE_GA_ID` | ❌ No | Google Analytics ID | - |

---

## ✅ Quick Deployment Steps

1. **Copy `.env.example` to `.env`** and fill in values
2. **Test build locally**: `npm run build && npm run preview`
3. **Push to GitHub** (ensure `.env` is in `.gitignore`)
4. **Deploy to hosting platform** (Vercel/Netlify/etc.)
5. **Set environment variables** in hosting platform dashboard
6. **Verify deployment** using post-deployment checklist

---

**Last Updated**: 2025-01-XX
**Status**: ✅ Ready for deployment (after setting environment variables)




