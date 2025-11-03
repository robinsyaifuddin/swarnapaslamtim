
import React, { useState } from 'react';
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

const AdminUMKM = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentTab, setCurrentTab] = useState('general');
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
    setCurrentTab('general');
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
      setCurrentTab('general');
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
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  // Add new product
  const handleAddProduct = () => {
    const newProduct = {
      id: Date.now(),
      name: '',
      price: 0,
      image: '/placeholder.svg',
      description: '',
      inStock: true
    };
    setFormData({
      ...formData,
      products: [...formData.products, newProduct]
    });
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Kelola UMKM</h1>
          <p className="text-muted-foreground">Kelola semua UMKM di Lampung Timur</p>
        </div>
        <Button onClick={handleAddNew} className="shadow-md hover:shadow-lg transition-all">
          <Plus className="mr-2 h-4 w-4" /> Tambah UMKM
        </Button>
      </div>

      {showForm ? (
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
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  <X className="mr-1 h-4 w-4" /> Batal
                </Button>
                <Button type="submit" size="sm" form="umkmForm" className="bg-lamsel-green hover:bg-lamsel-green/80">
                  <Save className="mr-1 h-4 w-4" /> Simpan
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="general" className="flex items-center gap-1">
                  <Store className="h-4 w-4" /> Informasi Umum
                </TabsTrigger>
                <TabsTrigger value="products" className="flex items-center gap-1">
                  <Package className="h-4 w-4" /> Produk
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex items-center gap-1">
                  <Star className="h-4 w-4" /> Ulasan
                </TabsTrigger>
                <TabsTrigger value="about" className="flex items-center gap-1">
                  <Info className="h-4 w-4" /> Tentang UMKM
                </TabsTrigger>
              </TabsList>

              <form id="umkmForm" onSubmit={handleSubmit}>
                {/* General Information Tab */}
                <TabsContent value="general" className="space-y-6">
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

                {/* Products Tab */}
                <TabsContent value="products" className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Daftar Produk</h3>
                    <Button 
                      type="button" 
                      onClick={handleAddProduct}
                      className="bg-lamsel-green hover:bg-lamsel-green/80"
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
                    <div className="space-y-6">
                      {formData.products.map((product, index) => (
                        <Card key={product.id} className="overflow-hidden">
                          <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                            <h4 className="font-medium">Produk #{index + 1}</h4>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="icon"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDeleteProduct(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`product-name-${index}`}>Nama Produk</Label>
                              <Input 
                                id={`product-name-${index}`} 
                                value={product.name} 
                                onChange={(e) => handleUpdateProduct(index, 'name', e.target.value)}
                                placeholder="Nama produk" 
                                required 
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor={`product-price-${index}`}>Harga (Rp)</Label>
                              <Input 
                                id={`product-price-${index}`} 
                                type="number"
                                value={product.price} 
                                onChange={(e) => handleUpdateProduct(index, 'price', Number(e.target.value))}
                                placeholder="Harga produk" 
                                required 
                              />
                            </div>

                            <div className="space-y-2 col-span-1 md:col-span-2">
                              <Label htmlFor={`product-description-${index}`}>Deskripsi</Label>
                              <Textarea 
                                id={`product-description-${index}`} 
                                value={product.description} 
                                onChange={(e) => handleUpdateProduct(index, 'description', e.target.value)}
                                placeholder="Deskripsi produk" 
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor={`product-image-${index}`}>Foto Produk</Label>
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                                <ImagePlus className="mx-auto h-8 w-8 text-gray-400" />
                                <p className="text-xs mt-1 text-gray-500">Klik untuk upload foto</p>
                                <input id={`product-image-${index}`} type="file" className="hidden" />
                              </div>
                            </div>

                            <div className="space-y-2 flex items-center">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`product-stock-${index}`} 
                                  checked={product.inStock}
                                  onCheckedChange={(checked) => handleUpdateProduct(index, 'inStock', checked)}
                                />
                                <Label htmlFor={`product-stock-${index}`} className="text-sm font-normal cursor-pointer">
                                  Produk tersedia (in stock)
                                </Label>
                              </div>
                            </div>
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
                      className="min-h-[200px]"
                    />
                  </div>
                </TabsContent>
              </form>
            </Tabs>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Cari UMKM..."
                  className="pl-8 w-full md:w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="rounded-lg h-9">
                  <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
                <select 
                  className="h-9 rounded-lg border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="all">Semua Kategori</option>
                  <option value="kerajinan">Kerajinan</option>
                  <option value="makanan">Makanan & Minuman</option>
                  <option value="fashion">Fashion</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-12 text-center">ID</TableHead>
                      <TableHead className="w-16">Foto</TableHead>
                      <TableHead>Nama UMKM</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Pemilik</TableHead>
                      <TableHead>Kontak</TableHead>
                      <TableHead>Lokasi</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-center w-28">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.length > 0 ? (
                      filteredData.map((umkm) => (
                        <TableRow key={umkm.id} className="hover:bg-muted/50 transition-colors">
                          <TableCell className="text-center font-medium">{umkm.id}</TableCell>
                          <TableCell>
                            <img 
                              src={umkm.image} 
                              alt={umkm.name} 
                              className="w-10 h-10 rounded-md object-cover border" 
                            />
                          </TableCell>
                          <TableCell className="font-medium">{umkm.name}</TableCell>
                          <TableCell>{umkm.category}</TableCell>
                          <TableCell>{umkm.owner}</TableCell>
                          <TableCell>{umkm.contact}</TableCell>
                          <TableCell>{umkm.location}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              umkm.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {umkm.status === 'Aktif' ? (
                                <CheckCircle className="mr-1 h-3 w-3" />
                              ) : (
                                <XCircle className="mr-1 h-3 w-3" />
                              )}
                              {umkm.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-center gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(umkm.id)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(umkm.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                          Tidak ditemukan data UMKM yang sesuai dengan pencarian
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Menampilkan {filteredData.length} dari {umkmData.length} UMKM
              </p>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Sebelumnya
                </Button>
                <Button variant="outline" size="sm" className="bg-blue-50">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  Selanjutnya
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminUMKM;

