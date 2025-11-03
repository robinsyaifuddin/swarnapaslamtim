# 🎛️ DASHBOARD ADMIN - DOKUMENTASI LENGKAP

## 📊 Overview Dashboard Admin

Dashboard Admin SWARNAPAS adalah sistem manajemen konten (CMS) yang memungkinkan administrator untuk mengelola seluruh konten website termasuk destinasi wisata, UMKM, kecamatan, dan informasi lainnya.

**Path Admin:** `/admin/*`

---

## 🔐 Sistem Login

### Login Page
**Path:** `/admin/login`

**Tipe Admin:**
1. **Admin Pusat**
   - Username: `admin`
   - Password: `admin123`
   - Akses penuh ke semua fitur

2. **Admin UMKM**
   - Username: `umkm-admin`
   - Password: `umkm123`
   - Akses terbatas untuk UMKM

**Fitur Login:**
- Input validation
- Show/hide password toggle
- Remember me option
- Redirect ke dashboard setelah login
- Session management dengan SessionStorage

**Data Tersimpan:**
```javascript
sessionStorage.setItem('isAdminLoggedIn', 'true');
sessionStorage.setItem('adminUsername', username);
sessionStorage.setItem('adminType', 'central'); // atau 'umkm'
```

---

## 📈 Dashboard Utama
**Path:** `/admin/dashboard`

### Statistics Cards

**1. Total Pengunjung**
- Jumlah: 12,450
- Growth: +15.7%
- Icon: Users
- Navigate ke: `/admin/statistik`

**2. Destinasi Wisata**
- Jumlah: 10
- Growth: +8.5%
- Icon: MapPin
- Navigate ke: `/admin/destinasi`

**3. UMKM Terdaftar**
- Jumlah: 87
- Growth: +18.2%
- Icon: Store
- Navigate ke: `/admin/umkm`

**4. Kecamatan**
- Jumlah: 24
- Growth: 0%
- Icon: Building
- Navigate ke: `/admin/kecamatan`

**5. Pesan Masuk**
- Jumlah: 8
- Growth: +12.5%
- Icon: MessageSquare
- Navigate ke: `/admin/kontak`

### Quick Actions
- ➕ Tambah Destinasi
- ➕ Tambah UMKM
- 🏛️ Kelola Kecamatan
- 👁️ Lihat Pesan
- ⚙️ Pengaturan

### Recent Activities (8 aktivitas terbaru)
1. ✅ Taman Nasional Way Kambas diperbarui
2. 📦 UMKM Kerajinan Tapis diperbarui
3. ✅ Pantai Kuala Kambas ditambahkan
4. ⚠️ Pertanyaan tour Way Kambas diterima
5. 📦 UMKM Kopi Robusta ditambahkan
6. ✅ Data Kecamatan Labuhan Maringgai diperbarui
7. ✅ Hutan Mangrove Sriminosari diverifikasi
8. 📦 Data Kecamatan Sekampung diperbarui

### Quick Stats (3 periode)

**Hari Ini:**
- 287 pengunjung
- 18 bookings
- Rp 1.800.000 revenue

**Minggu Ini:**
- 1,843 pengunjung
- 72 bookings
- Rp 14.200.000 revenue

**Bulan Ini:**
- 7,256 pengunjung
- 189 bookings
- Rp 52.800.000 revenue

### Performance Overview
- Chart visitor trends
- Booking statistics
- Revenue graph
- Popular destinations

### Action Buttons
- 📊 Filter (7d/30d/90d)
- 📥 Export Data
- 🔄 Refresh Data

---

## 🗺️ Admin Destinasi
**Path:** `/admin/destinasi`

### Fitur Utama

**1. Search & Filter**
- Search query
- Filter by kategori
- Filter by status (Aktif/Tidak Aktif)

**2. View Modes**
- Grid View (default)
- List View

**3. Data Table**
Columns:
- ID
- Gambar (thumbnail)
- Nama Destinasi
- Kategori
- Lokasi
- Status (Badge)
- Pengunjung (jumlah)
- Actions (Edit/Delete)

### Form Tambah/Edit Destinasi

**Tab 1: Informasi Umum**
- Nama destinasi
- Kategori (dropdown)
- Lokasi (kecamatan)
- Status (Aktif/Tidak Aktif)
- Upload gambar
- Deskripsi singkat
- Deskripsi lengkap

**Tab 2: Detail Wisata**
- Jam buka
- Harga tiket masuk
- Waktu terbaik berkunjung
- Koordinat maps (lat, lng)
- Kontak info

**Tab 3: Fasilitas**
Checklist:
- ✅ Parkir
- ✅ Toilet
- ✅ Warung Makan
- ✅ Penginapan
- ✅ Gazebo
- ✅ Musholla
- ✅ Spot Foto
- ✅ Camping Ground
- ✅ Area Bermain

**Tab 4: Aktivitas**
Checklist:
- ✅ Berenang
- ✅ Snorkeling
- ✅ Fotografi
- ✅ Hiking
- ✅ Bird Watching
- ✅ Camping
- ✅ Memancing
- ✅ Piknik

**Tab 5: Galeri**
- Upload multiple images
- Set featured image
- Reorder gallery

### Actions
- 👁️ Preview
- ✏️ Edit
- 🗑️ Delete (dengan konfirmasi)
- 📋 Duplicate

### Data Source
- File: `lampungTimurDestinations.ts`
- Total: 10 destinasi wisata

---

## 🏪 Admin UMKM
**Path:** `/admin/umkm`

### Fitur Management

**1. UMKM Table**
Columns:
- ID
- Gambar
- Nama UMKM
- Kategori
- Pemilik
- Kontak
- Lokasi
- Status
- Actions

**2. Filter Options**
- By kategori (Kuliner, Kerajinan, Fashion, Pertanian, Perikanan)
- By lokasi (24 kecamatan)
- By status (Aktif/Tidak Aktif)
- Search

### Form Tambah/Edit UMKM

**Tab 1: General Info**
- Nama UMKM
- Kategori
- Pemilik
- Kontak (telepon, email)
- Lokasi & alamat
- Deskripsi
- Upload gambar
- Status
- Tahun berdiri
- Jumlah karyawan
- Social media (Instagram, Facebook, Website)

**Tab 2: Produk**
- Tambah produk multiple
- Nama produk
- Harga
- Deskripsi
- Gambar produk
- Status stok

**Tab 3: Reviews**
- Display reviews
- Manage review approval
- Hapus review spam

### Data UMKM (20 Total)

**Kategori Kuliner (13):**
1. Kopi Robusta Way Jepara
2. Keripik Pisang Sukadana
3. Ikan Asin Labuhan Maringgai
4. Keripik Singkong Lampung Timur
5. Madu Hutan Way Kambas
6. Terasi Udang Labuhan Maringgai
7. Kerupuk Ikan Kuala Kambas
8. Kemplang Ikan Tradisional
9. Gula Aren Organik
10. Sambal Lampung Pedas
11. Dodol Durian Lampung Timur
12. Kopi Arabika Dataran Tinggi
13. Tauco Khas Lampung

**Kategori Kerajinan (5):**
1. Kerajinan Tapis Lampung Timur
2. Anyaman Bambu Lampung Timur
3. Kerajinan Siger Lampung
4. Kerajinan Rotan Batanghari
5. Kerajinan Kulit Kerang

**Kategori Fashion (2):**
1. Batik Motif Siger Lampung
2. Tenun Tradisional Lampung

---

## 🏛️ Admin Kecamatan
**Path:** `/admin/kecamatan`

### Fitur Management

**1. Kecamatan Grid**
- Card view 24 kecamatan
- Thumbnail image
- Nama kecamatan
- Jumlah desa
- Populasi
- Luas wilayah
- Quick actions

**2. Detail Management**

**Tab 1: Profil**
- Nama kecamatan
- Deskripsi
- Upload gambar
- Jumlah landmarks
- Jumlah desa
- Populasi
- Luas area (km²)
- Nama camat
- Alamat kantor
- Telepon
- Email
- Website

**Tab 2: Wisata**
- List destinasi wisata per kecamatan
- Tambah/hapus destinasi
- Link ke destinasi detail

**Tab 3: Produk Unggulan**
- List produk khas kecamatan
- Tambah/edit produk
- Gambar produk
- Deskripsi

**Tab 4: Kontak & Info**
- Update kontak
- Social media
- Map coordinates

### Data 24 Kecamatan
1. Sukadana - 15 desa, 45,234 penduduk
2. Labuhan Maringgai - 18 desa, 52,876 penduduk
3. Way Jepara - 14 desa, 38,456 penduduk
4. Batanghari - 16 desa, 41,234 penduduk
5. Way Bungur - 12 desa, 35,678 penduduk
6. Braja Slebah - 13 desa, 36,789 penduduk
7. Purbolinggo - 11 desa, 32,456 penduduk
8. Raman Utara - 10 desa, 28,234 penduduk
9. Pasir Sakti - 15 desa, 42,567 penduduk
10. Sekampung - 14 desa, 39,876 penduduk
11. Sekampung Udik - 13 desa, 37,234 penduduk
12. Batanghari Nuban - 13 desa, 35,456 penduduk
13. Jabung - 16 desa, 43,678 penduduk
14. Pekalongan - 12 desa, 34,567 penduduk
15. Metro Kibang - 11 desa, 31,234 penduduk
16. Mataram Baru - 10 desa, 29,876 penduduk
17. Waway Karya - 9 desa, 27,456 penduduk
18. Marga Sekampung - 12 desa, 33,567 penduduk
19. Marga Tiga - 11 desa, 30,789 penduduk
20. Bandar Sribhawono - 14 desa, 38,456 penduduk
21. Melinting - 13 desa, 36,234 penduduk
22. Gunung Pelindung - 10 desa, 28,567 penduduk
23. Labuhan Ratu - 12 desa, 32,678 penduduk
24. Margatiga - 11 desa, 31,456 penduduk

**Total:** 393 desa, 1,017,385 penduduk, 4,564 km²

---

## 📰 Admin Informasi
**Path:** `/admin/informasi`

### Content Management

**1. Artikel/Berita Table**
- ID
- Thumbnail
- Judul
- Kategori
- Tanggal publish
- Status (Draft/Published)
- Views
- Actions

**2. Form Editor**
- Judul artikel
- Kategori (dropdown)
- Upload featured image
- Rich text editor untuk konten
- SEO metadata (title, description)
- Tags
- Status publish
- Schedule publish (optional)

**3. Kategori Informasi**
- Berita Wisata
- Tips & Tricks
- Event
- Panduan Wisata
- Regulasi
- Promosi

---

## 💬 Admin Kontak
**Path:** `/admin/kontak`

### Message Management

**1. Inbox Table**
Columns:
- Status (New/Read)
- Nama pengirim
- Email
- Subjek
- Tanggal
- Actions (Read/Reply/Delete)

**2. Message Detail**
- Full message content
- Sender info
- Timestamp
- Mark as read/unread
- Reply button → opens email client
- Delete option

**3. Filter Options**
- Semua pesan
- Belum dibaca
- Sudah dibaca
- Arsip
- Search by name/email

---

## 📊 Admin Statistik
**Path:** `/admin/statistik`

### Analytics Dashboard

**1. Visitor Statistics**
- Daily visitors chart
- Weekly trends
- Monthly overview
- Yearly comparison

**2. Destination Analytics**
- Most visited destinations
- Booking statistics
- Revenue per destination
- Rating trends

**3. UMKM Performance**
- Product views
- Sales statistics
- Popular UMKM
- Category breakdown

**4. Geographic Data**
- Visitors by region
- Most popular kecamatan
- Map visualization

**5. Export Options**
- Export to CSV
- Export to PDF
- Print report
- Schedule automated reports

---

## 👤 Admin Profil
**Path:** `/admin/profil`

### Profile Management

**1. Personal Info**
- Username (read-only)
- Full name
- Email
- Phone
- Address
- Bio
- Upload profile photo

**2. Admin Details**
- Join date
- Position
- Department
- Admin type (Central/UMKM)

**3. Password Change**
- Current password
- New password
- Confirm password
- Strength indicator

**4. Notifications Settings**
- Email notifications
- System notifications
- Two-factor authentication (optional)

---

## ⚙️ Admin Pengaturan
**Path:** `/admin/pengaturan`

### System Settings

**Tab 1: Umum**
- Site name
- Site description
- Contact email
- Contact phone
- Logo upload
- Favicon upload
- Enable analytics
- Enable notifications
- Enable user registration
- Maintenance mode

**Tab 2: API Settings**
- Supabase URL
- Supabase Key
- Mail API Key
- Payment API Key
- Storage API Key
- Maps API Key

**Tab 3: Appearance**
- Primary color
- Secondary color
- Font selection
- Layout options
- Theme (Light/Dark)

**Tab 4: Database**
Status indicators:
- ✅ Connected
- Database size
- Total records
- Last backup
- Button: Backup now
- Button: Restore

**Tab 5: Security**
Security log table:
- Event (Login, Password change, dll)
- User
- Timestamp
- Status (Success/Failed)

Recent logs:
- Login Admin - admin@lamtimurkab.go.id - 2024-11-02 14:23 - Success
- Password Change - admin@lamtimurkab.go.id - 2024-11-01 09:15 - Success
- Failed Login - unknown@mail.com - 2024-10-31 22:45 - Failed
- Database Backup - system - 2024-10-31 00:00 - Success
- API Config Change - admin@lamtimurkab.go.id - 2024-10-30 11:32 - Success

---

## 🔔 Notifikasi System

### Toast Notifications
Menggunakan **Sonner** library

**Success Messages:**
- ✅ "Data berhasil disimpan"
- ✅ "Destinasi berhasil ditambahkan"
- ✅ "UMKM berhasil diperbarui"
- ✅ "Data berhasil dihapus"

**Error Messages:**
- ❌ "Gagal menyimpan data"
- ❌ "Koneksi terputus"
- ❌ "Format file tidak valid"

**Info Messages:**
- ℹ️ "Sedang memproses..."
- ℹ️ "Mengunggah file..."

---

## 🔄 Data Management Flow

### Create (Tambah Data)
```
1. Klik button "Tambah"
2. Dialog/Form muncul
3. Isi semua field required
4. Upload gambar (jika ada)
5. Klik "Simpan"
6. Validasi form
7. Data tersimpan
8. Toast notification success
9. Refresh table/grid
10. Dialog tertutup
```

### Read (Lihat Data)
```
1. Data ditampilkan di table/grid
2. Pagination (jika > 10 items)
3. Search & filter real-time
4. Click row untuk detail
```

### Update (Edit Data)
```
1. Klik icon Edit
2. Dialog pre-filled dengan data existing
3. Modify fields
4. Klik "Update"
5. Validasi
6. Data terupdate
7. Toast notification
8. Refresh display
```

### Delete (Hapus Data)
```
1. Klik icon Delete
2. Confirmation dialog muncul
3. "Yakin ingin menghapus?"
4. Klik "Ya, Hapus"
5. Data terhapus
6. Toast notification
7. Refresh display
```

---

## 🎨 UI Components Admin

### Buttons
- Primary: Green (#22c55e)
- Secondary: Gray outline
- Danger: Red (delete actions)
- Icon buttons: Edit, Delete, View

### Forms
- Input fields dengan label
- Validation error messages
- Required field indicator (*)
- Helper text
- Disabled state

### Tables
- Striped rows
- Hover effect
- Sortable columns
- Pagination
- Bulk actions checkbox

### Dialogs/Modals
- Backdrop blur
- Close button
- Header title
- Content area
- Footer actions
- Responsive sizing

### Badges
- Status: Aktif (Green), Tidak Aktif (Red)
- Category badges
- Count badges

### Cards
- Shadow elevation
- Hover lift effect
- Image thumbnail
- Content area
- Action buttons

---

## 🔒 Authorization & Permissions

### Admin Pusat (Full Access)
✅ Dashboard
✅ Destinasi (CRUD)
✅ UMKM (CRUD)
✅ Kecamatan (CRUD)
✅ Informasi (CRUD)
✅ Kontak (Read, Reply, Delete)
✅ Statistik (Full access)
✅ Profil (Edit own)
✅ Pengaturan (Full access)

### Admin UMKM (Limited Access)
✅ Dashboard (View only)
✅ UMKM (CRUD - own UMKM only)
❌ Destinasi (No access)
❌ Kecamatan (No access)
❌ Informasi (No access)
✅ Profil (Edit own)
❌ Pengaturan (No access)

---

## 📱 Responsive Admin Panel

**Desktop (> 1024px):**
- Sidebar tetap visible
- 2-3 column layout
- Full table view
- Expanded forms

**Tablet (640px - 1024px):**
- Collapsible sidebar
- 2 column layout
- Table with horizontal scroll
- Form single column

**Mobile (< 640px):**
- Hamburger menu
- Single column layout
- Card view instead of table
- Stacked form fields
- Bottom navigation (optional)

---

## 🚀 Performance Optimizations

1. **Lazy Loading**
   - Component code splitting
   - Image lazy load
   - Route-based splitting

2. **Caching**
   - Session storage untuk login
   - Local storage untuk preferences
   - Memo untuk expensive calculations

3. **Optimized Rendering**
   - React.memo untuk components
   - useCallback untuk functions
   - useMemo untuk computed values

4. **Bundle Optimization**
   - Vite tree-shaking
   - Code minification
   - CSS purging dengan Tailwind

