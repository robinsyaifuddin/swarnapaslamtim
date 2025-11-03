# 🌟 SWARNAPAS - Platform Wisata & UMKM Lampung Timur

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF?logo=vite)

## 📖 Daftar Isi

- [Tentang SWARNAPAS](#-tentang-swarnapas)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Struktur Proyek](#-struktur-proyek)
- [Fitur Utama](#-fitur-utama)
- [Halaman Website](#-halaman-website)
- [Dashboard Admin](#-dashboard-admin)
- [Instalasi & Setup](#-instalasi--setup)
- [Deployment](#-deployment)
- [Data Management](#-data-management)
- [Alur Kerja Sistem](#-alur-kerja-sistem)
- [API & Integrasi](#-api--integrasi)
- [Kontribusi](#-kontribusi)

---

## 🎯 Tentang SWARNAPAS

**SWARNAPAS** (Sistem Wisata Arung Nasional Pariwisata Setempat) adalah platform digital terpadu yang dirancang khusus untuk mempromosikan dan mengelola sektor pariwisata dan UMKM di **Kabupaten Lampung Timur**.

### Visi
Menjadi platform digital terdepan dalam mendukung pengembangan pariwisata dan pemberdayaan UMKM lokal Lampung Timur.

### Misi
1. Menyediakan informasi wisata Lampung Timur yang lengkap dan akurat
2. Memfasilitasi promosi UMKM lokal secara digital
3. Meningkatkan kunjungan wisatawan ke Lampung Timur
4. Memberdayakan pelaku UMKM melalui platform digital
5. Menyediakan sistem manajemen konten yang mudah digunakan

### Target Pengguna
- 👥 **Wisatawan**: Mencari destinasi wisata dan paket tour
- 🏪 **Pelaku UMKM**: Mempromosikan produk lokal
- 🏛️ **Pemerintah Daerah**: Mengelola konten dan informasi
- 📱 **Masyarakat Umum**: Mendapatkan informasi Lampung Timur

---

## 🛠️ Teknologi yang Digunakan

### Frontend Framework
- **React 18.3.1** - Library UI modern dengan hooks
- **TypeScript 5.5.3** - Type-safe JavaScript
- **Vite 5.4.10** - Build tool yang sangat cepat
- **React Router DOM 6.28.0** - Routing SPA

### UI/UX
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
  - Button, Card, Input, Dialog, Tabs, Badge, Toast, dll
- **Lucide React** - Icon library modern (1000+ icons)
- **Embla Carousel** - Carousel component yang smooth
- **Sonner** - Toast notifications yang elegan

### State Management & Utilities
- **React Hooks** - useState, useEffect, useContext
- **Custom Hooks** - useIsMobile, useToast
- **React Hook Form** - Form management & validation
- **Class Variance Authority** - Dynamic variant styling

### Development Tools
- **ESLint** - Code linting
- **PostCSS & Autoprefixer** - CSS processing
- **TypeScript Path Aliases** - @/ untuk clean imports

### Deployment & Hosting
- **Netlify** - Hosting platform (production-ready)
- **Git** - Version control

---

## 📁 Struktur Proyek

```
Swarnapas/
├── public/                  # Static assets
│   ├── images/
│   └── favicon.ico
├── src/
│   ├── components/         # Reusable components
│   │   ├── ui/              # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── ...
│   │   ├── Navbar.tsx       # Navigation bar
│   │   ├── Footer.tsx       # Footer component
│   │   ├── HeroSection.tsx  # Hero banner
│   │   ├── DestinationCard.tsx
│   │   ├── AgendaSection.tsx
│   │   ├── UMKMShowcase.tsx
│   │   └── ScrollAnimations.tsx
│   ├── pages/              # Halaman-halaman
│   │   ├── Home.tsx
│   │   ├── Destinasi.tsx
│   │   ├── DestinationDetail.tsx
│   │   ├── Agenda.tsx
│   │   ├── AgendaJoin.tsx
│   │   ├── UMKM.tsx
│   │   ├── UMKMDetail.tsx
│   │   ├── Kecamatan.tsx
│   │   ├── Informasi.tsx
│   │   ├── InformasiDetail.tsx
│   │   ├── Kontak.tsx
│   │   ├── PaymentPage.tsx
│   │   ├── ProductPaymentPage.tsx
│   │   └── Admin*.tsx        # Dashboard admin
│   ├── data/               # Data sources
│   │   ├── lampungTimurDestinations.ts    # 10 destinasi
│   │   ├── lampungTimurUMKM.ts           # 20 UMKM
│   │   └── lampungTimurDistricts.ts      # 24 kecamatan
│   ├── hooks/              # Custom hooks
│   │   └── use-mobile.tsx
│   ├── lib/                # Utilities
│   │   └── utils.ts
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md
```

---

## ✨ Fitur Utama

### 🌐 Website Publik
- ✅ 10 Destinasi Wisata Lampung Timur
- ✅ 20 UMKM Lokal (Kuliner, Kerajinan, Fashion)
- ✅ 24 Kecamatan dengan profil lengkap
- ✅ Agenda & Event wisata
- ✅ Booking & payment integration via WhatsApp
- ✅ Search & filter real-time
- ✅ Responsive design (mobile-first)
- ✅ Customer reviews & ratings

### 🎛️ Dashboard Admin
- ✅ Content Management System (CMS)
- ✅ CRUD Destinasi, UMKM, Kecamatan
- ✅ Analytics & statistics
- ✅ Message inbox
- ✅ Settings & configuration
- ✅ User management
- ✅ Security logs

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Buka browser di **http://localhost:5173**

### Admin Login
- Username: `admin` | Password: `admin123` (Full Access)
- Username: `umkm-admin` | Password: `umkm123` (UMKM Only)

---

## 📚 Dokumentasi Lengkap

Untuk informasi detail, baca dokumentasi berikut:

📄 **[FITUR-LENGKAP.md](./FITUR-LENGKAP.md)** - Penjelasan setiap halaman & fitur

📄 **[DASHBOARD-ADMIN.md](./DASHBOARD-ADMIN.md)** - Panduan lengkap dashboard admin

📄 **[INSTALASI-DEPLOYMENT.md](./INSTALASI-DEPLOYMENT.md)** - Setup & deployment ke Netlify

📄 **[ALUR-SISTEM.md](./ALUR-SISTEM.md)** - User journey & data flow

---

## 📱 Halaman Website

### Frontend (12 halaman)
- `/` - Home
- `/destinasi` - List Destinasi
- `/destination/detail` - Detail Destinasi
- `/agenda` - Event & Tour
- `/agenda/join` - Join Tour
- `/umkm` - List UMKM
- `/umkm/detail` - Detail UMKM
- `/kecamatan` - 24 Kecamatan
- `/informasi` - Berita & Artikel
- `/kontak` - Kontak Form
- `/payment` - Payment Tour
- `/umkm/product-payment` - Payment Produk

### Admin Dashboard (10 halaman)
- `/admin/login` - Login
- `/admin/dashboard` - Overview
- `/admin/destinasi` - Kelola Destinasi
- `/admin/umkm` - Kelola UMKM
- `/admin/kecamatan` - Kelola Kecamatan
- `/admin/informasi` - Kelola Berita
- `/admin/kontak` - Inbox Pesan
- `/admin/statistik` - Analytics
- `/admin/profil` - Profil Admin
- `/admin/pengaturan` - Settings

---

## 🗂️ Data Lampung Timur

**Destinasi Wisata (10):**
1. Taman Nasional Way Kambas
2. Pantai Kuala Kambas
3. Danau Way Jepara
4. Pantai Kerang Mas
5. Hutan Mangrove Sriminosari
6. Taman Purbakala Pugung Raharjo
7. Danau Kemuning
8. Pantai Cemara
9. Pantai Mutiara
10. Museum Budaya Lampung Timur

**UMKM (20):**
- Kuliner: 13 (Kopi, Keripik, Ikan Asin, Sambal, dll)
- Kerajinan: 5 (Tapis, Bambu, Siger, Rotan, Kerang)
- Fashion: 2 (Batik, Tenun)

**Kecamatan (24):**
Total 393 desa, 1.017.385 penduduk, 4.564 km²

---

## 🛠️ Development

### Build Commands
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview build
npm run lint     # Run ESLint
```

### Tech Stack
- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS + shadcn/ui
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Forms:** React Hook Form
- **Notifications:** Sonner

---

## 🌐 Deployment

### Netlify (Recommended)
```bash
netlify init
netlify deploy --prod
```

**Auto Deploy:**
Push ke GitHub → Netlify auto build & deploy

**Build Settings:**
- Command: `npm run build`
- Directory: `dist`
- Node: 18

---

## 📞 Contact & Support

**Dinas Pariwisata Lampung Timur**
- Email: admin@lamtimurkab.go.id
- Phone: (0725) 543200
- Address: Sukadana, Lampung Timur

---

**Dibuat dengan ❤️ untuk Lampung Timur**

