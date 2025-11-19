import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Textarea } from "@/components/ui/textarea";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Map, Edit, Trash, MoreHorizontal, Plus, Upload, Search, MapPin } from 'lucide-react';
import { lampungTimurDistricts } from '@/data/lampungTimurDistricts';

// Type definitions for kecamatan data
interface KecamatanAttraction {
  id: number;
  name: string;
}

interface KecamatanProduct {
  id: number;
  name: string;
}

interface KecamatanData {
  id: number;
  name: string;
  description: string;
  image: string;
  landmarks: number;
  villages: number;
  population: number;
  area: number;
  leader?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  attractions?: KecamatanAttraction[];
  products?: KecamatanProduct[];
}

// Data 24 kecamatan resmi Lampung Timur - diambil dari halaman website
const kecamatanData: KecamatanData[] = lampungTimurDistricts.map(district => ({
  id: district.id,
  name: district.name,
  description: district.description,
  image: district.image,
  landmarks: district.attractions?.length || 0,
  villages: district.totalVillages,
  population: parseInt(district.population.replace(/,/g, '')) || 0,
  area: parseFloat(district.area.replace(' km²', '')) || 0,
  leader: district.leader,
  address: district.address,
  phone: district.phone,
  email: district.email,
  website: district.website,
  attractions: district.attractions?.map((attr, idx) => ({ id: idx + 1, name: attr })) || [],
  products: district.products?.map((prod, idx) => ({ id: idx + 1, name: prod })) || []
}));

const AdminKecamatan = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingKecamatan, setEditingKecamatan] = useState<KecamatanData | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [kecamatanToDelete, setKecamatanToDelete] = useState<KecamatanData | null>(null);
  const [activeEditTab, setActiveEditTab] = useState('profile');
  const [selectedDistrictId, setSelectedDistrictId] = useState<number>(kecamatanData[0]?.id || 1);
  
  // State untuk form edit
  const [formData, setFormData] = useState<KecamatanData | null>(null);
  const [newAttraction, setNewAttraction] = useState('');
  const [newProduct, setNewProduct] = useState('');

  // Filter kecamatan based on search query
  const filteredKecamatan = kecamatanData.filter(kecamatan => 
    kecamatan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    kecamatan.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedDistrict = kecamatanData.find(k => k.id === selectedDistrictId) || kecamatanData[0];

  // Set form data when editing kecamatan
  useEffect(() => {
    if (editingKecamatan) {
      setFormData({
        ...editingKecamatan,
        attractions: editingKecamatan.attractions ? [...editingKecamatan.attractions] : [],
        products: editingKecamatan.products ? [...editingKecamatan.products] : []
      });
    }
  }, [editingKecamatan]);

  const handleAdd = () => {
    setIsAddDialogOpen(false);
    toast.success('Kecamatan berhasil ditambahkan!');
  };

  const handleEdit = (kecamatan: KecamatanData) => {
    setEditingKecamatan(kecamatan);
    setActiveEditTab('profile');
  };

  const handleDelete = (kecamatan: KecamatanData) => {
    setKecamatanToDelete(kecamatan);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setIsDeleteDialogOpen(false);
    setKecamatanToDelete(null);
    toast.success('Kecamatan berhasil dihapus!');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const fieldName = id.replace('edit-', '');
    
    if (formData) {
      setFormData({
        ...formData,
        [fieldName]: value
      });
    }
  };

  const handleAddAttraction = () => {
    if (newAttraction.trim() !== '' && formData) {
      const attractions = formData.attractions || [];
      const newAttractionObj = {
        id: attractions.length > 0 ? Math.max(...attractions.map(a => a.id)) + 1 : 1,
        name: newAttraction.trim()
      };
      
      setFormData({
        ...formData,
        attractions: [...attractions, newAttractionObj]
      });
      setNewAttraction('');
    }
  };

  const handleRemoveAttraction = (id: number) => {
    if (formData && formData.attractions) {
      setFormData({
        ...formData,
        attractions: formData.attractions.filter(a => a.id !== id)
      });
    }
  };

  const handleAddProduct = () => {
    if (newProduct.trim() !== '' && formData) {
      const products = formData.products || [];
      const newProductObj = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name: newProduct.trim()
      };
      
      setFormData({
        ...formData,
        products: [...products, newProductObj]
      });
      setNewProduct('');
    }
  };

  const handleRemoveProduct = (id: number) => {
    if (formData && formData.products) {
      setFormData({
        ...formData,
        products: formData.products.filter(p => p.id !== id)
      });
    }
  };

  const handleUpdate = () => {
    // Simpan perubahan ke database (dalam kasus ini hanya contoh)
    setEditingKecamatan(null);
    toast.success('Kecamatan berhasil diperbarui!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <Map className="mr-2" size={24} />
          Kelola Kecamatan
        </h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2" size={16} />
              Tambah Kecamatan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tambah Kecamatan Baru</DialogTitle>
              <DialogDescription>
                Isi detail kecamatan baru di bawah ini. Pastikan data yang dimasukkan sudah benar.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="kecamatan-name">Nama Kecamatan</Label>
                <Input id="kecamatan-name" placeholder="Masukkan nama kecamatan" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="total-villages">Jumlah Desa</Label>
                <Input id="total-villages" type="number" placeholder="Masukkan jumlah desa" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Luas Wilayah (km²)</Label>
                <Input id="area" type="number" step="0.1" placeholder="Masukkan luas wilayah" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="population">Jumlah Penduduk</Label>
                <Input id="population" type="number" placeholder="Masukkan jumlah penduduk" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea 
                  id="description" 
                  placeholder="Masukkan deskripsi kecamatan"
                  rows={4}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="image">Foto Kecamatan</Label>
                <div className="border-2 border-dashed rounded-md p-6 text-center">
                  <Upload className="mx-auto mb-2 text-gray-400" size={24} />
                  <p className="text-sm text-gray-500">Drag & drop file di sini atau klik untuk memilih file</p>
                  <p className="text-xs text-gray-400 mt-1">Mendukung: JPG, PNG, WEBP (Maks. 2MB)</p>
                  <Input id="image" type="file" className="hidden" />
                  <Button variant="outline" size="sm" className="mt-4">
                    Pilih File
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleAdd}>
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Kelola Kecamatan - panel atas */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <CardTitle className="text-lg">Kelola Kecamatan</CardTitle>
              <CardDescription>Pilih kecamatan dan kelola informasinya</CardDescription>
            </div>
            <select
              className="flex h-10 w-full md:w-80 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={selectedDistrictId}
              onChange={(e) => setSelectedDistrictId(Number(e.target.value))}
            >
              {kecamatanData.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profil" className="w-full">
            <TabsList className="flex justify-center flex-wrap gap-2 w-full">
              <TabsTrigger value="profil">Profil</TabsTrigger>
              <TabsTrigger value="umkm">UMKM</TabsTrigger>
              <TabsTrigger value="pariwisata">Pariwisata</TabsTrigger>
            </TabsList>

            <TabsContent value="profil" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Profil Kecamatan</CardTitle>
                    <CardDescription>Ringkasan untuk {selectedDistrict?.name}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div><span className="text-gray-600">Nama:</span> {selectedDistrict?.name}</div>
                    <div><span className="text-gray-600">Camat:</span> {selectedDistrict?.leader || '-'}</div>
                    <div><span className="text-gray-600">Alamat:</span> {selectedDistrict?.address || '-'}</div>
                    <div><span className="text-gray-600">Website:</span> {selectedDistrict?.website || '-'}</div>
                    <div className="pt-2">
                      <Button size="sm" onClick={() => window.location.assign(`/admin/kecamatan/profile/${selectedDistrict?.id}`)}>Edit Profil Kecamatan</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Statistik</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-xs text-gray-600">Desa</div>
                      <div className="text-lg font-semibold">{selectedDistrict?.villages}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Penduduk</div>
                      <div className="text-lg font-semibold">{selectedDistrict?.population.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Landmark</div>
                      <div className="text-lg font-semibold">{selectedDistrict?.landmarks}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="umkm">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(selectedDistrict?.products || []).map((p) => (
                  <Card key={p.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{p.name}</CardTitle>
                      <CardDescription>Pemilik: -</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-28 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 text-sm">Foto UMKM</div>
                    </CardContent>
                  </Card>
                ))}
                {(selectedDistrict?.products || []).length === 0 && (
                  <div className="text-sm text-gray-500">Belum ada UMKM terdaftar untuk kecamatan ini</div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="pariwisata">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(selectedDistrict?.attractions || []).map((a) => (
                  <Card key={a.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{a.name}</CardTitle>
                      <CardDescription>Penyelenggara: -</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-28 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 text-sm">Foto Destinasi</div>
                    </CardContent>
                  </Card>
                ))}
                {(selectedDistrict?.attractions || []).length === 0 && (
                  <div className="text-sm text-gray-500">Belum ada destinasi wisata terdaftar</div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Daftar Kecamatan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Daftar Kecamatan</CardTitle>
              <CardDescription>Kelola semua kecamatan di Kabupaten Lampung Timur</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari kecamatan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="list">Tampilan Daftar</TabsTrigger>
              <TabsTrigger value="map">Tampilan Peta</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Kecamatan</TableHead>
                      <TableHead>Desa</TableHead>
                      <TableHead>Luas (km²)</TableHead>
                      <TableHead>Penduduk</TableHead>
                      <TableHead>Landmark</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredKecamatan.length > 0 ? (
                      filteredKecamatan.map((kecamatan) => (
                        <TableRow key={kecamatan.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-md bg-gray-100 mr-2 relative overflow-hidden">
                                <MapPin className="absolute inset-1.5 text-gray-400" />
                              </div>
                              {kecamatan.name}
                            </div>
                          </TableCell>
                          <TableCell>{kecamatan.villages}</TableCell>
                          <TableCell>{kecamatan.area}</TableCell>
                          <TableCell>{kecamatan.population.toLocaleString()}</TableCell>
                          <TableCell>{kecamatan.landmarks}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal size={16} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onSelect={() => handleEdit(kecamatan)}>
                                  <Edit className="mr-2" size={14} />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onSelect={() => handleDelete(kecamatan)} 
                                  className="text-red-600"
                                >
                                  <Trash className="mr-2" size={14} />
                                  Hapus
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                          Tidak ada kecamatan yang ditemukan
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="map">
              <div className="border rounded-md p-4">
                <div className="aspect-[16/9] bg-gray-100 rounded-md flex items-center justify-center">
                  <div className="text-center p-8">
                    <Map size={48} className="mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium mb-2">Peta Kecamatan</h3>
                    <p className="text-sm text-gray-500 max-w-md mx-auto mb-4">
                      Lihat persebaran kecamatan di Kabupaten Lampung Timur dengan peta interaktif.
                    </p>
                    <Button variant="outline">
                      Muat Peta Interaktif
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Edit Dialog with Tabs */}
      <Dialog open={!!editingKecamatan} onOpenChange={(open) => !open && setEditingKecamatan(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Kecamatan {formData?.name}</DialogTitle>
            <DialogDescription>
              Perbarui informasi untuk kecamatan ini.
            </DialogDescription>
          </DialogHeader>
          
          {formData && (
            <>
              <Tabs value={activeEditTab} onValueChange={setActiveEditTab} className="w-full">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="profile">Profil</TabsTrigger>
                  <TabsTrigger value="contact">Kontak</TabsTrigger>
                  <TabsTrigger value="attractions">Destinasi Wisata</TabsTrigger>
                  <TabsTrigger value="products">Produk Unggulan</TabsTrigger>
                </TabsList>
                
                {/* Tab Profil */}
                <TabsContent value="profile" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-name">Nama Kecamatan</Label>
                      <Input 
                        id="edit-name" 
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-leader">Nama Camat</Label>
                      <Input 
                        id="edit-leader" 
                        value={formData.leader || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-villages">Jumlah Desa</Label>
                      <Input 
                        id="edit-villages" 
                        type="number" 
                        value={formData.villages}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-area">Luas Wilayah (km²)</Label>
                      <Input 
                        id="edit-area" 
                        type="number" 
                        step="0.1" 
                        value={formData.area}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-population">Jumlah Penduduk</Label>
                      <Input 
                        id="edit-population" 
                        type="number" 
                        value={formData.population}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-landmarks">Jumlah Landmark</Label>
                      <Input 
                        id="edit-landmarks" 
                        type="number" 
                        value={formData.landmarks}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="edit-description">Deskripsi</Label>
                      <Textarea 
                        id="edit-description" 
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="edit-image">Foto Kecamatan</Label>
                      <div className="flex items-center space-x-4">
                        <div className="w-24 h-24 rounded-md bg-gray-100 relative overflow-hidden">
                          <MapPin className="absolute inset-1.5 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <div className="border-2 border-dashed rounded-md p-4 text-center">
                            <Upload className="mx-auto mb-2 text-gray-400" size={20} />
                            <p className="text-sm text-gray-500">Pilih file baru untuk mengganti foto</p>
                            <Input id="edit-image" type="file" className="hidden" />
                            <Button variant="outline" size="sm" className="mt-2">
                              Pilih File
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Tab Kontak */}
                <TabsContent value="contact" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-address">Alamat</Label>
                      <Input 
                        id="edit-address" 
                        value={formData.address || ''}
                        onChange={handleInputChange}
                        placeholder="Masukkan alamat lengkap"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-phone">No. Telepon</Label>
                      <Input 
                        id="edit-phone" 
                        value={formData.phone || ''}
                        onChange={handleInputChange}
                        placeholder="Contoh: (0727) 123456"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-email">Email</Label>
                      <Input 
                        id="edit-email" 
                        type="email" 
                        value={formData.email || ''}
                        onChange={handleInputChange}
                        placeholder="contoh@lampungselatan.go.id"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-website">Website</Label>
                      <Input 
                        id="edit-website" 
                        value={formData.website || ''}
                        onChange={handleInputChange}
                        placeholder="website.lampungselatan.go.id"
                      />
                    </div>
                  </div>
                </TabsContent>
                
                {/* Tab Destinasi Wisata */}
                <TabsContent value="attractions" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-end space-x-2">
                      <div className="flex-1 space-y-2">
                        <Label htmlFor="new-attraction">Tambah Destinasi Wisata Baru</Label>
                        <Input 
                          id="new-attraction" 
                          placeholder="Masukkan nama destinasi wisata"
                          value={newAttraction}
                          onChange={(e) => setNewAttraction(e.target.value)}
                        />
                      </div>
                      <Button 
                        onClick={handleAddAttraction}
                        disabled={!newAttraction.trim()}
                      >
                        Tambah
                      </Button>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      {formData.attractions && formData.attractions.length > 0 ? (
                        <div className="space-y-2">
                          {formData.attractions.map((attraction) => (
                            <div key={attraction.id} className="flex items-center justify-between p-2 border rounded-md">
                              <span>{attraction.name}</span>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 text-red-600"
                                onClick={() => handleRemoveAttraction(attraction.id)}
                              >
                                <Trash size={16} />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-gray-500">
                          Belum ada destinasi wisata yang ditambahkan
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                {/* Tab Produk Unggulan */}
                <TabsContent value="products" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-end space-x-2">
                      <div className="flex-1 space-y-2">
                        <Label htmlFor="new-product">Tambah Produk Unggulan Baru</Label>
                        <Input 
                          id="new-product" 
                          placeholder="Masukkan nama produk"
                          value={newProduct}
                          onChange={(e) => setNewProduct(e.target.value)}
                        />
                      </div>
                      <Button 
                        onClick={handleAddProduct}
                        disabled={!newProduct.trim()}
                      >
                        Tambah
                      </Button>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      {formData.products && formData.products.length > 0 ? (
                        <div className="space-y-2">
                          {formData.products.map((product) => (
                            <div key={product.id} className="flex items-center justify-between p-2 border rounded-md">
                              <span>{product.name}</span>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 text-red-600"
                                onClick={() => handleRemoveProduct(product.id)}
                              >
                                <Trash size={16} />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-gray-500">
                          Belum ada produk unggulan yang ditambahkan
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => setEditingKecamatan(null)}>
                  Batal
                </Button>
                <Button onClick={handleUpdate}>
                  Simpan Perubahan
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus kecamatan <strong>{kecamatanToDelete?.name}</strong>? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Ya, Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminKecamatan;

