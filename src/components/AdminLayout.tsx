
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Button } from "@/components/ui/button";
import { Menu, Bell, User, Search, Settings, LogOut } from 'lucide-react';
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationCount, setNotificationCount] = useState(3);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Auto-close sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  // Mock notifications data
  const notificationsData = [
    { id: 1, type: 'info', title: 'Update sistem', message: 'Sistem telah diperbarui ke versi terbaru', time: '10 menit yang lalu', read: false },
    { id: 2, type: 'alert', title: 'Pesan baru', message: 'Ada pesan kontak baru yang perlu ditinjau', time: '30 menit yang lalu', read: false },
    { id: 3, type: 'success', title: 'Destinasi ditambahkan', message: 'Destinasi wisata baru berhasil ditambahkan', time: '2 jam yang lalu', read: false },
    { id: 4, type: 'info', title: 'Pembaruan UMKM', message: 'Data UMKM telah diperbarui oleh admin', time: '1 hari yang lalu', read: true },
    { id: 5, type: 'alert', title: 'Pengingat agenda', message: 'Agenda travel akan dimulai besok', time: '1 hari yang lalu', read: true },
  ];
  
  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      toast.error('Anda harus login terlebih dahulu!');
      navigate('/admin/login');
    }
  }, [navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminUsername');
    sessionStorage.removeItem('adminType');
    toast.success('Logout berhasil!');
    navigate('/admin/login');
  };

  const handleReadAllNotifications = () => {
    setNotificationCount(0);
    toast.success('Semua notifikasi telah ditandai sebagai dibaca');
  };

  const handleProfileSettings = () => {
    navigate('/admin/pengaturan');
  };

  const adminUsername = sessionStorage.getItem('adminUsername') || 'Admin';
  const adminType = sessionStorage.getItem('adminType');
  const isUMKMAdmin = adminType === 'umkm';

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} isUMKMAdmin={isUMKMAdmin} />
      
      {/* Main content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isMobile ? 'ml-0' : sidebarOpen ? 'ml-60 sm:ml-64' : 'ml-16'
      }`}>
        {/* Header */}
        <header className="bg-white h-14 sm:h-16 px-2 sm:px-4 lg:px-6 flex items-center justify-between shadow-sm border-b sticky top-0 z-20">
          <div className="flex items-center space-x-2 sm:space-x-4">
            {(isMobile || !sidebarOpen) && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleSidebar}
                className="flex-shrink-0 h-8 w-8 sm:h-9 sm:w-9"
              >
                <Menu size={18} />
              </Button>
            )}
            <div className="hidden sm:flex items-center w-48 md:w-64 lg:w-80">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <Input
                  placeholder="Cari..."
                  className="rounded-full border-gray-200 pl-9 h-8 text-sm"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Mobile search */}
            <div className="sm:hidden">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Search size={16} />
              </Button>
            </div>

            {/* Notifications */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-9 sm:w-9">
                  <Bell size={16} />
                  {notificationCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 px-1 py-0 min-w-[16px] h-4 flex items-center justify-center bg-red-500 text-[10px]">
                      {notificationCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[280px] sm:w-[320px] md:w-[380px] p-0" align="end">
                <Tabs defaultValue="all">
                  <div className="flex items-center justify-between p-3 border-b">
                    <h4 className="font-medium text-sm">Notifikasi</h4>
                    <TabsList className="bg-transparent p-0 h-auto">
                      <TabsTrigger value="all" className="text-xs px-2 py-1 h-auto">Semua</TabsTrigger>
                      <TabsTrigger value="unread" className="text-xs px-2 py-1 h-auto">Belum Dibaca</TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="all" className="m-0">
                    <ScrollArea className="h-[200px] sm:h-[250px]">
                      {notificationsData.map((notification) => (
                        <div key={notification.id} className={`p-3 border-b hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}>
                          <div className="flex items-start gap-2">
                            <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${notification.type === 'info' ? 'bg-blue-500' : notification.type === 'alert' ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                            <div className="flex-1 min-w-0">
                              <h5 className="font-medium text-xs">{notification.title}</h5>
                              <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">{notification.message}</p>
                              <span className="text-xs text-gray-400 mt-1 block">{notification.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="unread" className="m-0">
                    <ScrollArea className="h-[200px] sm:h-[250px]">
                      {notificationsData.filter(n => !n.read).map((notification) => (
                        <div key={notification.id} className="p-3 border-b hover:bg-gray-50 transition-colors bg-blue-50">
                          <div className="flex items-start gap-2">
                            <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${notification.type === 'info' ? 'bg-blue-500' : notification.type === 'alert' ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                            <div className="flex-1 min-w-0">
                              <h5 className="font-medium text-xs">{notification.title}</h5>
                              <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">{notification.message}</p>
                              <span className="text-xs text-gray-400 mt-1 block">{notification.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  </TabsContent>
                  <div className="p-2 border-t">
                    <Button variant="outline" size="sm" className="w-full text-xs h-8" onClick={handleReadAllNotifications}>
                      Tandai Semua Telah Dibaca
                    </Button>
                  </div>
                </Tabs>
              </PopoverContent>
            </Popover>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1 sm:space-x-2 px-1 sm:px-2 h-8 sm:h-9">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary flex items-center justify-center text-white">
                    <User size={14} />
                  </div>
                  <span className="hidden sm:inline text-xs sm:text-sm max-w-20 truncate">{adminUsername}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 sm:w-48">
                <DropdownMenuLabel className="text-sm">
                  <div className="truncate">Akun Saya</div>
                  {adminType && (
                    <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded ${adminType === 'central' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                      {adminType === 'central' ? 'Admin Pusat' : 'Admin UMKM'}
                    </span>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => navigate('/admin/profil')} className="text-sm">
                  <User className="mr-2" size={14} />
                  Profil Saya
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 text-sm">
                  <LogOut className="mr-2" size={14} />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 p-2 sm:p-4 lg:p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
