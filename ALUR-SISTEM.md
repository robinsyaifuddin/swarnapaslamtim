# 🔄 ALUR KERJA SISTEM SWARNAPAS

## 📋 Overview Alur Sistem

Dokumen ini menjelaskan alur kerja lengkap dari setiap fitur dan modul dalam sistem SWARNAPAS, mulai dari user interaction hingga data processing.

---

## 🏠 Alur User Journey - Website Public

### 1. Landing & Exploration

```
User membuka website
    ↓
Navbar muncul (sticky)
    ↓
Hero Section dengan CTA
    ↓
Scroll ke bawah
    ↓
Lihat destinasi unggulan (carousel)
    ↓
Lihat UMKM showcase
    ↓
Lihat agenda/event
    ↓
Footer dengan quick links
```

### 2. Mencari Destinasi Wisata

```
User klik "Destinasi" di Navbar
    ↓
Redirect ke /destinasi
    ↓
Page load → fetch data dari lampungTimurDestinations.ts
    ↓
Display grid 10 destinasi
    ↓
User gunakan search box
    ├─→ Input keyword
    ├─→ Real-time filter berdasarkan nama/lokasi
    └─→ Update grid display
    ↓
User pilih filter kategori
    ├─→ Click tab kategori (Pantai/Danau/Taman Nasional/dll)
    ├─→ Filter data by category
    └─→ Update display
    ↓
User click card destinasi
    ↓
Navigate ke /destination/detail?id={id}
```

### 3. Melihat Detail Destinasi

```
Page load detail destinasi
    ↓
Get ID dari URL params
    ↓
Find destination by ID dari data
    ↓
Display:
    ├─→ Hero image
    ├─→ Nama & lokasi
    ├─→ Rating & reviews
    └─→ Tabs: Overview/Info/Aktivitas/Lokasi/Tours
    ↓
User navigasi tabs
    ↓
Click tab "Tours"
    ↓
Lihat list paket tour available
    ↓
Click "Gabung Tour"
    ↓
Navigate ke /agenda/join?id={tourId}
```

### 4. Join Tour/Agenda

```
Page load form join tour
    ↓
Display:
    ├─→ Detail tour (nama, tanggal, lokasi, harga)
    ├─→ Jumlah peserta minimum
    └─→ Form pendaftaran
    ↓
User isi form:
    ├─→ Nama lengkap
    ├─→ Email (validation format)
    ├─→ No HP (validation format)
    ├─→ Jumlah peserta (min check)
    └─→ Tanggal tour (date picker)
    ↓
Click "Lanjutkan ke Pembayaran"
    ↓
Form validation
    ├─→ If error: show error messages
    └─→ If valid: proceed
    ↓
Navigate ke /payment dengan query params
    ↓
Payment page:
    ├─→ Display order summary
    ├─→ Calculate total (peserta × harga)
    ├─→ Apply discount if any
    └─→ Pilih metode bayar
    ↓
Click "Konfirmasi Pembayaran"
    ↓
Generate WhatsApp message dengan detail order
    ↓
Open WhatsApp (6285768192419)
    ↓
User mengirim konfirmasi via WhatsApp
    ↓
Provider terima & process booking
```

### 5. Mencari UMKM & Produk

```
User klik "UMKM" di Navbar
    ↓
Redirect ke /umkm
    ↓
Page load → fetch dari lampungTimurUMKM.ts
    ↓
Display grid 20 UMKM
    ↓
User gunakan filter:
    ├─→ Filter kategori (Kuliner/Kerajinan/Fashion)
    ├─→ Filter lokasi (24 kecamatan)
    ├─→ Search keyword
    └─→ Real-time update display
    ↓
User click card UMKM
    ↓
Navigate ke /umkm/detail?id={umkmId}
    ↓
Page load detail UMKM
    ↓
Display:
    ├─→ Header (image, nama, rating)
    ├─→ Tabs: Profil/Produk/Ulasan/Kontak
    └─→ Action buttons
    ↓
User click tab "Produk"
    ↓
Display grid produk UMKM
    ↓
User click "Beli Sekarang" pada produk
    ↓
Navigate ke /umkm/product-payment dengan params:
    ├─→ productId
    ├─→ productName
    ├─→ productPrice
    ├─→ umkmName
    ├─→ umkmPhone
    └─→ umkmLocation
    ↓
Payment page load
    ↓
User isi form pembeli
    ↓
Choose delivery method
    ↓
Click "Konfirmasi Pesanan"
    ↓
Generate WhatsApp message
    ↓
Open WhatsApp ke nomor UMKM
    ↓
User kirim konfirmasi
    ↓
UMKM terima & process order
```

### 6. Submit Review UMKM

```
User di halaman detail UMKM
    ↓
Click tab "Ulasan"
    ↓
Scroll ke form review
    ↓
Isi form:
    ├─→ Nama (required)
    ├─→ Rating 1-5 stars
    └─→ Komentar (required)
    ↓
Click "Kirim Ulasan"
    ↓
Form validation
    ├─→ Check required fields
    └─→ If valid: proceed
    ↓
Show toast notification: "Ulasan terkirim!"
    ↓
Reset form
    ↓
(In production: save to database)
```

### 7. Kontak Admin

```
User klik "Kontak" di Navbar
    ↓
Redirect ke /kontak
    ↓
Display:
    ├─→ Form kontak
    ├─→ Info kantor
    ├─→ Map location
    └─→ Social media
    ↓
User isi form:
    ├─→ Nama
    ├─→ Email
    ├─→ No HP
    ├─→ Subjek
    └─→ Pesan
    ↓
Click "Kirim Pesan"
    ↓
Validation
    ↓
Show toast: "Pesan terkirim!"
    ↓
(In production: email to admin)
    ↓
Admin terima di /admin/kontak
```

---

## 🎛️ Alur Admin Dashboard

### 1. Admin Login

```
User buka /admin/login
    ↓
Display login form
    ↓
Input:
    ├─→ Username
    └─→ Password
    ↓
Click "Login"
    ↓
Validation:
    ├─→ Check credentials
    ├─→ If admin: username="admin", password="admin123"
    └─→ If umkm-admin: username="umkm-admin", password="umkm123"
    ↓
If valid:
    ├─→ Set sessionStorage:
    │   ├─→ isAdminLoggedIn = true
    │   ├─→ adminUsername = username
    │   └─→ adminType = 'central' or 'umkm'
    └─→ Navigate to /admin/dashboard
    ↓
If invalid:
    └─→ Show error toast
```

### 2. Dashboard Overview

```
Admin dashboard load
    ↓
Check session:
    ├─→ If not logged in: redirect to /admin/login
    └─→ If logged in: proceed
    ↓
Fetch & display:
    ├─→ Statistics cards
    │   ├─→ Total visitors
    │   ├─→ Destinations count
    │   ├─→ UMKM count
    │   ├─→ Kecamatan count
    │   └─→ Messages count
    ├─→ Recent activities (8 items)
    ├─→ Quick stats (today/week/month)
    └─→ Performance charts
    ↓
Admin click statistic card
    ↓
Navigate to respective page
```

### 3. Manage Destinasi (CRUD)

#### Create (Tambah Destinasi)

```
Admin di /admin/destinasi
    ↓
Click "Tambah Destinasi"
    ↓
Dialog form muncul
    ↓
Display tabs:
    ├─→ Tab 1: Info Umum
    ├─→ Tab 2: Detail Wisata
    ├─→ Tab 3: Fasilitas
    ├─→ Tab 4: Aktivitas
    └─→ Tab 5: Galeri
    ↓
Admin isi form per tab:
    │
    ├─→ Tab 1: Info Umum
    │   ├─→ Input nama destinasi
    │   ├─→ Select kategori (dropdown)
    │   ├─→ Select lokasi/kecamatan
    │   ├─→ Upload gambar utama
    │   ├─→ Set status (Aktif/Tidak Aktif)
    │   ├─→ Input deskripsi singkat (textarea)
    │   └─→ Input deskripsi lengkap (rich text)
    │
    ├─→ Tab 2: Detail Wisata
    │   ├─→ Input jam buka (time picker)
    │   ├─→ Input harga tiket
    │   ├─→ Input waktu terbaik berkunjung
    │   ├─→ Input koordinat (lat, lng)
    │   └─→ Input kontak info
    │
    ├─→ Tab 3: Fasilitas
    │   └─→ Check fasilitas available:
    │       ├─→ ☑ Parkir
    │       ├─→ ☑ Toilet
    │       ├─→ ☑ Warung Makan
    │       └─→ ... (9 total)
    │
    ├─→ Tab 4: Aktivitas
    │   └─→ Check aktivitas available:
    │       ├─→ ☑ Berenang
    │       ├─→ ☑ Snorkeling
    │       └─→ ... (8 total)
    │
    └─→ Tab 5: Galeri
        ├─→ Upload multiple images
        ├─→ Drag to reorder
        └─→ Set featured image
    ↓
Click "Simpan"
    ↓
Validation:
    ├─→ Check required fields
    ├─→ Validate image format
    ├─→ Validate data types
    └─→ If error: show error messages
    ↓
If valid:
    ├─→ Save data to state/database
    ├─→ Show toast: "Destinasi berhasil ditambahkan"
    ├─→ Close dialog
    ├─→ Refresh table/grid
    └─→ New item appears in list
```

#### Read (Lihat Destinasi)

```
Admin di /admin/destinasi
    ↓
Load data dari lampungTimurDestinations.ts
    ↓
Display dalam table/grid:
    │
    ├─→ Grid View (default):
    │   ├─→ Card per destinasi
    │   ├─→ Thumbnail image
    │   ├─→ Nama & kategori
    │   ├─→ Lokasi
    │   ├─→ Status badge
    │   └─→ Action buttons
    │
    └─→ List View (toggle):
        ├─→ Table rows
        ├─→ Columns: ID, Image, Nama, Kategori, Lokasi, Status, Actions
        └─→ Sortable columns
    ↓
Admin gunakan search:
    ├─→ Input keyword
    ├─→ Real-time filter by nama/lokasi
    └─→ Update display
    ↓
Admin gunakan filter:
    ├─→ Filter by kategori
    ├─→ Filter by status
    └─→ Update display
```

#### Update (Edit Destinasi)

```
Admin click icon Edit pada destinasi
    ↓
Dialog form muncul
    ↓
Form pre-filled dengan data existing
    ↓
Admin modify fields yang ingin diubah
    ↓
Click "Update"
    ↓
Validation
    ↓
If valid:
    ├─→ Update data
    ├─→ Show toast: "Destinasi berhasil diperbarui"
    ├─→ Close dialog
    └─→ Refresh display
```

#### Delete (Hapus Destinasi)

```
Admin click icon Delete
    ↓
Confirmation dialog muncul:
    "Apakah Anda yakin ingin menghapus destinasi ini?"
    ↓
Admin click "Ya, Hapus"
    ↓
Delete data
    ↓
Show toast: "Destinasi berhasil dihapus"
    ↓
Refresh display
    ↓
Item hilang dari list
```

### 4. Manage UMKM (CRUD)

Alur sama dengan Manage Destinasi, dengan tambahan:

#### Tab Produk:
```
Admin di tab Produk
    ↓
Display list produk UMKM
    ↓
Click "Tambah Produk"
    ↓
Mini form muncul:
    ├─→ Input nama produk
    ├─→ Input harga (number)
    ├─→ Upload gambar produk
    ├─→ Input deskripsi
    └─→ Toggle status stok
    ↓
Click "Tambah"
    ↓
Produk ditambahkan ke list
    ↓
Repeat untuk multiple products
```

#### Tab Reviews:
```
Display customer reviews
    ↓
Admin dapat:
    ├─→ Approve/reject review
    ├─→ Delete spam review
    └─→ Reply to review
```

### 5. Manage Kecamatan

```
Admin di /admin/kecamatan
    ↓
Load 24 kecamatan dari lampungTimurDistricts.ts
    ↓
Display grid cards
    ↓
Admin click card kecamatan
    ↓
Detail dialog muncul dengan tabs:
    │
    ├─→ Tab Profil:
    │   ├─→ Edit nama, deskripsi
    │   ├─→ Update demografi
    │   └─→ Change gambar
    │
    ├─→ Tab Wisata:
    │   ├─→ List destinasi per kecamatan
    │   ├─→ Link destinasi ke kecamatan
    │   └─→ Unlink destinasi
    │
    ├─→ Tab Produk:
    │   ├─→ Add produk unggulan kecamatan
    │   ├─→ Edit produk
    │   └─→ Delete produk
    │
    └─→ Tab Kontak:
        ├─→ Update alamat kantor
        ├─→ Update telepon/email
        └─→ Update social media
    ↓
Save changes
    ↓
Toast notification
    ↓
Refresh display
```

### 6. Manage Kontak/Messages

```
Admin di /admin/kontak
    ↓
Display inbox table
    ↓
Messages sorted by:
    ├─→ Status: New (unread) first
    └─→ Date: Latest first
    ↓
Columns:
    ├─→ Status badge (New/Read)
    ├─→ Nama pengirim
    ├─→ Email
    ├─→ Subjek
    ├─→ Tanggal
    └─→ Actions
    ↓
Admin click row message
    ↓
Message detail dialog muncul:
    ├─→ Full message content
    ├─→ Sender info (nama, email, phone)
    ├─→ Timestamp
    └─→ Action buttons
    ↓
Admin can:
    ├─→ Mark as read
    │   └─→ Status badge changes
    ├─→ Reply
    │   ├─→ Click "Reply"
    │   └─→ Open email client with pre-filled recipient
    ├─→ Delete
    │   ├─→ Confirmation dialog
    │   └─→ Message removed from inbox
    └─→ Archive
        └─→ Move to archive folder
```

### 7. View Statistics

```
Admin di /admin/statistik
    ↓
Load analytics data
    ↓
Display charts:
    │
    ├─→ Visitor Statistics:
    │   ├─→ Line chart daily visitors
    │   ├─→ Bar chart weekly comparison
    │   └─→ Trend analysis
    │
    ├─→ Destination Analytics:
    │   ├─→ Most visited destinations
    │   ├─→ Rating distribution
    │   └─→ Revenue per destination
    │
    ├─→ UMKM Performance:
    │   ├─→ Product views
    │   ├─→ Sales by category
    │   └─→ Top performing UMKM
    │
    └─→ Geographic Data:
        ├─→ Visitors by region
        └─→ Popular kecamatan
    ↓
Admin select filter:
    ├─→ Date range (7d/30d/90d/custom)
    ├─→ Chart type
    └─→ Data source
    ↓
Update charts
    ↓
Admin click "Export"
    ↓
Choose format (CSV/PDF)
    ↓
Download report
```

### 8. Update Settings

```
Admin di /admin/pengaturan
    ↓
Navigate tabs:
    │
    ├─→ Tab Umum:
    │   ├─→ Edit site name
    │   ├─→ Edit description
    │   ├─→ Upload logo
    │   ├─→ Toggle features
    │   └─→ Save changes
    │
    ├─→ Tab API:
    │   ├─→ Update API keys
    │   ├─→ Test connections
    │   └─→ Save
    │
    ├─→ Tab Appearance:
    │   ├─→ Choose colors
    │   ├─→ Select fonts
    │   └─→ Preview changes
    │
    ├─→ Tab Database:
    │   ├─→ View status
    │   ├─→ Backup database
    │   ├─→ Restore from backup
    │   └─→ View logs
    │
    └─→ Tab Security:
        ├─→ View security logs
        ├─→ Manage sessions
        └─→ Configure 2FA
```

---

## 🔄 Data Flow Architecture

### Frontend Data Flow

```
User Action
    ↓
Event Handler (onClick, onChange, onSubmit)
    ↓
Component State Update (useState)
    ↓
Conditional Rendering
    ↓
UI Update
```

### Example: Search Destinasi

```javascript
// 1. User types in search box
<Input 
  onChange={(e) => setSearchTerm(e.target.value)}
/>

// 2. State updates
const [searchTerm, setSearchTerm] = useState('');

// 3. useEffect monitors state change
useEffect(() => {
  const filtered = allDestinations.filter(dest => 
    dest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredDestinations(filtered);
}, [searchTerm]);

// 4. Display updates
{filteredDestinations.map(dest => (
  <DestinationCard key={dest.id} data={dest} />
))}
```

### Routing Flow

```
User clicks Link/Button
    ↓
React Router captures navigation
    ↓
useNavigate() or <Link to="...">
    ↓
Route matches in App.tsx
    ↓
Component lazy loads (if using React.lazy)
    ↓
Page renders
    ↓
useEffect runs (data fetch, scroll to top, etc)
    ↓
UI fully loaded
```

### Form Submission Flow

```
User fills form
    ↓
onChange updates state for each field
    ↓
User clicks Submit
    ↓
onSubmit handler triggered
    ↓
Prevent default form behavior
    ↓
Validate all fields
    ├─→ If invalid:
    │   ├─→ Set error states
    │   └─→ Display error messages
    └─→ If valid:
        ├─→ Process data
        ├─→ API call (if integrated)
        ├─→ Show success toast
        ├─→ Reset form
        └─→ Navigate to next page
```

---

## 🎯 Component Communication

### Props Down

```
Parent Component
    ↓ (passes data via props)
Child Component
    ↓ (receives & displays)
UI Render
```

Example:
```tsx
// Parent
<DestinationCard 
  data={destination}
  onViewDetail={handleViewDetail}
/>

// Child
const DestinationCard = ({ data, onViewDetail }) => {
  return (
    <Card onClick={() => onViewDetail(data.id)}>
      <h3>{data.name}</h3>
      <p>{data.location}</p>
    </Card>
  );
};
```

### Events Up

```
Child Component
    ↓ (triggers callback)
Parent Component
    ↓ (handles event)
State Update
    ↓
Re-render
```

### Context API (if used)

```
Provider (top level)
    ↓ (provides value)
Consumer Components (any level)
    ↓ (useContext hook)
Access shared state
```

---

## 🔐 Authentication Flow

```
User submits login
    ↓
Validate credentials
    ↓
If valid:
    ├─→ Create session:
    │   sessionStorage.setItem('isAdminLoggedIn', 'true')
    │   sessionStorage.setItem('adminUsername', username)
    │   sessionStorage.setItem('adminType', type)
    └─→ Redirect to /admin/dashboard
    ↓
Protected routes check:
    useEffect(() => {
      const isLoggedIn = sessionStorage.getItem('isAdminLoggedIn');
      if (!isLoggedIn) navigate('/admin/login');
    }, []);
    ↓
If logged in: Render admin page
If not logged in: Redirect to login
```

### Logout Flow

```
User clicks Logout
    ↓
Clear session:
    sessionStorage.clear()
    ↓
Redirect to /admin/login
    ↓
Protected routes redirect to login
```

---

## 📱 Responsive Behavior Flow

```
Page loads
    ↓
useIsMobile() hook checks window.innerWidth
    ↓
Returns true (< 768px) or false (>= 768px)
    ↓
Conditional rendering based on isMobile:
    │
    ├─→ If mobile:
    │   ├─→ Show hamburger menu
    │   ├─→ Stack layout (single column)
    │   ├─→ Bottom sheets instead of modals
    │   └─→ Touch-optimized buttons
    │
    └─→ If desktop:
        ├─→ Show full navigation
        ├─→ Grid/multi-column layout
        ├─→ Hover effects
        └─→ Larger touch targets
```

---

## 🎨 Styling System Flow

```
Component needs styling
    ↓
Use Tailwind utility classes:
    className="bg-primary hover:bg-primary/90 px-4 py-2"
    ↓
Or use shadcn/ui components with variants:
    <Button variant="default" size="lg">
    ↓
Tailwind processes classes
    ↓
Generate minimal CSS
    ↓
Apply to component
```

---

## 🚀 Build & Deploy Flow

```
Developer makes changes
    ↓
Save files
    ↓
Vite HMR (Hot Module Replacement)
    ↓
Browser updates instantly (dev mode)
    ↓
Commit changes to Git
    ↓
Push to GitHub
    ↓
Netlify detects push
    ↓
Triggers build:
    ├─→ Install dependencies (npm install)
    ├─→ Run build (npm run build)
    ├─→ TypeScript compilation
    ├─→ Vite bundle optimization
    └─→ Generate dist/ folder
    ↓
Deploy to CDN
    ↓
Site live at production URL
    ↓
Users see updated site
```

---

## 📊 Complete User Flow Diagram

```
┌─────────────┐
│   Landing   │
│     Page    │
└──────┬──────┘
       │
       ├──────────────┬──────────────┬──────────────┐
       │              │              │              │
       v              v              v              v
 ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
 │Destinasi │  │   UMKM   │  │  Agenda  │  │Kecamatan │
 └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘
      │             │             │             │
      v             v             v             v
 ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
 │  Detail  │  │  Detail  │  │   Join   │  │  Detail  │
 │Destinasi │  │   UMKM   │  │   Tour   │  │Kecamatan │
 └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────────┘
      │             │             │
      v             v             v
 ┌──────────┐  ┌──────────┐  ┌──────────┐
 │   Tour   │  │  Product │  │ Payment  │
 │ Booking  │  │ Payment  │  │  & WA    │
 └────┬─────┘  └────┬─────┘  └────┬─────┘
      │             │             │
      └──────┬──────┴──────┬──────┘
             │             │
             v             v
        ┌─────────────────────┐
        │  WhatsApp Confirm   │
        │   to Provider/UMKM  │
        └─────────────────────┘
```

---

Sistem SWARNAPAS dirancang dengan alur yang intuitif, efisien, dan user-friendly untuk memastikan pengalaman terbaik bagi wisatawan, pelaku UMKM, dan administrator.

