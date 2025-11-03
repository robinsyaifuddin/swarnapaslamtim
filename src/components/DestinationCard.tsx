
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from "@/hooks/use-mobile";

interface DestinationCardProps {
  id: number;
  name: string;
  image: string;
  location: string;
  rating: number;
  category: string;
  description: string;
  onViewDetails?: () => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  id,
  name,
  image,
  location,
  rating,
  category,
  description,
  onViewDetails
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails();
    } else {
      navigate(`/destinasi/detail?id=${id}`);
    }
  };

  return (
    <Card className={`destination-card overflow-hidden h-full ${isMobile ? 'max-w-[280px]' : ''}`}>
      <div className={`relative overflow-hidden ${isMobile ? 'h-40' : 'h-60'}`}>
        <img 
          src={image} 
          alt={name} 
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <Badge className={`absolute left-2 top-2 bg-primary hover:bg-primary/80 ${isMobile ? 'text-xs px-2 py-1' : ''}`}>
          {category}
        </Badge>
      </div>
      <CardHeader className={isMobile ? 'pt-3 pb-2 px-3' : 'pt-4'}>
        <div className="flex items-center justify-between">
          <h3 className={`font-bold ${isMobile ? 'text-base line-clamp-1' : 'text-xl'}`}>{name}</h3>
          <div className="flex items-center">
            <Star className={`fill-yellow-400 text-yellow-400 ${isMobile ? 'mr-0.5 h-3 w-3' : 'mr-1 h-5 w-5'}`} />
            <span className={`font-medium ${isMobile ? 'text-xs' : ''}`}>{rating.toFixed(1)}</span>
          </div>
        </div>
        <p className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'}`}>{location}</p>
      </CardHeader>
      <CardContent className={isMobile ? 'px-3 py-1' : ''}>
        <p className={`text-gray-600 ${isMobile ? 'line-clamp-2 text-xs' : 'line-clamp-2 text-sm'}`}>
          {description}
        </p>
      </CardContent>
      <CardFooter className={`flex justify-between ${isMobile ? 'px-3 pt-2 pb-3' : ''}`}>
        <Button 
          variant="outline" 
          className={`w-full border-primary text-primary hover:bg-primary hover:text-white ${isMobile ? 'text-xs h-8' : ''}`}
          onClick={handleViewDetails}
        >
          Lihat Detail
        </Button>
      </CardFooter>
    </Card>
  );
}
