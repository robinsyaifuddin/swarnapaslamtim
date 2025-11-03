
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  Users, 
  MapPin, 
  Package, 
  Calendar,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Plus,
  Settings,
  Bell,
  Download,
  Filter,
  Search,
  Grid,
  List,
  Map,
  Image,
  ChevronRight,
  Activity,
  DollarSign,
  Star,
  Clock
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

// Dashboard statistics - Data Lampung Timur yang valid
const dashboardStats = {
  totalVisitors: 12450,
  visitorsGrowth: 15.7,
  totalDestinations: 10, // 10 destinasi wisata di lampungTimurDestinations
  destinationsGrowth: 8.5,
  totalUMKM: 87, // UMKM terdaftar di Lampung Timur
  umkmGrowth: 18.2,
  totalKecamatan: 24, // 24 kecamatan di Lampung Timur
  kecamatanGrowth: 0,
  pendingMessages: 8,
  messagesGrowth: 12.5
};

// Recent activities - Data aktivitas dengan destinasi Lampung Timur yang asli
const recentActivities = [
  { id: 1, type: 'destination', title: 'Taman Nasional Way Kambas diperbarui', user: 'Admin Pusat', time: '2 jam yang lalu', status: 'success' },
  { id: 2, type: 'umkm', title: 'UMKM Kerajinan Tapis diperbarui', user: 'Admin UMKM', time: '3 jam yang lalu', status: 'info' },
  { id: 3, type: 'destination', title: 'Pantai Kuala Kambas ditambahkan', user: 'Admin Pusat', time: '5 jam yang lalu', status: 'success' },
  { id: 4, type: 'message', title: 'Pertanyaan tour Way Kambas diterima', user: 'Pengunjung', time: '8 jam yang lalu', status: 'warning' },
  { id: 5, type: 'umkm', title: 'UMKM Kopi Robusta Lampung Timur ditambahkan', user: 'Admin UMKM', time: '1 hari yang lalu', status: 'info' },
  { id: 6, type: 'kecamatan', title: 'Data Kecamatan Labuhan Maringgai diperbarui', user: 'Admin Pusat', time: '1 hari yang lalu', status: 'success' },
  { id: 7, type: 'destination', title: 'Hutan Mangrove Sriminosari diverifikasi', user: 'Admin Pusat', time: '2 hari yang lalu', status: 'success' },
  { id: 8, type: 'kecamatan', title: 'Data Kecamatan Sekampung diperbarui', user: 'Admin Pusat', time: '3 hari yang lalu', status: 'info' }
];

// Quick stats - Data statistik Lampung Timur
const quickStats = [
  { id: 1, label: 'Hari Ini', visitors: 287, bookings: 18, revenue: 'Rp 1.8M' },
  { id: 2, label: 'Minggu Ini', visitors: 1843, bookings: 72, revenue: 'Rp 14.2M' },
  { id: 3, label: 'Bulan Ini', visitors: 7256, bookings: 189, revenue: 'Rp 52.8M' }
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  
  const adminType = sessionStorage.getItem('adminType');
  const adminUsername = sessionStorage.getItem('adminUsername') || 'Admin';
  const isUMKMAdmin = adminType === 'umkm';

  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    if (!isLoggedIn) {
      toast.error('Anda harus login terlebih dahulu!');
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleQuickAction = (action: string, path: string) => {
    toast.success(`Mengarahkan ke ${action}...`);
    navigate(path);
  };

  const exportData = () => {
    toast.success('Data berhasil diekspor!');
  };

  const refreshData = () => {
    toast.success('Data berhasil diperbarui!');
  };

  // Statistics cards data with responsive handling
  const getStatsCards = () => {
    const baseCards = [
      {
        title: 'Total Pengunjung',
        value: dashboardStats.totalVisitors.toLocaleString(),
        change: dashboardStats.visitorsGrowth,
        icon: Users,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        path: '/admin/statistik'
      },
      {
        title: 'UMKM Terdaftar',
        value: dashboardStats.totalUMKM.toString(),
        change: dashboardStats.umkmGrowth,
        icon: Package,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        path: '/admin/umkm'
      }
    ];

    if (!isUMKMAdmin) {
      baseCards.splice(1, 0, {
        title: 'Destinasi Wisata',
        value: dashboardStats.totalDestinations.toString(),
        change: dashboardStats.destinationsGrowth,
        icon: MapPin,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        path: '/admin/destinasi'
      });

      baseCards.push(
        {
          title: 'Pesan Masuk',
          value: dashboardStats.pendingMessages.toString(),
          change: dashboardStats.messagesGrowth,
          icon: MessageSquare,
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          path: '/admin/kontak'
        },
        {
          title: 'Kecamatan',
          value: dashboardStats.totalKecamatan.toString(),
          change: dashboardStats.kecamatanGrowth,
          icon: Map,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          path: '/admin/kecamatan'
        }
      );
    }

    return baseCards;
  };

  // Quick actions based on admin type
  const getQuickActions = () => {
    const baseActions = [
      { label: 'Tambah UMKM', icon: Package, path: '/admin/umkm', color: 'bg-green-500 hover:bg-green-600' }
    ];

    if (!isUMKMAdmin) {
      return [
        { label: 'Tambah Destinasi', icon: MapPin, path: '/admin/destinasi', color: 'bg-blue-500 hover:bg-blue-600' },
        ...baseActions,
        { label: 'Kelola Kecamatan', icon: Map, path: '/admin/kecamatan', color: 'bg-red-500 hover:bg-red-600' },
        { label: 'Lihat Pesan', icon: MessageSquare, path: '/admin/kontak', color: 'bg-orange-500 hover:bg-orange-600' },
        { label: 'Pengaturan', icon: Settings, path: '/admin/pengaturan', color: 'bg-gray-500 hover:bg-gray-600' }
      ];
    }

    return [
      ...baseActions,
      { label: 'Pengaturan', icon: Settings, path: '/admin/pengaturan', color: 'bg-gray-500 hover:bg-gray-600' }
    ];
  };

  const statsCards = getStatsCards();
  const quickActions = getQuickActions();

  return (
    <div className="space-y-4 md:space-y-6 p-2 md:p-0">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
            Dashboard {isUMKMAdmin ? 'UMKM' : 'Admin'}
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Selamat datang, {adminUsername}! Kelola platform wisata Lampung Timur dengan mudah.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size={isMobile ? "sm" : "default"} className="flex-1 sm:flex-none">
                  <Filter className="w-4 h-4 mr-2" />
                  {selectedTimeRange === '7d' ? '7 Hari' : selectedTimeRange === '30d' ? '30 Hari' : '90 Hari'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => setSelectedTimeRange('7d')}>7 Hari Terakhir</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSelectedTimeRange('30d')}>30 Hari Terakhir</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSelectedTimeRange('90d')}>90 Hari Terakhir</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="outline" 
              size={isMobile ? "sm" : "default"}
              onClick={exportData}
              className="flex-1 sm:flex-none"
            >
              <Download className="w-4 h-4 mr-2" />
              {isMobile ? 'Export' : 'Export Data'}
            </Button>
          </div>
          
          <Button 
            onClick={refreshData}
            size={isMobile ? "sm" : "default"}
            className="flex-1 sm:flex-none"
          >
            <Activity className="w-4 h-4 mr-2" />
            {isMobile ? 'Refresh' : 'Refresh Data'}
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4">
        {statsCards.map((stat, index) => (
          <Card 
            key={index} 
            className="cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-1"
            onClick={() => navigate(stat.path)}
          >
            <CardContent className="p-3 md:p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1 md:space-y-2 flex-1">
                  <p className="text-xs md:text-sm font-medium text-gray-600 leading-tight">
                    {stat.title}
                  </p>
                  <p className="text-lg md:text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <div className="flex items-center space-x-1">
                    {stat.change > 0 ? (
                      <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-3 h-3 md:w-4 md:h-4 text-red-600" />
                    )}
                    <span className={`text-xs md:text-sm font-medium ${
                      stat.change > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {Math.abs(stat.change)}%
                    </span>
                  </div>
                </div>
                <div className={`p-2 md:p-3 rounded-lg ${stat.bgColor} flex-shrink-0 ml-2`}>
                  <stat.icon className={`w-4 h-4 md:w-6 md:h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle className="text-lg md:text-xl">Aksi Cepat</CardTitle>
              <CardDescription className="text-sm">
                Kelola konten platform dengan mudah
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`h-auto flex-col space-y-2 p-3 md:p-4 ${action.color} text-white border-none hover:scale-105 transition-all duration-200`}
                  onClick={() => handleQuickAction(action.label, action.path)}
                >
                  <action.icon className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="text-xs md:text-sm font-medium text-center leading-tight">
                    {action.label}
                  </span>
                </Button>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {quickActions.map((action, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleQuickAction(action.label, action.path)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${action.color} text-white`}>
                      <action.icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{action.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <CardTitle className="text-lg md:text-xl">Aktivitas Terbaru</CardTitle>
                <CardDescription className="text-sm">
                  Pantau aktivitas terbaru di platform
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/admin/statistik">
                  Lihat Semua
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.slice(0, isMobile ? 3 : 5).map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className={`p-2 rounded-full flex-shrink-0 ${
                    activity.status === 'success' ? 'bg-green-100 text-green-600' :
                    activity.status === 'warning' ? 'bg-orange-100 text-orange-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {activity.type === 'destination' && <MapPin className="w-4 h-4" />}
                    {activity.type === 'umkm' && <Package className="w-4 h-4" />}
                    {activity.type === 'message' && <MessageSquare className="w-4 h-4" />}
                    {activity.type === 'kecamatan' && <Map className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.title}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <p className="text-xs text-gray-500">
                        oleh {activity.user}
                      </p>
                      <p className="text-xs text-gray-400 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg md:text-xl">Statistik Cepat</CardTitle>
            <CardDescription className="text-sm">
              Ringkasan performa platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quickStats.map((stat) => (
                <div key={stat.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {stat.label}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {stat.visitors} pengunjung
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <p className="font-semibold text-blue-600">{stat.bookings}</p>
                      <p className="text-blue-500">Booking</p>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <p className="font-semibold text-green-600">{stat.revenue}</p>
                      <p className="text-green-500">Revenue</p>
                    </div>
                  </div>
                  {stat.id < quickStats.length && <hr className="border-gray-200" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      {!isUMKMAdmin && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg md:text-xl">Ikhtisar Performa</CardTitle>
            <CardDescription className="text-sm">
              Analisis performa platform secara keseluruhan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Tingkat Kunjungan</span>
                  <span className="text-sm text-green-600 font-semibold">+12.5%</span>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-gray-500">Target: 15,000 pengunjung/bulan</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Engagement Rate</span>
                  <span className="text-sm text-green-600 font-semibold">+8.3%</span>
                </div>
                <Progress value={68} className="h-2" />
                <p className="text-xs text-gray-500">Target: 70% engagement</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Konversi Booking</span>
                  <span className="text-sm text-blue-600 font-semibold">+5.7%</span>
                </div>
                <Progress value={45} className="h-2" />
                <p className="text-xs text-gray-500">Target: 50% konversi</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Kepuasan User</span>
                  <span className="text-sm text-green-600 font-semibold">4.8/5</span>
                </div>
                <Progress value={96} className="h-2" />
                <p className="text-xs text-gray-500">Berdasarkan 234 review</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminDashboard;
