import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
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
  Search, 
  Plus, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  MapPin, 
  ImagePlus, 
  CheckCircle, 
  XCircle,
  Calendar as CalendarIcon,
  Clock,
  Users
} from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { lampungTimurDestinations } from '@/data/lampungTimurDestinations';
import { lampungTimurDistricts } from '@/data/lampungTimurDistricts';

// Extended destination data model - menggunakan data Lampung Timur yang valid
const destinasiData = lampungTimurDestinations.map(dest => ({
  id: dest.id,
  name: dest.name,
  slug: dest.slug,
  category: dest.category,
  location: dest.location,
  status: 'Aktif',
  visitors: dest.reviews || 0,
  image: dest.image_url,
  description: dest.description,
  longDescription: dest.longDescription || dest.description,
  openHours: dest.opening_hours || '08:00 - 17:00',
  entryFee: dest.price_range || 'Rp 5.000 - Rp 10.000',
  bestTimeToVisit: dest.bestTimeToVisit || 'Pagi hingga sore hari',
  facilities: dest.facilities || [],
  activities: dest.activities || [],
  mapCoordinates: dest.mapCoordinates ? `${dest.mapCoordinates.lat}, ${dest.mapCoordinates.lng}` : '',
  contactInfo: '(0725) 543200',
  relatedTours: dest.relatedTours || [],
}));

// Demo data Layanan Agenda & Tour - mengikuti struktur di halaman publik /agenda
const agendaEvents = [
  {
    id: 1,
    title: "Taman Nasional Way Kambas - Elephant Safari",
    slug: "taman-nasional-way-kambas-elephant-safari",
    image: "https://akcdn.detik.net.id/community/media/visual/2024/01/29/gajah-sumatera-di-taman-nasional-way-kambas_169.jpeg?w=700&q=90",
    date: "15 Juni 2024",
    time: "08:00 - 16:00",
    location: "Labuhan Ratu, Lampung Timur",
    category: "Taman Nasional",
    spots: 20,
    price: 180000,
    originalPrice: 250000,
    rating: 4.8,
    duration: "1 hari",
    minParticipants: 4,
    description:
      "Jelajahi Taman Nasional Way Kambas, pusat konservasi gajah Sumatera terbesar di Indonesia. Nikmati Elephant Safari dan bertemu langsung dengan satwa langka.",
  },
  {
    id: 2,
    title: "Pantai Kuala Kambas - River & Beach Tour",
    slug: "pantai-kuala-kambas-river-beach-tour",
    image: "",
    date: "22 Juni 2024",
    time: "07:00 - 16:00",
    location: "Margasari, Labuhan Maringgai, Lampung Timur",
    category: "Pantai",
    spots: 15,
    price: 120000,
    originalPrice: 160000,
    rating: 4.6,
    duration: "1 hari",
    minParticipants: 3,
    description:
      "Pengalaman unik ke Pantai Kuala Kambas melalui perahu menyusuri Sungai Way Kanan. Nikmati pantai berpasir putih dan seafood segar.",
  },
  {
    id: 3,
    title: "Danau Way Jepara - Nature Escape",
    slug: "danau-way-jepara-nature-escape",
    image: "",
    date: "30 Juni 2024",
    time: "08:00 - 15:00",
    location: "Way Jepara, Lampung Timur",
    category: "Danau",
    spots: 25,
    price: 85000,
    originalPrice: 120000,
    rating: 4.5,
    duration: "7 jam",
    minParticipants: 2,
    description:
      "Nikmati ketenangan Danau Way Jepara yang dikelilingi hutan hijau dan kebun rimbun. Cocok untuk piknik keluarga dan relaksasi.",
  },
];

// Demo data pelanggan untuk layanan Agenda & Tour
type CustomerStatus =
  | 'mengisi_pemesanan'
  | 'diproses'
  | 'sudah_booking'
  | 'menunggu_pelaksanaan'
  | 'selesai';

const customerOrders: {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  tourId: number;
  participants: number;
  totalAmount: number;
  paymentMethod: string;
  invoiceId: string;
  bookingDate: string;
}[] = [
  {
    id: 1,
    name: 'Andi Prasetyo',
    email: 'andi@example.com',
    phone: '6281234567890',
    status: 'sudah_booking',
    tourId: 1,
    participants: 4,
    totalAmount: 720000,
    paymentMethod: 'Transfer Bank',
    invoiceId: 'INV-TNWK-240615-001',
    bookingDate: '10 Juni 2024',
  },
  {
    id: 2,
    name: 'Sinta Lestari',
    email: 'sinta@example.com',
    phone: '6285678901234',
    status: 'menunggu_pelaksanaan',
    tourId: 2,
    participants: 3,
    totalAmount: 360000,
    paymentMethod: 'QRIS',
    invoiceId: 'INV-PKK-240622-002',
    bookingDate: '18 Juni 2024',
  },
  {
    id: 3,
    name: 'Budi Santoso',
    email: 'budi@example.com',
    phone: '628111223344',
    status: 'selesai',
    tourId: 1,
    participants: 2,
    totalAmount: 360000,
    paymentMethod: 'Transfer Bank',
    invoiceId: 'INV-TNWK-240601-003',
    bookingDate: '1 Juni 2024',
  },
];

// Available facilities and activities for selection
const availableFacilities = [
  { id: 'parkir', label: 'Parkir' },
  { id: 'toilet', label: 'Toilet' },
  { id: 'warung', label: 'Warung Makan' },
  { id: 'penginapan', label: 'Penginapan' },
  { id: 'gazebo', label: 'Gazebo' },
  { id: 'musholla', label: 'Musholla' },
  { id: 'spot-foto', label: 'Spot Foto' },
  { id: 'pendopo', label: 'Pendopo' },
  { id: 'camping-ground', label: 'Camping Ground' },
  { id: 'wifi', label: 'WiFi' },
];

const availableActivities = [
  { id: 'berenang', label: 'Berenang' },
  { id: 'snorkeling', label: 'Snorkeling' },
  { id: 'diving', label: 'Diving' },
  { id: 'hiking', label: 'Hiking' },
  { id: 'camping', label: 'Camping' },
  { id: 'fotografi', label: 'Fotografi' },
  { id: 'memancing', label: 'Memancing' },
  { id: 'berkemah', label: 'Berkemah' },
  { id: 'piknik', label: 'Piknik' },
  { id: 'outbound', label: 'Outbound' },
];

const AdminDestinasi = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const adminUsername = sessionStorage.getItem('adminUsername');
  const adminType = sessionStorage.getItem('adminType');
  const isCentralAdmin = adminType === 'central' || adminUsername === 'adminpusat';
  const [selectedDistrictId, setSelectedDistrictId] = useState<number>(lampungTimurDistricts[0]?.id || 1);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [activeFormTab, setActiveFormTab] = useState<'tour'>('tour');
  const [activeMainTab, setActiveMainTab] = useState<'pelanggan' | 'kelola-tour'>('pelanggan');
  const [bankInfo, setBankInfo] = useState({
    bankName: 'Bank Lampung',
    accountName: 'Way Kambas Eco Tour',
    accountNumber: '1234 5678 9012',
    qrisName: 'Way Kambas Eco Tour',
  });
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<CustomerStatus | 'semua'>('semua');
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  
  // Create form using react-hook-form
  const form = useForm({
    defaultValues: {
      name: '',
      category: '',
      location: '',
      description: '',
      longDescription: '',
      // Agenda & tour specific fields
      date: '',
      time: '',
      duration: '',
      minParticipants: '',
      spots: '',
      originalPrice: '',
      price: '',
      // Legacy destination fields (masih digunakan di halaman publik)
      openHours: '',
      entryFee: '',
      bestTimeToVisit: '',
      mapCoordinates: '',
      contactInfo: '',
      image: '/placeholder.svg',
      status: 'Aktif',
      // Text area list untuk highlight & itinerary
      highlightsText: '',
      itineraryText: ''
    }
  });
  const watchedImage = form.watch('image');
  const watchedCategory = form.watch('category');
  const watchedHighlights = form.watch('highlightsText') || '';
  const watchedItinerary = form.watch('itineraryText') || '';

  const filteredData = destinasiData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEvents = agendaEvents.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setEditingId(null);
    form.reset({
      name: '',
      category: '',
      location: '',
      description: '',
      longDescription: '',
      date: '',
      time: '',
      duration: '',
      minParticipants: '',
      spots: '',
      originalPrice: '',
      price: '',
      openHours: '',
      entryFee: '',
      bestTimeToVisit: '',
      mapCoordinates: '',
      contactInfo: '',
      image: '/placeholder.svg',
      status: 'Aktif',
      highlightsText: '',
      itineraryText: ''
    });
    setSelectedFacilities([]);
    setSelectedActivities([]);
    setShowForm(true);
    setActiveMainTab('kelola-tour');
  };

  const handleEdit = (id: number) => {
    const destinasi = destinasiData.find(item => item.id === id);
    const agenda = agendaEvents.find(event => event.id === id);
    if (destinasi) {
      setEditingId(id);
      setActiveFormTab('tour');
      form.reset({
        name: destinasi.name,
        category: destinasi.category,
        location: destinasi.location,
        description: agenda?.description || destinasi.description || '',
        longDescription: destinasi.longDescription || agenda?.description || '',
        date: agenda?.date || '',
        time: agenda?.time || destinasi.openHours || '',
        duration: agenda?.duration || '',
        minParticipants: agenda?.minParticipants?.toString() || '',
        spots: agenda?.spots?.toString() || '',
        originalPrice: agenda?.originalPrice?.toString() || '',
        price: agenda?.price?.toString() || '',
        openHours: destinasi.openHours || '',
        entryFee: destinasi.entryFee || '',
        bestTimeToVisit: destinasi.bestTimeToVisit || '',
        mapCoordinates: destinasi.mapCoordinates || '',
        contactInfo: destinasi.contactInfo || '',
        image: destinasi.image,
        status: destinasi.status,
        highlightsText: agenda?.highlights?.join('\n') || '',
        itineraryText: agenda?.itinerary?.join('\n') || ''
      });
      setSelectedFacilities(destinasi.facilities || []);
      setSelectedActivities(destinasi.activities || []);
      setShowForm(true);
      setActiveMainTab('kelola-tour');
    }
  };

  const handleDelete = (id: number) => {
    toast.success(`Destinasi dengan ID ${id} berhasil dihapus`);
    // In a real application, you would make an API call to delete the item
  };

  const handleSubmit = (values: any) => {
    // Combine form values with selected facilities and activities
    const updatedDestinasi = {
      ...values,
      facilities: selectedFacilities,
      activities: selectedActivities,
    };
    
    if (editingId) {
      toast.success(`Destinasi "${values.name}" berhasil diperbarui`);
      console.log('Updated destination:', updatedDestinasi);
    } else {
      toast.success(`Destinasi baru "${values.name}" berhasil ditambahkan`);
      console.log('New destination:', updatedDestinasi);
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

  const handlePreview = (tourSlug: string) => {
    if (tourSlug) {
      window.open(`/agenda/${tourSlug}`, '_blank');
    } else {
      toast.error('Halaman agenda untuk tour ini belum tersedia');
    }
  };

  const toggleFacility = (id: string) => {
    setSelectedFacilities(current => 
      current.includes(id) 
        ? current.filter(item => item !== id)
        : [...current, id]
    );
  };

  const toggleActivity = (id: string) => {
    setSelectedActivities(current => 
      current.includes(id) 
        ? current.filter(item => item !== id)
        : [...current, id]
    );
  };

  return (
    <div className="space-y-6">
      {isCentralAdmin && (
        <Card className="border shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <CardTitle className="text-lg">Destinasi per Kecamatan</CardTitle>
                <CardDescription>Filter destinasi wisata berdasarkan kecamatan</CardDescription>
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
                    <TableHead>Nama Destinasi</TableHead>
                    <TableHead className="hidden md:table-cell">Kategori</TableHead>
                    <TableHead>Lokasi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {destinasiData
                    .filter(d => {
                      const district = lampungTimurDistricts.find(x => x.id === selectedDistrictId);
                      return district ? d.location.toLowerCase().includes(district.name.toLowerCase()) : true;
                    })
                    .map((d, idx) => (
                      <TableRow key={d.id}>
                        <TableCell className="text-xs">{idx + 1}</TableCell>
                        <TableCell className="text-sm font-medium">{d.name}</TableCell>
                        <TableCell className="hidden md:table-cell text-xs">{d.category}</TableCell>
                        <TableCell className="text-xs">{d.location}</TableCell>
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
          <h1 className="text-2xl font-bold">Kelola Layanan Agenda & Tour</h1>
          <p className="text-muted-foreground">Kelola semua layanan agenda & paket tour resmi di Lampung Timur</p>
        </div>
        {activeMainTab === 'kelola-tour' && (
          <Button onClick={handleAddNew} className="shadow-md hover:shadow-lg transition-all">
            <Plus className="mr-2 h-4 w-4" /> Tambah Layanan Tour
          </Button>
        )}
      </div>

      <Tabs
        value={activeMainTab}
        onValueChange={(val) => setActiveMainTab(val as 'pelanggan' | 'kelola-tour')}
        className="w-full"
      >
        <TabsList className="w-full mb-4 grid grid-cols-2">
          <TabsTrigger value="pelanggan">Pelanggan & Pembayaran</TabsTrigger>
          <TabsTrigger value="kelola-tour">Kelola Tour</TabsTrigger>
        </TabsList>

        {/* Tab Pelanggan & Pembayaran: analitik & pelanggan */}
        <TabsContent value="pelanggan" className="space-y-6">
          <Card className="border shadow-sm">
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="bg-primary/5 border-none shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Kunjungan Halaman Tour</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">1.284x</p>
                    <p className="text-xs text-muted-foreground mt-1">Total dilihat oleh pengguna</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Booking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{customerOrders.length}</p>
                    <p className="text-xs text-muted-foreground mt-1">Pelanggan yang mengisi pemesanan</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Nilai Transaksi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">
                      Rp{customerOrders.reduce((sum, c) => sum + c.totalAmount, 0).toLocaleString('id-ID')}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Akumulasi seluruh invoice</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-4 lg:col-span-1">
                  <h3 className="text-sm font-semibold">Informasi Pembayaran</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <Label>Bank</Label>
                      <Input
                        value={bankInfo.bankName}
                        onChange={(e) => setBankInfo({ ...bankInfo, bankName: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Nama Rekening</Label>
                      <Input
                        value={bankInfo.accountName}
                        onChange={(e) => setBankInfo({ ...bankInfo, accountName: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Nomor Rekening</Label>
                      <Input
                        value={bankInfo.accountNumber}
                        onChange={(e) => setBankInfo({ ...bankInfo, accountNumber: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Nama QRIS</Label>
                      <Input
                        value={bankInfo.qrisName}
                        onChange={(e) => setBankInfo({ ...bankInfo, qrisName: e.target.value })}
                      />
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      className="mt-2"
                      onClick={() => toast.success('Informasi pembayaran berhasil disimpan (demo)')}
                    >
                      Simpan Perubahan
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <h3 className="text-sm font-semibold">Daftar Pelanggan</h3>
                    <select
                      className="h-9 rounded-lg border border-input bg-background px-3 text-xs md:text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={selectedStatusFilter}
                      onChange={(e) => setSelectedStatusFilter(e.target.value as any)}
                    >
                      <option value="semua">Semua Status</option>
                      <option value="mengisi_pemesanan">Mengisi pemesanan</option>
                      <option value="diproses">Sedang diproses</option>
                      <option value="sudah_booking">Sudah booking</option>
                      <option value="menunggu_pelaksanaan">Menunggu pelaksanaan</option>
                      <option value="selesai">Telah selesai</option>
                    </select>
                  </div>

                  <div className="rounded-md border overflow-hidden">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/40">
                            <TableHead className="w-10 text-center">#</TableHead>
                            <TableHead>Nama</TableHead>
                            <TableHead className="hidden md:table-cell">Kontak</TableHead>
                            <TableHead>Tour</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead className="text-center w-16">Invoice</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {customerOrders
                            .filter((c) =>
                              selectedStatusFilter === 'semua' ? true : c.status === selectedStatusFilter
                            )
                            .map((c, index) => {
                              const tour = agendaEvents.find((e) => e.id === c.tourId);
                              const statusLabelMap: Record<CustomerStatus, string> = {
                                mengisi_pemesanan: 'Mengisi pemesanan',
                                diproses: 'Sedang diproses',
                                sudah_booking: 'Sudah booking',
                                menunggu_pelaksanaan: 'Menunggu pelaksanaan',
                                selesai: 'Telah selesai',
                              };
                              return (
                                <TableRow
                                  key={c.id}
                                  className="cursor-pointer hover:bg-muted/40"
                                  onClick={() => setSelectedCustomerId(c.id)}
                                >
                                  <TableCell className="text-center text-xs">{index + 1}</TableCell>
                                  <TableCell className="text-sm font-medium">{c.name}</TableCell>
                                  <TableCell className="hidden md:table-cell text-xs">
                                    <div>{c.phone}</div>
                                    <div className="text-muted-foreground">{c.email}</div>
                                  </TableCell>
                                  <TableCell className="text-xs">{tour?.title}</TableCell>
                                  <TableCell className="text-xs">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                                      {statusLabelMap[c.status]}
                                    </span>
                                  </TableCell>
                                  <TableCell className="text-right text-sm">
                                    Rp{c.totalAmount.toLocaleString('id-ID')}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <button
                                      type="button"
                                      className="inline-flex items-center justify-center rounded-md border px-2 py-1 text-xs hover:bg-muted"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedCustomerId(c.id);
                                      }}
                                    >
                                      <Eye className="h-3 w-3 mr-1" />
                                      Lihat
                                    </button>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  {selectedCustomerId && (
                    <div className="mt-4 border rounded-lg p-4 bg-muted/40 text-xs md:text-sm">
                      {(() => {
                        const c = customerOrders.find((x) => x.id === selectedCustomerId)!;
                        const tour = agendaEvents.find((e) => e.id === c.tourId);
                        const statusLabelMap: Record<CustomerStatus, string> = {
                          mengisi_pemesanan: 'Mengisi pemesanan',
                          diproses: 'Sedang diproses',
                          sudah_booking: 'Sudah booking',
                          menunggu_pelaksanaan: 'Menunggu pelaksanaan',
                          selesai: 'Telah selesai',
                        };
                        return (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-sm">Rincian Pelanggan</p>
                                <p className="text-muted-foreground text-xs">Invoice {c.invoiceId}</p>
                              </div>
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs">
                                {statusLabelMap[c.status]}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <p className="font-medium">{c.name}</p>
                                <p className="text-muted-foreground">{c.email}</p>
                                <p className="text-muted-foreground">{c.phone}</p>
                              </div>
                              <div className="text-right md:text-left">
                                <p className="font-medium">{tour?.title}</p>
                                <p className="text-muted-foreground">{tour?.date} • {tour?.time}</p>
                                <p className="text-muted-foreground">{tour?.location}</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div>
                                <p className="text-muted-foreground">Jumlah Peserta</p>
                                <p className="font-medium">{c.participants} orang</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Metode Pembayaran</p>
                                <p className="font-medium">{c.paymentMethod}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Total Dibayar</p>
                                <p className="font-semibold text-primary">
                                  Rp{c.totalAmount.toLocaleString('id-ID')}
                                </p>
                              </div>
                            </div>

                            <div className="border-t pt-3 flex items-center justify-between">
                              <p className="text-muted-foreground">Tgl. Booking: {c.bookingDate}</p>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => toast.success('Invoice siap diunduh (demo)')}
                              >
                                Unduh Invoice
                              </Button>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Kelola Tour: kartu tour atau form detail (view terpisah) */}
        <TabsContent value="kelola-tour" className="space-y-6">
          {!showForm && (
            <Card className="border shadow-sm">
              <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex-1 flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Cari agenda & tour..."
                      className="pl-8 w-full md:w-80"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="hidden md:inline">Daftar layanan agenda & tour yang dikelola</span>
                  <span className="md:hidden">Total: {filteredEvents.length} layanan</span>
                </div>
              </CardHeader>
              <CardContent>
                {filteredEvents.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredEvents.map((event) => (
                      <Card
                        key={event.id}
                        className="overflow-hidden border rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <div className="relative h-40 overflow-hidden">
                          <img
                            src={event.image || destinasiData.find(d => d.id === event.id)?.image || '/hero-bg.gif'}
                            alt={event.title}
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                          <div className="absolute left-3 top-3">
                            <Badge className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full">
                              {event.category}
                            </Badge>
                          </div>
                        </div>

                        <CardHeader className="pb-2 pt-3">
                          <h3 className="font-semibold text-base leading-snug line-clamp-2">
                            {event.title}
                          </h3>
                        </CardHeader>
                        <CardContent className="pt-0 pb-3 px-4 space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <CalendarIcon className="h-4 w-4 text-emerald-600" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4 text-emerald-600" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4 text-emerald-600" />
                            <span className="line-clamp-1">{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4 text-emerald-600" />
                            <span>
                              {event.spots} spot tersedia • {event.duration}
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <div>
                              <p className="text-xs line-through text-muted-foreground">
                                Rp{event.originalPrice.toLocaleString('id-ID')}
                              </p>
                              <p className="text-base font-bold text-emerald-600">
                                Rp{event.price.toLocaleString('id-ID')}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                                ★ {event.rating}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                        <div className="px-4 pb-4 flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            className="flex-1 border-emerald-500 text-emerald-700 hover:bg-emerald-50"
                            onClick={() => handlePreview(event.slug)}
                          >
                            Lihat Halaman
                          </Button>
                          <Button
                            type="button"
                            className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
                            onClick={() => handleEdit(event.id)}
                          >
                            Kelola
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="rounded-full bg-emerald-50 p-3 mb-3">
                      <CalendarIcon className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-1">Belum ada layanan agenda & tour</h3>
                    <p className="text-sm text-muted-foreground mb-4 max-w-md">
                      Tambahkan layanan tour pertama Anda untuk mulai menerima pemesanan dari wisatawan.
                    </p>
                    <Button onClick={handleAddNew} className="bg-lamsel-green hover:bg-lamsel-green/80">
                      <Plus className="mr-2 h-4 w-4" /> Tambah Layanan Tour
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {showForm && (
            <Card className="border shadow-lg animate-fade-in overflow-hidden">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <div className="relative h-72 w-full">
                    <img
                      src={watchedImage || '/hero-bg.gif'}
                      alt={form.watch('name') || 'Preview Tour'}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <Badge className="bg-white/90 text-emerald-700">
                        {watchedCategory || 'Kategori'}
                      </Badge>
                      {form.watch('duration') && (
                        <span className="text-xs px-3 py-1 rounded-full bg-black/60 text-white">
                          {form.watch('duration')}
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-6 left-6 text-white space-y-2">
                      <p className="text-lg font-semibold">
                        {form.watch('location') || 'Lokasi tour'}
                      </p>
                      <h2 className="text-3xl font-bold max-w-3xl">
                        {form.watch('name') || 'Judul Tour'}
                      </h2>
                      <p className="text-sm text-white/80">
                        Minimal {form.watch('minParticipants') || '0'} orang • {form.watch('spots') || '0'} spot tersedia
                      </p>
                    </div>
                  </div>

                  <CardContent className="space-y-8">
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nama Tour</FormLabel>
                            <FormControl>
                              <Input placeholder="Taman Nasional Way Kambas - Elephant Safari" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kategori</FormLabel>
                            <FormControl>
                              <Input placeholder="Taman Nasional, Pantai, dll" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-4">
                      <FormField
                        control={form.control}
                        name="originalPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Harga Normal</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="250000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Harga Promo</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="180000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tanggal</FormLabel>
                            <FormControl>
                              <Input placeholder="15 Juni 2024" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Jam Operasional</FormLabel>
                            <FormControl>
                              <Input placeholder="08:00 - 16:00" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-4">
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lokasi</FormLabel>
                            <FormControl>
                              <Input placeholder="Labuhan Ratu, Lampung Timur" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Durasi</FormLabel>
                            <FormControl>
                              <Input placeholder="1 hari" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="minParticipants"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minimal Peserta</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="4" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="spots"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kuota</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="20" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>URL Gambar Hero</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/tour.jpg" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="bestTimeToVisit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Waktu Terbaik</FormLabel>
                            <FormControl>
                              <Input placeholder="Pagi hingga sore" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Deskripsi & Aktivitas</FormLabel>
                            <FormControl>
                              <Textarea rows={5} placeholder="Jelaskan pengalaman tour secara detail" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="longDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Catatan Tambahan</FormLabel>
                            <FormControl>
                              <Textarea rows={5} placeholder="Tambahkan informasi tambahan atau peringatan" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="highlightsText"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Highlight Tour (pisahkan dengan baris baru)</FormLabel>
                            <FormControl>
                              <Textarea rows={4} placeholder={"Elephant Safari\nBird Watching\nTrekking hutan tropis"} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {watchedHighlights && (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {watchedHighlights
                            .split('\n')
                            .map((item) => item.trim())
                            .filter(Boolean)
                            .map((item, index) => (
                              <div key={index} className="flex items-center gap-2 rounded-lg border p-3 bg-emerald-50 text-emerald-800">
                                <CheckCircle className="h-4 w-4" />
                                <span className="text-sm">{item}</span>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="itineraryText"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Itinerary Lengkap (pisahkan dengan baris baru)</FormLabel>
                            <FormControl>
                              <Textarea rows={4} placeholder={"Penjemputan di meeting point\nElephant Safari\nMakan siang"} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {watchedItinerary && (
                        <div className="grid sm:grid-cols-2 gap-3">
                          {watchedItinerary
                            .split('\n')
                            .map((item) => item.trim())
                            .filter(Boolean)
                            .map((item, index) => (
                              <div key={index} className="flex items-center gap-2 rounded-lg border p-3 bg-white">
                                <CheckCircle className="h-4 w-4 text-emerald-600" />
                                <span className="text-sm">{item}</span>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <p className="font-semibold">Fasilitas</p>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {availableFacilities.map((facility) => {
                          const selected = selectedFacilities.includes(facility.id);
                          return (
                            <button
                              type="button"
                              key={facility.id}
                              className={`flex items-center gap-2 rounded-lg border p-3 text-sm transition ${selected ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'hover:border-emerald-200'}`}
                              onClick={() => toggleFacility(facility.id)}
                            >
                              <CheckCircle className={`h-4 w-4 ${selected ? 'text-emerald-600' : 'text-gray-300'}`} />
                              {facility.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="font-semibold">Aktivitas Pilihan</p>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {availableActivities.map((activity) => {
                          const selected = selectedActivities.includes(activity.id);
                          return (
                            <button
                              type="button"
                              key={activity.id}
                              className={`flex items-center gap-2 rounded-lg border p-3 text-sm transition ${selected ? 'border-primary bg-primary/10 text-primary' : 'hover:border-primary/50'}`}
                              onClick={() => toggleActivity(activity.id)}
                            >
                              <CheckCircle className={`h-4 w-4 ${selected ? 'text-primary' : 'text-gray-300'}`} />
                              {activity.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="contactInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kontak Tour</FormLabel>
                            <FormControl>
                              <Input placeholder="Nomor telepon / WhatsApp" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="mapCoordinates"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Koordinat Peta</FormLabel>
                            <FormControl>
                              <Input placeholder="-4.9372806, 105.7625274" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>

                  <div className="flex justify-end space-x-2 pt-4 border-t px-6 pb-6">
                    <Button variant="outline" type="button" onClick={handleCancel}>
                      Batal
                    </Button>
                    <Button type="submit" className="shadow-md">
                      {editingId ? 'Perbarui Destinasi' : 'Tambah Destinasi'}
                    </Button>
                  </div>
                </form>
              </Form>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDestinasi;


