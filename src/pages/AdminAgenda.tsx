
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
  Calendar, 
  Edit, 
  Trash2, 
  Eye, 
  MapPin, 
  ImagePlus,
  Clock,
  Users,
  Info,
  DollarSign,
  Building,
  Phone,
  AlertCircle,
  Filter
} from 'lucide-react';
import { toast } from "sonner";

// Dummy data for demonstration
const agendaData = [
  { 
    id: 1, 
    title: 'Festival Krakatau', 
    date: '2025-06-15', 
    time: '08:00', 
    location: 'Pantai Anggariska', 
    participants: 120, 
    image: '/placeholder.svg',
    description: 'Festival tahunan memperingati sejarah Krakatau dengan berbagai pertunjukan seni dan budaya Lampung.',
    organizer: 'Dinas Pariwisata Lampung Timur',
    cost: '75000',
    included: ['Transportasi', 'Makan siang', 'Tiket masuk'],
    contactWhatsApp: '6285712345678'
  },
  { 
    id: 2, 
    title: 'Lampung Timur Expo', 
    date: '2025-07-10', 
    time: '09:00', 
    location: 'Taman Gisting', 
    participants: 250, 
    image: '/placeholder.svg',
    description: 'Pameran produk lokal dan pertunjukan seni budaya khas Lampung Timur.',
    organizer: 'Pemda Lampung Timur',
    cost: '50000',
    included: ['Welcome drink', 'Souvenir', 'Parkir gratis'],
    contactWhatsApp: '6285798765432'
  },
  { 
    id: 3, 
    title: 'Pesta Budaya Lampung', 
    date: '2025-08-05', 
    time: '16:00', 
    location: 'Menara Siger', 
    participants: 300, 
    image: '/placeholder.svg',
    description: 'Acara tahunan menampilkan keragaman budaya dan tradisi masyarakat Lampung.',
    organizer: 'Komunitas Budaya Lampung',
    cost: '100000',
    included: ['Transportasi', 'Makan malam', 'Pertunjukan'],
    contactWhatsApp: '6281234567890'
  },
  { 
    id: 4, 
    title: 'Festival Kuliner Lampung', 
    date: '2025-09-12', 
    time: '10:00', 
    location: 'Alun-alun Kalianda', 
    participants: 180, 
    image: '/placeholder.svg',
    description: 'Festival makanan khas Lampung dengan berbagai kuliner tradisional dan modern.',
    organizer: 'Asosiasi Kuliner Lampung',
    cost: '120000',
    included: ['Kupon makanan', 'Workshop memasak', 'Goodie bag'],
    contactWhatsApp: '6282187654321'
  },
  { 
    id: 5, 
    title: 'Lomba Perahu Nelayan', 
    date: '2025-10-20', 
    time: '07:30', 
    location: 'Pantai Anggariska', 
    participants: 90, 
    image: '/placeholder.svg',
    description: 'Kompetisi perahu tradisional yang diikuti oleh nelayan dari berbagai daerah di Lampung Timur.',
    organizer: 'Asosiasi Nelayan Lampung Timur',
    cost: '25000',
    included: ['Akses area penonton', 'Snack'],
    contactWhatsApp: '6289876543210'
  },
];

const AdminAgenda = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    participants: '',
    image: '/placeholder.svg',
    organizer: '',
    cost: '',
    included: [''],
    contactWhatsApp: ''
  });
  const [activeTab, setActiveTab] = useState('general');
  const [newIncludedItem, setNewIncludedItem] = useState('');

  const filteredData = agendaData.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      participants: '',
      image: '/placeholder.svg',
      organizer: '',
      cost: '',
      included: [''],
      contactWhatsApp: ''
    });
    setActiveTab('general');
    setShowForm(true);
  };

  const handleEdit = (id: number) => {
    const agenda = agendaData.find(item => item.id === id);
    if (agenda) {
      setEditingId(id);
      setFormData({
        title: agenda.title,
        date: agenda.date,
        time: agenda.time,
        location: agenda.location,
        description: agenda.description,
        participants: agenda.participants.toString(),
        image: agenda.image,
        organizer: agenda.organizer,
        cost: agenda.cost,
        included: agenda.included,
        contactWhatsApp: agenda.contactWhatsApp
      });
      setActiveTab('general');
      setShowForm(true);
    }
  };

  const handleDelete = (id: number) => {
    toast.success(`Agenda dengan ID ${id} berhasil dihapus`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date || !formData.location || !formData.description) {
      toast.error("Harap isi semua field yang diperlukan");
      return;
    }

    const whatsappRegex = /^628\d{8,11}$/;
    if (formData.contactWhatsApp && !whatsappRegex.test(formData.contactWhatsApp)) {
      toast.error("Format nomor WhatsApp tidak valid. Gunakan format 628xxxxxxxxxx");
      return;
    }

    if (editingId) {
      toast.success(`Agenda "${formData.title}" berhasil diperbarui`);
    } else {
      toast.success(`Agenda baru "${formData.title}" berhasil ditambahkan`);
    }
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const formatCurrency = (amount: string) => {
    const numAmount = parseFloat(amount);
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numAmount);
  };

  const handleAddIncludedItem = () => {
    if (newIncludedItem.trim()) {
      setFormData({
        ...formData,
        included: [...formData.included, newIncludedItem.trim()]
      });
      setNewIncludedItem('');
    }
  };

  const handleRemoveIncludedItem = (index: number) => {
    const updatedIncluded = [...formData.included];
    updatedIncluded.splice(index, 1);
    setFormData({
      ...formData,
      included: updatedIncluded
    });
  };

  const handleOpenWhatsApp = (phoneNumber: string) => {
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Kelola Agenda Travel</h1>
          <p className="text-sm text-muted-foreground">Kelola semua agenda event dan program travel di Lampung Timur</p>
        </div>
        <Button onClick={handleAddNew} className="shadow-md hover:shadow-lg transition-all text-sm h-9">
          <Plus className="mr-2 h-4 w-4" /> Tambah Agenda
        </Button>
      </div>

      {showForm ? (
        <Card className="border shadow-lg animate-fade-in">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-xl">{editingId ? 'Edit Agenda' : 'Tambah Agenda Baru'}</CardTitle>
            <CardDescription className="text-sm">
              {editingId 
                ? 'Perbarui informasi agenda event yang sudah ada' 
                : 'Lengkapi informasi untuk menambahkan agenda event baru'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-6 h-auto">
                <TabsTrigger value="general" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-2">
                  <Info size={14} />
                  <span className="hidden sm:inline">Umum</span>
                </TabsTrigger>
                <TabsTrigger value="description" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-2">
                  <Calendar size={14} />
                  <span className="hidden sm:inline">Deskripsi</span>
                </TabsTrigger>
                <TabsTrigger value="pricing" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-2">
                  <DollarSign size={14} />
                  <span className="hidden sm:inline">Biaya</span>
                </TabsTrigger>
                <TabsTrigger value="organizer" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-2">
                  <Building size={14} />
                  <span className="hidden sm:inline">Penyelenggara</span>
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <TabsContent value="general" className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-sm font-medium">Nama Agenda</Label>
                      <Input 
                        id="title" 
                        value={formData.title} 
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="Masukkan nama agenda" 
                        required 
                        className="text-sm h-9"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-sm font-medium">Lokasi</Label>
                      <div className="flex items-center space-x-2">
                        <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                        <Input 
                          id="location" 
                          value={formData.location} 
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          placeholder="Tempat pelaksanaan" 
                          required 
                          className="flex-1 text-sm h-9" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-sm font-medium">Tanggal</Label>
                      <div className="flex items-center space-x-2">
                        <Calendar size={14} className="text-gray-400 flex-shrink-0" />
                        <Input 
                          id="date" 
                          type="date"
                          value={formData.date} 
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                          required 
                          className="flex-1 text-sm h-9" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time" className="text-sm font-medium">Waktu</Label>
                      <div className="flex items-center space-x-2">
                        <Clock size={14} className="text-gray-400 flex-shrink-0" />
                        <Input 
                          id="time" 
                          type="time"
                          value={formData.time} 
                          onChange={(e) => setFormData({...formData, time: e.target.value})}
                          required 
                          className="flex-1 text-sm h-9" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="participants" className="text-sm font-medium">Target Peserta</Label>
                      <div className="flex items-center space-x-2">
                        <Users size={14} className="text-gray-400 flex-shrink-0" />
                        <Input 
                          id="participants" 
                          type="number"
                          value={formData.participants} 
                          onChange={(e) => setFormData({...formData, participants: e.target.value})}
                          placeholder="Jumlah peserta" 
                          required 
                          className="flex-1 text-sm h-9" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="image" className="text-sm font-medium">Poster Agenda</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                        <ImagePlus className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                        <div className="mt-2">
                          <p className="text-xs sm:text-sm font-medium">Klik untuk upload poster</p>
                          <p className="text-xs text-gray-500">SVG, PNG, JPG (maks. 2MB)</p>
                        </div>
                        <input id="image" type="file" className="hidden" />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="description" className="space-y-4">
                  <div className="space-y-4">
                    <Label htmlFor="description" className="text-sm font-medium">Deskripsi Agenda</Label>
                    <Textarea 
                      id="description" 
                      value={formData.description} 
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Deskripsi lengkap agenda" 
                      required
                      className="min-h-[150px] sm:min-h-[200px] text-sm"
                    />
                    <div className="bg-blue-50 p-3 sm:p-4 rounded-md border border-blue-100">
                      <div className="flex items-start gap-3">
                        <AlertCircle size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-blue-700">Tips Menulis Deskripsi yang Baik</p>
                          <ul className="text-xs sm:text-sm text-blue-600 mt-1 list-disc pl-4 sm:pl-5 space-y-1">
                            <li>Jelaskan secara detail tentang kegiatan yang akan dilakukan</li>
                            <li>Sebutkan keunggulan atau keunikan dari agenda travel ini</li>
                            <li>Berikan informasi tentang durasi dan hal yang perlu dipersiapkan peserta</li>
                            <li>Gunakan bahasa yang mudah dipahami dan menarik</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="pricing" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cost" className="text-sm font-medium">Biaya Partisipasi</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <DollarSign size={14} className="text-gray-400 flex-shrink-0" />
                        <Input 
                          id="cost" 
                          type="number"
                          value={formData.cost} 
                          onChange={(e) => setFormData({...formData, cost: e.target.value})}
                          placeholder="Masukkan biaya dalam Rupiah" 
                          required 
                          className="flex-1 text-sm h-9" 
                        />
                      </div>
                      {formData.cost && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Ditampilkan sebagai: {formatCurrency(formData.cost)}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Fasilitas Yang Termasuk</Label>
                      
                      <div className="space-y-2">
                        {formData.included.map((item, index) => (
                          item && (
                            <div key={index} className="flex items-center gap-2">
                              <Checkbox id={`included-${index}`} checked className="flex-shrink-0" />
                              <Input 
                                value={item}
                                onChange={(e) => {
                                  const updated = [...formData.included];
                                  updated[index] = e.target.value;
                                  setFormData({...formData, included: updated});
                                }}
                                className="flex-1 text-sm h-8"
                              />
                              <Button 
                                type="button"
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleRemoveIncludedItem(index)}
                                className="h-8 w-8 text-red-500 flex-shrink-0"
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          )
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <Input 
                          placeholder="Tambah fasilitas baru" 
                          value={newIncludedItem}
                          onChange={(e) => setNewIncludedItem(e.target.value)}
                          className="text-sm h-8"
                        />
                        <Button 
                          type="button"
                          onClick={handleAddIncludedItem}
                          variant="outline"
                          className="text-sm h-8 px-3"
                        >
                          Tambah
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="organizer" className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="organizer" className="text-sm font-medium">Nama Penyelenggara</Label>
                      <div className="flex items-center space-x-2">
                        <Building size={14} className="text-gray-400 flex-shrink-0" />
                        <Input 
                          id="organizer" 
                          value={formData.organizer} 
                          onChange={(e) => setFormData({...formData, organizer: e.target.value})}
                          placeholder="Nama penyelenggara atau provider travel" 
                          required 
                          className="flex-1 text-sm h-9" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contactWhatsApp" className="text-sm font-medium">Nomor WhatsApp</Label>
                      <div className="flex items-center space-x-2">
                        <Phone size={14} className="text-green-500 flex-shrink-0" />
                        <Input 
                          id="contactWhatsApp" 
                          value={formData.contactWhatsApp} 
                          onChange={(e) => setFormData({...formData, contactWhatsApp: e.target.value})}
                          placeholder="Format: 628xxxxxxxxxx" 
                          required 
                          className="flex-1 text-sm h-9" 
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Contoh: 6281234567890 (tanpa tanda + atau spasi)
                      </p>
                    </div>

                    <div className="sm:col-span-2 p-3 sm:p-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-start gap-3">
                        <Phone size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-green-700">Integrasi WhatsApp</p>
                          <p className="text-xs sm:text-sm text-green-600 mt-1">
                            Nomor WhatsApp ini akan digunakan sebagai kontak untuk tombol "Hubungi Penyedia" pada 
                            halaman detail agenda. Pengunjung akan diarahkan ke chat WhatsApp dengan penyelenggara secara langsung.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4 border-t">
                  <Button variant="outline" type="button" onClick={handleCancel} className="text-sm h-9">
                    Batal
                  </Button>
                  <Button type="submit" className="shadow-md text-sm h-9">
                    {editingId ? 'Perbarui Agenda' : 'Tambah Agenda'}
                  </Button>
                </div>
              </form>
            </Tabs>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Cari agenda..."
                  className="pl-8 w-full sm:w-64 lg:w-80 text-sm h-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="rounded-lg h-8 text-xs">
                  <Filter className="mr-1 h-3 w-3" /> Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-8 text-center text-xs">ID</TableHead>
                      <TableHead className="w-12 text-xs">Poster</TableHead>
                      <TableHead className="text-xs">Nama Agenda</TableHead>
                      <TableHead className="hidden sm:table-cell text-xs">Tanggal</TableHead>
                      <TableHead className="hidden md:table-cell text-xs">Lokasi</TableHead>
                      <TableHead className="hidden lg:table-cell text-xs">Penyelenggara</TableHead>
                      <TableHead className="text-xs">Biaya</TableHead>
                      <TableHead className="text-center w-20 text-xs">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.length > 0 ? (
                      filteredData.map((agenda) => (
                        <TableRow key={agenda.id} className="hover:bg-muted/50 transition-colors">
                          <TableCell className="text-center font-medium text-xs">{agenda.id}</TableCell>
                          <TableCell>
                            <img 
                              src={agenda.image} 
                              alt={agenda.title} 
                              className="w-8 h-8 sm:w-10 sm:h-10 rounded-md object-cover border" 
                            />
                          </TableCell>
                          <TableCell className="font-medium text-xs">
                            <div className="max-w-32 sm:max-w-40 truncate">{agenda.title}</div>
                            <div className="sm:hidden text-xs text-muted-foreground mt-1">
                              {formatDate(agenda.date)}
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-xs">{formatDate(agenda.date)}</TableCell>
                          <TableCell className="hidden md:table-cell text-xs">
                            <div className="max-w-32 lg:max-w-40 truncate">{agenda.location}</div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell text-xs">
                            <div className="max-w-32 xl:max-w-40 truncate">{agenda.organizer}</div>
                          </TableCell>
                          <TableCell className="text-xs">
                            <div className="max-w-20 truncate">{formatCurrency(agenda.cost)}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-center gap-1">
                              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleEdit(agenda.id)}>
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-7 w-7 text-green-500"
                                onClick={() => handleOpenWhatsApp(agenda.contactWhatsApp)}
                              >
                                <Phone className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500" onClick={() => handleDelete(agenda.id)}>
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-6 text-muted-foreground text-sm">
                          Tidak ditemukan data agenda yang sesuai dengan pencarian
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">
                Menampilkan {filteredData.length} dari {agendaData.length} agenda
              </p>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled className="text-xs h-8">
                  Sebelumnya
                </Button>
                <Button variant="outline" size="sm" className="bg-blue-50 text-xs h-8">
                  1
                </Button>
                <Button variant="outline" size="sm" className="text-xs h-8">
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

export default AdminAgenda;
