
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [visits, setVisits] = useState<number>(0);
  const [pageviews, setPageviews] = useState<number>(0);
  const loadTimeMs = useMemo(() => {
    const nav = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (nav && nav.length > 0) {
      return Math.max(0, Math.round(nav[0].duration));
    }
    // Fallback for older browsers
    return Math.max(0, Math.round(performance.now()));
  }, []);
  
  useEffect(() => {
    try {
      const totalVisits = Number(localStorage.getItem('swarnapas_total_visits') || '0') + 1;
      localStorage.setItem('swarnapas_total_visits', String(totalVisits));
      setVisits(totalVisits);

      const sessionViews = Number(sessionStorage.getItem('swarnapas_session_pageviews') || '0') + 1;
      sessionStorage.setItem('swarnapas_session_pageviews', String(sessionViews));
      setPageviews(sessionViews);
    } catch {
      // Storage may be unavailable; keep defaults
    }
  }, []);
  
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
              <img src="/Logo%20Kabupaten%20Lampung%20Timur.png" alt="Logo Kabupaten Lampung Timur" className="w-10 h-10 object-contain" loading="lazy" decoding="async" />
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
            <h3 className="mb-6 text-lg font-bold">Analitik Pengunjung</h3>
            <p className="mb-4 text-gray-300">Ringkasan sederhana berdasarkan perangkat Anda.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-lg bg-white/5 p-4">
                <p className="text-sm text-gray-400">Kunjungan</p>
                <p className="text-2xl font-bold">{visits}</p>
              </div>
              <div className="rounded-lg bg-white/5 p-4">
                <p className="text-sm text-gray-400">Halaman Dilihat</p>
                <p className="text-2xl font-bold">{pageviews}</p>
              </div>
              <div className="rounded-lg bg-white/5 p-4">
                <p className="text-sm text-gray-400">Waktu Muat</p>
                <p className="text-2xl font-bold">{loadTimeMs}ms</p>
              </div>
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

