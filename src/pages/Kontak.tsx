import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ScrollAnimations from '@/components/ScrollAnimations';

const Kontak = () => {
  const {
    toast
  } = useToast();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      toast({
        title: "Pesan Terkirim",
        description: "Terima kasih telah menghubungi kami. Kami akan segera merespon."
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-20 bg-lamsel-dark text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4 animate-fade-in">Kontak Kami</h1>
          <p className="max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Kami siap menjawab pertanyaan Anda tentang pariwisata dan UMKM di Kabupaten Lampung Timur. Jangan ragu untuk menghubungi kami.
          </p>
        </div>
      </div>
      
      {/* Contact Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="animate-on-scroll">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Kirim Pesan</h2>
              <p className="mt-2 text-gray-600">
                Ada pertanyaan, saran, atau masukan? Sampaikan kepada kami melalui formulir di bawah ini.
              </p>
            </div>
            
            {isSubmitted ? (
              <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center animate-scale-in">
                <div className="flex justify-center">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Pesan Terkirim!</h3>
                <p className="mt-2 text-gray-600">
                  Terima kasih telah menghubungi kami. Tim kami akan segera merespon pesan Anda.
                </p>
                <Button className="mt-4 bg-primary hover:bg-primary/90 text-white shadow-md" onClick={() => setIsSubmitted(false)}>
                  Kirim Pesan Lain
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="animated-section space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium">
                    Nama Lengkap
                  </label>
                  <Input id="name" name="name" placeholder="Masukkan nama lengkap" value={formState.name} onChange={handleChange} required />
                </div>
                
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" name="email" type="email" placeholder="Masukkan alamat email" value={formState.email} onChange={handleChange} required />
                </div>
                
                <div>
                  <label htmlFor="subject" className="mb-1 block text-sm font-medium">
                    Subjek
                  </label>
                  <Input id="subject" name="subject" placeholder="Subjek pesan" value={formState.subject} onChange={handleChange} required />
                </div>
                
                <div>
                  <label htmlFor="message" className="mb-1 block text-sm font-medium">
                    Pesan
                  </label>
                  <Textarea id="message" name="message" placeholder="Tulis pesan Anda di sini..." rows={5} value={formState.message} onChange={handleChange} required />
                </div>
                
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white button-3d shadow-lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                </Button>
              </form>
            )}
          </div>
          
          {/* Contact Information */}
          <div className="animate-on-scroll">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Informasi Kontak</h2>
              <p className="mt-2 text-gray-600">
                Anda juga dapat menghubungi kami melalui informasi di bawah ini.
              </p>
            </div>
            
            <div className="card-3d space-y-6 animated-section">
              <div className="card-3d-content rounded-lg border p-6 shadow-sm">
                <div className="flex items-start">
                  <MapPin className="mr-4 h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-semibold">Alamat</h3>
                    <p className="mt-1 text-gray-600">
                      Komplek Perkantoran Pemkab Lampung Timur, Jl. Ahmad Yani No. 1, Gedong Tataan, Lampung Timur 35366
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="card-3d-content rounded-lg border p-6 shadow-sm">
                <div className="flex items-start">
                  <Phone className="mr-4 h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-semibold">Telepon</h3>
                    <p className="mt-1 text-gray-600">
                      (0721) 91001 / 91002
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="card-3d-content rounded-lg border p-6 shadow-sm">
                <div className="flex items-start">
                  <Mail className="mr-4 h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="mt-1 text-gray-600">
                      info@Lampung Timurkab.go.id
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="card-3d-content rounded-lg border p-6 shadow-sm">
                <div className="flex items-start">
                  <Clock className="mr-4 h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-semibold">Jam Operasional</h3>
                    <p className="mt-1 text-gray-600">
                      Senin - Jumat: 08.00 - 16.00 WIB
                      <br />
                      Sabtu - Minggu: Tutup
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center animate-on-scroll">
            <h2 className="text-3xl font-bold">Pertanyaan Umum</h2>
            <p className="mt-2 text-gray-600">
              Jawaban untuk pertanyaan yang sering diajukan
            </p>
          </div>
          
          <div className="mx-auto max-w-3xl space-y-4 animated-section">
            <div className="rounded-lg border p-5 card-hover transition-all duration-300 hover:bg-white">
              <h3 className="text-lg font-semibold">Bagaimana cara mengunjungi destinasi wisata di Lampung Timur?</h3>
              <p className="mt-2 text-gray-600">
                Anda dapat mengunjungi berbagai destinasi wisata di Lampung Timur dengan transportasi pribadi atau umum. Informasi lengkap tersedia di halaman Destinasi Wisata.
              </p>
            </div>
            
            <div className="rounded-lg border p-5 card-hover transition-all duration-300 hover:bg-white">
              <h3 className="text-lg font-semibold">Bagaimana cara mendaftarkan UMKM saya?</h3>
              <p className="mt-2 text-gray-600">
                Untuk mendaftarkan UMKM Anda, silakan menghubungi kami melalui formulir kontak di atas atau datang langsung ke kantor Dinas Koperasi dan UMKM Kabupaten Lampung Timur.
              </p>
            </div>
            
            <div className="rounded-lg border p-5 card-hover transition-all duration-300 hover:bg-white">
              <h3 className="text-lg font-semibold">Apakah ada panduan wisata di Lampung Timur?</h3>
              <p className="mt-2 text-gray-600">
                Ya, kami menyediakan informasi lengkap tentang destinasi wisata di Lampung Timur. Anda juga dapat menghubungi kami untuk informasi lebih lanjut.
              </p>
            </div>
            
            <div className="rounded-lg border p-5 card-hover transition-all duration-300 hover:bg-white">
              <h3 className="text-lg font-semibold">Bagaimana transportasi di Lampung Timur?</h3>
              <p className="mt-2 text-gray-600">
                Transportasi di Lampung Timur tersedia dalam bentuk angkutan umum, taksi online, dan rental kendaraan. Akses menuju destinasi wisata umumnya mudah dijangkau.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      <ScrollAnimations />
    </div>
  );
};

export default Kontak;

