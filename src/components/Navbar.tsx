
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Menu, Search, User, X, TrendingUp, MapPin, Store, Building2, FileText } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { generateSearchData, getPopularSearches, searchItems, type SearchItem } from '@/utils/searchData';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Generate search data once
  const allSearchData = useMemo(() => generateSearchData(), []);
  const popularSearches = useMemo(() => getPopularSearches(), []);

  // Update scrolled state based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Reset mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Search with intelligent filtering
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }
    return searchItems(searchQuery, allSearchData);
  }, [searchQuery, allSearchData]);
  
  // Show popular searches when no query
  const showPopular = !searchQuery.trim();
  
  // Group results by category
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchItem[]> = {
      'Destinasi': [],
      'UMKM': [],
      'Kecamatan': [],
      'Informasi': []
    };
    
    searchResults.forEach(item => {
      if (groups[item.category]) {
        groups[item.category].push(item);
      }
    });
    
    return groups;
  }, [searchResults]);
  
  const handleSearchSelect = (url: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(url);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Destinasi':
        return <MapPin className="w-4 h-4" />;
      case 'UMKM':
        return <Store className="w-4 h-4" />;
      case 'Kecamatan':
        return <Building2 className="w-4 h-4" />;
      case 'Informasi':
        return <FileText className="w-4 h-4" />;
      default:
        return <Search className="w-4 h-4" />;
    }
  };

  // Function to handle navigation and scroll to top
  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setMobileMenuOpen(false);
  };

  // Navigation handler for menu items
  const handleMenuNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-18 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity" onClick={() => window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })}>
            <div className="flex items-center space-x-3">
              <img src="/Logo%20Kabupaten%20Lampung%20Timur.png" alt="Swarnapas - Logo Kabupaten Lampung Timur" className="w-8 h-8 object-contain" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-primary">Swarnapas</span>
                <span className="text-xs text-muted-foreground hidden sm:block">Pemerintah Lampung Timur</span>
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="space-x-1">
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={`${navigationMenuTriggerStyle()} text-foreground hover:text-primary hover:bg-primary/10 font-medium transition-colors cursor-pointer ${location.pathname === '/' ? 'text-primary bg-primary/10' : ''}`}
                  onClick={() => handleMenuNavigation('/')}
                >
                  Beranda
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={`${navigationMenuTriggerStyle()} text-foreground hover:text-primary hover:bg-primary/10 font-medium transition-colors cursor-pointer ${location.pathname === '/destinasi' ? 'text-primary bg-primary/10' : ''}`}
                  onClick={() => handleMenuNavigation('/destinasi')}
                >
                  Pariwisata
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={`${navigationMenuTriggerStyle()} text-foreground hover:text-primary hover:bg-primary/10 font-medium transition-colors cursor-pointer ${location.pathname === '/umkm' ? 'text-primary bg-primary/10' : ''}`}
                  onClick={() => handleMenuNavigation('/umkm')}
                >
                  UMKM
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={`${navigationMenuTriggerStyle()} text-foreground hover:text-primary hover:bg-primary/10 font-medium transition-colors cursor-pointer ${location.pathname === '/informasi' ? 'text-primary bg-primary/10' : ''}`}
                  onClick={() => handleMenuNavigation('/informasi')}
                >
                  Informasi
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={`${navigationMenuTriggerStyle()} text-foreground hover:text-primary hover:bg-primary/10 font-medium transition-colors cursor-pointer ${location.pathname === '/kecamatan' ? 'text-primary bg-primary/10' : ''}`}
                  onClick={() => handleMenuNavigation('/kecamatan')}
                >
                  Kecamatan
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="rounded-full" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-4 w-4" />
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => navigate('/admin/login')}
            >
              Masuk
            </Button>
          </div>
          
          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          
          {/* Menu Panel */}
          <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center space-x-3">
                <img src="/Logo%20Kabupaten%20Lampung%20Timur.png" alt="Logo Kabupaten Lampung Timur" className="w-8 h-8 object-contain" />
                <span className="text-lg font-semibold text-gray-900">Swarnapas</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="w-8 h-8">
                <X size={18} className="text-gray-600" />
              </Button>
            </div>
            
            {/* Search */}
            <div className="p-4 border-b border-gray-100 bg-white">
              <Button variant="outline" className="w-full justify-start text-gray-600 border-gray-200 bg-white hover:bg-gray-50 h-10" onClick={() => {
                setIsSearchOpen(true);
                setMobileMenuOpen(false);
              }}>
                <Search className="mr-2" size={16} />
                Cari destinasi, UMKM, agenda...
              </Button>
            </div>
            
            {/* Menu Items */}
            <div className="flex flex-col p-2 bg-white overflow-y-auto" style={{
              height: 'calc(100vh - 140px)'
            }}>
              <Link to="/" className={`flex items-center px-4 py-3 mx-2 my-1 rounded-lg text-gray-900 font-medium transition-colors ${location.pathname === '/' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`} onClick={() => handleNavigation('/')}>
                Beranda
              </Link>
              
              <Link to="/destinasi" className={`flex items-center px-4 py-3 mx-2 my-1 rounded-lg text-gray-900 font-medium transition-colors ${location.pathname === '/destinasi' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`} onClick={() => handleNavigation('/destinasi')}>
                Pariwisata
              </Link>
              
              <Link to="/umkm" className={`flex items-center px-4 py-3 mx-2 my-1 rounded-lg text-gray-900 font-medium transition-colors ${location.pathname === '/umkm' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`} onClick={() => handleNavigation('/umkm')}>
                UMKM
              </Link>
              
              <Link to="/informasi" className={`flex items-center px-4 py-3 mx-2 my-1 rounded-lg text-gray-900 font-medium transition-colors ${location.pathname === '/informasi' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`} onClick={() => handleNavigation('/informasi')}>
                Informasi
              </Link>
              
              <Link to="/kecamatan" className={`flex items-center px-4 py-3 mx-2 my-1 rounded-lg text-gray-900 font-medium transition-colors ${location.pathname === '/kecamatan' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`} onClick={() => handleNavigation('/kecamatan')}>
                Kecamatan
              </Link>
              
              {/* Admin Login Button in Mobile Menu */}
              <div className="mt-auto p-4 border-t border-gray-200 bg-white">
                <Link to="/admin/login" onClick={() => handleNavigation('/admin/login')}>
                  <Button className="w-full bg-primary hover:bg-primary/80 text-white h-11">
                    <User className="mr-2" size={16} />
                    Admin Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Dialog */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <Command className="rounded-lg border border-gray-200 shadow-xl">
          <div className="border-b border-gray-100 bg-gradient-to-r from-primary/5 to-primary/10">
            <CommandInput 
              placeholder="Cari destinasi wisata, UMKM, kecamatan, informasi..." 
              value={searchQuery} 
              onValueChange={setSearchQuery} 
              className="border-none focus:ring-0 text-gray-800 placeholder:text-gray-500 bg-transparent h-14 text-base" 
              autoFocus 
            />
          </div>
          <CommandList className="max-h-[500px] overflow-y-auto bg-white">
            {showPopular ? (
              // Show popular searches when no query
              <>
                <CommandGroup heading="🔥 Pencarian Populer" className="p-3">
                  {popularSearches.map((item) => (
                    <CommandItem 
                      key={item.id} 
                      onSelect={() => handleSearchSelect(item.url)} 
                      className="flex items-center gap-3 p-3 m-1 rounded-lg hover:bg-primary/10 cursor-pointer transition-all duration-200 border border-transparent hover:border-primary/20"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        {getCategoryIcon(item.category)}
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="font-semibold text-gray-900 truncate">{item.title}</span>
                        <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <TrendingUp className="w-3 h-3" />
                          {item.category}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
                <div className="p-4 text-center text-sm text-gray-500">
                  <p className="mb-2 font-medium">💡 Saran Pencarian:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['Pantai', 'Kopi', 'Tapis', 'Kuliner', 'Wisata Alam'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setSearchQuery(suggestion)}
                        className="px-3 py-1 bg-gray-100 hover:bg-primary/10 text-gray-700 rounded-full text-xs transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : searchResults.length > 0 ? (
              // Show search results grouped by category
              <>
                {Object.entries(groupedResults).map(([category, items]) => 
                  items.length > 0 && (
                    <CommandGroup key={category} heading={`${category} (${items.length})`} className="p-2">
                      {items.map((item) => (
                        <CommandItem 
                          key={item.id} 
                          onSelect={() => handleSearchSelect(item.url)} 
                          className="flex items-center gap-3 p-3 m-1 rounded-lg hover:bg-primary/10 cursor-pointer transition-all duration-200 border border-transparent hover:border-primary/20"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            {getCategoryIcon(item.category)}
                          </div>
                          <div className="flex flex-col flex-1 min-w-0">
                            <span className="font-medium text-gray-900 truncate">{item.title}</span>
                            {item.description && (
                              <span className="text-xs text-gray-500 truncate mt-0.5">
                                {item.description.substring(0, 60)}...
                              </span>
                            )}
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )
                )}
              </>
            ) : (
              // No results found
              <CommandEmpty className="py-12 text-center">
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Tidak ada hasil untuk "{searchQuery}"</p>
                    <p className="text-sm text-gray-500 mt-1">Coba gunakan kata kunci lain</p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center mt-4">
                    {['Destinasi', 'UMKM', 'Kecamatan'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setSearchQuery(suggestion)}
                        className="px-3 py-1 bg-gray-100 hover:bg-primary/10 text-gray-700 rounded-full text-xs transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </CommandEmpty>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </header>
  );
};

export default Navbar;
