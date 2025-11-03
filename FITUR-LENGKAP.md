# 📋 FITUR LENGKAP SWARNAPAS

## ✨ Fitur Utama Website

### 1. 🏠 Halaman Beranda (Home)
**Path:** `/`

**Komponen Utama:**
- **Hero Section**
  - Banner utama dengan gambar Lampung Timur
  - Tagline: "Jelajahi Keindahan Lampung Timur"
  - Call-to-action button

- **Destinasi Unggulan**
  - Carousel destinasi wisata terpopuler
  - 10 destinasi wisata Lampung Timur
  - Preview gambar, nama, lokasi, rating

- **Agenda & Event**  
  - Event wisata terkini
  - Tanggal, lokasi, harga tour
  - Link ke detail event

- **UMKM Showcase**
  - Produk UMKM lokal
  - 20 UMKM dari berbagai kategori
  - Preview produk dan harga

- **Kecamatan Overview**
  - 24 kecamatan Lampung Timur
  - Quick links ke halaman kecamatan

- **Statistik**
  - Total destinasi: 10
  - Total UMKM: 20
  - Total kecamatan: 24

---

### 2. 🗺️ Halaman Destinasi
**Path:** `/destinasi`

**Fitur:**
- **Search & Filter**
  - Search box untuk cari destinasi
  - Filter by kategori (Pantai, Taman Nasional, Danau, dll)
  - Filter by lokasi (kecamatan)
  
- **Destinasi Grid**
  - Card view dengan gambar
  - Nama, lokasi, kategori, rating
  - Hover effect & animations
  
- **Quick Stats**
  - Jumlah destinasi per kategori
  - Destinasi terpopuler

**Data Destinasi (10 Total):**
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

---

### 3. 📍 Halaman Detail Destinasi
**Path:** `/destination/detail?id={id}`

**Informasi Lengkap:**
- **Hero Image Carousel**
  - Multiple images per destinasi
  - Smooth transition
  
- **Tab Content:**
  1. **Overview**
     - Deskripsi lengkap
     - Rating & reviews
     - Lokasi detail
     
  2. **Informasi Praktis**
     - Jam buka
     - Harga tiket masuk
     - Waktu terbaik berkunjung
     - Fasilitas tersedia
     
  3. **Aktivitas**
     - List aktivitas yang bisa dilakukan
     - Best time for activities
     
  4. **Lokasi & Akses**
     - Alamat lengkap
     - Maps integration
     - Petunjuk arah
     
  5. **Related Tours**
     - Paket tour tersedia
     - Harga, durasi, min. peserta
     - Button "Gabung Tour"

**Action Buttons:**
- 📍 Share destinasi
- ❤️ Favorite/bookmark
- 📞 Hubungi guide
- 🎫 Pesan tour

---

### 4. 📅 Halaman Agenda/Event
**Path:** `/agenda`

**Fitur:**
- **Event Cards**
  - Gambar event
  - Judul tour/agenda
  - Tanggal & waktu
  - Lokasi
  - Harga & diskon
  - Rating & jumlah peserta
  
- **Filter & Sort**
  - By kategori wisata
  - By harga
  - By tanggal
  - By rating
  
- **Search Function**
  - Cari berdasarkan nama/lokasi

**Event Actions:**
- 👁️ Lihat detail
- 🎫 Gabung tour
- 💰 Lihat harga

---

### 5. 🎫 Halaman Join Agenda
**Path:** `/agenda/join?id={id}`

**Form Pendaftaran:**
- Informasi tour lengkap
- Jumlah peserta (min requirement)
- Total harga kalkulasi otomatis
- Diskon otomatis (jika ada)

**Input Fields:**
- Nama lengkap
- Email
- Nomor HP
- Jumlah peserta
- Tanggal tour
- Catatan khusus (optional)

**Payment Integration:**
- Pilih metode pembayaran
- Konfirmasi via WhatsApp ke provider
- Nomor provider: 6285768192419

---

### 6. 🏪 Halaman UMKM
**Path:** `/umkm`

**Fitur:**
- **UMKM Grid/List View**
  - Toggle view mode
  - Grid 3 kolom (desktop)
  - Stack view (mobile)
  
- **Advanced Filter:**
  - By kategori (Kuliner, Kerajinan, Fashion)
  - By lokasi (24 kecamatan)
  - By rating
  - Search keyword
  
- **Sort Options:**
  - Terbaru
  - Terpopuler
  - Rating tertinggi
  - A-Z

**Data UMKM (20 Total):**
1. Lampung Ethnica - Kain Tapis
2. Kopi Robusta Way Jepara
3. Keripik Pisang Sukadana
4. Ikan Asin Labuhan Maringgai
5. Batik Motif Siger
6. Madu Hutan Way Kambas
7. Kerajinan Rotan
8. Dodol Durian
9. Sambal Lampung
10. Terasi Udang Premium
... (20 total)

---

### 7. 🛍️ Halaman Detail UMKM
**Path:** `/umkm/detail?id={id}`

**Section Lengkap:**

**A. Header Section:**
- Gambar UMKM
- Nama & kategori badge
- Rating dari reviews
- Share & favorite buttons
- Button "Hubungi UMKM" (WhatsApp)

**B. Tabs Content:**

1. **Tab Profil:**
   - Deskripsi lengkap UMKM
   - Alamat & lokasi
   - Telepon & email
   - Tahun berdiri
   - Nama pemilik
   - Jumlah karyawan
   - Social media links

2. **Tab Produk:**
   - Grid produk dengan gambar
   - Nama & harga produk
   - Deskripsi singkat
   - Status stok (In Stock/Out)
   - Button "Beli Sekarang"
   - Button "Tambah ke Keranjang"
   
3. **Tab Ulasan:**
   - Display customer reviews
   - Rating bintang (1-5)
   - Avatar & nama reviewer
   - Tanggal review
   - Komentar
   - Form submit review baru
   - Input: nama, rating, komentar
   
4. **Tab Kontak:**
   - Nomor telepon (click to call)
   - Email (click to email)
   - Social media:
     - Instagram
     - Facebook  
     - Website

**Action Buttons:**
- 📱 Hubungi via WhatsApp
- 📧 Email UMKM
- 🔗 Share link UMKM
- ❤️ Tambah ke favorit

---

### 8. 🗺️ Halaman Kecamatan
**Path:** `/kecamatan`

**Fitur:**
- **Kecamatan List (24 Total):**
  - Card per kecamatan
  - Gambar representative
  - Jumlah desa
  - Populasi
  - Luas wilayah
  
- **Detail View:**
  - Tab Profil (demografi)
  - Tab Kontak (alamat, telepon, email)
  - Tab Wisata (destinasi per kecamatan)
  - Tab Produk (UMKM & produk khas)

**Data 24 Kecamatan:**
1. Sukadana (Ibu kota)
2. Labuhan Maringgai
3. Way Jepara
4. Batanghari
5. Way Bungur
6. Braja Slebah
7. Purbolinggo
8. Raman Utara
9. Pasir Sakti
10. Sekampung
11. Sekampung Udik
12. Batanghari Nuban
13. Jabung
14. Pekalongan
15. Metro Kibang
16. Mataram Baru
17. Waway Karya
18. Marga Sekampung
19. Marga Tiga
20. Bandar Sribhawono
21. Melinting
22. Gunung Pelindung
23. Labuhan Ratu
24. Margatiga

---

### 9. 📰 Halaman Informasi
**Path:** `/informasi`

**Konten:**
- Berita & artikel wisata
- Tips traveling
- Panduan wisata
- Event calendar
- Regulasi wisata

**Format:**
- Card grid layout
- Thumbnail image
- Judul artikel
- Excerpt
- Tanggal publish
- Kategori tag

---

### 10. 📞 Halaman Kontak
**Path:** `/kontak`

**Form Kontak:**
- Nama lengkap
- Email
- Nomor HP
- Subjek
- Pesan
- Button "Kirim Pesan"

**Informasi Kontak:**
- Alamat kantor Dinas Pariwisata
- Telepon: (0725) 543200
- Email: admin@lamtimurkab.go.id
- Jam operasional
- Map location

**Social Media:**
- Instagram
- Facebook
- Twitter
- YouTube

---

### 11. 💳 Halaman Payment (Tour)
**Path:** `/payment`

**Informasi Order:**
- Detail tour yang dipesan
- Tanggal & waktu
- Lokasi meeting point
- Jumlah peserta
- Harga per orang
- Total pembayaran
- Diskon (jika ada)

**Form Data Pemesan:**
- Nama lengkap
- Email
- Nomor HP
- Alamat
- Catatan khusus

**Metode Pembayaran:**
- Transfer Bank
- E-wallet
- Cash on tour
- Konfirmasi via WhatsApp

---

### 12. 🛒 Halaman Payment (Produk UMKM)
**Path:** `/umkm/product-payment`

**Detail Produk:**
- Nama produk
- Gambar produk
- Harga satuan
- Jumlah pesanan
- Total harga

**Info UMKM:**
- Nama UMKM
- Kontak UMKM
- Lokasi

**Form Pembeli:**
- Nama lengkap
- Alamat pengiriman
- Nomor HP
- Email

**Pengiriman:**
- Pilih metode (COD/kirim)
- Estimasi waktu
- Biaya kirim

**Checkout:**
- Konfirmasi via WhatsApp
- Nomor UMKM terkait

---

## 🔒 Fitur Keamanan

1. **Input Validation**
   - Form validation dengan React Hook Form
   - Email format check
   - Phone number format
   - Required fields check

2. **Data Protection**
   - No credit card storage
   - WhatsApp redirect untuk payment
   - Secure contact forms

3. **Session Management**
   - SessionStorage untuk admin login
   - Auto-logout setelah inactivity

---

## 📱 Responsive Design

**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Features:**
- Mobile-first approach
- Touch-optimized buttons
- Hamburger menu (mobile)
- Responsive images
- Adaptive grid layouts
- useIsMobile hook untuk conditional rendering

---

## 🎨 Design System

**Color Palette:**
- Primary (Green): #22c55e
- Secondary (Gold): #eab308
- Accent (Red): #ef4444
- Neutral: Gray scale
- Background: White (#ffffff)

**Typography:**
- Font: System font stack
- Headings: Bold, responsive sizes
- Body: Regular, 16px base

**Components:**
- shadcn/ui components
- Consistent spacing (Tailwind)
- Smooth animations
- Hover effects
- Loading states

