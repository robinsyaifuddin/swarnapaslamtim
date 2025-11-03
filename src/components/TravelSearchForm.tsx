
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Map, 
  Calendar,
  Users
} from 'lucide-react';
import { DatePicker } from "@/components/DatePicker";

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
  const navigate = useNavigate();
  
  const handleSearch = () => {
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
  
  return (
    <div className={`w-full max-w-5xl ${className}`}>
      <div className="search-container overflow-hidden rounded-xl shadow-xl">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-1 items-center border-b p-4 md:border-b-0 md:border-r">
            <Search className="mr-2 text-primary" size={24} />
            <Input 
              type="text"
              placeholder="Ke mana Anda akan pergi?"
              className="border-none text-lg shadow-none focus-visible:ring-0" 
              value={searchData.destination}
              onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
            />
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
            className="m-4 bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg shadow-lg"
            onClick={handleSearch}
          >
            <Search className="mr-2" size={20} />
            Cari
          </Button>
        </div>
      </div>
    </div>
  );
};
