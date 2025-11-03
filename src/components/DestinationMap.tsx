
import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

interface DestinationMapProps {
  lat: number;
  lng: number;
  name: string;
}

const DestinationMap = ({ lat, lng, name }: DestinationMapProps) => {
  const [mapUrl, setMapUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapKey, setMapKey] = useState("");

  useEffect(() => {
    // Generate Google Maps embed URL
    const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${mapKey}&q=${lat},${lng}&zoom=13`;
    
    // Fallback to OSM if no API key is provided
    const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.05}%2C${lat-0.05}%2C${lng+0.05}%2C${lat+0.05}&amp;layer=mapnik&amp;marker=${lat}%2C${lng}`;
    
    setMapUrl(mapKey ? embedUrl : osmUrl);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [lat, lng, mapKey, name]);

  const handleMapKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMapKey(e.target.value);
  };

  return (
    <div className="w-full h-full relative">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <iframe 
            title={`Map of ${name}`}
            src={mapUrl}
            width="100%" 
            height="100%" 
            style={{ border: 0 }}
            allowFullScreen 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
          ></iframe>
          
          {!mapKey && (
            <div className="absolute bottom-2 left-2 flex items-center p-2 bg-white rounded-lg shadow-md">
              <MapPin className="h-4 w-4 text-primary mr-1" />
              <span className="text-sm">{name}</span>
            </div>
          )}
        </>
      )}
      
      {!mapKey && (
        <div className="absolute top-2 left-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-lg text-xs text-center">
          <input 
            type="text" 
            placeholder="Masukkan Google Maps API key (opsional)"
            className="w-full p-1 border rounded text-xs mb-1" 
            value={mapKey}
            onChange={handleMapKeyChange}
          />
          <p className="text-gray-600">API key diperlukan untuk peta interaktif</p>
        </div>
      )}
    </div>
  );
};

export default DestinationMap;
