
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Function to handle navigation and scroll to top
  const handleNavigation = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center space-x-3 mb-6 group" onClick={handleNavigation}>
              <img src="/Logo%20Kabupaten%20Lampung%20Timur.png" alt="Logo Kabupaten Lampung Timur" className="w-10 h-10 object-contain" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                  Swarnapas
                </span>
                <span className="text-sm text-gray-400">Pemerintah Lampung Timur</span>
              </div>
            </Link>
            <p className="mb-6 text-gray-300 leading-relaxed">
              Platform resmi Pemerintah Lampung Timur untuk memajukan pariwisata dan mendukung UMKM lokal menuju ekonomi berkelanjutan.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="rounded-full bg-white/10 p-2 hover:bg-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="rounded-full bg-white/10 p-2 hover:bg-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="rounded-full bg-white/10 p-2 hover:bg-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="rounded-full bg-white/10 p-2 hover:bg-primary transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold">Navigasi</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors" onClick={handleNavigation}>
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/destinasi" className="text-gray-300 hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block" onClick={handleNavigation}>
                  Pariwisata
                </Link>
              </li>
              <li>
                <Link to="/umkm" className="text-gray-300 hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block" onClick={handleNavigation}>
                  UMKM
                </Link>
              </li>
              <li>
                <Link to="/informasi" className="text-gray-300 hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block" onClick={handleNavigation}>
                  Informasi
                </Link>
              </li>
              <li>
                <Link to="/kecamatan" className="text-gray-300 hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block" onClick={handleNavigation}>
                  Kecamatan
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold">Kontak Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="mt-1 flex-shrink-0 text-primary" />
                <span className="text-gray-300">Jl. Lintas Timur No. 123, Sukadana, Lampung Timur</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="flex-shrink-0 text-primary" />
                <span className="text-gray-300">(0000) 000-0000</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="flex-shrink-0 text-primary" />
                <span className="text-gray-300">info@lampungtimurkab.go.id</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold">Newsletter</h3>
            <p className="mb-4 text-gray-300">
              Dapatkan informasi terbaru tentang pariwisata dan acara di Lampung Timur.
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Email Anda" 
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" 
              />
              <Button className="bg-primary hover:bg-primary/80">
                Kirim
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© {currentYear} Swarnapas - Pemerintah Kabupaten Lampung Timur. Seluruh hak cipta dilindungi.</p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">Kebijakan Privasi</a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">Syarat & Ketentuan</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
