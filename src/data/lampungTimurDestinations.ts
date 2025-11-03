// Data Destinasi Wisata resmi di Kabupaten Lampung Timur
// Berdasarkan riset dan data lapangan

export interface DestinationData {
  id: number;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  location: string;
  category: string;
  image_url: string;
  images?: string[];
  rating: number;
  reviews?: number;
  price_range: string;
  facilities: string[];
  opening_hours: string;
  activities?: string[];
  bestTimeToVisit?: string;
  mapEmbedUrl?: string;
  mapCoordinates?: { lat: number; lng: number };
  relatedTours?: number[];
}

export const lampungTimurDestinations: DestinationData[] = [{
  id: 1,
  name: "Taman Nasional Way Kambas",
  slug: "taman-nasional-way-kambas",
  description: "Taman nasional yang terkenal sebagai pusat konservasi dan pelatihan gajah Sumatera. Kawasan seluas 130.000 hektare ini menjadi habitat gajah, badak Sumatera, harimau Sumatera, dan berbagai satwa langka lainnya.",
  longDescription: "Taman Nasional Way Kambas (TNWK) merupakan salah satu taman nasional tertua di Indonesia yang diresmikan pada tahun 1989. Kawasan seluas 125.621 hektare ini terletak di Kabupaten Lampung Timur dan menjadi rumah bagi berbagai satwa langka yang dilindungi.\n\nDaya tarik utama TNWK adalah Pusat Latihan Gajah (PLG) yang merupakan pusat konservasi gajah Sumatera terbesar di Indonesia. Di sini, pengunjung dapat melihat langsung gajah-gajah yang dilatih dan berinteraksi dengan mereka. Selain gajah, taman nasional ini juga menjadi habitat badak Sumatera, harimau Sumatera, tapir, beruang madu, dan ratusan spesies burung.\n\nWisatawan dapat menikmati berbagai aktivitas seperti elephant safari, trekking menyusuri hutan tropis, bird watching, dan camping. Waktu terbaik berkunjung adalah musim kemarau (April-Oktober) ketika satwa lebih mudah diamati.",
  location: "Labuhan Ratu, Lampung Timur",
  category: "Taman Nasional",
  image_url: "https://akcdn.detik.net.id/community/media/visual/2024/01/29/gajah-sumatera-di-taman-nasional-way-kambas_169.jpeg?w=700&q=90",
  images: [
    "https://akcdn.detik.net.id/community/media/visual/2024/01/29/gajah-sumatera-di-taman-nasional-way-kambas_169.jpeg?w=700&q=90",
    "https://images.unsplash.com/photo-1608869497206-82e567a77414?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8V2F5JTIwS2FtYmFzJTIwTmF0aW9uYWwlMjBQYXJrJTJDJTIwRWFzdCUyMExhbXB1bmclMjBSZWdlbmN5JTJDJTIwTGFtcHVuZyUyQyUyMEluZG9uZXNpYXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000",
    "https://virallampung.com/wp-content/uploads/2024/09/Wisata-Way-Kambas.jpg",
    "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1634025439/6f7507efc7ff9c46ea81e9be85514c30b4bc04d132525a9c211d4e0263705af9.jpg"
  ],
  rating: 4.8,
  reviews: 287,
  price_range: "Rp 5.000 - Rp 150.000",
  facilities: ["Pusat Konservasi Gajah", "Elephant Safari", "Tracking Trail", "Bird Watching Point", "Camping Ground", "Toilet", "Mushola", "Kantin", "Parkir Luas"],
  opening_hours: "08:00 - 17:00 WIB",
  activities: ["Elephant Safari", "Trekking", "Bird Watching", "Wildlife Photography", "Camping", "Edukasi Konservasi"],
  bestTimeToVisit: "April - Oktober (Musim Kemarau)",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127165.25084486684!2d105.72562743125!3d-4.9372806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40c172b1d1e0d9%3A0x3039d80b220cc90!2sWay%20Kambas%20National%20Park!5e0!3m2!1sen!2sid!4v1699000000000!5m2!1sen!2sid",
  mapCoordinates: { lat: -4.9372806, lng: 105.7625274 },
  relatedTours: [1, 4]
}, {
  id: 2,
  name: "Pantai Kuala Kambas",
  slug: "pantai-kuala-kambas",
  description: "Pantai dengan pasir putih kecoklatan yang lembut dan air laut yang jernih. Akses menuju pantai melalui Sungai Way Kanan menambah keunikan destinasi ini.",
  longDescription: "Pantai Kuala Kambas merupakan destinasi wisata pantai yang unik di Lampung Timur karena aksesnya melalui Sungai Way Kanan, memberikan pengalaman perjalanan yang berbeda sebelum mencapai pantai. Perjalanan dengan perahu menyusuri sungai selama 15-20 menit menjadi daya tarik tersendiri.\n\nPantai ini memiliki karakteristik pasir berwarna putih kecoklatan yang lembut dengan air laut yang jernih dan bersih. Ombak yang tenang membuat pantai ini aman untuk berenang dan cocok untuk wisata keluarga. Hamparan pasir yang luas juga ideal untuk bermain voli pantai atau sekadar bersantai menikmati pemandangan laut.\n\nDi sekitar pantai terdapat gazebo-gazebo untuk beristirahat dan warung-warung yang menjual makanan seafood segar. Waktu terbaik berkunjung adalah pagi hari untuk menikmati sunrise atau sore hari untuk sunset yang menawan.",
  location: "Margasari, Labuhan Maringgai, Lampung Timur",
  category: "Pantai",
  image_url: "",
  images: ["", "", "", ""],
  rating: 4.6,
  reviews: 142,
  price_range: "Rp 5.000 - Rp 10.000",
  facilities: ["Parkir", "Penyeberangan Perahu", "Warung Makan Seafood", "Gazebo", "Toilet", "Mushola", "Spot Foto", "Area Bermain Anak"],
  opening_hours: "24 Jam (Penyeberangan: 06:00 - 18:00)",
  activities: ["Berenang", "Bermain Pasir", "Voli Pantai", "Fotografi", "Piknik", "Menikmati Seafood"],
  bestTimeToVisit: "Pagi hari untuk sunrise atau sore hari untuk sunset",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31791.624!2d105.7844!3d-4.7736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40dc5e2f8e8e8b%3A0xd0d0d0d0d0d0d0d!2sPantai%20Kuala%20Kambas!5e0!3m2!1sen!2sid!4v1699000000001!5m2!1sen!2sid",
  mapCoordinates: { lat: -4.7736, lng: 105.7844 },
  relatedTours: [1, 3]
}, {
  id: 3,
  name: "Danau Way Jepara",
  slug: "danau-way-jepara",
  description: "Danau dengan pemandangan alam yang indah, dikelilingi hutan dan kebun yang rimbun. Suasana sejuk dan damai cocok untuk relaksasi dan piknik keluarga.",
  location: "Way Jepara, Lampung Timur",
  category: "Danau",
  image_url: "",
  rating: 4.5,
  price_range: "Rp 5.000 - Rp 15.000",
  facilities: ["Gazebo", "Warung", "Perahu", "Area Piknik", "Toilet"],
  opening_hours: "06:00 - 18:00 WIB"
}, {
  id: 4,
  name: "Pantai Kerang Mas",
  slug: "pantai-kerang-mas",
  description: "Pantai dengan pasir putih, air laut biru, dan berbagai wahana permainan. Cocok untuk destinasi liburan keluarga dengan fasilitas lengkap.",
  location: "Muara Gading Mas, Labuhan Maringgai, Lampung Timur",
  category: "Pantai",
  image_url: "",
  rating: 4.7,
  price_range: "Rp 10.000 - Rp 15.000",
  facilities: ["Wahana Permainan", "Gazebo", "Warung", "Parkir", "Toilet", "Mushola"],
  opening_hours: "24 Jam (Recommended: Pagi/Sore)"
}, {
  id: 5,
  name: "Hutan Mangrove Sriminosari",
  slug: "hutan-mangrove-sriminosari",
  description: "Kawasan konservasi mangrove terbesar di Lampung dengan luas sekitar 100 hektare. Terdapat jembatan kayu di atas mangrove untuk berjalan-jalan sambil melihat ekosistem.",
  location: "Margasari, Labuhan Maringgai, Lampung Timur",
  category: "Ekowisata",
  image_url: "",
  rating: 4.6,
  price_range: "Rp 5.000 - Rp 10.000",
  facilities: ["Jembatan Kayu", "Spot Foto", "Area Edukasi", "Toilet"],
  opening_hours: "07:00 - 17:00 WIB"
}, {
  id: 6,
  name: "Taman Purbakala Pugung Raharjo",
  slug: "taman-purbakala-pugung-raharjo",
  description: "Situs peninggalan zaman megalitikum dengan batu-batu besar yang tersusun membentuk berbagai pola. Tempat wisata sejarah dan budaya yang bernilai tinggi.",
  location: "Pugung Raharjo, Sekampung Udik, Lampung Timur",
  category: "Sejarah & Budaya",
  image_url: "",
  rating: 4.5,
  price_range: "Rp 5.000 - Rp 10.000",
  facilities: ["Museum", "Guide", "Parkir", "Toilet", "Mushola"],
  opening_hours: "08:00 - 16:00 WIB"
}, {
  id: 7,
  name: "Danau Kemuning",
  slug: "danau-kemuning",
  description: "Danau dengan air jernih langsung dari mata air alami, berwarna hijau kebiruan. Cocok untuk berenang dan spot foto yang Instagram-able.",
  location: "Sribawono, Bandar Sribhawono, Lampung Timur",
  category: "Danau",
  image_url: "",
  rating: 4.6,
  price_range: "Rp 5.000",
  facilities: ["Kolam Renang Alami", "Gazebo", "Parkir", "Warung", "Toilet"],
  opening_hours: "08:00 - 17:00 WIB"
}, {
  id: 8,
  name: "Pantai Cemara",
  slug: "pantai-cemara",
  description: "Pantai dengan ombak yang cocok untuk berselancar, air laut jernih dan biru. Deretan pohon cemara laut menambah kesegaran pantai ini.",
  location: "Cemara Jaya, Labuhan Maringgai, Lampung Timur",
  category: "Pantai",
  image_url: "",
  rating: 4.5,
  price_range: "Rp 5.000 - Rp 10.000",
  facilities: ["Surfing Spot", "Parkir", "Warung", "Gazebo", "Toilet"],
  opening_hours: "24 Jam"
}, {
  id: 9,
  name: "Pantai Mutiara",
  slug: "pantai-mutiara",
  description: "Pantai dengan pasir putih dan berbagai fasilitas seperti ATV, dokar, dan kuliner. Tersedia mushola untuk ibadah pengunjung.",
  location: "Karya Makmur, Labuhan Maringgai, Lampung Timur",
  category: "Pantai",
  image_url: "",
  rating: 4.6,
  price_range: "Rp 10.000",
  facilities: ["ATV", "Dokar", "Kuliner", "Gazebo", "Toilet", "Mushola"],
  opening_hours: "24 Jam"
}, {
  id: 10,
  name: "Museum Budaya Lampung Timur",
  slug: "museum-budaya-lampung-timur",
  description: "Museum yang menyimpan koleksi benda-benda bersejarah dan budaya Lampung Timur seperti alat perang, pertanian, musik, seni ukir kayu, dan pakaian adat.",
  location: "Jl. Lintas Timur Sumatera, Sukadana, Lampung Timur",
  category: "Museum",
  image_url: "",
  rating: 4.4,
  price_range: "Gratis - Rp 5.000",
  facilities: ["Koleksi Museum", "Guide", "Parkir", "Toilet", "Toko Souvenir"],
  opening_hours: "08:00 - 16:00 WIB"
}];
