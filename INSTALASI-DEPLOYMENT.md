# 🚀 INSTALASI & DEPLOYMENT GUIDE

## 💻 Instalasi Lokal

### Prerequisites
Pastikan sudah terinstall:
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 atau **yarn** >= 1.22.0
- **Git** (untuk clone repository)
- **Code Editor** (VS Code recommended)

### Step-by-Step Installation

#### 1. Clone Repository
```bash
git clone https://github.com/yourusername/swarnapas.git
cd swarnapas
```

#### 2. Install Dependencies
```bash
npm install
# atau
yarn install
```

Packages yang akan terinstall:
- react (18.3.1)
- react-dom (18.3.1)
- react-router-dom (6.28.0)
- typescript (5.5.3)
- tailwindcss (3.4.1)
- vite (5.4.10)
- shadcn/ui components
- lucide-react
- embla-carousel-react
- sonner
- dan dependencies lainnya

#### 3. Environment Setup (Optional)

Buat file `.env` di root folder:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_key
VITE_MAPS_API_KEY=your_google_maps_key
```

> **Note:** Aplikasi dapat berjalan tanpa env vars karena menggunakan mock data

#### 4. Run Development Server
```bash
npm run dev
# atau
yarn dev
```

Server akan berjalan di: **http://localhost:5173**

#### 5. Build for Production
```bash
npm run build
# atau
yarn build
```

Output folder: `dist/`

#### 6. Preview Production Build
```bash
npm run preview
# atau
yarn preview
```

---

## 📦 Struktur Package.json

```json
{
  "name": "swarnapas",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.28.0",
    "@radix-ui/react-*": "latest",
    "tailwindcss": "^3.4.1",
    "lucide-react": "^0.index",
    "embla-carousel-react": "^8.3.1",
    "sonner": "^1.7.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "typescript": "~5.5.3",
    "vite": "^5.4.10",
    "eslint": "^9.15.0",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49"
  }
}
```

---

## 🌐 Deployment ke Netlify

### Method 1: Deploy via Netlify UI

#### Step 1: Prepare Build
```bash
npm run build
```

#### Step 2: Login ke Netlify
1. Buka https://app.netlify.com
2. Login atau create account
3. Click "Add new site"
4. Choose "Deploy manually"

#### Step 3: Drag & Drop
1. Drag folder `dist/` ke Netlify
2. Wait for deployment
3. Site akan live di random URL

#### Step 4: Custom Domain (Optional)
1. Go to Site settings
2. Domain management
3. Add custom domain
4. Update DNS records

---

### Method 2: Deploy via Git (Recommended)

#### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/swarnapas.git
git push -u origin main
```

#### Step 2: Connect Netlify to GitHub
1. Login ke Netlify
2. Click "Add new site" > "Import an existing project"
3. Choose "GitHub"
4. Authorize Netlify
5. Select repository "swarnapas"

#### Step 3: Configure Build Settings
```
Build command: npm run build
Publish directory: dist
```

#### Step 4: Deploy
1. Click "Deploy site"
2. Netlify akan auto build & deploy
3. Setiap push ke main = auto redeploy

---

### Method 3: Deploy via Netlify CLI

#### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Step 2: Login
```bash
netlify login
```

#### Step 3: Initialize
```bash
netlify init
```

Follow prompts:
- Create & configure new site
- Build command: `npm run build`
- Publish directory: `dist`

#### Step 4: Deploy
```bash
# Deploy to draft URL
netlify deploy

# Deploy to production
netlify deploy --prod
```

---

## 📋 netlify.toml Configuration

Create `netlify.toml` di root folder:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

**Penjelasan:**
- `redirects`: SPA routing untuk React Router
- `headers`: Security headers
- `Cache-Control`: Optimize asset caching

---

## 🔧 Environment Variables di Netlify

### Set via UI:
1. Go to Site settings
2. Build & deploy > Environment
3. Add variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_KEY`
   - `VITE_MAPS_API_KEY`

### Set via CLI:
```bash
netlify env:set VITE_SUPABASE_URL "your_value"
netlify env:set VITE_SUPABASE_KEY "your_value"
```

---

## 🔍 Troubleshooting

### Build Failed

**Error: Memory limit exceeded**
```toml
# netlify.toml
[build.environment]
  NODE_OPTIONS = "--max-old-space-size=4096"
```

**Error: Node version mismatch**
```toml
[build.environment]
  NODE_VERSION = "18.18.0"
```

### Routing Issues (404 on refresh)

**Solution:** Tambah redirects di `netlify.toml`
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Images Not Loading

**Check:**
1. Path images benar (case-sensitive)
2. Images ada di folder `public/`
3. Import correct untuk images di src

### Slow Build Time

**Optimize:**
```bash
# Clear cache
netlify build --clear-cache

# Reduce bundle size
npm run build -- --mode production
```

---

## 📊 Post-Deployment Checklist

### ✅ Functionality
- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Forms submit properly
- [ ] Images display
- [ ] Search & filter functions
- [ ] Admin login works
- [ ] Mobile responsive

### ✅ Performance
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 5s
- [ ] Bundle size optimized

### ✅ SEO
- [ ] Meta tags present
- [ ] Open Graph tags
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Canonical URLs

### ✅ Security
- [ ] HTTPS enabled
- [ ] Security headers set
- [ ] No exposed API keys
- [ ] Input sanitization
- [ ] XSS protection

---

## 🎯 Deployment Best Practices

### 1. Branch Strategy
```
main (production)
  ├── develop (staging)
  └── feature/* (development)
```

### 2. Netlify Deploy Previews
- Every PR = deploy preview
- Test before merging
- Share preview URL

### 3. Rollback Strategy
```bash
# Via CLI
netlify sites:list
netlify rollback
```

### 4. Monitoring
- Enable Netlify Analytics
- Set up error tracking (Sentry)
- Monitor performance (Lighthouse CI)

### 5. Continuous Deployment
```
Git push → GitHub → Netlify Auto Build → Deploy
```

---

## 🚀 Performance Optimization

### 1. Code Splitting
```typescript
// Lazy load routes
const Home = lazy(() => import('./pages/Home'));
const Destinasi = lazy(() => import('./pages/Destinasi'));
```

### 2. Image Optimization
- Use WebP format
- Lazy load images
- Responsive images
- Compress before upload

### 3. Bundle Size
```bash
# Analyze bundle
npm run build -- --mode production
npx vite-bundle-visualizer
```

### 4. Caching Strategy
```javascript
// Service Worker (optional)
// Cache static assets
// Cache API responses
```

---

## 📱 Testing Deployment

### Local Testing
```bash
# Build locally
npm run build

# Test build
npm run preview

# Check at http://localhost:4173
```

### Production Testing
1. **Desktop browsers:**
   - Chrome
   - Firefox
   - Safari
   - Edge

2. **Mobile browsers:**
   - Chrome Mobile
   - Safari iOS
   - Samsung Internet

3. **Screen sizes:**
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1920px

### Tools
- Chrome DevTools
- Lighthouse
- PageSpeed Insights
- GTmetrix
- WebPageTest

---

## 🔄 Update & Maintenance

### Regular Updates
```bash
# Update dependencies
npm update

# Check outdated
npm outdated

# Update specific package
npm update react react-dom
```

### Security Updates
```bash
# Audit
npm audit

# Fix vulnerabilities
npm audit fix
```

### Content Updates
1. Update data files in `src/data/`
2. Commit changes
3. Push to GitHub
4. Auto-deploy via Netlify

---

## 📞 Support & Documentation

### Official Docs
- React: https://react.dev
- Vite: https://vitejs.dev
- Tailwind CSS: https://tailwindcss.com
- shadcn/ui: https://ui.shadcn.com
- Netlify: https://docs.netlify.com

### Community
- GitHub Issues
- Stack Overflow
- Discord communities

