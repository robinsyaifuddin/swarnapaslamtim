import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Star, 
  Users, 
  Package,
  ArrowLeft,
  Edit,
  Share2,
  Heart,
  MessageCircle
} from 'lucide-react';

// Mock data - in real app this would come from API
const mockUMKMData = {
  1: {
    id: 1,
    name: "Keripik Singkong Buah Tangan",
    category: "Makanan",
    owner: "Ibu Siti",
    contact: "0812-3456-7890",
    email: "siti.keripik@email.com",
    location: "Kecamatan Sukadana, Lampung Timur",
    coordinates: "-5.4383, 105.2673",
    rating: 4.5,
    totalReviews: 128,
    products: 12,
    status: "active",
    established: "2020",
    description: "Keripik singkong renyah dengan berbagai varian rasa yang dibuat dari bahan pilihan. Menggunakan singkong lokal berkualitas tinggi dan rempah alami.",
    longDescription: "Keripik Singkong Buah Tangan adalah usaha rumahan yang telah berdiri sejak tahun 2020. Kami memproduksi berbagai jenis keripik singkong dengan varian rasa original, balado, keju, dan BBQ. Semua produk kami dibuat tanpa pengawet buatan dan menggunakan bahan baku singkong pilihan dari petani lokal Lampung Timur.",
    operatingHours: "08:00 - 20:00 WIB",
    socialMedia: {
      instagram: "@keripiksiti",
      facebook: "Keripik Singkong Siti",
      whatsapp: "0812-3456-7890"
    },
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&h=600&fit=crop"
    ],
    products: [
      { name: "Keripik Original", price: "Rp 15.000", description: "Keripik singkong dengan rasa original gurih" },
      { name: "Keripik Balado", price: "Rp 18.000", description: "Keripik singkong dengan bumbu balado pedas" },
      { name: "Keripik Keju", price: "Rp 20.000", description: "Keripik singkong dengan taburan keju" },
      { name: "Keripik BBQ", price: "Rp 18.000", description: "Keripik singkong dengan rasa BBQ smokey" }
    ],
    reviews: [
      { id: 1, name: "Andi", rating: 5, comment: "Enak sekali! Renyah dan tidak berminyak.", date: "2024-11-15" },
      { id: 2, name: "Dewi", rating: 4, comment: "Packing rapi, kualitas bagus.", date: "2024-11-10" },
      { id: 3, name: "Budi", rating: 5, comment: "Varian rasanya lengkap, favorit saya yang balado.", date: "2024-11-05" }
    ]
  },
  2: {
    id: 2,
    name: "Madu Hutan Lampung",
    category: "Minuman",
    owner: "Bapak Ahmad",
    contact: "0813-4567-8901",
    email: "madu.ahmad@email.com",
    location: "Kecamatan Way Jepara, Lampung Timur",
    coordinates: "-5.1892, 105.3127",
    rating: 4.8,
    totalReviews: 89,
    products: 8,
    status: "active",
    established: "2018",
    description: "Madu hutan alami dari Lampung Timur dengan kualitas terbaik.",
    longDescription: "Madu Hutan Lampung menghasilkan madu murni dari hutan alam Lampung Timur. Dengan pengalaman lebih dari 5 tahun, kami memastikan setiap tetes madu yang dihasilkan memiliki kualitas terbaik tanpa tambahan gula atau pengawet.",
    operatingHours: "07:00 - 21:00 WIB",
    socialMedia: {
      instagram: "@maduampungahmad",
      facebook: "Madu Hutan Ahmad",
      whatsapp: "0813-4567-8901"
    },
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1546548970-71785318a17b?w=800&h=600&fit=crop"
    ],
    products: [
      { name: "Madu Murni 500ml", price: "Rp 85.000", description: "Madu hutan murni tanpa campuran" },
      { name: "Madu Murni 1L", price: "Rp 150.000", description: "Madu hutan murni kemasan ekonomis" },
      { name: "Madu Kurma", price: "Rp 95.000", description: "Madu dengan ekstrak kurma" }
    ],
    reviews: [
      { id: 1, name: "Siti", rating: 5, comment: "Madunya asli, manisnya alami.", date: "2024-11-12" },
      { id: 2, name: "Rudi", rating: 5, comment: "Kualitas premium, worth the price!", date: "2024-11-08" }
    ]
  }
};

const UMKMDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const umkmData = mockUMKMData[id as keyof typeof mockUMKMData];

  if (!umkmData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">UMKM tidak ditemukan</h1>
          <Button onClick={() => navigate('/admin/manager')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm font-medium">{rating}</span>
      </div>
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: umkmData.name,
        text: umkmData.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link berhasil disalin!');
    }
  };

  const handleEdit = () => {
    navigate(`/admin/umkm?edit=${umkmData.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/admin/manager')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
              <div>
                <h1 className="text-xl font-semibold">{umkmData.name}</h1>
                <p className="text-sm text-gray-500">Detail UMKM</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Bagikan
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsLiked(!isLiked)}>
                <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                {isLiked ? 'Disukai' : 'Sukai'}
              </Button>
              <Button size="sm" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img 
                    src={umkmData.images[selectedImage]} 
                    alt={umkmData.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-green-600">
                    {umkmData.status === 'active' ? 'Aktif' : 'Non-aktif'}
                  </Badge>
                </div>
                
                {/* Thumbnail Gallery */}
                <div className="flex gap-2 p-4">
                  {umkmData.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-1 aspect-video rounded overflow-hidden border-2 transition-all ${
                        selectedImage === index ? 'border-green-600' : 'border-gray-200'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${umkmData.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Information */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{umkmData.name}</CardTitle>
                    <CardDescription className="mt-2">{umkmData.description}</CardDescription>
                  </div>
                  <Badge variant="outline" className="ml-4">
                    {umkmData.category}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 mt-4">
                  {renderStars(umkmData.rating)}
                  <span className="text-sm text-gray-500">
                    ({umkmData.totalReviews} ulasan)
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Deskripsi Lengkap</h3>
                  <p className="text-gray-600 leading-relaxed">{umkmData.longDescription}</p>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Pemilik</p>
                      <p className="font-medium">{umkmData.owner}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Lokasi</p>
                      <p className="font-medium">{umkmData.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Kontak</p>
                      <p className="font-medium">{umkmData.contact}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Jam Operasional</p>
                      <p className="font-medium">{umkmData.operatingHours}</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold mb-3">Media Sosial</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                      Instagram: {umkmData.socialMedia.instagram}
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                      Facebook: {umkmData.socialMedia.facebook}
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                      WhatsApp: {umkmData.socialMedia.whatsapp}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Products */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Produk ({umkmData.products.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {umkmData.products.map((product, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                        </div>
                        <span className="font-semibold text-green-600">{product.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Ulasan ({umkmData.reviews.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {umkmData.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">{review.name[0]}</span>
                          </div>
                          <span className="font-medium">{review.name}</span>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="mb-2">{renderStars(review.rating)}</div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informasi Cepat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <Badge className={umkmData.status === 'active' ? 'bg-green-600' : 'bg-gray-600'}>
                    {umkmData.status === 'active' ? 'Aktif' : 'Non-aktif'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Produk</span>
                  <span className="font-medium">{umkmData.products}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center gap-1">
                    {renderStars(umkmData.rating)}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Berdiri Sejak</span>
                  <span className="font-medium">{umkmData.established}</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hubungi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  {umkmData.contact}
                </Button>
                <Button className="w-full" variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Kirim Email
                </Button>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lokasi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Peta Lokasi</p>
                    <p className="text-xs mt-1">{umkmData.coordinates}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{umkmData.location}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UMKMDetailPage;
