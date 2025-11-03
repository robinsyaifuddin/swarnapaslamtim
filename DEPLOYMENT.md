# Deployment Guide untuk GitHub Pages

Project ini dikonfigurasi untuk deployment otomatis ke GitHub Pages menggunakan GitHub Actions.

## Konfigurasi

Project sudah dikonfigurasi dengan:
- Base path: `/swarnapas/` (sesuai dengan nama repository)
- GitHub Actions workflow untuk automated deployment
- SPA routing support untuk GitHub Pages
- Production build optimization
- .nojekyll file untuk bypass Jekyll processing

## Cara Deploy

1. **Push ke repository GitHub:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

2. **Aktifkan GitHub Pages:**
   - Buka repository di GitHub
   - Pergi ke Settings > Pages
   - Source: pilih "GitHub Actions"
   - Deployment akan otomatis terjadi setiap push ke branch main

3. **Akses website:**
   Website akan tersedia di: `https://YOUR_USERNAME.github.io/swarnapas/`

## Manual Deployment (Alternatif)

Jika ingin deploy manual, gunakan script yang disediakan:

```bash
chmod +x deploy.sh
./deploy.sh
```

**Note:** Update script dengan username GitHub yang benar di line 17.

## Troubleshooting

### Website menampilkan 404 atau blank page:
1. **Pastikan nama repository sesuai dengan base path di konfigurasi**
   - Repository: `swarnapas` 
   - Base path: `/swarnapas/`
   
2. **Verifikasi GitHub Pages source sudah diset ke "GitHub Actions"**

3. **Check logs GitHub Actions untuk error deployment**

4. **Clear browser cache dan hard refresh (Ctrl+Shift+R)**

5. **Pastikan file .nojekyll ada di deployment**

### Route tidak berfungsi:
- Project menggunakan client-side routing dengan 404.html fallback
- Pastikan .nojekyll file ada di root deployment
- BrowserRouter sudah dikonfigurasi dengan basename yang benar

### Assets tidak ter-load:
- Verifikasi base path configuration di vite.config.ts dan App.tsx
- Assets menggunakan relative path untuk kompatibilitas
- Script src di index.html menggunakan relative path

## File Penting

- `vite.config.ts`: Konfigurasi build dan base path
- `src/App.tsx`: Router configuration dengan basename
- `.github/workflows/deploy.yml`: GitHub Actions workflow
- `public/404.html`: SPA routing fallback
- `public/.nojekyll`: Bypass Jekyll processing
- `index.html`: Relative path untuk assets
- `deploy.sh`: Manual deployment script

## Langkah Debug

Jika masih blank page:
1. Buka Developer Tools > Console untuk cek error
2. Buka Network tab untuk cek failed requests
3. Verifikasi semua file ter-load dengan path yang benar
4. Test di private/incognito window untuk menghindari cache issue

## Perbaikan yang Sudah Dilakukan

- ✅ Base path configuration (`/swarnapas/`)
- ✅ Router basename configuration
- ✅ Relative path untuk script di index.html
- ✅ .nojekyll file untuk bypass Jekyll
- ✅ GitHub Actions workflow dengan proper build
- ✅ SPA routing dengan 404.html fallback

Setelah push perubahan ini, website seharusnya sudah bisa tampil dengan benar.