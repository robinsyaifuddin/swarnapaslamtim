import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Download, MessageCircle, Copy, CheckCircle, CreditCard, Smartphone, User, Mail, Phone } from 'lucide-react';
import jsPDF from 'jspdf';

// Sample payment methods data - updated to show only one bank
const paymentMethods = {
  qris: {
    name: "QRIS",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2340",
    code: "00020101021126580014ID.CO.QRIS.WWW0215ID20232923845270303UMI51440014ID.LINKAJA.WWW0215088812345678910303UMI52044899530336054041000540200000000000062210528ID123456789012345678901234634004A01A"
  },
  bank: {
    name: "Bank BCA",
    accountNumber: "1234567890",
    accountName: "UMKM Lampung Timur"
  }
};
const ProductPaymentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [selectedPayment, setSelectedPayment] = useState<'qris' | 'bank'>('qris');
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');

  // Get product data from URL params
  const productData = {
    umkmId: searchParams.get('umkmId') || '',
    productId: searchParams.get('productId') || '',
    productName: searchParams.get('productName') || '',
    productPrice: parseInt(searchParams.get('productPrice') || '0'),
    umkmName: searchParams.get('umkmName') || '',
    umkmPhone: '62887437525303',
    // Updated to unified WhatsApp number
    umkmLocation: searchParams.get('umkmLocation') || '',
    orderId: `PRD${Date.now()}`,
    orderDate: new Date().toLocaleDateString('id-ID')
  };
  const totalAmount = productData.productPrice * quantity;
  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAccount(text);
      toast({
        title: "Berhasil disalin",
        description: `${type} telah disalin ke clipboard`
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
    if (!customerName || !customerEmail || !customerPhone) {
      toast({
        title: "Data tidak lengkap",
        description: "Harap isi semua data pelanggan terlebih dahulu",
        variant: "destructive"
      });
      return;
    }
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;

    // Colors
    const primaryColor = [41, 128, 185]; // Blue
    const darkColor = [52, 73, 94]; // Dark gray
    const lightGray = [236, 240, 241]; // Light gray

    // Header Section with background
    pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.rect(0, 0, pageWidth, 35, 'F');

    // Company Info (Left)
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('UMKM LAMPUNG TIMUR', 20, 15);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Website: www.lampungtimur.com', 20, 22);
    pdf.text('Email: info@lampungtimur.com', 20, 28);

    // Invoice Title (Right)
    pdf.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    pdf.roundedRect(pageWidth - 80, 5, 70, 25, 3, 3, 'F');
    pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('INVOICE', pageWidth - 75, 15);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`No. ${productData.orderId}`, pageWidth - 75, 25);

    // Invoice Details Section
    pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('INVOICE TO:', 20, 50);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text(customerName, 20, 60);
    pdf.text(customerEmail, 20, 68);
    pdf.text(customerPhone, 20, 76);

    // Invoice Date & Due Date (Right)
    pdf.setFont('helvetica', 'bold');
    pdf.text('Invoice Date:', pageWidth - 80, 50);
    pdf.text('Due Date:', pageWidth - 80, 60);
    pdf.setFont('helvetica', 'normal');
    pdf.text(productData.orderDate, pageWidth - 40, 50);
    pdf.text(productData.orderDate, pageWidth - 40, 60);

    // Total Due Box (Right)
    pdf.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    pdf.roundedRect(pageWidth - 80, 70, 70, 20, 3, 3, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.text('Total Due:', pageWidth - 75, 78);
    pdf.setFontSize(14);
    pdf.text(`Rp${totalAmount.toLocaleString('id-ID')}`, pageWidth - 75, 88);

    // Table Header
    const tableStartY = 105;
    pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.rect(20, tableStartY, pageWidth - 40, 12, 'F');

    // Table Header Text
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('NO.', 25, tableStartY + 8);
    pdf.text('DESKRIPSI', 40, tableStartY + 8);
    pdf.text('HARGA', pageWidth - 90, tableStartY + 8);
    pdf.text('QTY', pageWidth - 60, tableStartY + 8);
    pdf.text('TOTAL', pageWidth - 40, tableStartY + 8);

    // Table Row
    const rowY = tableStartY + 12;
    pdf.setFillColor(249, 249, 249);
    pdf.rect(20, rowY, pageWidth - 40, 20, 'F');

    // Table Content
    pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    pdf.setFont('helvetica', 'normal');
    pdf.text('1.', 25, rowY + 8);

    // Product name with word wrap
    const productNameLines = pdf.splitTextToSize(productData.productName, 80);
    pdf.text(productNameLines, 40, rowY + 6);

    // UMKM info
    pdf.setFontSize(8);
    pdf.setTextColor(128, 128, 128);
    pdf.text(`UMKM: ${productData.umkmName}`, 40, rowY + 14);
    pdf.text(`Lokasi: ${productData.umkmLocation}`, 40, rowY + 18);

    // Price, Quantity, Total
    pdf.setFontSize(10);
    pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    pdf.text(`Rp${productData.productPrice.toLocaleString('id-ID')}`, pageWidth - 90, rowY + 8);
    pdf.text(quantity.toString(), pageWidth - 60, rowY + 8);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Rp${totalAmount.toLocaleString('id-ID')}`, pageWidth - 40, rowY + 8);

    // Calculations Section
    const calcStartY = rowY + 35;
    pdf.setFont('helvetica', 'normal');
    pdf.text('Sub Total:', pageWidth - 80, calcStartY);
    pdf.text(`Rp${totalAmount.toLocaleString('id-ID')}`, pageWidth - 40, calcStartY);
    pdf.text('Pajak (0%):', pageWidth - 80, calcStartY + 8);
    pdf.text('Rp0', pageWidth - 40, calcStartY + 8);
    pdf.text('Diskon:', pageWidth - 80, calcStartY + 16);
    pdf.text('Rp0', pageWidth - 40, calcStartY + 16);

    // Grand Total
    pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.rect(pageWidth - 85, calcStartY + 22, 75, 12, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Grand Total:', pageWidth - 80, calcStartY + 30);
    pdf.text(`Rp${totalAmount.toLocaleString('id-ID')}`, pageWidth - 40, calcStartY + 30);

    // Payment Methods Section
    const paymentY = calcStartY + 45;
    pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text('Metode Pembayaran:', 20, paymentY);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);

    // QRIS
    pdf.text('• QRIS - Scan QR Code', 20, paymentY + 12);

    // Bank Transfer - Updated to show only one bank
    pdf.text('• Transfer Bank:', 20, paymentY + 20);
    pdf.text(`  - ${paymentMethods.bank.name}: ${paymentMethods.bank.accountNumber}`, 25, paymentY + 28);
    pdf.text(`    a.n. ${paymentMethods.bank.accountName}`, 25, paymentY + 32);

    // Notes Section
    if (notes) {
      const notesY = paymentY + 50;
      pdf.setFont('helvetica', 'bold');
      pdf.text('Catatan:', 20, notesY);
      pdf.setFont('helvetica', 'normal');
      const notesLines = pdf.splitTextToSize(notes, pageWidth - 40);
      pdf.text(notesLines, 20, notesY + 8);
    }

    // Terms & Conditions
    const termsY = pageHeight - 50;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.text('Syarat & Ketentuan:', 20, termsY);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    const terms = ['• Pembayaran harus dilakukan sesuai dengan jumlah yang tertera', '• Simpan bukti pembayaran untuk konfirmasi', '• Hubungi produsen UMKM untuk konfirmasi setelah pembayaran', '• Produk akan diproses setelah konfirmasi pembayaran diterima'];
    terms.forEach((term, index) => {
      pdf.text(term, 20, termsY + 8 + index * 6);
    });

    // Footer
    const footerY = pageHeight - 15;
    pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.rect(0, footerY - 5, pageWidth, 20, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text('TERIMA KASIH ATAS KEPERCAYAAN ANDA!', pageWidth / 2, footerY + 3, {
      align: 'center'
    });

    // Contact info in footer
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.text('Hubungi: ' + productData.umkmPhone, 20, footerY + 8);
    pdf.text('Website: www.lampungtimur.com', pageWidth - 80, footerY + 8);
    pdf.save(`Invoice-${productData.orderId}.pdf`);
    toast({
      title: "Invoice berhasil diunduh",
      description: "File PDF telah disimpan ke perangkat Anda"
    });
  };
  const handlePaymentConfirmation = () => {
    if (!customerName || !customerEmail || !customerPhone) {
      toast({
        title: "Data tidak lengkap",
        description: "Harap isi semua data pelanggan terlebih dahulu",
        variant: "destructive"
      });
      return;
    }
    const message = `*Konfirmasi Pembayaran Produk UMKM*

No. Pesanan: ${productData.orderId}
Nama Pembeli: ${customerName}
Email: ${customerEmail}
Telepon: ${customerPhone}

Detail Pesanan:
- UMKM: ${productData.umkmName}
- Produk: ${productData.productName}
- Jumlah: ${quantity} unit
- Harga per unit: Rp${productData.productPrice.toLocaleString('id-ID')}
- Total Pembayaran: Rp${totalAmount.toLocaleString('id-ID')}

Metode Pembayaran: ${selectedPayment === 'qris' ? 'QRIS' : `Transfer Bank ${paymentMethods.bank.name}`}

${notes ? `Catatan: ${notes}` : ''}

*Saya telah melakukan pembayaran sesuai dengan jumlah di atas. Mohon konfirmasi pembayaran.*`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/62887437525303?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };
  if (!productData.productName) {
    return <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Data produk tidak ditemukan</h1>
            <Button className="mt-4 bg-lamsel-green hover:bg-lamsel-green/80" onClick={() => navigate('/umkm')}>
              Kembali ke UMKM
            </Button>
          </div>
        </div>
        <Footer />
      </div>;
  }
  return <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Back button */}
          <Button variant="outline" onClick={() => navigate(-1)} className="mb-6 border-primary text-primary hover:bg-primary hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Form and Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                  Detail Pesanan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Customer Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Data Pembeli</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Masukkan nama lengkap" className="pl-10" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input type="email" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} placeholder="Masukkan email" className="pl-10" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Nomor Telepon</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} placeholder="Masukkan nomor telepon" className="pl-10" />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Product Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Informasi Produk</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>UMKM:</span>
                        <span className="font-medium">{productData.umkmName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Produk:</span>
                        <span className="font-medium">{productData.productName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Harga per unit:</span>
                        <span>Rp{productData.productPrice.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Jumlah:</span>
                        <Input type="number" value={quantity} onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} min="1" className="w-20 text-center" />
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span className="text-lamsel-green">Rp{totalAmount.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium mb-1">Catatan (Opsional)</label>
                  <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Tambahkan catatan untuk penjual..." className="min-h-[80px]" />
                </div>

                <Button onClick={generateInvoicePDF} className="w-full bg-blue-600 hover:bg-blue-500">
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
                  <Button variant={selectedPayment === 'qris' ? 'default' : 'outline'} onClick={() => setSelectedPayment('qris')} className="flex-1">
                    <Smartphone className="mr-2 h-4 w-4" />
                    QRIS
                  </Button>
                  <Button variant={selectedPayment === 'bank' ? 'default' : 'outline'} onClick={() => setSelectedPayment('bank')} className="flex-1 bg-blue-600 hover:bg-blue-500 text-slate-50">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Transfer Bank
                  </Button>
                </div>

                {/* QRIS Payment */}
                {selectedPayment === 'qris' && <div className="text-center space-y-4">
                    <h3 className="font-semibold">Scan QR Code untuk Pembayaran</h3>
                    <div className="flex justify-center">
                      <img src={paymentMethods.qris.image} alt="QR Code" className="w-64 h-64 border rounded-lg" loading="lazy" decoding="async" />
                    </div>
                    <p className="text-sm text-gray-600">
                      Scan menggunakan aplikasi e-wallet atau mobile banking Anda
                    </p>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <p className="text-sm font-medium">Total Pembayaran:</p>
                      <p className="text-xl font-bold text-lamsel-green">
                        Rp{totalAmount.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>}

                {/* Bank Transfer Payment - Updated to show only one bank */}
                {selectedPayment === 'bank' && <div className="space-y-4">
                    <h3 className="font-semibold">Transfer Bank</h3>
                    <div className="p-4 border border-lamsel-green bg-lamsel-green/5 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{paymentMethods.bank.name}</h4>
                          <p className="text-sm text-gray-600">{paymentMethods.bank.accountName}</p>
                          <p className="font-mono text-lg font-bold mt-1">{paymentMethods.bank.accountNumber}</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(paymentMethods.bank.accountNumber, 'Nomor rekening')}>
                          {copiedAccount === paymentMethods.bank.accountNumber ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800">
                        <strong>Penting:</strong> Transfer sesuai dengan jumlah yang tertera dan simpan bukti transfer
                      </p>
                      <p className="text-xl font-bold text-lamsel-green mt-2">
                        Rp{totalAmount.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>}

                {/* Confirmation Button */}
                <Button onClick={handlePaymentConfirmation} className="w-full bg-lamsel-green hover:bg-lamsel-green/80" size="lg">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Konfirmasi Pembayaran via WhatsApp
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  Setelah melakukan pembayaran, klik tombol konfirmasi untuk mengirim bukti pembayaran ke produsen UMKM
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>;
};
export default ProductPaymentPage;