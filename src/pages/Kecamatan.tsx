import React, { useState, useMemo, memo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Users, Building, Landmark, Phone, Mail, Globe, ChevronDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { lampungTimurDistricts } from '@/data/lampungTimurDistricts';

// Data 24 kecamatan resmi di Kabupaten Lampung Timur
const districts = lampungTimurDistricts;

// Memoized district detail component for performance
const DistrictDetail = memo(({ district }: { district: any }) => {
  return (
    <div className="relative mb-6 h-64 overflow-hidden rounded-xl">
      <img 
        src={district.image} 
        alt={district.name} 
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6">
        <h2 className="text-3xl font-bold text-white">Kecamatan {district.name}</h2>
      </div>
    </div>
  );
});

DistrictDetail.displayName = 'DistrictDetail';

const Kecamatan = () => {
  const [selectedDistrictId, setSelectedDistrictId] = useState(districts[0].id.toString());
  
  // Use useMemo to avoid unnecessary recalculation
  const activeDistrict = useMemo(() => {
    return districts.find(d => d.id.toString() === selectedDistrictId) || districts[0];
  }, [selectedDistrictId]);
  
  // Memoized sorted districts for dropdown
  const sortedDistricts = useMemo(() => {
    return [...districts].sort((a, b) => a.name.localeCompare(b.name));
  }, []);
  
  const handleDistrictChange = (value: string) => {
    setSelectedDistrictId(value);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-20 pb-8 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Kecamatan Lampung Timur</h1>
          <p className="text-white/90 text-lg">Jelajahi 24 kecamatan di Kabupaten Lampung Timur</p>
        </div>
      </div>
      
      {/* District Detail Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Dropdown Selector for Districts */}
        <div className="mb-8 max-w-xl mx-auto">
          <label className="block text-sm font-medium mb-2">Pilih Kecamatan:</label>
          <Select value={selectedDistrictId} onValueChange={handleDistrictChange}>
            <SelectTrigger className="w-full h-12 text-lg">
              <SelectValue placeholder="Pilih kecamatan..." />
            </SelectTrigger>
            <SelectContent className="max-h-[400px]">
              {sortedDistricts.map((district) => (
                <SelectItem 
                  key={district.id} 
                  value={district.id.toString()}
                  className="text-base py-3"
                >
                  Kecamatan {district.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          {/* District Detail */}
          <div>
            <DistrictDetail district={activeDistrict} />
            
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="profile">Profil</TabsTrigger>
                <TabsTrigger value="contact">Kontak</TabsTrigger>
                <TabsTrigger value="attractions">Wisata</TabsTrigger>
                <TabsTrigger value="products">Produk</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Profil Kecamatan</CardTitle>
                    <CardDescription>
                      Informasi umum tentang Kecamatan {activeDistrict.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">
                      {activeDistrict.description}
                    </p>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="flex flex-col items-center rounded-lg bg-primary/5 p-4 text-center transition-all hover:bg-primary/10">
                        <Users className="mb-2 h-8 w-8 text-primary" />
                        <span className="text-sm text-gray-500">Populasi</span>
                        <span className="text-lg font-semibold">{activeDistrict.population}</span>
                      </div>
                      
                      <div className="flex flex-col items-center rounded-lg bg-primary/5 p-4 text-center transition-all hover:bg-primary/10">
                        <Building className="mb-2 h-8 w-8 text-primary" />
                        <span className="text-sm text-gray-500">Jumlah Desa</span>
                        <span className="text-lg font-semibold">{activeDistrict.totalVillages}</span>
                      </div>
                      
                      <div className="flex flex-col items-center rounded-lg bg-primary/5 p-4 text-center transition-all hover:bg-primary/10">
                        <MapPin className="mb-2 h-8 w-8 text-primary" />
                        <span className="text-sm text-gray-500">Luas Wilayah</span>
                        <span className="text-lg font-semibold">{activeDistrict.area}</span>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border p-4 bg-primary/5">
                      <div className="flex items-center">
                        <Landmark className="mr-2 h-5 w-5 text-primary" />
                        <span className="font-medium">Camat:</span>
                        <span className="ml-2">{activeDistrict.leader}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="contact">
                <Card>
                  <CardHeader>
                    <CardTitle>Informasi Kontak</CardTitle>
                    <CardDescription>
                      Hubungi Kecamatan {activeDistrict.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="mr-2 h-5 w-5 shrink-0 text-primary" />
                      <span>{activeDistrict.address}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="mr-2 h-5 w-5 text-primary" />
                      <span>{activeDistrict.phone}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Mail className="mr-2 h-5 w-5 text-primary" />
                      <span>{activeDistrict.email}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Globe className="mr-2 h-5 w-5 text-primary" />
                      <span>{activeDistrict.website}</span>
                    </div>
                    
                    <div className="mt-4">
                      <Button className="bg-primary hover:bg-primary/90">
                        Hubungi Kecamatan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="attractions">
                <Card>
                  <CardHeader>
                    <CardTitle>Destinasi Wisata</CardTitle>
                    <CardDescription>
                      Tempat wisata terkenal di Kecamatan {activeDistrict.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {activeDistrict.attractions.map((attraction: string, index: number) => <div key={index} className="flex items-center rounded-lg border p-3 hover:bg-primary/5 transition-colors">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                            {index + 1}
                          </div>
                          <span className="ml-3">{attraction}</span>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="products">
                <Card>
                  <CardHeader>
                    <CardTitle>Produk Unggulan</CardTitle>
                    <CardDescription>
                      Produk khas dan unggulan dari Kecamatan {activeDistrict.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {activeDistrict.products.map((product: string, index: number) => <div key={index} className="flex items-center rounded-lg border p-3 hover:bg-primary/5 transition-colors">
                          <div className="h-3 w-3 rounded-full bg-primary"></div>
                          <span className="ml-3">{product}</span>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>;
};
export default Kecamatan;