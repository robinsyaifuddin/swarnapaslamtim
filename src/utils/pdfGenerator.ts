import jsPDF from 'jspdf';

export interface BookingData {
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  participants: number;
  price: number;
  totalAmount: number;
  bookingId: string;
  notes?: string;
}

export const generateTourInvoicePDF = (bookingData: BookingData): void => {
  const doc = new jsPDF();
  
  // Set font
  doc.setFont('helvetica');
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(41, 128, 185);
  doc.text('INVOICE TOUR LAMPUNG TIMUR', 20, 25);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('www.lampungtimur-tourism.id', 20, 32);
  
  // Booking ID
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Invoice #: ${bookingData.bookingId}`, 20, 45);
  doc.text(`Tanggal: ${new Date().toLocaleDateString('id-ID')}`, 20, 52);
  
  // Customer Info
  doc.setFontSize(14);
  doc.setTextColor(41, 128, 185);
  doc.text('INFORMASI PELANGGAN', 20, 70);
  
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text(`Nama: ${bookingData.customerName}`, 20, 80);
  doc.text(`Email: ${bookingData.customerEmail}`, 20, 87);
  doc.text(`Telepon: ${bookingData.customerPhone}`, 20, 94);
  
  // Tour Details
  doc.setFontSize(14);
  doc.setTextColor(41, 128, 185);
  doc.text('DETAIL TOUR', 20, 115);
  
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text(`Tour: ${bookingData.eventTitle}`, 20, 125);
  doc.text(`Tanggal: ${bookingData.eventDate}`, 20, 132);
  doc.text(`Waktu: ${bookingData.eventTime}`, 20, 139);
  doc.text(`Lokasi: ${bookingData.eventLocation}`, 20, 146);
  doc.text(`Jumlah Peserta: ${bookingData.participants} orang`, 20, 153);
  
  if (bookingData.notes) {
    doc.text(`Catatan: ${bookingData.notes}`, 20, 160);
  }
  
  // Payment Details
  doc.setFontSize(14);
  doc.setTextColor(41, 128, 185);
  doc.text('RINCIAN PEMBAYARAN', 20, 180);
  
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text(`Harga per orang: Rp${bookingData.price.toLocaleString('id-ID')}`, 20, 190);
  doc.text(`Jumlah peserta: ${bookingData.participants} orang`, 20, 197);
  
  // Total
  doc.setFontSize(12);
  doc.setTextColor(41, 128, 185);
  doc.text(`TOTAL: Rp${bookingData.totalAmount.toLocaleString('id-ID')}`, 20, 210);
  
  // Payment Instructions
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('INSTRUKSI PEMBAYARAN:', 20, 230);
  doc.text('1. Hubungi penyedia tour melalui WhatsApp', 20, 237);
  doc.text('2. Kirimkan invoice ini sebagai konfirmasi booking', 20, 244);
  doc.text('3. Lakukan pembayaran sesuai instruksi dari penyedia', 20, 251);
  doc.text('4. Simpan bukti pembayaran untuk ditunjukkan saat tour', 20, 258);
  
  // Footer
  doc.setTextColor(41, 128, 185);
  doc.text('Terima kasih telah memilih Tour Lampung Timur!', 20, 275);
  
  // Save the PDF
  doc.save(`invoice-tour-${bookingData.bookingId}.pdf`);
};

export const generateBookingId = (): string => {
  const now = new Date();
  const dateStr = now.getFullYear().toString() + 
                  (now.getMonth() + 1).toString().padStart(2, '0') + 
                  now.getDate().toString().padStart(2, '0');
  const timeStr = now.getHours().toString().padStart(2, '0') + 
                  now.getMinutes().toString().padStart(2, '0');
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  
  return `LTE-${dateStr}-${timeStr}-${randomStr}`;
};