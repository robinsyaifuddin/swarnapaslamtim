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
  Calendar,
  ArrowLeft,
  Edit,
  Share2,
  Heart,
  MessageCircle,
  Camera,
  Mountain,
  Trees,
  Waves
} from 'lucide-react';

// Mock data - in real app this would come from API
const mockDestinationData = {
  1: {
    id: 1,
    name: "Pantai Kerang Mas",
    category: "Pantai",
    location: "Kecamatan Labuhan Maringgai, Lampung Timur",
    coordinates: "-5.4832, 105.2621",
    rating: 4.6,
    totalReviews: 342,
    visitors: 1250,
    status: "active",
    established: "2015",
    description: "Pantai indah dengan pasir putih dan kerang yang melimpah.",
    longDescription: "Pantai Kerang Mas adalah destinasi wisata bahari yang menawarkan keindahan alam pantai dengan pasir putih yang lembut dan air laut yang jernih. Nama 'Kerang Mas' berasal dari melimpahnya kerang-kerang indah di sepanjang pantai. Pengunjung dapat menikmati berbagai aktivitas seperti berenang, berjemur, atau sekadar menikmati sunset yang memukau.",
    operatingHours: "06:00 - 18:00 WIB",
    entryFee: "Rp 10.000",
    bestTimeToVisit: "April - September",
    contactInfo: "0812-3456-7890",
    email: "pantaikerangmas@email.com",
    facilities: ["Area Parkir", "Toilet", "Warung Makan", "Ruang Ganti", "Spot Foto", "Area Bermain"],
    activities: ["Berjemur", "Bermain Air", "Fotografi", "Memancing", "Jogging Pantai"],
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop"
    ],
    reviews: [
      { id: 1, name: "Sarah", rating: 5, comment: "Pantainya bersih, pasir putih, cocok untuk keluarga.", date: "2024-11-15" },
      { id: 2, name: "Riko", rating: 4, comment: "Sunset di sini sangat indah, recommended!", date: "2024-11-12" },
      { id: 3, name: "Maya", rating: 5, comment: "Banyak spot foto bagus, kerangnya juga masih banyak.", date: "2024-11-08" }
    ]
  },
  2: {
    id: 2,
    name: "Taman Nasional Way Kambas",
    category: "Konservasi",
    location: "Kecamatan Way Kambas, Lampung Timur",
    coordinates: "-5.4232, 105.7532",
    rating: 4.9,
    totalReviews: 528,
    visitors: 3400,
    status: "active",
    established: "1989",
    description: "Suaka gajah sumatera dan satwa liar dilindungi lainnya.",
    longDescription: "Taman Nasional Way Kambas adalah taman nasional yang terkenal sebagai pusat konservasi gajah sumatera. Selain gajah, taman ini juga menjadi rumah bagi berbagai satwa liar seperti badak sumatera, harimau sumatera, dan berbagai jenis burung. Pengunjung dapat menikmati safari gajah, bird watching, dan trekking di hutan.",
    operatingHours: "08:00 - 16:00 WIB",
    entryFee: "Rp 25.000",
    bestTimeToVisit: "Mei - Oktober",
    contactInfo: "0813-4567-8901",
    email: "waykambas@email.com",
    facilities: ["Pusat Informasi", "Toilet", "Area Camping", "Restoran", "Souvenir Shop", "Mushola"],
    activities: ["Safari Gajah", "Bird Watching", "Trekking", "Photography", "Educational Tour"],
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560123903-9ad4d98d24af?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1549416025-4e107b63d3b2?w=800&h=600&fit=crop"
    ],
    reviews: [
      { id: 1, name: "David", rating: 5, comment: "Pengalaman safari gajah yang tak terlupakan!", date: "2024-11-14" },
      { id: 2, name: "Lisa", rating: 5, comment: "Educational dan menyenangkan, anak-anak suka sekali.", date: "2024-11-10" },
      { id: 3, name: "Budi", rating: 4, comment: "Harus datang lebih pagi agar bisa lihat lebih banyak satwa.", date: "2024-11-05" }
    ]
  },
  3: {
    id: 3,
    name: "Bendungan Batutegi",
    category: "Wisata Air",
    location: "Kecamatan Batanghari, Lampung Timur",
    coordinates: "-5.0983, 105.3128",
    rating: 4.4,
    totalReviews: 156,
    visitors: 890,
    status: "active",
    established: "2004",
    description: "Bendungan indah dengan pemandangan danau yang memukau.",
    longDescription: "Bendungan Batutegi adalah waduk yang menawarkan pemandangan alam yang spektakuler dengan danau yang luas dikelilingi perbukitan hijau. Selain berfungsi sebagai irigasi dan pembangkit listrik, bendungan ini juga menjadi destinasi wisata yang populer untuk memancing, berlayar, atau sekadar menikmati pemandangan.",
    operatingHours: "07:00 - 17:00 WIB",
    entryFee: "Rp 5.000",
    bestTimeToVisit: "Juni - November",
    contactInfo: "0814-5678-9012",
    email: "batutegi@email.com",
    facilities: ["Area Parkir", "Toilet", "Spot Foto", "Area Memancing", "Warung Makan"],
    activities: ["Memancing", "Berlayar", "Fotografi", "Picknik", "Jogging"],
    images: [
      "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1540206395-68808572332f?w=800&h=600&fit=crop"
    ],
    reviews: [
      { id: 1, name: "Ahmad", rating: 4, comment: "Tempat yang tenang, cocok untuk refreshing.", date: "2024-11-12" },
      { id: 2, name: "Dewi", rating: 5, comment: "Sunrise di sini sangat bagus, worth to visit!", date: "2024-11-08" }
    ]
  }
};

const DestinationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const destinationData = mockDestinationData[id as keyof typeof mockDestinationData];

  if (!destinationData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Destinasi tidak ditemukan</h1>
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

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Pantai': return <Waves className="h-4 w-4" />;
      case 'Konservasi': return <Trees className="h-4 w-4" />;
      case 'Wisata Air': return <Mountain className="h-4 w-4" />;
      default: return <Camera className="h-4 w-4" />;
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: destinationData.name,
        text: destinationData.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link berhasil disalin!');
    }
  };

  const handleEdit = () => {
    navigate(`/admin/destinasi?edit=${destinationData.id}`);
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
                <h1 className="text-xl font-semibold">{destinationData.name}</h1>
                <p className="text-sm text-gray-500">Detail Destinasi Wisata</p>
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
                    src={destinationData.images[selectedImage]} 
                    alt={destinationData.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-green-600">
                    {destinationData.status === 'active' ? 'Aktif' : 'Non-aktif'}
                  </Badge>
                </div>
                
                {/* Thumbnail Gallery */}
                <div className="flex gap-2 p-4">
                  {destinationData.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-1 aspect-video rounded overflow-hidden border-2 transition-all ${
                        selectedImage === index ? 'border-green-600' : 'border-gray-200'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${destinationData.name} ${index + 1}`}
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
                    <CardTitle className="text-2xl flex items-center gap-2">
                      {getCategoryIcon(destinationData.category)}
                      {destinationData.name}
                    </CardTitle>
                    <CardDescription className="mt-2">{destinationData.description}</CardDescription>
                  </div>
                  <Badge variant="outline" className="ml-4">
                    {destinationData.category}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 mt-4">
                  {renderStars(destinationData.rating)}
                  <span className="text-sm text-gray-500">
                    ({destinationData.totalReviews} ulasan)
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Deskripsi Lengkap</h3>
                  <p className="text-gray-600 leading-relaxed">{destinationData.longDescription}</p>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Lokasi</p>
                      <p className="font-medium">{destinationData.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Jam Operasional</p>
                      <p className="font-medium">{destinationData.operatingHours}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Waktu Terbaik</p>
                      <p className="font-medium">{destinationData.bestTimeToVisit}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Pengunjung/Bulan</p>
                      <p className="font-medium">{destinationData.visitors.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold mb-3">Fasilitas</h3>
                  <div className="flex flex-wrap gap-2">
                    {destinationData.facilities.map((facility, index) => (
                      <Badge key={index} variant="outline" className="cursor-pointer hover:bg-gray-100">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold mb-3">Aktivitas</h3>
                  <div className="flex flex-wrap gap-2">
                    {destinationData.activities.map((activity, index) => (
                      <Badge key={index} variant="outline" className="cursor-pointer hover:bg-gray-100">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Ulasan ({destinationData.reviews.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {destinationData.reviews.map((review) => (
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
                  <Badge className={destinationData.status === 'active' ? 'bg-green-600' : 'bg-gray-600'}>
                    {destinationData.status === 'active' ? 'Aktif' : 'Non-aktif'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tiket Masuk</span>
                  <span className="font-medium text-green-600">{destinationData.entryFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center gap-1">
                    {renderStars(destinationData.rating)}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Berdiri Sejak</span>
                  <span className="font-medium">{destinationData.established}</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hubungi & Kunjungi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  {destinationData.contactInfo}
                </Button>
                <Button className="w-full" variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Kirim Email
                </Button>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Calendar className="h-4 w-4 mr-2" />
                  Pesan Tiket
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
                    <p className="text-xs mt-1">{destinationData.coordinates}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{destinationData.location}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailPage;
