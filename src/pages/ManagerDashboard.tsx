import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { toast } from "sonner";
import { 
  Package, 
  MapPin, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  TrendingUp,
  Users,
  Calendar,
  Star,
  BarChart3,
  ShoppingBag,
  DollarSign
} from 'lucide-react';

// Demo data untuk UMKM
const demoUMKM = [
  {
    id: 1,
    name: "Keripik Singkong Buah Tangan",
    category: "Makanan",
    owner: "Ibu Siti",
    contact: "0812-3456-7890",
    location: "Kecamatan Sukadana",
    rating: 4.5,
    products: 12,
    status: "active",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    description: "Keripik singkong renyah dengan berbagai varian rasa"
  },
  {
    id: 2,
    name: "Madu Hutan Lampung",
    category: "Minuman",
    owner: "Bapak Ahmad",
    contact: "0813-4567-8901",
    location: "Kecamatan Way Jepara",
    rating: 4.8,
    products: 8,
    status: "active",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop",
    description: "Madu hutan alami dari Lampung Timur"
  },
  {
    id: 3,
    name: "Terasi Udang Berkualitas",
    category: "Bumbu Masak",
    owner: "Ibu Nur",
    contact: "0814-5678-9012",
    location: "Kecamatan Labuhan Maringgai",
    rating: 4.3,
    products: 6,
    status: "active",
    image: "https://images.unsplash.com/photo-1571090480447-7765b0fe7f61?w=400&h=300&fit=crop",
    description: "Terasi udang pilihan untuk masakan lezat"
  }
];

// Demo data untuk Pariwisata
const demoPariwisata = [
  {
    id: 1,
    name: "Pantai Kerang Mas",
    category: "Pantai",
    location: "Kecamatan Labuhan Maringgai",
    rating: 4.6,
    visitors: 1250,
    status: "active",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
    description: "Pantai indah dengan pasir putih dan kerang",
    facilities: ["Area Parkir", "Toilet", "Warung Makan"],
    activities: ["Berjemur", "Bermain Air", "Fotografi"]
  },
  {
    id: 2,
    name: "Taman Nasional Way Kambas",
    category: "Konservasi",
    location: "Kecamatan Way Kambas",
    rating: 4.9,
    visitors: 3400,
    status: "active",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    description: "Suaka gajah sumatera dan satwa liar",
    facilities: ["Pusat Informasi", "Toilet", "Area Camping"],
    activities: ["Safari", "Bird Watching", "Trekking"]
  },
  {
    id: 3,
    name: "Bendungan Batutegi",
    category: "Wisata Air",
    location: "Kecamatan Batanghari",
    rating: 4.4,
    visitors: 890,
    status: "active",
    image: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=400&h=300&fit=crop",
    description: "Bendungan indah dengan pemandangan danau",
    facilities: ["Area Parkir", "Toilet", "Spot Foto"],
    activities: ["Memancing", "Berlayar", "Fotografi"]
  }
];

// Demo data untuk pesanan produk UMKM
const demoProductOrders = [
  {
    id: 101,
    customer: "Andi Prasetyo",
    product: "Kopi Robusta Way Kambas Premium",
    quantity: 3,
    total: 195000,
    status: "Selesai",
    date: "2024-11-01"
  },
  {
    id: 102,
    customer: "Sinta Lestari",
    product: "Tas Tapis Motif Siger",
    quantity: 1,
    total: 250000,
    status: "Diproses",
    date: "2024-11-02"
  },
  {
    id: 103,
    customer: "Budi Santoso",
    product: "Keripik Singkong Original",
    quantity: 5,
    total: 125000,
    status: "Selesai",
    date: "2024-11-03"
  }
];

// Demo data untuk booking paket tour
const demoTourBookings = [
  {
    id: 201,
    customer: "Rina Wijaya",
    tour: "Way Kambas Eco Tour",
    participants: 4,
    total: 720000,
    status: "Sudah booking",
    date: "2024-11-02"
  },
  {
    id: 202,
    customer: "Hendra Saputra",
    tour: "Pantai Kerang Mas Sunset Trip",
    participants: 2,
    total: 360000,
    status: "Menunggu pelaksanaan",
    date: "2024-11-05"
  }
];

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'umkm' | 'pariwisata'>('umkm');
  const [items, setItems] = useState(demoUMKM);
  
  const adminType = sessionStorage.getItem('adminType');
  const adminUsername = sessionStorage.getItem('adminUsername') || 'Manager';
  const isUMKMManager = adminType === 'umkm';
  const isManagerAccount = adminUsername === 'pengelolaumkmwisata';

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    if (!isLoggedIn) {
      toast.error('Anda harus login terlebih dahulu!');
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    // Set active tab based on user role
    setActiveTab(isUMKMManager ? 'umkm' : 'pariwisata');
    setItems(isUMKMManager ? demoUMKM : demoPariwisata);
  }, [isUMKMManager]);

  const handleAddNew = () => {
    const path = activeTab === 'umkm' ? '/admin/umkm' : '/admin/destinasi';
    navigate(path);
  };

  const handleEdit = (id: number) => {
    const path = activeTab === 'umkm' ? `/admin/umkm?edit=${id}` : `/admin/destinasi?edit=${id}`;
    navigate(path);
  };

  const handleView = (id: number) => {
    const path = activeTab === 'umkm' ? `/umkm/${id}` : `/destinasi/${id}`;
    window.open(path, '_blank');
  };

  const handleDelete = (id: number) => {
    const itemName = items.find(item => item.id === id)?.name;
    toast.success(`${activeTab === 'umkm' ? 'UMKM' : 'Destinasi'} "${itemName}" berhasil dihapus`);
    setItems(items.filter(item => item.id !== id));
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

  const currentItems = activeTab === 'umkm' ? demoUMKM : demoPariwisata;

  const stats = activeTab === 'umkm'
    ? {
        total: currentItems.length,
        active: currentItems.filter(item => item.status === 'active').length,
        avgRating: currentItems.length
          ? (currentItems.reduce((sum, item) => sum + item.rating, 0) / currentItems.length).toFixed(1)
          : '0.0',
        totalProducts: currentItems.reduce(
          (sum, item) => sum + ((item as any).products || 0),
          0
        ),
      }
    : {
        total: currentItems.length,
        active: currentItems.filter(item => item.status === 'active').length,
        avgRating: currentItems.length
          ? (currentItems.reduce((sum, item) => sum + item.rating, 0) / currentItems.length).toFixed(1)
          : '0.0',
        totalVisitors: currentItems.reduce(
          (sum, item) => sum + ((item as any).visitors || 0),
          0
        ),
      };

  const managerStats = {
    totalProducts: 18,
    productOrdersThisMonth: demoProductOrders.length,
    productRevenueThisMonth: demoProductOrders.reduce((sum, o) => sum + o.total, 0),
    activeTours: 3,
    tourBookingsThisMonth: demoTourBookings.length,
    totalCustomers: 27,
  };

  if (isManagerAccount) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Pengelola UMKM & Tour</h1>
            <p className="text-gray-600">
              Ringkasan performa produk UMKM dan layanan tour untuk {adminUsername}.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Produk Aktif</p>
                <p className="text-2xl font-bold">{managerStats.totalProducts}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pesanan Produk (bulan ini)</p>
                <p className="text-2xl font-bold">{managerStats.productOrdersThisMonth}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Omzet Produk (bulan ini)</p>
                <p className="text-2xl font-bold">Rp{managerStats.productRevenueThisMonth.toLocaleString('id-ID')}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paket Tour Aktif</p>
                <p className="text-2xl font-bold">{managerStats.activeTours}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Booking Tour (bulan ini)</p>
                <p className="text-2xl font-bold">{managerStats.tourBookingsThisMonth}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pelanggan</p>
                <p className="text-2xl font-bold">{managerStats.totalCustomers}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Pesanan Produk Terbaru</CardTitle>
              <CardDescription>Ringkasan pesanan produk UMKM Anda.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40">
                      <TableHead>#</TableHead>
                      <TableHead>Pelanggan</TableHead>
                      <TableHead className="hidden md:table-cell">Produk</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {demoProductOrders.map((order, index) => (
                      <TableRow key={order.id}>
                        <TableCell className="text-xs">{index + 1}</TableCell>
                        <TableCell className="text-sm font-medium">{order.customer}</TableCell>
                        <TableCell className="hidden md:table-cell text-xs">{order.product}</TableCell>
                        <TableCell className="text-sm">Rp{order.total.toLocaleString('id-ID')}</TableCell>
                        <TableCell className="text-xs">{order.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Booking Tour Terbaru</CardTitle>
              <CardDescription>Ringkasan booking paket tour yang dikelola.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40">
                      <TableHead>#</TableHead>
                      <TableHead>Pelanggan</TableHead>
                      <TableHead className="hidden md:table-cell">Tour</TableHead>
                      <TableHead>Peserta</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {demoTourBookings.map((booking, index) => (
                      <TableRow key={booking.id}>
                        <TableCell className="text-xs">{index + 1}</TableCell>
                        <TableCell className="text-sm font-medium">{booking.customer}</TableCell>
                        <TableCell className="hidden md:table-cell text-xs">{booking.tour}</TableCell>
                        <TableCell className="text-sm">{booking.participants} org</TableCell>
                        <TableCell className="text-sm">Rp{booking.total.toLocaleString('id-ID')}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Dashboard {isUMKMManager ? 'UMKM' : 'Pariwisata'}
          </h1>
          <p className="text-gray-600">
            Selamat datang, {adminUsername}! Kelola {isUMKMManager ? 'UMKM' : 'destinasi wisata'} Lampung Timur
          </p>
        </div>
        
        <Button onClick={handleAddNew} className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" />
          Tambah {isUMKMManager ? 'UMKM' : 'Destinasi'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total {isUMKMManager ? 'UMKM' : 'Destinasi'}</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aktif</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rating Rata-rata</p>
                <p className="text-2xl font-bold">{stats.avgRating}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {isUMKMManager ? 'Total Produk' : 'Total Pengunjung'}
                </p>
                <p className="text-2xl font-bold">
                  {isUMKMManager ? stats.totalProducts : stats.totalVisitors.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                {isUMKMManager ? <BarChart3 className="h-6 w-6 text-purple-600" /> : <Users className="h-6 w-6 text-purple-600" />}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {!isUMKMManager && (
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <Button
            variant={activeTab === 'umkm' ? 'default' : 'ghost'}
            onClick={() => {
              setActiveTab('umkm');
              setItems(demoUMKM);
            }}
            className="flex-1"
          >
            <Package className="mr-2 h-4 w-4" />
            UMKM
          </Button>
          <Button
            variant={activeTab === 'pariwisata' ? 'default' : 'ghost'}
            onClick={() => {
              setActiveTab('pariwisata');
              setItems(demoPariwisata);
            }}
            className="flex-1"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Pariwisata
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-green-600">
                  {(item as any).status === 'active' ? 'Aktif' : 'Non-aktif'}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg line-clamp-1">{item.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <Badge variant="outline">{item.category}</Badge>
                  <div className="flex items-center gap-1">
                    {renderStars(item.rating)}
                    <span className="text-gray-600 ml-1">{item.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {(item as any).location}
                </div>
                
                {(item as any).owner && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    {(item as any).owner}
                  </div>
                )}
                
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleView(item.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Lihat
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleEdit(item.id)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManagerDashboard;
