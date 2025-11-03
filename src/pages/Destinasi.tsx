
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { DestinationCard } from '@/components/DestinationCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search,
  FilterX
} from 'lucide-react';
import { lampungTimurDestinations } from '@/data/lampungTimurDestinations';

// Data destinasi wisata resmi Lampung Timur
const allDestinations = lampungTimurDestinations.map(dest => ({
  id: dest.id,
  slug: dest.slug,
  name: dest.name,
  image: dest.image_url,
  location: dest.location,
  rating: dest.rating,
  category: dest.category,
  description: dest.description
}));

const categories = ["Semua", "Taman Nasional", "Pantai", "Danau", "Ekowisata", "Sejarah & Budaya", "Museum"];

const Destinasi = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [filteredDestinations, setFilteredDestinations] = useState(allDestinations);
  const navigate = useNavigate();

  const handleSearch = () => {
    const filtered = allDestinations.filter(destination => {
      const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           destination.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           destination.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'Semua' || destination.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredDestinations(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'Semua') {
      setFilteredDestinations(allDestinations);
    } else {
      const filtered = allDestinations.filter(destination => 
        destination.category === category
      );
      setFilteredDestinations(filtered);
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('Semua');
    setFilteredDestinations(allDestinations);
  };

  const handleViewDetails = (slug: string) => {
    navigate(`/destinasi/${slug}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 bg-gradient-to-br from-primary to-primary/80">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4">
          <div className="text-center text-white max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Destinasi Wisata Lampung Timur</h1>
            <p className="text-lg md:text-xl opacity-95 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Jelajahi keindahan destinasi wisata di Lampung Timur, mulai dari pantai eksotis, pulau-pulau menawan, hingga wisata alam dan edukasi yang menarik
            </p>
          </div>
        </div>
      </div>
      
      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input 
                type="text"
                placeholder="Cari destinasi wisata..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>
          <Button 
            onClick={handleSearch}
            className="bg-primary hover:bg-primary/90 text-white shadow-md"
          >
            Cari
          </Button>
          <Button 
            variant="outline" 
            onClick={handleReset}
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            <FilterX className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
        
        {/* Category Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => handleCategoryChange(category)}
              className={selectedCategory === category 
                ? "bg-primary hover:bg-primary/90 text-white" 
                : "border-primary text-primary hover:bg-primary hover:text-white"}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Destinations Grid */}
      <div className="container mx-auto px-4 py-8">
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredDestinations.map(destination => (
              <DestinationCard
                key={destination.id}
                id={destination.id}
                slug={destination.slug}
                name={destination.name}
                image={destination.image}
                location={destination.location}
                rating={destination.rating}
                category={destination.category}
                description={destination.description}
                onViewDetails={() => handleViewDetails(destination.slug)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold mb-2">Tidak Ada Destinasi Ditemukan</h3>
            <p className="text-gray-500">
              Mohon coba dengan kata kunci atau filter yang berbeda
            </p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Destinasi;

