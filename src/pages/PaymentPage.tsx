import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  ArrowLeft, 
  Download, 
  MessageCircle, 
  Copy, 
  CheckCircle,
  CreditCard,
  Smartphone
} from 'lucide-react';
import jsPDF from 'jspdf';

// Sample payment methods data
const paymentMethods = {
  qris: {
    name: "QRIS",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2340",
    code: "00020101021126580014ID.CO.QRIS.WWW0215ID20232923845270303UMI51440014ID.LINKAJA.WWW0215088812345678910303UMI52044899530336054041000540200000000000062210528ID123456789012345678901234634004A01A"
  },
  bank: [
    {
      name: "Bank BCA",
      accountNumber: "1234567890",
      accountName: "PT Lampung Travel Sejahtera"
    }
  ]
};

// Data Tour Resmi - Destinasi Wisata Asli Lampung Timur (synced with Agenda.tsx)
const events = [
  {
    id: 1,
    title: "Taman Nasional Way Kambas - Elephant Safari",
    image: "https://akcdn.detik.net.id/community/media/visual/2024/01/29/gajah-sumatera-di-taman-nasional-way-kambas_169.jpeg?w=700&q=90",
    date: "15 Juni 2024",
    time: "08:00 - 16:00",
    location: "Labuhan Ratu, Lampung Timur",
    category: "Taman Nasional",
    spots: 20,
    price: 180000,
    description: "Jelajahi Taman Nasional Way Kambas, pusat konservasi gajah Sumatera terbesar di Indonesia. Nikmati Elephant Safari dan bertemu langsung dengan satwa langka.",
    provider: {
      name: "Way Kambas Eco Tour",
      phone: "6285768192419"
    }
  },
  {
    id: 2,
    title: "Pantai Kuala Kambas - River & Beach Tour",
    image: "",
    date: "22 Juni 2024",
    time: "07:00 - 16:00",
    location: "Margasari, Labuhan Maringgai, Lampung Timur",
    category: "Pantai",
    spots: 15,
    price: 120000,
    description: "Pengalaman unik ke Pantai Kuala Kambas melalui perahu menyusuri Sungai Way Kanan. Nikmati pantai berpasir putih dan seafood segar.",
    provider: {
      name: "Kuala Kambas Beach Tour",
      phone: "6285768192419"
    }
  },
  {
    id: 3,
    title: "Danau Way Jepara - Nature Escape",
    image: "",
    date: "30 Juni 2024",
    time: "08:00 - 15:00",
    location: "Way Jepara, Lampung Timur",
    category: "Danau",
    spots: 25,
    price: 85000,
    description: "Nikmati ketenangan Danau Way Jepara yang dikelilingi hutan hijau dan kebun rimbun. Cocok untuk piknik keluarga dan relaksasi.",
    provider: {
      name: "Way Jepara Lake Tour",
      phone: "6285768192419"
    }
  },
  {
    id: 4,
    title: "Pantai Kerang Mas - Family Fun",
    image: "",
    date: "5 Juli 2024",
    time: "09:00 - 17:00",
    location: "Muara Gading Mas, Labuhan Maringgai, Lampung Timur",
    category: "Pantai",
    spots: 30,
    price: 95000,
    description: "Pantai Kerang Mas menawarkan wahana permainan air dan fasilitas lengkap untuk liburan keluarga yang menyenangkan.",
    provider: {
      name: "Kerang Mas Beach Tour",
      phone: "6285768192419"
    }
  },
  {
    id: 5,
    title: "Hutan Mangrove Sriminosari - Eco Tour",
    image: "",
    date: "12 Juli 2024",
    time: "08:00 - 14:00",
    location: "Margasari, Labuhan Maringgai, Lampung Timur",
    category: "Ekowisata",
    spots: 20,
    price: 70000,
    description: "Jelajahi kawasan konservasi mangrove terbesar di Lampung melalui jembatan kayu. Edukasi ekosistem dan fotografi alam.",
    provider: {
      name: "Mangrove Eco Tour",
      phone: "6285768192419"
    }
  },
  {
    id: 6,
    title: "Taman Purbakala Pugung Raharjo - Heritage Tour",
    image: "",
    date: "18 Juli 2024",
    time: "09:00 - 15:00",
    location: "Pugung Raharjo, Sekampung Udik, Lampung Timur",
    category: "Sejarah",
    spots: 25,
    price: 65000,
    description: "Kunjungi situs megalitikum bersejarah dengan batu-batu besar misterius. Tour edukasi budaya dan sejarah Lampung Timur.",
    provider: {
      name: "Pugung Heritage Tour",
      phone: "6285768192419"
    }
  }
];

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPayment, setSelectedPayment] = useState<'qris' | 'bank'>('qris');
  const [selectedBank, setSelectedBank] = useState(0);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  
  // Get booking data from URL params
  const eventId = parseInt(searchParams.get('eventId') || '1');
  const bookingData = {
    name: searchParams.get('name') || '',
    email: searchParams.get('email') || '',
    phone: searchParams.get('phone') || '',
    participants: parseInt(searchParams.get('participants') || '1'),
    notes: searchParams.get('notes') || '',
    bookingId: `TRV${Date.now()}`,
    bookingDate: new Date().toLocaleDateString('id-ID')
  };

  const event = events.find(e => e.id === eventId);
  const totalAmount = event ? event.price * bookingData.participants : 0;

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAccount(text);
      toast({
        title: "Berhasil disalin",
        description: `${type} telah disalin ke clipboard`,
      });
      setTimeout(() => setCopiedAccount(null), 2000);
    } catch (err) {
      toast({
        title: "Gagal menyalin",
        description: "Silakan salin secara manual",
        variant: "destructive"
      });
    }
  };

  const generateInvoicePDF = async () => {
    if (!event) return;

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    
    // Colors matching UMKM invoice
    const primaryColor = { r: 124, g: 58, b: 237 }; // Lamsel purple
    const textColor = { r: 55, g: 65, b: 81 };
    const lightGray = { r: 243, g: 244, b: 246 };
    
    // Generate invoice number and data
    const invoiceNumber = bookingData.bookingId;
    const currentDate = bookingData.bookingDate;
    
    try {
      // Header with background
      pdf.setFillColor(primaryColor.r, primaryColor.g, primaryColor.b);
      pdf.rect(0, 0, pageWidth, 40, 'F');
      
      // Title
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text('INVOICE TRAVEL', margin, 25);
      
      // Subtitle
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Lampung Selatan Travel Services', margin, 32);

      // Reset text color
      pdf.setTextColor(textColor.r, textColor.g, textColor.b);
      
      // Invoice details section
      let yPos = 60;
      
      // Invoice number and date box
      pdf.setFillColor(lightGray.r, lightGray.g, lightGray.b);
      pdf.rect(margin, yPos, contentWidth, 20, 'F');
      
      yPos += 15;
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`No. Invoice: ${invoiceNumber}`, margin + 5, yPos);
      pdf.text(`Tanggal: ${currentDate}`, pageWidth - margin - 60, yPos);
      
      yPos += 20;
      
      // Customer information section
      pdf.setFillColor(lightGray.r, lightGray.g, lightGray.b);
      pdf.rect(margin, yPos, contentWidth, 45, 'F');
      
      yPos += 15;
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('INFORMASI PEMESAN', margin + 5, yPos);
      
      yPos += 8;
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Nama: ${bookingData.name}`, margin + 5, yPos);
      pdf.text(`Email: ${bookingData.email}`, margin + 5, yPos + 6);
      pdf.text(`Telepon: ${bookingData.phone}`, margin + 5, yPos + 12);
      pdf.text(`Jumlah Peserta: ${bookingData.participants} orang`, margin + 5, yPos + 18);
      
      yPos += 35;
      
      // Event information section
      pdf.setFillColor(lightGray.r, lightGray.g, lightGray.b);
      pdf.rect(margin, yPos, contentWidth, 55, 'F');
      
      yPos += 15;
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('DETAIL AGENDA TRAVEL', margin + 5, yPos);
      
      yPos += 8;
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Nama Event: ${event.title}`, margin + 5, yPos);
      pdf.text(`Kategori: ${event.category}`, margin + 5, yPos + 6);
      pdf.text(`Tanggal: ${event.date}`, margin + 5, yPos + 12);
      pdf.text(`Waktu: ${event.time}`, margin + 5, yPos + 18);
      pdf.text(`Lokasi: ${event.location}`, margin + 5, yPos + 24);
      
      yPos += 40;
      
      // Pricing table header
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('RINCIAN BIAYA', margin, yPos);
      
      yPos += 15;
      
      // Table header
      pdf.setFillColor(primaryColor.r, primaryColor.g, primaryColor.b);
      pdf.rect(margin, yPos, contentWidth, 12, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Deskripsi', margin + 5, yPos + 8);
      pdf.text('Qty', margin + 100, yPos + 8);
      pdf.text('Harga Satuan', margin + 125, yPos + 8);
      pdf.text('Total', pageWidth - margin - 30, yPos + 8);
      
      yPos += 12;
      
      // Table content
      pdf.setTextColor(textColor.r, textColor.g, textColor.b);
      pdf.setFillColor(249, 250, 251);
      pdf.rect(margin, yPos, contentWidth, 12, 'F');
      
      pdf.setFont('helvetica', 'normal');
      pdf.text(event.title, margin + 5, yPos + 8);
      pdf.text(bookingData.participants.toString(), margin + 100, yPos + 8);
      pdf.text(`Rp${event.price.toLocaleString('id-ID')}`, margin + 125, yPos + 8);
      pdf.text(`Rp${totalAmount.toLocaleString('id-ID')}`, pageWidth - margin - 50, yPos + 8);
      
      yPos += 25;
      
      // Total section
      pdf.setFillColor(primaryColor.r, primaryColor.g, primaryColor.b);
      pdf.rect(margin + (contentWidth * 0.6), yPos, contentWidth * 0.4, 15, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('TOTAL PEMBAYARAN:', margin + (contentWidth * 0.65), yPos + 10);
      pdf.text(`Rp${totalAmount.toLocaleString('id-ID')}`, pageWidth - margin - 50, yPos + 10);
      
      yPos += 30;
      
      // Payment information
      pdf.setTextColor(textColor.r, textColor.g, textColor.b);
      pdf.setFillColor(lightGray.r, lightGray.g, lightGray.b);
      pdf.rect(margin, yPos, contentWidth, 40, 'F');
      
      yPos += 15;
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('INFORMASI PEMBAYARAN', margin + 5, yPos);
      
      yPos += 8;
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Transfer Bank BCA:', margin + 5, yPos);
      pdf.text('No. Rekening: 1234567890', margin + 5, yPos + 6);
      pdf.text('A.n: PT Lampung Travel Sejahtera', margin + 5, yPos + 12);
      
      yPos += 25;
      
      // Notes section
      if (bookingData.notes) {
        pdf.setFillColor(lightGray.r, lightGray.g, lightGray.b);
        const notesHeight = 30;
        pdf.rect(margin, yPos, contentWidth, notesHeight, 'F');
        
        yPos += 15;
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text('CATATAN KHUSUS:', margin + 5, yPos);
        
        yPos += 8;
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        
        // Split long notes into multiple lines
        const noteLines = pdf.splitTextToSize(bookingData.notes, contentWidth - 20);
        pdf.text(noteLines, margin + 5, yPos);
        yPos += noteLines.length * 5 + 15;
      }
      
      // Terms and conditions
      yPos += 10;
      pdf.setFillColor(lightGray.r, lightGray.g, lightGray.b);
      pdf.rect(margin, yPos, contentWidth, 25, 'F');
      
      yPos += 12;
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.text('SYARAT & KETENTUAN:', margin + 5, yPos);
      
      yPos += 6;
      pdf.setFont('helvetica', 'normal');
      pdf.text('• Pembayaran dilakukan maksimal 24 jam setelah booking', margin + 5, yPos);
      pdf.text('• Konfirmasi pembayaran melalui WhatsApp dengan melampirkan bukti transfer', margin + 5, yPos + 4);
      
      // Footer
      yPos = pageHeight - 40;
      pdf.setFillColor(primaryColor.r, primaryColor.g, primaryColor.b);
      pdf.rect(0, yPos, pageWidth, 40, 'F');
      
      yPos += 15;
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Terima kasih atas kepercayaan Anda!', margin, yPos);
      
      yPos += 8;
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Penyedia: ${event.provider.name}`, margin, yPos);
      pdf.text('Email: info@lampungselatan.travel', margin, yPos + 6);
      pdf.text('WhatsApp: +62 887 437 525 303', pageWidth - margin - 60, yPos + 6);
      
      // Save the PDF
      pdf.save(`Invoice-Travel-${invoiceNumber}.pdf`);
      
      toast({
        title: "Invoice berhasil dibuat",
        description: "File PDF telah disimpan ke perangkat Anda",
      });
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Gagal membuat invoice",
        description: "Terjadi kesalahan saat membuat file PDF",
        variant: "destructive"
      });
    }
  };

  const handlePaymentConfirmation = () => {
    const message = `*Konfirmasi Pembayaran - ${event?.title}*

No. Booking: ${bookingData.bookingId}
Nama Pemesan: ${bookingData.name}
Email: ${bookingData.email}
Telepon: ${bookingData.phone}

Detail Pesanan:
- Event: ${event?.title}
- Tanggal: ${event?.date}
- Jumlah Peserta: ${bookingData.participants}
- Total Pembayaran: Rp${totalAmount.toLocaleString('id-ID')}

Metode Pembayaran: ${selectedPayment === 'qris' ? 'QRIS' : `Transfer Bank ${paymentMethods.bank[selectedBank].name}`}

*Saya telah melakukan pembayaran sesuai dengan jumlah di atas. Mohon konfirmasi pembayaran.*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/62887437525303?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Data tidak ditemukan</h1>
            <Button 
              className="mt-4 bg-lamsel-purple hover:bg-lamsel-purple/80"
              onClick={() => navigate('/agenda')}
            >
              Kembali ke Agenda
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Back button */}
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="mb-6 border-lamsel-purple text-lamsel-purple hover:bg-lamsel-purple hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Booking Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                  Ringkasan Pesanan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <Badge className="mt-1 bg-lamsel-purple hover:bg-lamsel-purple/80">
                    {event.category}
                  </Badge>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>No. Booking:</span>
                    <span className="font-medium">{bookingData.bookingId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tanggal Booking:</span>
                    <span>{bookingData.bookingDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nama Pemesan:</span>
                    <span>{bookingData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jumlah Peserta:</span>
                    <span>{bookingData.participants} orang</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Tanggal Event:</span>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Waktu:</span>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lokasi:</span>
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Harga per orang:</span>
                    <span>Rp{event.price.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jumlah peserta:</span>
                    <span>{bookingData.participants}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Pembayaran:</span>
                    <span className="text-lamsel-purple">Rp{totalAmount.toLocaleString('id-ID')}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={generateInvoicePDF}
                  className="w-full mt-4 bg-green-600 hover:bg-green-700"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Invoice PDF
                </Button>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Pilih Metode Pembayaran</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment method selector */}
                <div className="flex space-x-4">
                  <Button
                    variant={selectedPayment === 'qris' ? 'default' : 'outline'}
                    onClick={() => setSelectedPayment('qris')}
                    className="flex-1"
                  >
                    <Smartphone className="mr-2 h-4 w-4" />
                    QRIS
                  </Button>
                  <Button
                    variant={selectedPayment === 'bank' ? 'default' : 'outline'}
                    onClick={() => setSelectedPayment('bank')}
                    className="flex-1"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Transfer Bank
                  </Button>
                </div>

                {/* QRIS Payment */}
                {selectedPayment === 'qris' && (
                  <div className="text-center space-y-4">
                    <h3 className="font-semibold">Scan QR Code untuk Pembayaran</h3>
                    <div className="flex justify-center">
                      <img 
                        src={paymentMethods.qris.image} 
                        alt="QR Code" 
                        className="w-64 h-64 border rounded-lg"
                      />
                    </div>
                    <p className="text-sm text-gray-600">
                      Scan menggunakan aplikasi e-wallet atau mobile banking Anda
                    </p>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <p className="text-sm font-medium">Total Pembayaran:</p>
                      <p className="text-xl font-bold text-lamsel-purple">
                        Rp{totalAmount.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                )}

                {/* Bank Transfer Payment */}
                {selectedPayment === 'bank' && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">Transfer Bank</h3>
                    <div className="space-y-3">
                      {paymentMethods.bank.map((bank, index) => (
                        <div key={index} 
                             className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                               selectedBank === index ? 'border-lamsel-purple bg-lamsel-purple/5' : 'border-gray-200'
                             }`}
                             onClick={() => setSelectedBank(index)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{bank.name}</h4>
                              <p className="text-sm text-gray-600">{bank.accountName}</p>
                              <p className="font-mono text-lg font-bold mt-1">{bank.accountNumber}</p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(bank.accountNumber, 'Nomor rekening');
                              }}
                            >
                              {copiedAccount === bank.accountNumber ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800">
                        <strong>Penting:</strong> Transfer sesuai dengan jumlah yang tertera dan simpan bukti transfer
                      </p>
                      <p className="text-xl font-bold text-lamsel-purple mt-2">
                        Rp{totalAmount.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                )}

                {/* Confirmation Button */}
                <Button 
                  onClick={handlePaymentConfirmation}
                  className="w-full bg-lamsel-purple hover:bg-lamsel-purple/80"
                  size="lg"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Konfirmasi Pembayaran via WhatsApp
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  Setelah melakukan pembayaran, klik tombol konfirmasi untuk mengirim bukti pembayaran ke penyedia travel
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PaymentPage;
