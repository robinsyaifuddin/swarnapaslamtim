import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Clock, MapPin, Users, ArrowLeft, Phone, User, Mail, CreditCard, Star, CheckCircle, Mountain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { generateTourInvoicePDF, generateBookingId, BookingData } from '@/utils/pdfGenerator';

// Data Tour Resmi - Destinasi Wisata Asli Lampung Timur (synced with Agenda.tsx)
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
const AgendaJoin = () => {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    participants: 1,
    notes: ''
  });
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    // Find the event based on the slug from URL
    const foundEvent = events.find(e => e.slug === slug);
    if (foundEvent) {
      setEvent(foundEvent);
    }

    // Scroll to top
    window.scrollTo(0, 0);
  }, [slug]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleParticipantsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= (event?.spots || 1)) {
      setFormData({
        ...formData,
        participants: value
      });
    }
  };
  const handleBookingNow = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Form tidak lengkap",
        description: "Harap isi semua kolom yang diperlukan",
        variant: "destructive"
      });
      return;
    }

    // Generate booking ID and PDF
    const bookingId = generateBookingId();
    const bookingData: BookingData = {
      eventTitle: event?.title || '',
      eventDate: event?.date || '',
      eventTime: event?.time || '',
      eventLocation: event?.location || '',
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      participants: formData.participants,
      price: event?.price || 0,
      totalAmount: (event?.price || 0) * formData.participants,
      bookingId: bookingId,
      notes: formData.notes
    };

    // Generate and download PDF
    generateTourInvoicePDF(bookingData);

    // Format WhatsApp message
    const message = `*KONFIRMASI BOOKING TOUR - ${event?.title}*

Invoice ID: ${bookingId}
Nama: ${formData.name}
Email: ${formData.email}
Telepon: ${formData.phone}
Jumlah Peserta: ${formData.participants}
Tanggal: ${event?.date}
Waktu: ${event?.time}
Lokasi: ${event?.location}
Catatan: ${formData.notes || '-'}

Total Biaya: Rp${((event?.price || 0) * formData.participants).toLocaleString('id-ID')}

Mohon konfirmasi ketersediaan dan instruksi pembayaran. Invoice telah didownload otomatis.`;

    // Encode and open WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6285768192419?text=${encodedMessage}`;
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1000);

    toast({
      title: "Booking berhasil!",
      description: "Invoice telah didownload dan Anda akan diarahkan ke WhatsApp untuk konfirmasi"
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Form tidak lengkap",
        description: "Harap isi semua kolom yang diperlukan",
        variant: "destructive"
      });
      return;
    }

    // Format the WhatsApp message for travel provider contact
    const message = `*INQUIRY TOUR - ${event?.title}*
    
Nama: ${formData.name}
Email: ${formData.email}
Telepon: ${formData.phone}
Jumlah Peserta: ${formData.participants}
Tanggal Tour: ${event?.date}
Waktu: ${event?.time}
Lokasi: ${event?.location}
Catatan: ${formData.notes || '-'}

Estimasi Total: Rp${(event?.price * formData.participants).toLocaleString('id-ID')}

Mohon informasi ketersediaan dan proses booking lebih lanjut.`;

    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);

    // Create WhatsApp URL with travel provider number
    const whatsappUrl = `https://wa.me/6285768192419?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    toast({
      title: "Berhasil mengirim permintaan",
      description: "Anda akan diarahkan ke WhatsApp untuk menghubungi penyedia travel"
    });
  };
  const handleBackToAgenda = () => {
    navigate('/agenda');
  };
  if (!event) {
    return <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Agenda tidak ditemukan</h1>
            <Button className="mt-4 bg-primary hover:bg-primary/90" onClick={handleBackToAgenda}>
              Kembali ke Daftar Agenda
            </Button>
          </div>
        </div>
        <Footer />
      </div>;
  }
  return <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Back button and Header */}
      <div className="pt-16 bg-lamsel-purple/10">
        <div className="container mx-auto p-4">
          <Button variant="outline" onClick={handleBackToAgenda} className="mb-4 flex items-center border-primary text-primary hover:bg-primary hover:text-white">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Kembali ke Daftar Agenda
          </Button>
        </div>
      </div>
      
      {/* Tour Details Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tour Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image and Basic Info */}
            <Card className="overflow-hidden shadow-lg">
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                <Badge className="absolute left-3 top-3 bg-primary hover:bg-primary/80">
                  {event.category}
                </Badge>
                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {event.duration}
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <h1 className="text-2xl md:text-3xl font-bold">{event.title}</h1>
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-lg">{event.rating}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    <span className="text-sm">Min {event.minParticipants} orang</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Price */}
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500 line-through text-lg">
                      Rp{event.originalPrice.toLocaleString('id-ID')}
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      Rp{event.price.toLocaleString('id-ID')}
                    </span>
                    <span className="text-sm text-gray-500">/orang</span>
                  </div>
                  
                  {/* Basic Details */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-lamsel-purple" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-lamsel-purple" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-2 h-5 w-5 text-lamsel-purple" />
                      <span>{event.spots} spot tersedia</span>
                    </div>
                    <div className="flex items-center">
                      <Mountain className="mr-2 h-5 w-5 text-lamsel-purple" />
                      <span>{event.duration}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">Deskripsi & Aktivitas</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{event.description}</p>
              </CardContent>
            </Card>

            {/* Tour Highlights */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">Highlight Tour</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {event.highlights.map((highlight: string, index: number) => <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{highlight}</span>
                    </div>)}
                </div>
              </CardContent>
            </Card>

            {/* Itinerary - Simplified to match highlights style */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">Itinerary Lengkap</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {event.itinerary.map((item: string, index: number) => <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>)}
                </div>
              </CardContent>
            </Card>

            {/* Facilities */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">Fasilitas</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {event.facilities.map((facility: string, index: number) => <div key={index} className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm font-medium">{facility}</span>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Booking Form (Sticky on desktop) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <Card className="w-full">
                <CardHeader>
                  <h2 className="text-xl font-bold">Booking Tour</h2>
                  <p className="text-gray-600 text-sm">Pilih tanggal dan isi data diri</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBookingNow} className="space-y-4">
                    {/* Date Picker */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Pilih Tanggal</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}>
                            <Calendar className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP", {
                            locale: id
                          }) : "Pilih tanggal"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent mode="single" selected={selectedDate} onSelect={setSelectedDate} disabled={date => date < new Date()} initialFocus className="pointer-events-auto" />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">Nama Lengkap *</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                          <User className="h-4 w-4 text-gray-500" />
                        </span>
                        <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Masukkan nama lengkap" className="rounded-l-none" required />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                          <Mail className="h-4 w-4 text-gray-500" />
                        </span>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Masukkan alamat email" className="rounded-l-none" required />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">Nomor Telepon *</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                          <Phone className="h-4 w-4 text-gray-500" />
                        </span>
                        <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Masukkan nomor telepon" className="rounded-l-none" required />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="participants" className="block text-sm font-medium mb-1">Jumlah Peserta</label>
                      <Input id="participants" name="participants" type="number" min="1" max={event.spots} value={formData.participants} onChange={handleParticipantsChange} />
                      <p className="text-xs text-gray-500 mt-1">Maksimal {event.spots} peserta</p>
                    </div>
                    
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium mb-1">Catatan Tambahan</label>
                      <Textarea id="notes" name="notes" value={formData.notes} onChange={handleInputChange} placeholder="Jika ada permintaan khusus atau pertanyaan" className="min-h-[80px]" />
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Subtotal ({formData.participants} peserta)</span>
                        <span className="font-medium">Rp{(event.price * formData.participants).toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between items-center font-bold text-lg mt-2">
                        <span>Total</span>
                        <span className="text-lg font-bold text-primary">Rp{(event.price * formData.participants).toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-3">
                  <Button type="button" onClick={handleBookingNow} className="w-full bg-primary hover:bg-primary/90 text-white" size="lg">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Booking Sekarang
                  </Button>
                  <Button type="button" onClick={handleSubmit} variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                    Hubungi Penyedia Travel
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    Lanjutkan ke pembayaran untuk mendapatkan invoice
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>;
};
export default AgendaJoin;
