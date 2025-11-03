
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from "@/hooks/use-mobile";

export const PromoSection = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handlePromoClick = () => {
    navigate('/destinasi');
  };

  const handlePackageClick = () => {
    navigate('/agenda');
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2'}`}>
        {/* Promo Card 1 */}
        <div className="card-3d overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-white">
          <div className={`card-3d-content ${isMobile ? 'p-4' : 'p-8 md:p-10'}`}>
            <div className="flex justify-between">
              <div className="flex-1">
                <h3 className={`font-bold ${isMobile ? 'text-sm' : 'text-2xl md:text-3xl'}`}>Diskon Spesial</h3>
                <div className={`mt-2 flex items-baseline gap-1 ${isMobile ? 'flex-col items-start' : ''}`}>
                  <span className={`font-bold ${isMobile ? 'text-2xl' : 'text-5xl md:text-7xl'}`}>30%</span>
                  <span className={`${isMobile ? 'text-xs' : 'text-xl'}`}>OFF</span>
                </div>
                <p className={`mt-2 ${isMobile ? 'text-xs line-clamp-2' : 'mt-3 max-w-xs'}`}>
                  Dapatkan diskon spesial untuk kunjungan ke destinasi wisata pilihan di Lampung Timur
                </p>
                <Button 
                  className={`mt-3 bg-white text-primary hover:bg-white/90 ${isMobile ? 'text-xs px-3 py-1 h-7' : 'mt-5'}`}
                  onClick={handlePromoClick}
                >
                  Selengkapnya
                </Button>
              </div>
              {!isMobile && (
                <div className="relative hidden md:block">
                  <div className="absolute -right-10 top-0">
                    <img 
                      src="https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=3270&auto=format&fit=crop" 
                      alt="Nature" 
                      className="h-48 w-48 object-cover rounded-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Promo Card 2 */}
        <div className="card-3d overflow-hidden rounded-2xl bg-gradient-to-r from-accent to-accent/80 text-white">
          <div className={`card-3d-content ${isMobile ? 'p-4' : 'p-8 md:p-10'}`}>
            <div className="flex justify-between">
              <div className="flex-1">
                <h3 className={`font-bold ${isMobile ? 'text-sm' : 'text-2xl md:text-3xl'}`}>Paket Liburan</h3>
                <div className={`mt-2 ${isMobile ? 'flex flex-col items-start' : ''}`}>
                  <span className={`${isMobile ? 'text-xs' : 'text-xl'}`}>Mulai dari</span>
                  <div className={`font-bold ${isMobile ? 'text-lg' : 'text-4xl md:text-5xl'}`}>Rp 500.000</div>
                </div>
                <p className={`mt-2 ${isMobile ? 'text-xs line-clamp-2' : 'mt-3 max-w-xs'}`}>
                  Jelajahi keindahan wisata Lampung Timur dengan paket liburan yang terjangkau
                </p>
                <Button 
                  className={`mt-3 bg-white text-accent hover:bg-white/90 ${isMobile ? 'text-xs px-3 py-1 h-7' : 'mt-5'}`}
                  onClick={handlePackageClick}
                >
                  Pesan Sekarang
                </Button>
              </div>
              {!isMobile && (
                <div className="relative hidden md:block">
                  <div className="absolute -right-10 top-0">
                    <img 
                      src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=2900&auto=format&fit=crop" 
                      alt="Beach" 
                      className="h-48 w-48 object-cover rounded-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

