import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  XCircle
} from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { lampungTimurDestinations } from '@/data/lampungTimurDestinations';

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
  contactInfo: '(0725) 543200'
}));

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
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  
  // Create form using react-hook-form
  const form = useForm({
    defaultValues: {
      name: '',
      category: '',
      location: '',
      description: '',
      longDescription: '',
      openHours: '',
      entryFee: '',
      bestTimeToVisit: '',
      mapCoordinates: '',
      contactInfo: '',
      image: '/placeholder.svg',
      status: 'Aktif'
    }
  });

  const filteredData = destinasiData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setEditingId(null);
    form.reset({
      name: '',
      category: '',
      location: '',
      description: '',
      longDescription: '',
      openHours: '',
      entryFee: '',
      bestTimeToVisit: '',
      mapCoordinates: '',
      contactInfo: '',
      image: '/placeholder.svg',
      status: 'Aktif'
    });
    setSelectedFacilities([]);
    setSelectedActivities([]);
    setShowForm(true);
  };

  const handleEdit = (id: number) => {
    const destinasi = destinasiData.find(item => item.id === id);
    if (destinasi) {
      setEditingId(id);
      form.reset({
        name: destinasi.name,
        category: destinasi.category,
        location: destinasi.location,
        description: destinasi.description || '',
        longDescription: destinasi.longDescription || '',
        openHours: destinasi.openHours || '',
        entryFee: destinasi.entryFee || '',
        bestTimeToVisit: destinasi.bestTimeToVisit || '',
        mapCoordinates: destinasi.mapCoordinates || '',
        contactInfo: destinasi.contactInfo || '',
        image: destinasi.image,
        status: destinasi.status
      });
      setSelectedFacilities(destinasi.facilities || []);
      setSelectedActivities(destinasi.activities || []);
      setShowForm(true);
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
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handlePreview = (slug: string) => {
    // Preview destination page with SEO-friendly URL
    window.open(`/destinasi/${slug}`, '_blank');
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Kelola Destinasi Wisata</h1>
          <p className="text-muted-foreground">Kelola semua destinasi wisata di Lampung Timur</p>
        </div>
        <Button onClick={handleAddNew} className="shadow-md hover:shadow-lg transition-all">
          <Plus className="mr-2 h-4 w-4" /> Tambah Destinasi
        </Button>
      </div>

      {showForm ? (
        <Card className="border shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Destinasi' : 'Tambah Destinasi Baru'}</CardTitle>
            <CardDescription>
              {editingId 
                ? 'Perbarui informasi destinasi wisata yang sudah ada' 
                : 'Lengkapi informasi untuk menambahkan destinasi wisata baru'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <Tabs defaultValue="general" className="w-full">
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="general">Umum</TabsTrigger>
                    <TabsTrigger value="about">Tentang</TabsTrigger>
                    <TabsTrigger value="facilities">Fasilitas & Aktivitas</TabsTrigger>
                    <TabsTrigger value="location">Lokasi</TabsTrigger>
                  </TabsList>
                
                  {/* General Information Tab */}
                  <TabsContent value="general" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nama Destinasi</FormLabel>
                            <FormControl>
                              <Input placeholder="Masukkan nama destinasi" {...field} />
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
                              <Input placeholder="Contoh: Wisata Alam, Wisata Budaya" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                              <select 
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                {...field}
                              >
                                <option value="Aktif">Aktif</option>
                                <option value="Tidak Aktif">Tidak Aktif</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Deskripsi Singkat</FormLabel>
                            <FormControl>
                              <Input placeholder="Deskripsi singkat destinasi" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="image">Foto Destinasi</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                        <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-2">
                          <p className="text-sm font-medium">Klik untuk upload foto</p>
                          <p className="text-xs text-gray-500">SVG, PNG, JPG (maks. 2MB)</p>
                        </div>
                        <input id="image" type="file" className="hidden" />
                      </div>
                    </div>
                  </TabsContent>
                
                  {/* About Tab */}
                  <TabsContent value="about" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="openHours"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Jam Buka</FormLabel>
                            <FormControl>
                              <Input placeholder="Contoh: 06:00 - 18:00" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="entryFee"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tiket Masuk</FormLabel>
                            <FormControl>
                              <Input placeholder="Contoh: Rp 10.000 / orang" {...field} />
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
                            <FormLabel>Waktu Terbaik Berkunjung</FormLabel>
                            <FormControl>
                              <Input placeholder="Contoh: Pagi hingga sore hari" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="contactInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Informasi Kontak</FormLabel>
                            <FormControl>
                              <Input placeholder="Nomor telepon pengelola" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="longDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deskripsi Lengkap</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Deskripsi lengkap destinasi wisata" 
                              className="min-h-32"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                
                  {/* Facilities and Activities Tab */}
                  <TabsContent value="facilities" className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Fasilitas</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {availableFacilities.map(facility => (
                          <div key={facility.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`facility-${facility.id}`} 
                              checked={selectedFacilities.includes(facility.label)}
                              onCheckedChange={() => toggleFacility(facility.label)}
                            />
                            <label 
                              htmlFor={`facility-${facility.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {facility.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Aktivitas</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {availableActivities.map(activity => (
                          <div key={activity.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`activity-${activity.id}`} 
                              checked={selectedActivities.includes(activity.label)}
                              onCheckedChange={() => toggleActivity(activity.label)}
                            />
                            <label 
                              htmlFor={`activity-${activity.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {activity.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                
                  {/* Location Tab */}
                  <TabsContent value="location" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lokasi</FormLabel>
                          <FormControl>
                            <div className="flex items-center space-x-2">
                              <MapPin size={16} className="text-gray-400" />
                              <Input placeholder="Contoh: Kec. Bakauheni" {...field} className="flex-1" />
                            </div>
                          </FormControl>
                          <FormDescription>Masukkan nama desa dan kecamatan lokasi destinasi</FormDescription>
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
                            <Input placeholder="Contoh: -5.8715, 105.7663" {...field} />
                          </FormControl>
                          <FormDescription>Masukkan koordinat latitude dan longitude</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-semibold mb-2">Peta Interaktif</h3>
                      <div className="bg-gray-200 rounded h-48 flex items-center justify-center">
                        <p className="text-sm text-gray-500">Peta akan ditampilkan di sini</p>
                        {/* Here you would integrate an interactive map */}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Anda dapat mengklik pada peta untuk menentukan koordinat lokasi</p>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button variant="outline" type="button" onClick={handleCancel}>
                    Batal
                  </Button>
                  <Button type="submit" className="shadow-md">
                    {editingId ? 'Perbarui Destinasi' : 'Tambah Destinasi'}
                  </Button>
                </div>
              </form>
            </Form>
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
                  placeholder="Cari destinasi..."
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
                  <option value="alam">Wisata Alam</option>
                  <option value="budaya">Wisata Budaya</option>
                  <option value="edukasi">Wisata Edukasi</option>
                  <option value="landmark">Landmark</option>
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
                      <TableHead>Nama Destinasi</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Lokasi</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Pengunjung</TableHead>
                      <TableHead className="text-center w-28">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.length > 0 ? (
                      filteredData.map((destinasi) => (
                        <TableRow key={destinasi.id} className="hover:bg-muted/50 transition-colors">
                          <TableCell className="text-center font-medium">{destinasi.id}</TableCell>
                          <TableCell>
                            <img 
                              src={destinasi.image} 
                              alt={destinasi.name} 
                              className="w-10 h-10 rounded-md object-cover border" 
                            />
                          </TableCell>
                          <TableCell className="font-medium">{destinasi.name}</TableCell>
                          <TableCell>{destinasi.category}</TableCell>
                          <TableCell>{destinasi.location}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              destinasi.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {destinasi.status === 'Aktif' ? (
                                <CheckCircle className="mr-1 h-3 w-3" />
                              ) : (
                                <XCircle className="mr-1 h-3 w-3" />
                              )}
                              {destinasi.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">{destinasi.visitors.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex justify-center gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(destinasi.id)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-blue-500"
                                onClick={() => handlePreview(destinasi.slug)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(destinasi.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                          Tidak ditemukan data destinasi yang sesuai dengan pencarian
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Menampilkan {filteredData.length} dari {destinasiData.length} destinasi
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

export default AdminDestinasi;

