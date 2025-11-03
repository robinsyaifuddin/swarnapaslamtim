import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, MapPin, Users, Filter, ChevronDown, Info } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DatePicker } from '@/components/DatePicker';
import { useNavigate } from 'react-router-dom';

// Data Tour Resmi - Destinasi Wisata Asli Lampung Timur
const events = [{
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
  description: "Jelajahi Taman Nasional Way Kambas, pusat konservasi gajah Sumatera terbesar di Indonesia. Nikmati Elephant Safari dan bertemu langsung dengan satwa langka.",
  highlights: ["Elephant Safari bersama gajah terlatih", "Konservasi satwa langka", "Bird watching", "Trekking hutan tropis"],
  itinerary: ["Penjemputan di meeting point", "Perjalanan ke TNWK", "Elephant Safari & interaksi gajah", "Makan siang", "Trekking wildlife observation", "Kembali ke titik awal"],
  facilities: ["Transportasi AC", "Guide berpengalaman", "Makan siang", "Tiket masuk TNWK", "Dokumentasi", "Air mineral"],
  provider: {
    name: "Way Kambas Eco Tour",
    phone: "6285768192419"
  }
}, {
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
  description: "Pengalaman unik ke Pantai Kuala Kambas melalui perahu menyusuri Sungai Way Kanan. Nikmati pantai berpasir putih dan seafood segar.",
  highlights: ["Perjalanan perahu di sungai", "Pantai pasir putih alami", "Kuliner seafood segar", "Sunset indah"],
  itinerary: ["Berkumpul di dermaga", "Perjalanan perahu Sungai Way Kanan", "Tiba di Pantai Kuala Kambas", "Berenang & main pasir", "Makan siang seafood", "Kembali via perahu"],
  facilities: ["Perahu tradisional", "Life jacket", "Gazebo pantai", "Makan siang seafood", "Guide lokal", "Air mineral"],
  provider: {
    name: "Kuala Kambas Beach Tour",
    phone: "6285768192419"
  }
}, {
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
  description: "Nikmati ketenangan Danau Way Jepara yang dikelilingi hutan hijau dan kebun rimbun. Cocok untuk piknik keluarga dan relaksasi.",
  highlights: ["Pemandangan danau indah", "Naik perahu keliling danau", "Piknik di gazebo", "Udara segar pegunungan"],
  itinerary: ["Penjemputan pagi", "Perjalanan ke Danau Way Jepara", "Naik perahu keliling danau", "Makan siang di gazebo", "Waktu bebas relaksasi", "Kembali sore"],
  facilities: ["Transportasi AC", "Perahu", "Gazebo", "Makan siang", "Guide", "Spot foto"],
  provider: {
    name: "Way Jepara Lake Tour",
    phone: "6285768192419"
  }
}, {
  id: 4,
  title: "Pantai Kerang Mas - Family Fun",
  slug: "pantai-kerang-mas-family-fun",
  image: "",
  date: "5 Juli 2024",
  time: "09:00 - 17:00",
  location: "Muara Gading Mas, Labuhan Maringgai, Lampung Timur",
  category: "Pantai",
  spots: 30,
  price: 95000,
  originalPrice: 130000,
  rating: 4.7,
  duration: "1 hari",
  minParticipants: 2,
  description: "Pantai Kerang Mas menawarkan wahana permainan air dan fasilitas lengkap untuk liburan keluarga yang menyenangkan.",
  highlights: ["Wahana permainan air", "Pantai pasir putih", "Area bermain anak", "Kuliner seafood"],
  itinerary: ["Berangkat pagi", "Tiba di Pantai Kerang Mas", "Main wahana air", "Makan siang", "Berenang & bermain pasir", "Kembali sore"],
  facilities: ["Transportasi AC", "Tiket wahana", "Makan siang", "Gazebo", "Toilet & mushola", "Area parkir"],
  provider: {
    name: "Kerang Mas Beach Tour",
    phone: "6285768192419"
  }
}, {
  id: 5,
  title: "Hutan Mangrove Sriminosari - Eco Tour",
  slug: "hutan-mangrove-sriminosari-eco-tour",
  image: "",
  date: "12 Juli 2024",
  time: "08:00 - 14:00",
  location: "Margasari, Labuhan Maringgai, Lampung Timur",
  category: "Ekowisata",
  spots: 20,
  price: 70000,
  originalPrice: 100000,
  rating: 4.6,
  duration: "6 jam",
  minParticipants: 3,
  description: "Jelajahi kawasan konservasi mangrove terbesar di Lampung melalui jembatan kayu. Edukasi ekosistem dan fotografi alam.",
  highlights: ["Jembatan kayu di atas mangrove", "Edukasi ekosistem", "Bird watching", "Spot foto Instagram"],
  itinerary: ["Berkumpul pagi", "Perjalanan ke Hutan Mangrove", "Trekking jembatan kayu", "Edukasi konservasi", "Makan siang", "Kembali"],
  facilities: ["Transportasi", "Guide edukasi", "Akses jembatan kayu", "Makan siang", "Binoculars", "Dokumentasi"],
  provider: {
    name: "Mangrove Eco Tour",
    phone: "6285768192419"
  }
}, {
  id: 6,
  title: "Taman Purbakala Pugung Raharjo - Heritage Tour",
  slug: "taman-purbakala-pugung-raharjo-heritage-tour",
  image: "",
  date: "18 Juli 2024",
  time: "09:00 - 15:00",
  location: "Pugung Raharjo, Sekampung Udik, Lampung Timur",
  category: "Sejarah",
  spots: 25,
  price: 65000,
  originalPrice: 90000,
  rating: 4.5,
  duration: "6 jam",
  minParticipants: 4,
  description: "Kunjungi situs megalitikum bersejarah dengan batu-batu besar misterius. Tour edukasi budaya dan sejarah Lampung Timur.",
  highlights: ["Situs megalitikum kuno", "Edukasi sejarah", "Museum purbakala", "Fotografi heritage"],
  itinerary: ["Penjemputan", "Tiba di Taman Purbakala", "Tur dengan guide ahli", "Kunjungi museum", "Makan siang", "Dokumentasi", "Kembali"],
  facilities: ["Transportasi AC", "Guide sejarah", "Tiket masuk", "Makan siang", "Buku panduan", "Akses museum"],
  provider: {
    name: "Pugung Heritage Tour",
    phone: "6285768192419"
  }
}];
const categories = ["Semua", "Taman Nasional", "Pantai", "Danau", "Ekowisata", "Sejarah"];
const Agenda = () => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [showPopup, setShowPopup] = useState(false);
  const [activeEvent, setActiveEvent] = useState<any>(null);
  const navigate = useNavigate();
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    if (category === 'Semua') {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event => event.category === category);
      setFilteredEvents(filtered);
    }
  };
  const handleShowDetails = (event: any) => {
    setActiveEvent(event);
    setShowPopup(true);
  };
  const handleJoinAgenda = (slug: string) => {
    navigate(`/agenda/${slug}`);
  };
  return <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-20 bg-primary/5 text-foreground">
        <div className="container mx-auto px-4 text-center py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Agenda & Tour</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Bergabunglah dalam petualangan seru menjelajahi destinasi wisata terbaik Lampung Timur
          </p>
        </div>
      </div>
      
      {/* Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Kategori:</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white min-w-[140px] justify-between">
                  {selectedCategory}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white z-50">
                {categories.map(category => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => handleCategoryFilter(category)}
                    className="hover:bg-primary/10 cursor-pointer"
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  <Filter className="mr-2 h-4 w-4" />
                  Urutkan
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white z-50">
                <DropdownMenuItem className="hover:bg-primary/10 cursor-pointer">Tanggal Terbaru</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/10 cursor-pointer">Harga Terendah</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/10 cursor-pointer">Rating Tertinggi</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DatePicker />
          </div>
        </div>
      </div>
      
      {/* Events Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map(event => <Card key={event.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <img src={event.image} alt={event.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-110" />
                <Badge className="absolute left-3 top-3 bg-lamsel-purple hover:bg-lamsel-purple/80">
                  {event.category}
                </Badge>
              </div>
              <CardHeader>
                <h3 className="text-xl font-bold">{event.title}</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm">
                  <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-primary" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4 text-primary" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="mr-2 h-4 w-4 text-primary" />
                  <span><span className="font-medium">{event.spots}</span> spot tersedia</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="text-gray-500 line-through text-sm">Rp{event.originalPrice?.toLocaleString('id-ID')}</span>
                    <span className="text-lg font-bold text-primary ml-2">Rp{event.price?.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="text-sm font-medium">{event.rating}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button onClick={() => handleJoinAgenda(event.slug)} className="flex-1 bg-primary hover:bg-primary/90">
                  Bergabung
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" onClick={() => handleShowDetails(event)}>
                  <Info className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>)}
        </div>

        {/* Empty state */}
        {filteredEvents.length === 0 && <div className="text-center py-16">
            <h3 className="text-2xl font-semibold mb-2">Tidak Ada Agenda Ditemukan</h3>
            <p className="text-gray-500">
              Tidak ada agenda untuk kategori yang dipilih saat ini.
            </p>
            <Button onClick={() => handleCategoryFilter('Semua')} className="mt-4 bg-primary hover:bg-primary/90">
              Lihat Semua Agenda
            </Button>
          </div>}
      </div>
      
      {/* Event Details Popup */}
      {showPopup && activeEvent && <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-64">
              <img src={activeEvent.image} alt={activeEvent.title} className="h-full w-full object-cover" />
              <Button variant="ghost" className="absolute right-2 top-2 bg-white/80 hover:bg-white text-black rounded-full p-2 h-8 w-8" onClick={() => setShowPopup(false)}>
                ✕
              </Button>
              <Badge className="absolute left-3 top-3 bg-primary hover:bg-primary/80">
                {activeEvent.category}
              </Badge>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{activeEvent.title}</h2>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
                  <span>{activeEvent.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-primary" />
                  <span>{activeEvent.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-primary" />
                  <span>{activeEvent.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  <span><span className="font-medium">{activeEvent.spots}</span> spot tersedia</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-500 line-through">Rp{activeEvent.originalPrice?.toLocaleString('id-ID')}</span>
                    <span className="text-xl font-bold text-primary ml-2">Rp{activeEvent.price?.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="font-medium">{activeEvent.rating}</span>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Deskripsi</h3>
                <p className="text-gray-600">{activeEvent.description}</p>
              </div>
              <div className="flex gap-4">
                <Button className="flex-1 bg-primary hover:bg-primary/90" onClick={() => {
              setShowPopup(false);
              handleJoinAgenda(activeEvent.slug);
            }}>
                  Bergabung Tour
                </Button>
                <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary hover:text-white" onClick={() => setShowPopup(false)}>
                  Tutup
                </Button>
              </div>
            </div>
          </div>
        </div>}
      
      <Footer />
    </div>;
};
export default Agenda;
