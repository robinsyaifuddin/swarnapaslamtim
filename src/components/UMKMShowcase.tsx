import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ImageOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import { lampungTimurUMKM } from '@/data/lampungTimurUMKM';

// Top 6 UMKM unggulan Lampung Timur
const umkmList = lampungTimurUMKM.slice(0, 6).map(umkm => ({
  id: umkm.id,
  name: umkm.name,
  slug: umkm.slug,
  image: umkm.image,
  category: umkm.category,
  location: umkm.location
}));
export const UMKMShowcase = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleViewAllUMKM = () => {
    navigate('/umkm');
  };
  
  const handleViewProduct = (slug: string) => {
    navigate(`/umkm/${slug}`);
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">UMKM Terbaik</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dukung produk lokal unggulan dari berbagai kecamatan di Lampung Timur
          </p>
        </div>
        
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {umkmList.map((umkm) => (
              <CarouselItem key={umkm.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleViewProduct(umkm.slug)}>
                  <div className="relative h-48 overflow-hidden bg-gray-200 flex items-center justify-center">
                    {umkm.image ? (
                      <img src={umkm.image} alt={umkm.name} className="w-full h-full object-cover transition-transform hover:scale-105" />
                    ) : (
                      <ImageOff className="h-16 w-16 text-gray-400" />
                    )}
                    <Badge className="absolute top-3 left-3 bg-primary text-white">
                      {umkm.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2">{umkm.name}</h3>
                    <p className="text-gray-600 text-sm">{umkm.location}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        
        <div className="text-center mt-8">
          <Button onClick={handleViewAllUMKM} className="bg-primary hover:bg-primary/90">
            <ArrowRight className="mr-2 h-4 w-4" />
            Lihat Semua UMKM
          </Button>
        </div>
      </div>
    </section>
  );
};
