import React, { useEffect, useState } from 'react';
import { MapPin, Users, TrendingUp, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HeroSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const highlights = [
    { icon: MapPin, text: "15+ Destinasi Wisata", desc: "Tersebar di seluruh kecamatan" },
    { icon: Users, text: "500+ UMKM Aktif", desc: "Produk lokal berkualitas" },
    { icon: TrendingUp, text: "Ekonomi Bertumbuh", desc: "Melalui pariwisata berkelanjutan" },
    { icon: Sparkles, text: "Inovasi Digital", desc: "Platform terintegrasi modern" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % highlights.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleExploreDestinations = () => {
    navigate('/destinasi');
  };

  const handleVisitUMKM = () => {
    navigate('/umkm');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background utama dari public/Video/background-hero.mp4 */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/Video/background-hero.mp4" type="video/mp4" />
      </video>
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      
      {/* Main hero content */}
      <div className="hero-content relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6 animate-fade-in">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Platform Resmi Pemerintah Lampung Timur</span>
        </div>
        
        {/* Main title */}
        <h1 className="hero-title text-white mb-6 animate-slide-in-bottom" style={{animationDelay: '0.2s'}}>
          <span className="block text-2xl md:text-3xl lg:text-4xl font-medium mb-2 opacity-90">
            Selamat Datang di
          </span>
          <span className="block text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
            SWARNAPAS
          </span>
          <span className="block text-xl md:text-2xl lg:text-3xl font-medium mt-2 opacity-90">
            Surga Wisata & Ekonomi Rakyat Lampung Timur
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="hero-subtitle text-white/90 mb-8 animate-slide-in-bottom" style={{animationDelay: '0.4s'}}>
          Jelajahi keindahan alam Lampung Timur dan dukung produk UMKM lokal dalam satu platform terintegrasi. 
          Dari pantai eksotis hingga produk berkualitas, temukan pengalaman tak terlupakan di bumi Lampung.
        </p>
        
        {/* CTA Buttons - Made smaller and more elegant */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-12 animate-slide-in-bottom" style={{animationDelay: '0.6s'}}>
          <button 
            onClick={handleExploreDestinations}
            className="bg-white/90 backdrop-blur-sm text-primary hover:bg-white transition-all duration-300 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            Jelajahi Destinasi
          </button>
          <button 
            onClick={handleVisitUMKM}
            className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 transition-all duration-300 px-6 py-3 rounded-full font-semibold flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            Kunjungi UMKM
          </button>
        </div>
        
        {/* Dynamic highlights carousel */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-md mx-auto animate-zoom-in" style={{animationDelay: '0.8s'}}>
          <div className="flex items-center justify-center space-x-4">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    currentSlide === index 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-40 scale-90'
                  }`}
                >
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-2">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-white">
                      <div className="font-bold text-sm">{highlight.text}</div>
                      <div className="text-xs opacity-80">{highlight.desc}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Indicator dots */}
          <div className="flex justify-center space-x-2 mt-4">
            {highlights.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-white scale-125' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-soft">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
