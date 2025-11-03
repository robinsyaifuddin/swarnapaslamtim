
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Search, 
  Filter, 
  Trash2, 
  Eye, 
  Mail,
  Phone,
  Calendar,
  ArrowUpDown,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { toast } from "sonner";

// Dummy data for demonstration
const pesanData = [
  { id: 1, name: 'Surya Wijaya', email: 'surya@example.com', phone: '081234567890', subject: 'Informasi Wisata', message: 'Saya ingin menanyakan informasi lebih lanjut tentang Pantai Anggariska.', date: '2025-05-01', status: 'Belum Dibaca' },
  { id: 2, name: 'Anita Sari', email: 'anita@example.com', phone: '089876543210', subject: 'Kerjasama UMKM', message: 'Kami ingin mengajukan kerjasama UMKM untuk Festival Krakatau mendatang.', date: '2025-05-02', status: 'Sudah Dibaca' },
  { id: 3, name: 'Budi Santoso', email: 'budi@example.com', phone: '087654321098', subject: 'Kunjungan Rombongan', message: 'Kami berencana membawa rombongan 50 orang untuk mengunjungi beberapa destinasi wisata.', date: '2025-05-03', status: 'Sudah Dibalas' },
  { id: 4, name: 'Dewi Lestari', email: 'dewi@example.com', phone: '082345678901', subject: 'Keluhan Fasilitas', message: 'Saya ingin melaporkan beberapa fasilitas di Menara Siger yang perlu diperbaiki.', date: '2025-05-04', status: 'Belum Dibaca' },
  { id: 5, name: 'Hadi Prasetyo', email: 'hadi@example.com', phone: '083456789012', subject: 'Agenda Travel', message: 'Mohon informasi tentang agenda travel yang akan diadakan dalam bulan ini.', date: '2025-05-05', status: 'Belum Dibaca' },
];

const AdminKontak = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [detailView, setDetailView] = useState<number | null>(null);
  const [replyMode, setReplyMode] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Filter data based on search term and status filter
  const filteredData = pesanData
    .filter(item => 
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === 'all' || item.status === filterStatus)
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc' 
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        // Default sort by ID
        return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
      }
    });

  const handleViewDetail = (id: number) => {
    setDetailView(id);
    // Mark as read when viewed
    toast.success('Pesan ditandai sebagai sudah dibaca');
  };

  const handleDelete = (id: number) => {
    toast.success(`Pesan dengan ID ${id} berhasil dihapus`);
    // In a real application, you would make an API call to delete the item
    if (detailView === id) {
      setDetailView(null);
    }
  };

  const handleReply = () => {
    if (replyText.trim() === '') {
      toast.error('Balasan tidak boleh kosong');
      return;
    }
    
    toast.success('Balasan berhasil dikirim');
    setReplyMode(false);
    setReplyText('');
    // In a real application, you would make an API call to send the reply
  };

  const toggleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  // Format the date to display in a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Belum Dibaca':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle className="mr-1 h-3 w-3" />{status}</span>;
      case 'Sudah Dibaca':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><CheckCircle className="mr-1 h-3 w-3" />{status}</span>;
      case 'Sudah Dibalas':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="mr-1 h-3 w-3" />{status}</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pesan Kontak</h1>
        <p className="text-muted-foreground">Kelola pesan kontak dari pengunjung website</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="shadow-md h-full">
            <CardHeader className="pb-2">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Cari pesan..."
                    className="pl-8 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <Button variant="outline" size="sm" className="rounded-lg h-9 w-full" onClick={toggleSort}>
                    <Calendar className="mr-2 h-4 w-4" /> 
                    Tanggal {sortOrder === 'desc' ? 'Terbaru' : 'Terlama'}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                  <select 
                    className="h-9 rounded-lg border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">Semua Status</option>
                    <option value="Belum Dibaca">Belum Dibaca</option>
                    <option value="Sudah Dibaca">Sudah Dibaca</option>
                    <option value="Sudah Dibalas">Sudah Dibalas</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-md border">
                <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>Pengirim</TableHead>
                        <TableHead>Subjek</TableHead>
                        <TableHead className="text-center w-24">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.length > 0 ? (
                        filteredData.map((pesan) => (
                          <TableRow 
                            key={pesan.id} 
                            className={`hover:bg-muted/50 transition-colors cursor-pointer ${detailView === pesan.id ? 'bg-blue-50' : ''} ${pesan.status === 'Belum Dibaca' ? 'font-semibold' : ''}`}
                            onClick={() => handleViewDetail(pesan.id)}
                          >
                            <TableCell className="py-2">
                              <div>
                                <p className={pesan.status === 'Belum Dibaca' ? 'font-semibold' : ''}>{pesan.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{formatDate(pesan.date)}</p>
                              </div>
                            </TableCell>
                            <TableCell className="py-2">
                              <p className="truncate max-w-[120px]">{pesan.subject}</p>
                            </TableCell>
                            <TableCell className="py-2">
                              <div className="flex justify-center gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewDetail(pesan.id);
                                }}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(pesan.id);
                                }}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                            Tidak ditemukan pesan yang sesuai dengan pencarian
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {detailView ? (
            <Card className="shadow-md h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{pesanData.find(p => p.id === detailView)?.subject}</CardTitle>
                    <CardDescription>
                      Dari: {pesanData.find(p => p.id === detailView)?.name} ({formatDate(pesanData.find(p => p.id === detailView)?.date || '')})
                    </CardDescription>
                  </div>
                  <div>
                    {getStatusBadge(pesanData.find(p => p.id === detailView)?.status || '')}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{pesanData.find(p => p.id === detailView)?.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{pesanData.find(p => p.id === detailView)?.phone}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg text-base border">
                    {pesanData.find(p => p.id === detailView)?.message}
                  </div>
                </div>

                {replyMode ? (
                  <div className="space-y-4">
                    <h3 className="font-medium">Balas Pesan:</h3>
                    <textarea 
                      value={replyText} 
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Tulis balasan disini..." 
                      className="flex min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    ></textarea>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => setReplyMode(false)}>
                        Batal
                      </Button>
                      <Button onClick={handleReply}>
                        Kirim Balasan
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" className="text-red-500" onClick={() => handleDelete(detailView)}>
                      <Trash2 className="mr-2 h-4 w-4" /> Hapus
                    </Button>
                    <Button onClick={() => setReplyMode(true)}>
                      <Mail className="mr-2 h-4 w-4" /> Balas
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-md h-full">
              <div className="flex items-center justify-center h-full py-12 px-4 text-center text-muted-foreground">
                <div>
                  <Mail className="mx-auto h-12 w-12 mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Pilih pesan untuk dibaca</h3>
                  <p>Klik pada pesan di panel kiri untuk melihat detailnya</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminKontak;
