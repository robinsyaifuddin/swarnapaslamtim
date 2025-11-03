
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

// Data Tour Destinasi Asli Lampung Timur
const upcomingAgendas = [
  {
    id: 1,
    title: "Taman Nasional Way Kambas - Elephant Safari",
    image: "https://akcdn.detik.net.id/community/media/visual/2024/01/29/gajah-sumatera-di-taman-nasional-way-kambas_169.jpeg?w=700&q=90",
    date: "15 Juni 2024",
    time: "08:00 - 16:00",
    location: "Labuhan Ratu, Lampung Timur",
    category: "Taman Nasional",
    spots: 20
  },
  {
    id: 2,
    title: "Pantai Kuala Kambas - River & Beach Tour",
    image: "",
    date: "22 Juni 2024",
    time: "07:00 - 16:00",
    location: "Margasari, Labuhan Maringgai, Lampung Timur",
    category: "Pantai",
    spots: 15
  },
  {
    id: 3,
    title: "Danau Way Jepara - Nature Escape",
    image: "",
    date: "30 Juni 2024",
    time: "08:00 - 15:00",
    location: "Way Jepara, Lampung Timur",
    category: "Danau",
    spots: 25
  }
];

export const AgendaSection = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleViewAllAgenda = () => {
    navigate('/agenda');
  };

  const handleJoinAgenda = (id: number) => {
    navigate(`/agenda?id=${id}`);
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Agenda Travel</h2>
        <p className="mt-2 mx-auto max-w-2xl text-gray-600">
          Bergabunglah dengan agenda travel kami dan nikmati pengalaman wisata terbaik di Lampung Timur dengan panduan profesional
        </p>
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
            {upcomingAgendas.map((agenda) => (
              <CarouselItem key={agenda.id} className="pl-2 md:pl-4 basis-[280px]">
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg h-[400px]">
                  <div className="relative h-32 overflow-hidden">
                    <img 
                      src={agenda.image} 
                      alt={agenda.title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <Badge className="absolute left-2 top-2 bg-lamsel-purple hover:bg-lamsel-purple/80 text-xs px-2 py-1">
                      {agenda.category}
                    </Badge>
                  </div>
                  <CardHeader className="p-3">
                    <h3 className="text-base font-bold line-clamp-2">{agenda.title}</h3>
                  </CardHeader>
                  <CardContent className="space-y-2 p-3 pt-0">
                    <div className="flex items-center text-xs">
                      <Calendar className="mr-1 h-3 w-3 text-lamsel-purple" />
                      <span>{agenda.date}</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <Clock className="mr-1 h-3 w-3 text-lamsel-purple" />
                      <span>{agenda.time}</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <MapPin className="mr-1 h-3 w-3 text-lamsel-purple" />
                      <span className="line-clamp-1">{agenda.location}</span>
                    </div>
                    <div className="mt-2 text-xs font-medium">
                      <span className="text-lamsel-purple">{agenda.spots}</span> spot tersedia
                    </div>
                  </CardContent>
                  <CardFooter className="p-3 pt-0">
                    <Button 
                      className="w-full bg-lamsel-purple hover:bg-lamsel-purple/80 text-xs h-8"
                      onClick={() => handleJoinAgenda(agenda.id)}
                    >
                      Bergabung
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingAgendas.map((agenda) => (
            <Card key={agenda.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={agenda.image} 
                  alt={agenda.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <Badge className="absolute left-3 top-3 bg-lamsel-purple hover:bg-lamsel-purple/80">
                  {agenda.category}
                </Badge>
              </div>
              <CardHeader>
                <h3 className="text-xl font-bold">{agenda.title}</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4 text-lamsel-purple" />
                  <span>{agenda.date}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-lamsel-purple" />
                  <span>{agenda.time}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4 text-lamsel-purple" />
                  <span>{agenda.location}</span>
                </div>
                <div className="mt-2 text-sm font-medium">
                  <span className="text-lamsel-purple">{agenda.spots}</span> spot tersedia
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-lamsel-purple hover:bg-lamsel-purple/80"
                  onClick={() => handleJoinAgenda(agenda.id)}
                >
                  Bergabung
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      <div className="mt-10 text-center">
        <Button 
          variant="outline" 
          className="border-lamsel-purple text-lamsel-purple hover:bg-lamsel-purple hover:text-white"
          onClick={handleViewAllAgenda}
        >
          Lihat Semua Agenda
        </Button>
      </div>
    </div>
  );
};

