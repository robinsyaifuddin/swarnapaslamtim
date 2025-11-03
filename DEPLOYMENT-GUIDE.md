# 🚀 Panduan Deployment Swarnapas

Website Swarnapas sudah dikonfigurasi untuk dideploy ke berbagai platform. Berikut panduan lengkapnya:

---

## 📋 Prasyarat

- Node.js 18+ terinstall
- Akun GitHub (sudah terhubung)
- Akun Netlify atau Vercel (untuk deployment)

---

## 🔧 GitHub Pages

### Cara Deploy:
1. **Pastikan GitHub Actions enabled** di repository settings
2. **Enable GitHub Pages**:
   - Buka Settings → Pages
   - Source: pilih "GitHub Actions"
3. **Push ke branch main** - deployment otomatis berjalan
4. **Akses website** di: `https://robinsyaifuddin.github.io/swarnapaslamtim/`

### File Konfigurasi:
- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `public/404.html` - SPA routing handler
- `index.html` - SPA redirect script

---

## 🌐 Netlify

### Cara Deploy (Opsi 1 - Import dari GitHub):
1. Login ke [Netlify](https://app.netlify.com)
2. Klik **"Add new site"** → **"Import an existing project"**
3. Pilih **GitHub** dan authorize
4. Pilih repository **robinsyaifuddin/swarnapaslamtim**
5. Konfigurasi build settings (sudah otomatis terdeteksi):
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Klik **"Deploy site"**
7. Website akan live dalam beberapa menit!

### Cara Deploy (Opsi 2 - Netlify CLI):
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### File Konfigurasi:
- `netlify.toml` - Netlify configuration
- `public/_redirects` - SPA routing rules

### Custom Domain:
Setelah deploy, bisa setup custom domain di Netlify dashboard.

---

## ▲ Vercel

### Cara Deploy (Opsi 1 - Import dari GitHub):
1. Login ke [Vercel](https://vercel.com)
2. Klik **"Add New"** → **"Project"**
3. Import repository **robinsyaifuddin/swarnapaslamtim**
4. Konfigurasi build settings (sudah otomatis terdeteksi):
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Klik **"Deploy"**
6. Website akan live dalam beberapa menit!

### Cara Deploy (Opsi 2 - Vercel CLI):
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### File Konfigurasi:
- `vercel.json` - Vercel configuration

### Custom Domain:
Setelah deploy, bisa setup custom domain di Vercel dashboard.

---

## 🏗️ Build Lokal

Untuk test build sebelum deploy:

```bash
# Install dependencies
npm install

# Build project
npm run build

# Preview build
npm run preview
```

Build output akan ada di folder `dist/`.

---

## 🔍 Troubleshooting

### GitHub Pages tidak tampil
- Pastikan GitHub Actions workflow berhasil (cek tab Actions)
- Pastikan GitHub Pages source di-set ke "GitHub Actions"
- Clear browser cache dan coba lagi

### Blank page setelah deploy
- Cek browser console untuk error
- Pastikan base path sudah benar (GitHub Pages pakai `/swarnapaslamtim/`)
- Untuk Netlify/Vercel, base path adalah `/`

### Build gagal
```bash
# Clear cache dan reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Routing tidak bekerja
- Pastikan file `404.html`, `_redirects`, dan config files ada
- Untuk GitHub Pages, pastikan script SPA routing di `index.html` aktif

---

## 📊 Monitoring

### GitHub Pages:
- Cek build status di tab **Actions**
- Logs lengkap tersedia untuk setiap deployment

### Netlify:
- Dashboard: https://app.netlify.com
- Real-time logs dan analytics
- Automatic HTTPS dan CDN

### Vercel:
- Dashboard: https://vercel.com/dashboard
- Real-time logs dan analytics
- Edge network global

---

## 🔐 Environment Variables

Jika ada environment variables (seperti Supabase keys), tambahkan di:

### Netlify:
Site settings → Build & deploy → Environment variables

### Vercel:
Project settings → Environment Variables

### GitHub Actions:
Repository → Settings → Secrets and variables → Actions

**PENTING**: Jangan commit sensitive keys ke repository!

---

## ✅ Checklist Deployment

- [x] File 404.html untuk GitHub Pages
- [x] SPA routing script di index.html
- [x] netlify.toml untuk Netlify
- [x] vercel.json untuk Vercel
- [x] _redirects untuk Netlify
- [x] GitHub Actions workflow
- [x] Vite config dengan dynamic base path
- [x] Build test lokal berhasil

---

## 🆘 Support

Jika ada masalah:
1. Cek dokumentasi platform (GitHub Pages/Netlify/Vercel)
2. Cek browser console untuk error messages
3. Review build logs di platform dashboard
4. Pastikan semua dependencies terinstall dengan benar

---

**Selamat Deploy! 🎉**
