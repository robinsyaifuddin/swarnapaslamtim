import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { MapPin, Clock, Calendar, Users, Star, ArrowLeft, Heart, Share2, Info, MessageSquare, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { AgendaSection } from '@/components/AgendaSection';
import { lampungTimurDestinations } from '@/data/lampungTimurDestinations';

// Tour data - Destinasi Wisata Asli Lampung Timur
const tourEvents = [{
  id: 1,
  title: "Taman Nasional Way Kambas - Elephant Safari",
  image: "https://akcdn.detik.net.id/community/media/visual/2024/01/29/gajah-sumatera-di-taman-nasional-way-kambas_169.jpeg?w=700&q=90",
  duration: "1 hari",
  price: 180000,
  rating: 4.8,
  reviews: 287,
  category: "Taman Nasional"
}, {
  id: 2,
  title: "Pantai Kuala Kambas - River & Beach Tour",
  image: "",
  duration: "1 hari",
  price: 120000,
  rating: 4.6,
  reviews: 142,
  category: "Pantai"
}, {
  id: 3,
  title: "Danau Way Jepara - Nature Escape",
  image: "",
  duration: "7 jam",
  price: 85000,
  rating: 4.5,
  reviews: 98,
  category: "Danau"
}, {
  id: 4,
  title: "Pantai Kerang Mas - Family Fun",
  image: "",
  duration: "1 hari",
  price: 95000,
  rating: 4.7,
  reviews: 165,
  category: "Pantai"
}, {
  id: 5,
  title: "Hutan Mangrove Sriminosari - Eco Tour",
  image: "",
  duration: "6 jam",
  price: 70000,
  rating: 4.6,
  reviews: 121,
  category: "Ekowisata"
}, {
  id: 6,
  title: "Taman Purbakala Pugung Raharjo - Heritage Tour",
  image: "",
  duration: "6 jam",
  price: 65000,
  rating: 4.5,
  reviews: 93,
  category: "Sejarah"
}];

// Data destinasi wisata lengkap Lampung Timur dengan detail komprehensif
const destinations = lampungTimurDestinations.map(dest => ({
  id: dest.id,
  slug: dest.slug,
  name: dest.name,
  description: dest.description,
  longDescription: dest.longDescription || dest.description + "\n\nDestinasi wisata ini merupakan salah satu yang populer di Lampung Timur dengan fasilitas yang lengkap dan akses yang mudah dijangkau. Cocok untuk dikunjungi bersama keluarga atau teman.",
  images: dest.images || [dest.image_url, dest.image_url, dest.image_url, dest.image_url],
  location: dest.location,
  category: dest.category,
  rating: dest.rating,
  reviews: dest.reviews || Math.floor(Math.random() * 200) + 50,
  openHours: dest.opening_hours,
  entryFee: dest.price_range,
  bestTimeToVisit: dest.bestTimeToVisit || "Sepanjang tahun",
  facilities: dest.facilities,
  activities: dest.activities || ["Wisata Keluarga", "Fotografi", "Edukasi", "Rekreasi"],
  mapEmbedUrl: dest.mapEmbedUrl,
  mapCoordinates: dest.mapCoordinates,
  nearbyAttractions: [],
  relatedTours: dest.relatedTours ? dest.relatedTours.map(tourId => {
    const tour = tourEvents.find(t => t.id === tourId);
    return tour ? {
      id: tour.id,
      name: tour.title,
      image: tour.image,
      duration: tour.duration,
      price: `Rp${tour.price.toLocaleString('id-ID')}`,
      rating: tour.rating,
      reviews: tour.reviews
    } : null;
  }).filter(Boolean) : []
}));

const legacyDestinations = [{
  id: 1,
  name: "Pantai Kedu Warna",
  description: "Pantai eksotis dengan dua warna air laut yang kontras, biru dan hijau tosca, menciptakan pemandangan yang memukau.",
  longDescription: "Pantai Kedu Warna adalah salah satu destinasi wisata pantai yang paling unik di Lampung Timur. Keunikan pantai ini terletak pada fenomena alam yang langka, di mana air laut memiliki dua warna yang kontras - biru dan hijau tosca.\n\nFenomena ini terjadi karena perbedaan kedalaman laut dan jenis terumbu karang yang ada di dasar laut. Area yang berwarna hijau tosca merupakan area dangkal dengan terumbu karang, sedangkan area biru adalah area yang lebih dalam.\n\nPantai ini sangat cocok untuk aktivitas snorkeling dan diving karena memiliki terumbu karang yang masih terjaga dengan baik. Pengunjung dapat melihat berbagai jenis ikan tropis dan biota laut lainnya. Waktu terbaik untuk mengunjungi pantai ini adalah pagi hari hingga siang hari saat matahari bersinar cerah, karena warna air akan terlihat lebih kontras dan indah.",
  images: ["https://images.unsplash.com/photo-1519452575417-564c1401ecc0?q=80&w=3270", "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=3270", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=3270", "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?q=80&w=3272"],
  location: "Padang Cermin, Lampung Timur",
  category: "Pantai",
  rating: 4.8,
  reviews: 156,
  openHours: "06:00 - 18:00",
  entryFee: "Rp 15.000 / orang",
  bestTimeToVisit: "Pagi hingga siang hari",
  facilities: ["Parkir", "Toilet", "Warung Makan", "Penyewaan Alat Snorkeling", "Spot Foto"],
  activities: ["Berenang", "Snorkeling", "Diving", "Fotografi", "Island Hopping"],
  nearbyAttractions: [{
    id: 3,
    name: "Pantai Melasti",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=3270",
    distance: "5 km"
  }, {
    id: 5,
    name: "Air Terjun Way Kalam",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=3270",
    distance: "12 km"
  }],
  relatedTours: [{
    id: 101,
    name: "Paket Wisata Pantai Lampung Timur",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=3270",
    duration: "2 hari 1 malam",
    price: "Rp 850.000",
    rating: 4.7,
    reviews: 45
  }]
}, {
  id: 2,
  name: "Pulau Pahawang",
  description: "Surga snorkeling dengan terumbu karang yang indah dan air laut yang jernih, salah satu destinasi favorit wisatawan.",
  longDescription: "Pulau Pahawang adalah surga tersembunyi di Lampung Timur yang menawarkan keindahan bawah laut yang spektakuler. Pulau ini terdiri dari dua pulau utama yaitu Pahawang Besar dan Pahawang Kecil.\n\nPahawang terkenal dengan spot snorkeling dan divingnya yang menakjubkan. Terumbu karang yang masih alami dan beragam jenis ikan tropis menjadi daya tarik utama. Visibility air laut yang mencapai 10-15 meter membuat pengalaman snorkeling menjadi sangat menyenangkan.\n\nSelain keindahan bawah laut, Pahawang juga menawarkan pantai pasir putih yang lembut, air laut yang jernih berwarna turquoise, dan suasana yang tenang. Pengunjung dapat menginap di homestay yang dikelola penduduk lokal untuk merasakan kehidupan masyarakat pulau.",
  images: ["https://images.unsplash.com/photo-1582967788606-a171c1080cb0?q=80&w=3270", "https://images.unsplash.com/photo-1523004845892-227316b7fc07?q=80&w=3270", "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=3173", "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=3270"],
  location: "Mawasangka, Lampung Timur",
  category: "Pulau",
  rating: 4.9,
  reviews: 245,
  openHours: "24 jam (dengan perahu)",
  entryFee: "Rp 20.000 / orang",
  bestTimeToVisit: "April - Oktober",
  facilities: ["Homestay", "Warung Makan", "Penyewaan Alat Snorkeling", "Perahu", "Guide Lokal"],
  activities: ["Snorkeling", "Diving", "Island Hopping", "Camping", "Fotografi"],
  nearbyAttractions: [{
    id: 6,
    name: "Pulau Tegal Mas",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=3270",
    distance: "8 km (via perahu)"
  }, {
    id: 8,
    name: "Pulau Tangkil",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=3270",
    distance: "10 km (via perahu)"
  }],
  relatedTours: [{
    id: 201,
    name: "Paket Snorkeling Pahawang",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=3270",
    duration: "1 hari",
    price: "Rp 450.000",
    rating: 4.8,
    reviews: 68
  }]
}, {
  id: 3,
  name: "Pantai Melasti",
  description: "Pantai dengan pasir putih lembut yang mirip dengan pantai di Bali, sempurna untuk bersantai dan menikmati sunset.",
  longDescription: "Pantai Melasti adalah hidden gem di Lampung Timur yang menawarkan keindahan pantai dengan pasir putih yang lembut dan air laut yang jernih. Nama 'Melasti' diambil dari upacara pembersihan dalam tradisi Hindu Bali, mencerminkan kesucian dan keindahan pantai ini.\n\nPantai ini memiliki karakteristik yang mirip dengan pantai-pantai di Bali, dengan tebing karang yang menjulang di sisi-sisinya, menciptakan suasana yang dramatis dan eksotis. Saat air surut, terlihat hamparan karang yang membentuk kolam-kolam alami yang indah.\n\nSunset di Pantai Melasti adalah salah satu yang terbaik di Lampung Timur. Warna langit yang berubah dari oranye ke merah keunguan, dipadu dengan siluet tebing karang, menciptakan pemandangan yang sangat romantis dan instagramable.",
  images: ["https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=3270", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=3270", "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=3270", "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?q=80&w=3272"],
  location: "Padang Cermin, Lampung Timur",
  category: "Pantai",
  rating: 4.7,
  reviews: 132,
  openHours: "05:00 - 19:00",
  entryFee: "Rp 10.000 / orang",
  bestTimeToVisit: "Sore hari untuk sunset",
  facilities: ["Parkir", "Toilet", "Warung Makan", "Gazebo", "Spot Foto"],
  activities: ["Berenang", "Berjemur", "Fotografi", "Yoga", "Piknik"],
  nearbyAttractions: [],
  relatedTours: []
}, {
  id: 4,
  name: "Taman Kupu-Kupu Gita Persada",
  description: "Taman konservasi kupu-kupu dengan ratusan spesies yang cantik, cocok untuk wisata edukasi keluarga.",
  longDescription: "Taman Kupu-Kupu Gita Persada adalah destinasi wisata edukasi yang unik di Lampung Timur. Taman ini merupakan pusat konservasi dan penangkaran kupu-kupu dengan lebih dari 200 spesies kupu-kupu dari berbagai daerah di Indonesia.\n\nPengunjung dapat melihat siklus hidup kupu-kupu secara lengkap, mulai dari telur, ulat, kepompong, hingga menjadi kupu-kupu dewasa. Taman ini dilengkapi dengan greenhouse khusus yang menciptakan habitat ideal untuk kupu-kupu.\n\nSelain kupu-kupu, taman ini juga memiliki koleksi tanaman hias dan bunga yang menjadi sumber makanan kupu-kupu. Area taman yang asri dan sejuk membuat kunjungan menjadi pengalaman yang menyenangkan untuk semua usia.",
  images: ["https://images.unsplash.com/photo-1586268247873-04c7e93bb4ba?q=80&w=3270", "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=3270", "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=3270", "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?q=80&w=3270"],
  location: "Way Lima, Lampung Timur",
  category: "Taman",
  rating: 4.5,
  reviews: 89,
  openHours: "08:00 - 17:00",
  entryFee: "Rp 25.000 / orang",
  bestTimeToVisit: "Pagi hari",
  facilities: ["Parkir", "Toilet", "Kantin", "Museum Mini", "Toko Souvenir", "Area Edukasi"],
  activities: ["Wisata Edukasi", "Fotografi", "Penelitian", "Workshop"],
  nearbyAttractions: [],
  relatedTours: []
}, {
  id: 5,
  name: "Air Terjun Way Kalam",
  description: "Air terjun alami dengan tujuh tingkatan yang dikelilingi hutan tropis, menawarkan kesejukan dan kedamaian.",
  longDescription: "Air Terjun Way Kalam adalah salah satu air terjun terindah di Lampung Timur dengan keunikan memiliki tujuh tingkatan. Setiap tingkatan memiliki karakteristik dan keindahan tersendiri, dengan tingkatan tertinggi mencapai 40 meter.\n\nLokasi air terjun yang berada di tengah hutan tropis membuat suasana sangat asri dan sejuk. Perjalanan menuju air terjun merupakan pengalaman trekking yang menyenangkan, melewati jalan setapak yang dikelilingi pepohonan rindang dan suara burung hutan.\n\nDi bawah air terjun terdapat kolam alami dengan air yang sangat jernih dan sejuk. Pengunjung dapat berenang atau sekadar berendam untuk merasakan kesegaran air pegunungan. Area sekitar air terjun juga cocok untuk camping dan piknik keluarga.",
  images: ["https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=3270", "https://images.unsplash.com/photo-1513125370-3460ebe3401b?q=80&w=3087", "https://images.unsplash.com/photo-1469796466635-455ede028ac4?q=80&w=3270", "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=3270"],
  location: "Padang Cermin, Lampung Timur",
  category: "Air Terjun",
  rating: 4.6,
  reviews: 112,
  openHours: "07:00 - 17:00",
  entryFee: "Rp 15.000 / orang",
  bestTimeToVisit: "Musim kemarau",
  facilities: ["Parkir", "Toilet", "Warung", "Area Camping", "Jalur Trekking"],
  activities: ["Berenang", "Trekking", "Camping", "Fotografi", "Piknik"],
  nearbyAttractions: [],
  relatedTours: []
}, {
  id: 6,
  name: "Pulau Tegal Mas",
  description: "Pulau kecil dengan pantai berpasir putih dan spot diving yang menakjubkan dengan visibilitas tinggi.",
  longDescription: "Pulau Tegal Mas adalah permata tersembunyi di perairan Lampung Timur. Pulau kecil ini menawarkan pantai berpasir putih yang masih alami dan air laut yang sangat jernih dengan visibilitas hingga 20 meter.\n\nPulau ini menjadi surga bagi para penyelam karena memiliki beberapa spot diving terbaik di Lampung. Terumbu karang yang masih pristine dan keanekaragaman biota laut yang tinggi membuat setiap penyelaman menjadi pengalaman yang tak terlupakan.\n\nMeskipun kecil, Pulau Tegal Mas memiliki pesona yang luar biasa. Suasana yang tenang dan jauh dari keramaian membuat pulau ini cocok untuk mereka yang mencari ketenangan dan ingin menikmati keindahan alam yang masih asli.",
  images: ["https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=3270", "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=3270", "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?q=80&w=3270", "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=3173"],
  location: "Gebang, Lampung Timur",
  category: "Pulau",
  rating: 4.8,
  reviews: 76,
  openHours: "24 jam (dengan perahu)",
  entryFee: "Rp 25.000 / orang",
  bestTimeToVisit: "April - Oktober",
  facilities: ["Penyewaan Perahu", "Peralatan Diving", "Guide", "Warung Sederhana"],
  activities: ["Diving", "Snorkeling", "Berenang", "Camping", "Memancing"],
  nearbyAttractions: [],
  relatedTours: []
}, {
  id: 7,
  name: "Pantai Mutun",
  description: "Pantai keluarga dengan fasilitas lengkap, wahana permainan air, dan pemandangan Teluk Lampung yang indah.",
  longDescription: "Pantai Mutun adalah destinasi wisata pantai yang paling populer untuk keluarga di Lampung Timur. Dengan fasilitas yang lengkap dan beragam wahana permainan, pantai ini menjadi pilihan favorit untuk liburan keluarga.\n\nPantai ini menawarkan pemandangan Teluk Lampung yang memukau dengan pulau-pulau kecil yang tersebar di kejauhan. Ombak yang relatif tenang membuat pantai ini aman untuk anak-anak bermain air.\n\nFasilitas yang tersedia sangat lengkap, mulai dari cottage, restoran, area bermain anak, hingga berbagai wahana air seperti banana boat, jet ski, dan parasailing. Pantai Mutun juga sering menjadi lokasi berbagai event dan festival.",
  images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=3270", "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=3270", "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?q=80&w=3272", "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=3270"],
  location: "Padang Cermin, Lampung Timur",
  category: "Pantai",
  rating: 4.4,
  reviews: 198,
  openHours: "06:00 - 18:00",
  entryFee: "Rp 20.000 / orang",
  bestTimeToVisit: "Akhir pekan",
  facilities: ["Parkir Luas", "Toilet", "Restoran", "Cottage", "Wahana Air", "Area Bermain Anak"],
  activities: ["Berenang", "Banana Boat", "Jet Ski", "Parasailing", "Voli Pantai"],
  nearbyAttractions: [],
  relatedTours: []
}, {
  id: 8,
  name: "Pulau Tangkil",
  description: "Pulau kecil yang masih alami dengan pantai berbatu karang dan hutan mangrove yang lebat.",
  longDescription: "Pulau Tangkil adalah destinasi wisata yang masih sangat alami di Lampung Timur. Pulau ini memiliki keunikan berupa pantai berbatu karang dan hutan mangrove yang masih terjaga kelestariannya.\n\nHutan mangrove di Pulau Tangkil menjadi habitat berbagai jenis burung dan biota laut. Pengunjung dapat menjelajahi hutan mangrove melalui jembatan kayu yang telah disediakan sambil mengamati kehidupan ekosistem mangrove.\n\nPantai berbatu karang di pulau ini menciptakan pemandangan yang dramatis, terutama saat ombak menghantam karang. Saat air surut, terlihat berbagai biota laut kecil di sela-sela karang yang menjadi daya tarik tersendiri.",
  images: ["https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=3270", "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=3270", "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?q=80&w=3270", "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=3173"],
  location: "Punduh Pidada, Lampung Timur",
  category: "Pulau",
  rating: 4.7,
  reviews: 65,
  openHours: "24 jam (dengan perahu)",
  entryFee: "Rp 15.000 / orang",
  bestTimeToVisit: "Pagi hari",
  facilities: ["Dermaga", "Jembatan Mangrove", "Gazebo", "Toilet Sederhana"],
  activities: ["Eksplorasi Mangrove", "Bird Watching", "Fotografi", "Memancing"],
  nearbyAttractions: [],
  relatedTours: []
}, {
  id: 9,
  name: "Wira Garden",
  description: "Taman rekreasi keluarga dengan berbagai wahana, kolam renang, dan area piknik yang luas.",
  longDescription: "Wira Garden adalah taman rekreasi modern yang menawarkan berbagai fasilitas hiburan untuk keluarga. Dengan konsep one-stop entertainment, tempat ini menjadi pilihan favorit untuk quality time bersama keluarga.\n\nTaman ini memiliki berbagai wahana permainan untuk segala usia, mulai dari playground untuk anak-anak hingga flying fox untuk yang menyukai tantangan. Kolam renang dengan berbagai kedalaman tersedia untuk semua anggota keluarga.\n\nArea piknik yang luas dengan pepohonan rindang membuat Wira Garden cocok untuk gathering keluarga atau acara komunitas. Fasilitas pendukung seperti musholla, food court, dan area parkir yang luas menambah kenyamanan pengunjung.",
  images: ["https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=3270", "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=3270", "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?q=80&w=3270", "https://images.unsplash.com/photo-1586268247873-04c7e93bb4ba?q=80&w=3270"],
  location: "Gedong Tataan, Lampung Timur",
  category: "Taman",
  rating: 4.3,
  reviews: 156,
  openHours: "08:00 - 18:00",
  entryFee: "Rp 30.000 / orang",
  bestTimeToVisit: "Akhir pekan",
  facilities: ["Parkir", "Kolam Renang", "Playground", "Food Court", "Musholla", "Gazebo"],
  activities: ["Berenang", "Flying Fox", "Outbound", "Piknik", "Gathering"],
  nearbyAttractions: [],
  relatedTours: []
}, {
  id: 10,
  name: "Pantai Ketapang",
  description: "Pantai dengan dermaga kayu yang instagramable dan pemandangan matahari terbenam yang spektakuler.",
  longDescription: "Pantai Ketapang adalah destinasi wisata yang sedang naik daun di Lampung Timur. Daya tarik utama pantai ini adalah dermaga kayu yang memanjang ke laut, menciptakan spot foto yang sangat instagramable.\n\nPemandangan matahari terbenam di Pantai Ketapang adalah salah satu yang terbaik di Lampung Timur. Dermaga kayu yang iconic menjadi foreground sempurna untuk foto sunset, membuat tempat ini menjadi favorit para fotografer dan content creator.\n\nSelain keindahan visualnya, Pantai Ketapang juga menawarkan suasana yang tenang dan romantis. Warung-warung seafood di sekitar pantai menyajikan hasil laut segar dengan harga terjangkau, sempurna untuk makan malam romantis sambil menikmati sunset.",
  images: ["https://images.unsplash.com/photo-1523004845892-227316b7fc07?q=80&w=3270", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=3270", "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=3270", "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?q=80&w=3272"],
  location: "Padang Cermin, Lampung Timur",
  category: "Pantai",
  rating: 4.5,
  reviews: 143,
  openHours: "05:00 - 19:00",
  entryFee: "Rp 10.000 / orang",
  bestTimeToVisit: "Sore hari untuk sunset",
  facilities: ["Parkir", "Toilet", "Warung Seafood", "Dermaga", "Spot Foto"],
  activities: ["Fotografi", "Memancing", "Kuliner Seafood", "Sunset Viewing"],
  nearbyAttractions: [],
  relatedTours: []
}];
const DestinationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [destination, setDestination] = useState<any>(null);
  const [activeImage, setActiveImage] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  useEffect(() => {
    setIsLoading(true);
    // Small delay to ensure smooth transition
    const timer = setTimeout(() => {
      // Find the destination based on the slug from URL
      const foundDestination = destinations.find(dest => dest.slug === slug);
      if (foundDestination) {
        setDestination(foundDestination);
        setActiveImage(foundDestination.images[0]);
      }
      setIsLoading(false);
      // Scroll to top when component mounts
      window.scrollTo(0, 0);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [slug]);
  const handleBackToList = () => {
    navigate('/destinasi');
  };
  const handleImageClick = (image: string) => {
    setActiveImage(image);
  };
  const handleLikeDestination = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Dihapus dari favorit" : "Ditambahkan ke favorit",
      description: isLiked ? "Destinasi dihapus dari daftar favorit Anda" : "Destinasi ditambahkan ke daftar favorit Anda"
    });
  };
  const handleShareDestination = () => {
    if (navigator.share) {
      navigator.share({
        title: destination?.name || '',
        text: `Lihat destinasi wisata ${destination?.name || ''} di Lampung Selatan`,
        url: window.location.href
      }).catch(error => {
        toast({
          title: "Gagal membagikan",
          description: "Terjadi kesalahan saat mencoba membagikan",
          variant: "destructive"
        });
      });
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Tautan disalin!",
        description: "Tautan telah disalin ke clipboard"
      });
    }
  };
  const handleConsultation = () => {
    if (!destination) return;

    // Format the WhatsApp message
    const message = `*Konsultasi Wisata - ${destination.name}*
    
Saya tertarik dengan destinasi wisata ${destination.name}.
Saya ingin mendapatkan informasi lebih lanjut tentang paket wisata, harga, dan ketersediaan.

Informasi Destinasi:
Nama: ${destination.name}
Lokasi: ${destination.location}
Kategori: ${destination.category}

Terima kasih.`;

    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);

    // Create WhatsApp URL with the provided phone number
    const whatsappUrl = `https://wa.me/6285768192419?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    toast({
      title: "Menghubungi penyedia wisata",
      description: "Anda akan diarahkan ke WhatsApp untuk konsultasi"
    });
  };
  const handleJoinTour = (tourId: number) => {
    navigate(`/agenda/join?id=${tourId}`);
  };
  if (isLoading) {
    return <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat destinasi...</p>
        </div>
      </div>;
  }
  
  if (!destination) {
    return <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Destinasi tidak ditemukan</h1>
            <Button className="mt-4 bg-primary hover:bg-primary/90 text-white" onClick={handleBackToList}>
              Kembali ke Daftar Destinasi
            </Button>
          </div>
        </div>
        <Footer />
      </div>;
  }
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />);
  };
  return <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Back button and header */}
      <div className="pt-16 bg-primary/5">
        <div className="container mx-auto p-4">
          <Button variant="outline" onClick={handleBackToList} className="mb-4 flex items-center border-primary text-primary hover:bg-primary hover:text-white">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Kembali ke Daftar Destinasi
          </Button>
        </div>
      </div>
      
      {/* Destination Hero Section */}
      <section className="bg-lamsel-blue/10">
        <div className="container mx-auto px-4 pb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Image Gallery */}
            <div className="w-full lg:w-3/5">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img src={activeImage} alt={destination.name} className="w-full h-[300px] md:h-[400px] object-cover" />
              </div>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {destination.images.map((image: string, index: number) => <div key={index} className={`rounded-md overflow-hidden cursor-pointer border-2 ${activeImage === image ? 'border-lamsel-blue' : 'border-transparent'}`} onClick={() => handleImageClick(image)}>
                    <img src={image} alt={`${destination.name} ${index + 1}`} className="w-full h-20 object-cover" />
                  </div>)}
              </div>
            </div>
            
            {/* Destination Info */}
            <div className="w-full lg:w-2/5">
              <div className="flex justify-between items-start">
                <div>
                  <Badge className="mb-2 bg-lamsel-blue">{destination.category}</Badge>
                  <h1 className="text-3xl font-bold">{destination.name}</h1>
                  <div className="flex items-center mt-2">
                    {renderStars(destination.rating)}
                    <span className="ml-2 text-sm text-gray-600">
                      ({destination.reviews} ulasan)
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={handleShareDestination} className="border-primary text-primary hover:bg-primary hover:text-white">
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleLikeDestination} className={`${isLiked ? 'bg-red-100 text-red-500 border-red-200' : 'border-primary text-primary hover:bg-primary hover:text-white'}`}>
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-lamsel-blue" />
                  <span>{destination.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-lamsel-blue" />
                  <span>Jam Buka: {destination.openHours}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-lamsel-blue" />
                  <span>Waktu Terbaik: {destination.bestTimeToVisit}</span>
                </div>
                <div className="flex items-center">
                  <Info className="mr-2 h-5 w-5 text-lamsel-blue" />
                  <span>Tiket Masuk: {destination.entryFee}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Deskripsi Singkat</h3>
                <p className="text-gray-700">{destination.description}</p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-4 mt-6">
                <Button onClick={handleConsultation} className="flex-1 bg-primary hover:bg-primary/90 text-white">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Konsultasi Tour
                </Button>
                <Button variant="outline" onClick={() => navigate('/agenda')} className="flex-1 border-primary text-primary hover:bg-primary hover:text-white">
                  <Users className="mr-2 h-5 w-5" />
                  Lihat Tur
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tab Content */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full mb-8 p-1 bg-gray-50">
              <TabsTrigger value="about" className="flex-1 bg-black-50 text-blue-600">Tentang</TabsTrigger>
              <TabsTrigger value="facilities" className="flex-1 bg-zinc-50 text-blue-600">Fasilitas & Aktivitas</TabsTrigger>
              <TabsTrigger value="location" className="flex-1 bg-zinc-50 text-blue-600">Lokasi</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Tentang {destination.name}</h2>
                <p className="text-gray-700 whitespace-pre-line">{destination.longDescription}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="facilities" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Fasilitas</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {destination.facilities.map((facility: string, index: number) => <div key={index} className="flex items-center p-3 bg-gray-50 rounded-md">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                      <span>{facility}</span>
                    </div>)}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">Aktivitas</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {destination.activities.map((activity: string, index: number) => <div key={index} className="flex items-center p-3 bg-gray-50 rounded-md">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                      <span>{activity}</span>
                    </div>)}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="location">
              <div>
                <h2 className="text-2xl font-bold mb-4">Lokasi</h2>
                {destination.mapEmbedUrl ? (
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      src={destination.mapEmbedUrl}
                      width="100%"
                      height="400"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Peta ${destination.name}`}
                    ></iframe>
                  </div>
                ) : (
                  <div className="bg-gray-200 rounded-lg h-[400px] flex items-center justify-center">
                    <p className="text-gray-600">Peta lokasi {destination.name}</p>
                  </div>
                )}
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">Alamat</h3>
                  <p className="text-gray-700">{destination.location}</p>
                  
                  <h3 className="text-xl font-semibold mt-4 mb-2">Cara Mencapai Lokasi</h3>
                  <p className="text-gray-700">
                    Untuk mencapai {destination.name}, Anda dapat menggunakan kendaraan pribadi atau transportasi umum dari berbagai arah di Lampung Timur. Akses jalan menuju lokasi sudah cukup baik dan dapat dilalui berbagai jenis kendaraan.
                  </p>
                  
                  <Button
                    className="mt-4 bg-primary hover:bg-primary/90"
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${destination.mapCoordinates?.lat},${destination.mapCoordinates?.lng}`, '_blank')}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Buka di Google Maps
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Related Tours Section */}
      {destination.relatedTours && destination.relatedTours.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Tur yang Tersedia</h2>
            <p className="text-gray-600 mb-6">Jelajahi paket wisata yang tersedia untuk destinasi ini</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destination.relatedTours.map(tour => <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img src={tour.image} alt={tour.name} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2">{tour.name}</h3>
                    <div className="flex items-center mb-2">
                      {renderStars(tour.rating)}
                      <span className="ml-2 text-sm text-gray-600">
                        ({tour.reviews} ulasan)
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-600">{tour.duration}</span>
                      <span className="font-bold text-primary">{tour.price}</span>
                    </div>
                    <Button onClick={() => handleJoinTour(tour.id)} className="w-full bg-primary hover:bg-primary/90">
                      Bergabung dengan Tur
                    </Button>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>
      )}
      
      {/* Related Destinations - Carousel */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Destinasi Lainnya</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const container = document.getElementById('destinations-scroll');
                  if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                }}
                className="rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const container = document.getElementById('destinations-scroll');
                  if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                }}
                className="rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div id="destinations-scroll" className="flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {destinations
              .filter(dest => dest.id !== destination.id)
              .map((dest) => (
                <Card key={dest.id} className="flex-shrink-0 w-[300px] overflow-hidden hover:shadow-lg transition-all hover:scale-105 cursor-pointer" onClick={() => navigate(`/destinasi/detail?id=${dest.id}`)}>
                  <div className="relative h-48">
                    <img src={dest.images[0]} alt={dest.name} className="w-full h-full object-cover" />
                    <Badge className="absolute left-3 top-3 bg-primary text-white hover:bg-primary/90">
                      {dest.category}
                    </Badge>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                      <h3 className="font-bold text-sm">{dest.name}</h3>
                      <p className="text-xs flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {dest.location}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Jelajahi Lebih Banyak Destinasi di Lampung Timur</h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-700 text-lg">
            Temukan keindahan alam, budaya, dan kuliner khas Lampung Timur yang menakjubkan
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all" onClick={() => navigate('/destinasi')}>
            Lihat Semua Destinasi
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>;
};
export default DestinationDetail;
