
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { 
  Search, 
  Plus, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  MapPin, 
  Phone,
  User,
  Tag,
  ImagePlus,
  CheckCircle,
  XCircle,
  Store,
  Package,
  Star,
  Info,
  Save,
  X,
  Mail,
  MessageSquare
} from 'lucide-react';
import { toast } from "sonner";
import { lampungTimurDistricts } from '@/data/lampungTimurDistricts';

// Data UMKM Lampung Timur yang valid dan relevan
const umkmData = [
  { id: 1, name: 'Kerajinan Tapis Lampung Timur', category: 'Kerajinan', owner: 'Hj. Siti Aminah', contact: '082178945612', location: 'Kec. Sukadana, Lampung Timur', status: 'Aktif', image: '' },
  { id: 2, name: 'Kopi Robusta Way Kambas', category: 'Makanan & Minuman', owner: 'H. Sutrisno', contact: '081367894523', location: 'Kec. Labuhan Ratu, Lampung Timur', status: 'Aktif', image: '' },
  { id: 3, name: 'Batik Motif Siger Lampung', category: 'Fashion', owner: 'Dewi Kusuma', contact: '085678912345', location: 'Kec. Sukadana, Lampung Timur', status: 'Aktif', image: '' },
  { id: 4, name: 'Keripik Singkong Lampung Timur', category: 'Makanan & Minuman', owner: 'Budi Santoso', contact: '082145678923', location: 'Kec. Metro Kibang, Lampung Timur', status: 'Aktif', image: '' },
  { id: 5, name: 'Madu Hutan Way Kambas', category: 'Makanan & Minuman', owner: 'H. Ahmad Fauzi', contact: '081234567823', location: 'Kec. Labuhan Ratu, Lampung Timur', status: 'Aktif', image: '' },
  { id: 6, name: 'Anyaman Bambu Lampung Timur', category: 'Kerajinan', owner: 'Suryadi', contact: '085789456123', location: 'Kec. Sekampung, Lampung Timur', status: 'Aktif', image: '' },
  { id: 7, name: 'Terasi Udang Labuhan Maringgai', category: 'Makanan & Minuman', owner: 'Ny. Rudi Hartono', contact: '082367891245', location: 'Kec. Labuhan Maringgai, Lampung Timur', status: 'Aktif', image: '' },
  { id: 8, name: 'Kerajinan Siger Lampung', category: 'Kerajinan', owner: 'H. Mulyadi', contact: '081456789234', location: 'Kec. Melinting, Lampung Timur', status: 'Aktif', image: '' },
  { id: 9, name: 'Ikan Asin Khas Pesisir Lampung Timur', category: 'Makanan & Minuman', owner: 'Budi Hartono', contact: '085612378945', location: 'Kec. Pasir Sakti, Lampung Timur', status: 'Aktif', image: '' },
  { id: 10, name: 'Kerupuk Ikan Kuala Kambas', category: 'Makanan & Minuman', owner: 'Hj. Nurhayati', contact: '082178934567', location: 'Kec. Labuhan Maringgai, Lampung Timur', status: 'Aktif', image: '' },
  { id: 11, name: 'Kemplang Ikan Tradisional', category: 'Makanan & Minuman', owner: 'Sutejo', contact: '081523456789', location: 'Kec. Labuhan Maringgai, Lampung Timur', status: 'Aktif', image: '' },
  { id: 12, name: 'Gula Aren Organik', category: 'Makanan & Minuman', owner: 'H. Zainudin', contact: '085634789123', location: 'Kec. Sekampung, Lampung Timur', status: 'Aktif', image: '' },
  { id: 13, name: 'Sambal Lampung Pedas', category: 'Makanan & Minuman', owner: 'Siti Maryam', contact: '082189456723', location: 'Kec. Jabung, Lampung Timur', status: 'Aktif', image: '' },
  { id: 14, name: 'Kerajinan Rotan Batanghari', category: 'Kerajinan', owner: 'H. Suyono', contact: '081367824569', location: 'Kec. Batanghari, Lampung Timur', status: 'Aktif', image: '' },
  { id: 15, name: 'Tenun Tradisional Lampung', category: 'Fashion', owner: 'Hj. Aminah', contact: '085678934512', location: 'Kec. Way Lima, Lampung Timur', status: 'Aktif', image: '' },
  { id: 16, name: 'Dodol Durian Lampung Timur', category: 'Makanan & Minuman', owner: 'Bambang Sutrisno', contact: '082145673928', location: 'Kec. Mataram Baru, Lampung Timur', status: 'Aktif', image: '' },
  { id: 17, name: 'Kerajinan Kulit Kerang', category: 'Kerajinan', owner: 'Ahmad Yani', contact: '081234789456', location: 'Kec. Labuhan Maringgai, Lampung Timur', status: 'Aktif', image: '' },
  { id: 18, name: 'Kopi Arabika Dataran Tinggi', category: 'Makanan & Minuman', owner: 'H. Sukardi', contact: '085789123467', location: 'Kec. Purbolinggo, Lampung Timur', status: 'Aktif', image: '' },
  { id: 19, name: 'Tauco Khas Lampung', category: 'Makanan & Minuman', owner: 'H. Agus Salim', contact: '082367845129', location: 'Kec. Marga Tiga, Lampung Timur', status: 'Aktif', image: '' },
  { id: 20, name: 'Bordir Tapis Modern', category: 'Fashion', owner: 'Dewi Safitri', contact: '081456892347', location: 'Kec. Sukadana, Lampung Timur', status: 'Aktif', image: '' }
];

// Product data UMKM Lampung Timur
const productDummyData = [
  { id: 101, name: 'Kopi Robusta Way Kambas Premium', price: 65000, image: '', description: 'Kopi robusta asli Lampung Timur dari perkebunan Way Kambas', inStock: true },
  { id: 102, name: 'Tas Tapis Motif Siger', price: 250000, image: '', description: 'Tas dengan motif tapis khas Lampung Timur', inStock: true },
  { id: 103, name: 'Keripik Singkong Original', price: 25000, image: '', description: 'Keripik singkong renyah khas Lampung Timur', inStock: true },
  { id: 104, name: 'Madu Hutan Murni 500ml', price: 85000, image: '', description: 'Madu hutan asli dari kawasan Way Kambas', inStock: true },
  { id: 105, name: 'Terasi Udang Premium 250gr', price: 35000, image: '', description: 'Terasi udang berkualitas dari Labuhan Maringgai', inStock: true },
  { id: 106, name: 'Siger Lampung Mini', price: 175000, image: '', description: 'Kerajinan siger Lampung ukuran mini untuk souvenir', inStock: true },
  { id: 107, name: 'Ikan Asin Teri 500gr', price: 45000, image: '', description: 'Ikan asin teri pilihan dari pesisir Lampung Timur', inStock: true },
  { id: 108, name: 'Kemplang Ikan Isi 10', price: 30000, image: '', description: 'Kemplang ikan tradisional rasa gurih', inStock: true },
  { id: 109, name: 'Batik Tulis Motif Way Kambas', price: 350000, image: '', description: 'Batik tulis dengan motif gajah Way Kambas', inStock: true },
  { id: 110, name: 'Sambal Lampung Botol 250ml', price: 28000, image: '', description: 'Sambal khas Lampung Timur tingkat kepedasan sedang', inStock: true }
];

// Review data dari customer Lampung Timur
const reviewDummyData = [
  { id: 201, userName: 'Ahmad Reza', rating: 5, date: '2024-10-15', comment: 'Kopi Way Kambas rasanya mantap, benar-benar premium!', userImage: 'https://i.pravatar.cc/150?img=1' },
  { id: 202, userName: 'Siti Nuraini', rating: 5, date: '2024-10-22', comment: 'Tas tapisnya bagus sekali, motifnya khas Lampung banget', userImage: 'https://i.pravatar.cc/150?img=5' },
  { id: 203, userName: 'Budi Santoso', rating: 4, date: '2024-10-28', comment: 'Keripik singkongnya renyah dan enak, cocok untuk oleh-oleh', userImage: 'https://i.pravatar.cc/150?img=3' },
  { id: 204, userName: 'Dewi Lestari', rating: 5, date: '2024-10-30', comment: 'Madu hutan asli, manis alami tanpa campuran', userImage: 'https://i.pravatar.cc/150?img=9' },
  { id: 205, userName: 'Hendra Wijaya', rating: 4, date: '2024-11-01', comment: 'Terasi udangnya berkualitas, bikin masakan jadi sedap', userImage: 'https://i.pravatar.cc/150?img=7' }
];

// Dummy data pendaftar/pengguna untuk admin pusat
const registeredUsers = [
  { id: 'U-1001', fullName: 'Rina Saputri', email: 'rina@contoh.com', phone: '628123000111', organization: 'UMKM Batik Sukadana', role: 'umkm', status: 'pending', registeredAt: '2024-11-10' },
  { id: 'U-1002', fullName: 'Dedi Kurnia', email: 'dedi@contoh.com', phone: '628567000222', organization: 'UMKM Kopi Way Kambas', role: 'umkm', status: 'approved', registeredAt: '2024-11-08' },
  { id: 'U-1003', fullName: 'Maya Putri', email: 'maya@contoh.com', phone: '628777000333', organization: 'Dinas Pariwisata', role: 'central', status: 'pending', registeredAt: '2024-11-12' },
  { id: 'U-1004', fullName: 'Bambang Hadi', email: 'bambang@contoh.com', phone: '628811000444', organization: 'UMKM Tapis Lamtim', role: 'umkm', status: 'approved', registeredAt: '2024-11-01' },
  { id: 'U-1005', fullName: 'Sari Wulandari', email: 'sari@contoh.com', phone: '628131000555', organization: 'Komunitas Wisata', role: 'central', status: 'approved', registeredAt: '2024-10-28' },
];

const AdminUMKM = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentTab, setCurrentTab] = useState('manajemen');
  const [showGuide, setShowGuide] = useState(false);
  const [userStatusTab, setUserStatusTab] = useState<'pending' | 'approved'>('pending');
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    // General Info
    name: '',
    category: '',
    owner: '',
    contact: '',
    email: '',
    location: '',
    address: '',
    description: '',
    image: '/placeholder.svg',
    status: 'Aktif',
    establishedYear: '',
    totalEmployees: '',
    socialMedia: {
      instagram: '',
      facebook: '',
      website: '',
    },
    // Products
    products: [] as {
      id: number;
      name: string;
      price: number;
      image: string;
      description: string;
      inStock: boolean;
    }[],
    // Reviews
    reviews: [] as {
      id: number;
      userName: string;
      rating: number;
      date: string;
      comment: string;
      userImage: string;
    }[]
  });

  const adminUsername = sessionStorage.getItem('adminUsername');
  const adminType = sessionStorage.getItem('adminType');
  const isCentralAdmin = adminType === 'central' || adminUsername === 'adminpusat';
  const [selectedDistrictId, setSelectedDistrictId] = useState<number>(lampungTimurDistricts[0]?.id || 1);

  const filteredData = umkmData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: '',
      owner: '',
      contact: '',
      email: '',
      location: '',
      address: '',
      description: '',
      image: '/placeholder.svg',
      status: 'Aktif',
      establishedYear: '',
      totalEmployees: '',
      socialMedia: {
        instagram: '',
        facebook: '',
        website: '',
      },
      products: [],
      reviews: []
    });
    setCurrentTab('manajemen');
    setShowForm(true);
  };

  const handleEdit = (id: number) => {
    const umkm = umkmData.find(item => item.id === id);
    if (umkm) {
      setEditingId(id);
      setFormData({
        name: umkm.name,
        category: umkm.category,
        owner: umkm.owner,
        contact: umkm.contact,
        email: 'email@example.com', // Dummy data
        location: umkm.location,
        address: 'Jl. Example No. 123', // Dummy data
        description: 'Deskripsi UMKM.',
        image: umkm.image,
        status: umkm.status,
        establishedYear: '2020',
        totalEmployees: '5',
        socialMedia: {
          instagram: '@' + umkm.name.toLowerCase().replace(/\s+/g, ''),
          facebook: umkm.name,
          website: 'www.' + umkm.name.toLowerCase().replace(/\s+/g, '') + '.com',
        },
        products: productDummyData,
        reviews: reviewDummyData
      });
      setCurrentTab('manajemen');
      setShowForm(true);
    }
  };

  const handleDelete = (id: number) => {
    toast.success(`UMKM dengan ID ${id} berhasil dihapus`);
    // In a real application, you would make an API call to delete the item
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      toast.success(`UMKM "${formData.name}" berhasil diperbarui`);
    } else {
      toast.success(`UMKM baru "${formData.name}" berhasil ditambahkan`);
    }
    setShowForm(false);
    
    // Navigate back to manager dashboard jika akun adalah pengelola UMKM & wisata
    const adminUsername = sessionStorage.getItem('adminUsername');
    if (adminUsername === 'pengelolaumkmwisata') {
      setTimeout(() => {
        window.location.href = '/admin/manager';
      }, 1500);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  // Add new product
  const handleAddProduct = () => {
    navigate('/admin/umkm/product/new');
  };

  // Update product
  const handleUpdateProduct = (index: number, field: string, value: any) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value
    };
    setFormData({
      ...formData,
      products: updatedProducts
    });
  };

  // Delete product
  const handleDeleteProduct = (index: number) => {
    const updatedProducts = [...formData.products];
    updatedProducts.splice(index, 1);
    setFormData({
      ...formData,
      products: updatedProducts
    });
    toast.success("Produk berhasil dihapus");
  };

  // Add review
  const handleAddReview = () => {
    const newReview = {
      id: Date.now(),
      userName: '',
      rating: 5,
      date: new Date().toISOString().split('T')[0],
      comment: '',
      userImage: 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 70)
    };
    setFormData({
      ...formData,
      reviews: [...formData.reviews, newReview]
    });
  };

  // Update review
  const handleUpdateReview = (index: number, field: string, value: any) => {
    const updatedReviews = [...formData.reviews];
    updatedReviews[index] = {
      ...updatedReviews[index],
      [field]: value
    };
    setFormData({
      ...formData,
      reviews: updatedReviews
    });
  };

  // Delete review
  const handleDeleteReview = (index: number) => {
    const updatedReviews = [...formData.reviews];
    updatedReviews.splice(index, 1);
    setFormData({
      ...formData,
      reviews: updatedReviews
    });
    toast.success("Ulasan berhasil dihapus");
  };

  // Untuk akun pengelolaumkmwisata, langsung buka tampilan manajemen UMKM (tanpa daftar tabel)
  useEffect(() => {
    if (adminUsername === 'pengelolaumkmwisata' && !showForm && !editingId) {
      // Gunakan UMKM pertama sebagai contoh yang dikelola
      const firstUmkm = umkmData[0];
      if (firstUmkm) {
        handleEdit(firstUmkm.id);
      }
    }
  }, [adminUsername, showForm, editingId]);

  // Handle social media update
  const handleSocialMediaUpdate = (platform: string, value: string) => {
    setFormData({
      ...formData,
      socialMedia: {
        ...formData.socialMedia,
        [platform]: value
      }
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {isCentralAdmin && (
        <Card className="border shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <CardTitle className="text-lg">Daftar UMKM Setempat</CardTitle>
                <CardDescription>Filter UMKM berdasarkan kecamatan</CardDescription>
              </div>
              <select
                className="flex h-10 w-full md:w-80 rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={selectedDistrictId}
                onChange={(e) => setSelectedDistrictId(Number(e.target.value))}
              >
                {lampungTimurDistricts.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead>#</TableHead>
                    <TableHead>Nama UMKM</TableHead>
                    <TableHead className="hidden md:table-cell">Kategori</TableHead>
                    <TableHead className="hidden md:table-cell">Pemilik</TableHead>
                    <TableHead>Lokasi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {umkmData
                    .filter(u => {
                      const district = lampungTimurDistricts.find(d => d.id === selectedDistrictId);
                      return district ? u.location.toLowerCase().includes(district.name.toLowerCase()) : true;
                    })
                    .map((u, idx) => (
                      <TableRow key={u.id}>
                        <TableCell className="text-xs">{idx + 1}</TableCell>
                        <TableCell className="text-sm font-medium">{u.name}</TableCell>
                        <TableCell className="hidden md:table-cell text-xs">{u.category}</TableCell>
                        <TableCell className="hidden md:table-cell text-xs">{u.owner}</TableCell>
                        <TableCell className="text-xs">{u.location}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Kelola UMKM</h1>
          <p className="text-muted-foreground">Kelola semua UMKM di Lampung Timur</p>
        </div>
      </div>

      {/* Tampilan UMKM Saya dengan dua tab Manajemen & Produk */}
      <Card className="border shadow-lg animate-fade-in">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{editingId ? 'Edit UMKM' : 'Tambah UMKM Baru'}</CardTitle>
              <CardDescription>
                {editingId
                  ? 'Perbarui informasi UMKM yang sudah ada'
                  : 'Lengkapi informasi untuk menambahkan UMKM baru'}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => setShowGuide(!showGuide)}
              >
                <Info className="mr-1 h-4 w-4" /> Panduan Kelola UMKM
              </Button>
              <Button
                type="button"
                size="sm"
                className="bg-lamsel-green hover:bg-lamsel-green/80"
                onClick={() => {
                  handleAddProduct();
                  setCurrentTab('produk');
                }}
              >
                <Plus className="mr-1 h-4 w-4" /> Tambah Produk
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="w-full mb-6 grid grid-cols-3 bg-emerald-50">
              <TabsTrigger value="manajemen" className="flex items-center gap-1">
                <Store className="h-4 w-4" /> Manajemen
              </TabsTrigger>
              <TabsTrigger value="produk" className="flex items-center gap-1">
                <Package className="h-4 w-4" /> Produk
              </TabsTrigger>
              {isCentralAdmin && (
                <TabsTrigger value="pengguna" className="flex items-center gap-1">
                  <User className="h-4 w-4" /> Pengguna
                </TabsTrigger>
              )}
            </TabsList>

            {showGuide && (
              <Card className="mb-6 border-dashed bg-muted/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Panduan Singkat Kelola UMKM</CardTitle>
                  <CardDescription className="text-xs">
                    Ikuti langkah berikut untuk mengelola profil UMKM dan produk Anda.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-xs space-y-1">
                  <p>1. Pada tab <strong>Manajemen</strong>, lengkapi informasi profil UMKM (nama, pemilik, kontak, alamat, dan deskripsi).</p>
                  <p>2. Simpan perubahan dengan tombol <strong>Simpan</strong> di pojok kanan atas.</p>
                  <p>3. Pindah ke tab <strong>Produk</strong> untuk menambahkan dan mengelola daftar produk.</p>
                  <p>4. Gunakan tombol <strong>Tambah Produk</strong> untuk membuat kartu produk baru, lalu isi nama, harga, dan deskripsi.</p>
                  <p>5. Jika semua sudah sesuai, pastikan status produk aktif agar tampil di halaman UMKM publik.</p>
                </CardContent>
              </Card>
            )}

            <form id="umkmForm" onSubmit={handleSubmit}>
              {/* Tab Manajemen: trafik, pelanggan, dan informasi UMKM */}
              <TabsContent value="manajemen" className="space-y-8">
                  {/* Ringkasan trafik & pelanggan (demo) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-primary/5 border-none shadow-none">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Kunjungan Profil UMKM</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">842x</p>
                        <p className="text-xs text-muted-foreground mt-1">Total dilihat oleh pengguna</p>
                      </CardContent>
                    </Card>
                    <Card className="border-none shadow-none">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Pelanggan Potensial</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">32</p>
                        <p className="text-xs text-muted-foreground mt-1">Pengguna yang menghubungi UMKM</p>
                      </CardContent>
                    </Card>
                    <Card className="border-none shadow-none">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Rating Rata-rata</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2">
                          {renderStars(4.8)}
                          <span className="text-sm font-semibold">4.8</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Berdasarkan ulasan pelanggan</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Daftar pelanggan sederhana (demo) */}
                  <Card className="border shadow-sm">
                    <CardHeader className="pb-3 flex flex-row items-center justify-between">
                      <CardTitle className="text-base">Daftar Pelanggan</CardTitle>
                      <span className="text-xs text-muted-foreground">Data contoh untuk simulasi manajemen pelanggan</span>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="rounded-md border overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-muted/40">
                              <TableHead className="w-10 text-center">#</TableHead>
                              <TableHead>Nama</TableHead>
                              <TableHead className="hidden md:table-cell">Kontak</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {[{
                              name: 'Andi Prasetyo',
                              phone: '6281234567890',
                              email: 'andi@example.com',
                              status: 'Sudah membeli'
                            }, {
                              name: 'Sinta Lestari',
                              phone: '6285678901234',
                              email: 'sinta@example.com',
                              status: 'Menghubungi UMKM'
                            }, {
                              name: 'Budi Santoso',
                              phone: '628111223344',
                              email: 'budi@example.com',
                              status: 'Pelanggan tetap'
                            }].map((c, index) => (
                              <TableRow key={index}>
                                <TableCell className="text-center text-xs">{index + 1}</TableCell>
                                <TableCell className="text-sm font-medium">{c.name}</TableCell>
                                <TableCell className="hidden md:table-cell text-xs">
                                  <div>{c.phone}</div>
                                  <div className="text-muted-foreground">{c.email}</div>
                                </TableCell>
                                <TableCell className="text-xs">
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                                    {c.status}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Form informasi UMKM (mengikuti layout referensi profil UMKM publik) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama UMKM</Label>
                      <Input 
                        id="name" 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Masukkan nama UMKM" 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Kategori</Label>
                      <div className="flex items-center space-x-2">
                        <Tag size={16} className="text-gray-400" />
                        <Input 
                          id="category" 
                          value={formData.category} 
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          placeholder="Contoh: Kerajinan, Makanan & Minuman" 
                          required 
                          className="flex-1" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="owner">Nama Pemilik</Label>
                      <div className="flex items-center space-x-2">
                        <User size={16} className="text-gray-400" />
                        <Input 
                          id="owner" 
                          value={formData.owner} 
                          onChange={(e) => setFormData({...formData, owner: e.target.value})}
                          placeholder="Masukkan nama pemilik" 
                          required 
                          className="flex-1" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contact">Kontak</Label>
                      <div className="flex items-center space-x-2">
                        <Phone size={16} className="text-gray-400" />
                        <Input 
                          id="contact" 
                          value={formData.contact} 
                          onChange={(e) => setFormData({...formData, contact: e.target.value})}
                          placeholder="Nomor telepon / WhatsApp" 
                          required 
                          className="flex-1" 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <Input 
                          id="email" 
                          type="email"
                          value={formData.email} 
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="Email UMKM" 
                          className="flex-1" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Lokasi</Label>
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} className="text-gray-400" />
                        <Input 
                          id="location" 
                          value={formData.location} 
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          placeholder="Contoh: Kec. Jati Agung" 
                          required 
                          className="flex-1" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <select 
                        id="status" 
                        value={formData.status} 
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      >
                        <option value="Aktif">Aktif</option>
                        <option value="Tidak Aktif">Tidak Aktif</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Alamat Lengkap</Label>
                      <Textarea 
                        id="address" 
                        value={formData.address} 
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        placeholder="Alamat lengkap UMKM" 
                        className="min-h-[80px]"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Deskripsi Singkat</Label>
                      <Textarea 
                        id="description" 
                        value={formData.description} 
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Deskripsi singkat produk dan UMKM" 
                        required
                        className="min-h-[80px]"
                      />
                    </div>
                    
                    <div className="col-span-1 md:col-span-2 space-y-2">
                      <Label htmlFor="image">Foto Produk Utama</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                        <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-2">
                          <p className="text-sm font-medium">Klik untuk upload foto</p>
                          <p className="text-xs text-gray-500">SVG, PNG, JPG (maks. 2MB)</p>
                        </div>
                        <input id="image" type="file" className="hidden" />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Tab Produk: daftar produk (preview cards, non-editable) */}
                <TabsContent value="produk" className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Daftar Produk</h3>
                    <Button 
                      type="button" 
                      onClick={handleAddProduct}
                      className="bg-lamsel-green hover:bg-lamsel-green/80 shadow"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Tambah Produk
                    </Button>
                  </div>

                  {formData.products.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 mx-auto text-gray-400" />
                      <p className="mt-2 text-gray-600">Belum ada produk. Tambahkan produk untuk UMKM ini.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {formData.products.map((product) => (
                        <Card key={product.id} className="overflow-hidden shadow-sm hover:shadow-md transition-all border-emerald-100">
                          <div className="bg-emerald-50 h-40 flex items-center justify-center">
                            <ImagePlus className="h-10 w-10 text-emerald-400" />
                          </div>
                          <CardContent className="p-4 space-y-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm md:text-base">{product.name || 'Nama produk'}</h4>
                              </div>
                              <div className="w-28 text-right">
                                <span className="text-xs text-muted-foreground">Harga</span>
                                <div className="font-semibold text-sm">{product.price?.toLocaleString('id-ID')}</div>
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground line-clamp-3">{product.description || 'Deskripsi singkat produk'}</p>

                            <div className="flex items-center justify-between">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${product.inStock ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                                {product.inStock ? 'Produk tersedia' : 'Produk tidak tersedia'}
                              </span>
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="icon"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleDeleteProduct(formData.products.findIndex(p => p.id === product.id))}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <Button 
                              type="button" 
                              variant="outline" 
                              className="w-full mt-1 text-xs md:text-sm border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                              onClick={() => navigate(`/admin/umkm/product/${product.id}/edit`)}
                            >
                              Edit Produk
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Ulasan Pelanggan</h3>
                    <Button 
                      type="button" 
                      onClick={handleAddReview}
                      className="bg-lamsel-green hover:bg-lamsel-green/80"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Tambah Ulasan
                    </Button>
                  </div>

                  {formData.reviews.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 mx-auto text-gray-400" />
                      <p className="mt-2 text-gray-600">Belum ada ulasan. Tambahkan ulasan untuk UMKM ini.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {formData.reviews.map((review, index) => (
                        <Card key={review.id} className="overflow-hidden">
                          <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                            <h4 className="font-medium">Ulasan #{index + 1}</h4>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="icon"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDeleteReview(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`review-name-${index}`}>Nama Pelanggan</Label>
                              <Input 
                                id={`review-name-${index}`} 
                                value={review.userName} 
                                onChange={(e) => handleUpdateReview(index, 'userName', e.target.value)}
                                placeholder="Nama pelanggan" 
                                required 
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor={`review-date-${index}`}>Tanggal</Label>
                              <Input 
                                id={`review-date-${index}`} 
                                type="date"
                                value={review.date} 
                                onChange={(e) => handleUpdateReview(index, 'date', e.target.value)}
                                required 
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor={`review-rating-${index}`}>Rating</Label>
                              <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-6 w-6 cursor-pointer ${
                                      star <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                                    }`}
                                    onClick={() => handleUpdateReview(index, 'rating', star)}
                                  />
                                ))}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor={`review-image-${index}`}>Foto Profil</Label>
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                                <div className="flex justify-center">
                                  <img 
                                    src={review.userImage} 
                                    alt="Avatar" 
                                    className="w-10 h-10 rounded-full" 
                                  />
                                </div>
                                <p className="text-xs mt-1 text-gray-500">Klik untuk ubah foto</p>
                                <input id={`review-image-${index}`} type="file" className="hidden" />
                              </div>
                            </div>

                            <div className="space-y-2 col-span-1 md:col-span-2">
                              <Label htmlFor={`review-comment-${index}`}>Komentar</Label>
                              <Textarea 
                                id={`review-comment-${index}`} 
                                value={review.comment} 
                                onChange={(e) => handleUpdateReview(index, 'comment', e.target.value)}
                                placeholder="Komentar ulasan" 
                                required
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                {/* About UMKM Tab */}
                <TabsContent value="about" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="establishedYear">Tahun Berdiri</Label>
                      <Input 
                        id="establishedYear" 
                        value={formData.establishedYear} 
                        onChange={(e) => setFormData({...formData, establishedYear: e.target.value})}
                        placeholder="Contoh: 2018" 
                        type="number"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="totalEmployees">Jumlah Karyawan</Label>
                      <Input 
                        id="totalEmployees" 
                        value={formData.totalEmployees} 
                        onChange={(e) => setFormData({...formData, totalEmployees: e.target.value})}
                        placeholder="Jumlah karyawan" 
                        type="number"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">@</span>
                        <Input 
                          id="instagram" 
                          value={formData.socialMedia.instagram.replace('@', '')}
                          onChange={(e) => handleSocialMediaUpdate('instagram', '@' + e.target.value)}
                          placeholder="nama.akun" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input 
                        id="facebook" 
                        value={formData.socialMedia.facebook}
                        onChange={(e) => handleSocialMediaUpdate('facebook', e.target.value)}
                        placeholder="Nama halaman Facebook" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input 
                        id="website" 
                        value={formData.socialMedia.website}
                        onChange={(e) => handleSocialMediaUpdate('website', e.target.value)}
                        placeholder="www.example.com" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="full-description">Deskripsi Lengkap</Label>
                    <Textarea 
                      id="full-description" 
                      value={formData.description} 
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Ceritakan tentang sejarah UMKM, visi misi, dan informasi lengkap lainnya" 
                    />
                  </div>
                </TabsContent>
                </form>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      );
    };

    export default AdminUMKM;
