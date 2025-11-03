
import React from 'react';
import { DestinationCard } from './DestinationCard';
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
import { lampungTimurDestinations } from '@/data/lampungTimurDestinations';

// Top 4 destinasi wisata unggulan Lampung Timur
const topDestinations = lampungTimurDestinations.slice(0, 4).map(dest => ({
  id: dest.id,
  name: dest.name,
  image: dest.image_url,
  location: dest.location,
  rating: dest.rating,
  category: dest.category,
  description: dest.description
}));

export const TopDestinations = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleViewAll = () => {
    navigate('/destinasi');
  };
  
  const handleViewDestination = (id: number) => {
    navigate(`/destinasi/detail?id=${id}`);
  };

  return (
    <section className="section-container bg-background">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
        <div className="mb-6 lg:mb-0">
          <h2 className="section-title">Top Destinations</h2>
          <p className="text-body text-muted-foreground max-w-2xl">
            Explore breathtaking destinations and hidden gems across Lampung Timur
          </p>
        </div>
        <Button 
          variant="outline" 
          className="cta-button bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white self-start lg:self-center"
          onClick={handleViewAll}
        >
          Explore all destinations
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid-destinations">
        {topDestinations.map((destination) => (
          <div key={destination.id} className="destination-card group">
            <div className="relative overflow-hidden">
              <img 
                src={destination.image}
                alt={destination.name}
                className="destination-card-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(Math.floor(destination.rating))}
                  </div>
                  <span className="text-sm font-medium">{destination.rating}</span>
                </div>
                <h3 className="font-semibold text-lg mb-1">{destination.name}</h3>
                <p className="text-sm opacity-90">{destination.location}</p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                  {destination.category}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {destination.name}
              </h3>
              <p className="text-body text-muted-foreground line-clamp-3 mb-4">
                {destination.description}
              </p>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-primary hover:text-primary hover:bg-primary/10 p-0 h-auto font-medium"
                onClick={() => handleViewDestination(destination.id)}
              >
                Learn more →
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

