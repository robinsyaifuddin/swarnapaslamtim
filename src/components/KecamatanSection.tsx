
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import { lampungTimurDistricts } from '@/data/lampungTimurDistricts';

// Top 6 kecamatan unggulan dari 24 kecamatan di Lampung Timur
const districts = lampungTimurDistricts.slice(0, 6).map(district => ({
  id: district.id,
  name: district.name,
  image: district.image,
  totalVillages: district.totalVillages,
  population: district.population
}));

const legacyDistricts = [
  {
    id: 7,
    name: "Mawasangka",
    image: "https://images.unsplash.com/photo-1488711500009-f9111944b1ab?q=80&w=2880",
    totalVillages: 8,
    population: "32,456"
  },
  {
    id: 8,
    name: "Way Khilau",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2880",
    totalVillages: 9,
    population: "41,234"
  },
  {
    id: 9,
    name: "Kedondong",
    image: "https://images.unsplash.com/photo-1468581264429-2548ef9eb732?q=80&w=2880",
    totalVillages: 11,
    population: "48,765"
  },
  {
    id: 10,
    name: "Way Ratai",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2880",
    totalVillages: 10,
    population: "36,543"
  },
  {
    id: 11,
    name: "Gebang",
    image: "https://images.unsplash.com/photo-1444927714506-8492d94b4e3d?q=80&w=2880",
    totalVillages: 7,
    population: "28,976"
  }
];

export const KecamatanSection = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleViewAllKecamatan = () => {
    navigate('/kecamatan');
  };

  const handleViewKecamatanDetail = (id: number) => {
    navigate(`/kecamatan?id=${id}`);
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Kecamatan di Lampung Timur</h2>
            <p className="mt-2 text-gray-600">
              Kenali lebih dekat kecamatan-kecamatan di Lampung Timur
            </p>
          </div>
          <Button 
            variant="outline" 
            className="group flex items-center border-destructive text-destructive hover:bg-destructive hover:text-white"
            onClick={handleViewAllKecamatan}
          >
            Lihat Semua Kecamatan
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        
        {isMobile ? (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {districts.map((district) => (
                <CarouselItem key={district.id} className="pl-2 md:pl-4 basis-[260px]">
                  <Card className="card-3d overflow-hidden transition-all duration-300 hover:shadow-lg h-[280px]">
                    <div className="card-3d-content">
                      <div className="relative h-32">
                        <img 
                          src={district.image} 
                          alt={district.name}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-3">
                          <h3 className="text-sm font-bold text-white">{district.name}</h3>
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div>
                            <p className="text-xs text-gray-500">Jumlah Desa</p>
                            <p className="font-semibold text-sm">{district.totalVillages}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Populasi</p>
                            <p className="font-semibold text-sm">{district.population}</p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          className="w-full text-destructive hover:bg-destructive/10 text-xs h-7"
                          onClick={() => handleViewKecamatanDetail(district.id)}
                        >
                          Lihat Detail
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {districts.map((district) => (
              <Card key={district.id} className="card-3d overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="card-3d-content">
                  <div className="relative h-44">
                    <img 
                      src={district.image} 
                      alt={district.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-xl font-bold text-white">{district.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Jumlah Desa</p>
                        <p className="font-semibold">{district.totalVillages}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Populasi</p>
                        <p className="font-semibold">{district.population}</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="mt-4 w-full text-destructive hover:bg-destructive/10"
                      onClick={() => handleViewKecamatanDetail(district.id)}
                    >
                      Lihat Detail
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

