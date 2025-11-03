// Centralized search data aggregator
import { lampungTimurDestinations } from '@/data/lampungTimurDestinations';
import { lampungTimurUMKM } from '@/data/lampungTimurUMKM';
import { lampungTimurDistricts } from '@/data/lampungTimurDistricts';
import { lampungTimurArticles } from '@/data/lampungTimurArticles';

export interface SearchItem {
  id: string;
  title: string;
  category: 'Destinasi' | 'UMKM' | 'Kecamatan' | 'Informasi';
  url: string;
  description?: string;
  tags?: string[];
  isPopular?: boolean;
}

// Generate search items from all data sources
export const generateSearchData = (): SearchItem[] => {
  const searchItems: SearchItem[] = [];

  // Add destinations
  lampungTimurDestinations.forEach(dest => {
    searchItems.push({
      id: `dest-${dest.id}`,
      title: dest.name,
      category: 'Destinasi',
      url: `/destinasi/${dest.slug}`,
      description: dest.description,
      tags: [dest.category, dest.location, 'wisata', 'pariwisata'],
      isPopular: dest.rating >= 4.5
    });
  });

  // Add UMKM
  lampungTimurUMKM.forEach(umkm => {
    searchItems.push({
      id: `umkm-${umkm.id}`,
      title: umkm.name,
      category: 'UMKM',
      url: `/umkm/${umkm.slug}`,
      description: umkm.description,
      tags: [umkm.category, umkm.location, 'produk lokal', 'usaha'],
      isPopular: umkm.reviews?.length > 1
    });
  });

  // Add districts
  lampungTimurDistricts.forEach(district => {
    searchItems.push({
      id: `district-${district.id}`,
      title: `Kecamatan ${district.name}`,
      category: 'Kecamatan',
      url: `/kecamatan`,
      description: district.description,
      tags: [district.name, 'pemerintahan', 'wilayah'],
      isPopular: false
    });
  });

  // Add articles/information
  lampungTimurArticles.forEach(article => {
    // Create slug from title
    const slug = article.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
    
    searchItems.push({
      id: `article-${article.id}`,
      title: article.title,
      category: 'Informasi',
      url: `/informasi/${slug}`,
      description: article.excerpt,
      tags: [article.category, 'berita', 'artikel'],
      isPopular: false
    });
  });

  return searchItems;
};

// Get popular search recommendations
export const getPopularSearches = (): SearchItem[] => {
  const allItems = generateSearchData();
  return allItems.filter(item => item.isPopular).slice(0, 8);
};

// Search function with fuzzy matching
export const searchItems = (query: string, items: SearchItem[]): SearchItem[] => {
  if (!query.trim()) {
    return [];
  }

  const lowerQuery = query.toLowerCase().trim();
  
  return items
    .map(item => {
      let score = 0;
      
      // Exact title match (highest priority)
      if (item.title.toLowerCase() === lowerQuery) {
        score += 100;
      }
      
      // Title starts with query
      if (item.title.toLowerCase().startsWith(lowerQuery)) {
        score += 50;
      }
      
      // Title contains query
      if (item.title.toLowerCase().includes(lowerQuery)) {
        score += 30;
      }
      
      // Description contains query
      if (item.description?.toLowerCase().includes(lowerQuery)) {
        score += 10;
      }
      
      // Tags contain query
      const tagMatch = item.tags?.some(tag => tag.toLowerCase().includes(lowerQuery));
      if (tagMatch) {
        score += 15;
      }
      
      // Category match
      if (item.category.toLowerCase().includes(lowerQuery)) {
        score += 20;
      }
      
      return { ...item, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);
};

// Get search suggestions based on partial query
export const getSearchSuggestions = (query: string): string[] => {
  const suggestions = [
    'Taman Nasional Way Kambas',
    'Pantai Kuala Kambas',
    'Danau Way Jepara',
    'Kain Tapis Lampung',
    'Kopi Robusta',
    'Keripik Pisang',
    'Kecamatan Sukadana',
    'Kecamatan Labuhan Maringgai',
    'Batik Lampung',
    'Sambal Lampung'
  ];
  
  if (!query.trim()) {
    return suggestions.slice(0, 5);
  }
  
  const lowerQuery = query.toLowerCase();
  return suggestions
    .filter(s => s.toLowerCase().includes(lowerQuery))
    .slice(0, 5);
};
