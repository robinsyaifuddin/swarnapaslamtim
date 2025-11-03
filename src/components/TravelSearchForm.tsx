
import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Map, 
  Calendar,
  Users,
  TrendingUp
} from 'lucide-react';
import { DatePicker } from "@/components/DatePicker";
import { generateSearchData, searchItems } from '@/utils/searchData';

interface TravelSearchFormProps {
  onSearch?: (searchData: SearchFormData) => void;
  className?: string;
}

export interface SearchFormData {
  destination: string;
  date: Date | undefined;
  guests: number;
}

export const TravelSearchForm: React.FC<TravelSearchFormProps> = ({ 
  onSearch, 
  className = "" 
}) => {
  const [searchData, setSearchData] = useState<SearchFormData>({
    destination: '',
    date: undefined,
    guests: 1
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  
  // Get all search data
  const allSearchData = useMemo(() => generateSearchData(), []);
  
  // Get search suggestions
  const suggestions = useMemo(() => {
    if (!searchData.destination.trim()) {
      // Return popular destinations when no input
      return allSearchData
        .filter(item => item.category === 'Destinasi' && item.isPopular)
        .slice(0, 5);
    }
    return searchItems(searchData.destination, allSearchData).slice(0, 5);
  }, [searchData.destination, allSearchData]);
  
  const handleSearch = () => {
    setShowSuggestions(false);
    
    // Create URL params for search
    const params = new URLSearchParams();
    
    if (searchData.destination) {
      params.set('location', searchData.destination);
    }
    
    if (searchData.date) {
      params.set('date', searchData.date.toISOString());
    }
    
    params.set('guests', searchData.guests.toString());
    
    // Navigate to appropriate page with search params
    if (searchData.destination.toLowerCase().includes('tour') || 
        searchData.destination.toLowerCase().includes('travel') ||
        searchData.destination.toLowerCase().includes('agenda')) {
      navigate(`/agenda?${params.toString()}`);
    } else {
      navigate(`/destinasi?${params.toString()}`);
    }
    
    // Call custom onSearch if provided
    if (onSearch) {
      onSearch(searchData);
    }
  };
  
  const handleSuggestionClick = (title: string, url: string) => {
    setSearchData({...searchData, destination: title});
    setShowSuggestions(false);
    navigate(url);
  };
  
  const handleInputFocus = () => {
    setShowSuggestions(true);
  };
  
  const handleInputBlur = () => {
    // Delay to allow click on suggestion
    setTimeout(() => setShowSuggestions(false), 200);
  };
  
  return (
    <div className={`w-full max-w-5xl ${className} relative`}>
      <div className="search-container overflow-hidden rounded-xl shadow-xl">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-1 items-center border-b p-4 md:border-b-0 md:border-r relative">
            <Search className="mr-2 text-primary" size={24} />
            <Input 
              type="text"
              placeholder="Cari destinasi, UMKM, kecamatan..."
              className="border-none text-lg shadow-none focus-visible:ring-0" 
              value={searchData.destination}
              onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            
            {/* Autocomplete Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-80 overflow-y-auto">
                <div className="p-2">
                  <div className="text-xs text-gray-500 px-3 py-2 font-medium">
                    {searchData.destination ? 'Hasil Pencarian' : '🔥 Destinasi Populer'}
                  </div>
                  {suggestions.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 hover:bg-primary/5 rounded-lg cursor-pointer transition-colors"
                      onMouseDown={() => handleSuggestionClick(item.title, item.url)}
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        {item.category === 'Destinasi' ? <Map className="w-4 h-4 text-primary" /> : <Search className="w-4 h-4 text-primary" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-gray-900 truncate">{item.title}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          {item.isPopular && <TrendingUp className="w-3 h-3" />}
                          {item.category}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-1 items-center border-b p-4 md:border-b-0 md:border-r">
            <Calendar className="mr-2 text-primary" size={24} />
            <DatePicker />
          </div>
          
          <div className="flex flex-1 items-center p-4 md:border-r">
            <Users className="mr-2 text-primary" size={24} />
            <select 
              className="w-full border-none bg-transparent text-lg focus:outline-none"
              value={searchData.guests}
              onChange={(e) => setSearchData({...searchData, guests: parseInt(e.target.value)})}
            >
              <option value="1">1 Tamu</option>
              <option value="2">2 Tamu</option>
              <option value="3">3 Tamu</option>
              <option value="4">4+ Tamu</option>
            </select>
          </div>
          
          <Button
            size="lg"
            className="m-4 bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={handleSearch}
          >
            <Search className="mr-2" size={20} />
            Cari Sekarang
          </Button>
        </div>
      </div>
    </div>
  );
};
