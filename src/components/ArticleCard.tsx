import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
interface ArticleCardProps {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  views?: string;
}
const ArticleCard = ({
  id,
  title,
  excerpt,
  image,
  author,
  date,
  readTime,
  category,
  views
}: ArticleCardProps) => {
  const navigate = useNavigate();
  const handleReadMore = () => {
    navigate(`/informasi/detail?id=${id}`);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white border-0 shadow-lg">
      <div className="relative overflow-hidden">
        <img src={image} alt={title} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700" />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
            {category}
          </span>
        </div>
        
        {/* Views badge */}
        {views && <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
              <Eye size={12} />
              <span>{views}</span>
            </div>
          </div>}
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-tight">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed text-sm">
          {excerpt}
        </p>
        
        {/* Article meta */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User size={12} />
              <span className="font-medium">{author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>{date}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{readTime}</span>
          </div>
        </div>
        
        {/* Read more button */}
        <Button onClick={handleReadMore} className="blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 group-hover:scale-105 transform bg-blue-600 hover:bg-blue-500">
          Baca Selengkapnya
          <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
        </Button>
      </CardContent>
    </Card>;
};
export default ArticleCard;