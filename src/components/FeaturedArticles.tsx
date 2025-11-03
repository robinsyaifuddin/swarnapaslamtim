import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import { lampungTimurArticles } from '@/data/lampungTimurArticles';

const FeaturedArticles = () => {
  const navigate = useNavigate();

  // Top 3 artikel terbaru Lampung Timur
  const latestStories = lampungTimurArticles.slice(0, 3).map(article => ({
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    image: article.image,
    author: article.author,
    date: article.date,
    readTime: article.readTime,
    category: article.category
  }));

  const handleViewAll = () => {
    navigate('/informasi');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Berita Terbaru</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ikuti perkembangan terbaru seputar pariwisata dan pembangunan di Lampung Timur
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {latestStories.slice(0, 3).map((story) => (
            <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary text-white">{story.category}</Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{story.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{story.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-2">
                    <User className="h-3 w-3" />
                    <span>{story.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{story.date}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button onClick={handleViewAll} className="bg-primary hover:bg-primary/90">
            Lihat Semua Berita
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
