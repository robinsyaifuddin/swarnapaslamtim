
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Menu, Search, User, X, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();

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

  // Mock search results
  const searchResults = [
    {
      id: 1,
      category: 'Destinasi',
      name: 'Taman Nasional Way Kambas',
      url: '/destinasi/taman-nasional-way-kambas'
    },
    {
      id: 2,
      category: 'Destinasi',
      name: 'Pantai Kuala Kambas',
      url: '/destinasi/pantai-kuala-kambas'
    },
    {
      id: 3,
      category: 'UMKM',
      name: 'Lampung Ethnica - Kain Tapis',
      url: '/umkm/lampung-ethnica-kain-tapis-lampung'
    },
    {
      id: 4,
      category: 'UMKM',
      name: 'Kopi Lampung Timur Premium',
      url: '/umkm/kopi-lampung-timur-premium'
    },
    {
      id: 5,
      category: 'Kecamatan',
      name: 'Kalianda',
      url: '/kecamatan?id=1'
    },
    {
      id: 6,
      category: 'Agenda',
      name: 'Festival Krakatau',
      url: '/agenda?id=1'
    },
    {
      id: 7,
      category: 'Informasi',
      name: 'Berita Terbaru Lamsel',
      url: '/informasi/detail?id=1'
    }
  ];

  // Filter results based on search query
  const filteredResults = searchResults.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  
  const handleSearchSelect = (url: string) => {
    setIsSearchOpen(false);
    navigate(url);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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
          <div className="border-b border-gray-100 bg-gray-50/50">
            <CommandInput placeholder="Cari destinasi, UMKM, agenda..." value={searchQuery} onValueChange={setSearchQuery} className="border-none focus:ring-0 text-gray-800 placeholder:text-gray-500 bg-transparent h-12" autoFocus />
          </div>
          <CommandList className="max-h-80 overflow-y-auto bg-white">
            <CommandEmpty className="py-8 text-center text-gray-500">
              <div className="flex flex-col items-center space-y-2">
                <Search className="w-8 h-8 text-gray-300" />
                <span>Pencarian tidak ditemukan</span>
              </div>
            </CommandEmpty>
            <CommandGroup heading="Hasil Pencarian" className="p-2">
              {filteredResults.map((result, index) => (
                <CommandItem key={result.id} onSelect={() => handleSearchSelect(result.url)} className="flex items-center p-3 m-1 rounded-lg hover:bg-blue-50 cursor-pointer transition-all duration-200 stagger-item stagger-delay-1 border border-transparent hover:border-blue-100">
                  <div className="flex flex-col w-full">
                    <span className="font-medium text-gray-900">{result.name}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full w-fit mt-1">{result.category}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </header>
  );
};

export default Navbar;
