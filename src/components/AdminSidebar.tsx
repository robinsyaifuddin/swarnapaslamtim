
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Home,
  LogOut,
  Map,
  Menu,
  MessageSquare,
  Package,
  Settings,
  User,
  Calendar,
  Image,
  X,
} from 'lucide-react';
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarLinkProps {
  icon: React.ElementType;
  href: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

interface AdminSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  isUMKMAdmin?: boolean;
}

const SidebarLink = ({ icon: Icon, href, label, active, onClick }: SidebarLinkProps) => {
  return (
    <Link to={href} onClick={onClick}>
      <Button
        variant="ghost"
        className={`w-full justify-start my-1 text-xs sm:text-sm px-2 sm:px-3 h-8 sm:h-9 ${
          active 
            ? 'bg-primary text-white hover:bg-primary/90 hover:text-white' 
            : 'hover:bg-blue-50 text-slate-600 hover:text-primary'
        }`}
      >
        <Icon className="mr-1 sm:mr-2 flex-shrink-0" size={16} />
        <span className="truncate">{label}</span>
      </Button>
    </Link>
  );
};

const AdminSidebar = ({ isOpen, toggleSidebar, isUMKMAdmin = false }: AdminSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminUsername');
    sessionStorage.removeItem('adminType');
    toast.success('Logout berhasil!');
    navigate('/admin/login');
  };

  const handleLinkClick = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };

  const adminUsername = sessionStorage.getItem('adminUsername') || 'Admin';

  return (
    <aside
      className={`bg-white h-screen fixed left-0 top-0 shadow-lg transition-all duration-300 z-40 border-r ${
        isOpen ? 'w-60 sm:w-64' : 'w-16'
      } ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}`}
    >
      <div className="p-2 sm:p-4 flex items-center justify-between border-b h-14 sm:h-16">
        <div className={`flex items-center space-x-2 ${!isOpen && 'justify-center w-full'}`}>
          <div className="rounded-full bg-primary p-1.5 sm:p-2 shadow-md flex-shrink-0">
            <span className="text-sm sm:text-lg font-bold text-white">PS</span>
          </div>
          {isOpen && (
            <span className="text-sm sm:text-lg font-bold text-lamsel-dark truncate">Admin Lampung Timur</span>
          )}
        </div>
        {isOpen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="flex-shrink-0 h-8 w-8"
          >
            {isMobile ? <X size={18} /> : <Menu size={18} />}
          </Button>
        )}
      </div>

      <div className="p-2 sm:p-4 h-full overflow-y-auto">
        {isOpen && (
          <div className="mb-4 sm:mb-6 text-center p-2 bg-gray-50 rounded-lg">
            <User className="mx-auto text-primary mb-1 sm:mb-2" size={20} />
            <p className="text-xs sm:text-sm font-medium truncate">{adminUsername}</p>
            <p className="text-xs text-muted-foreground">
              {isUMKMAdmin ? 'Admin UMKM' : 'Administrator'}
            </p>
          </div>
        )}

        <nav className={`space-y-1 ${!isOpen && 'flex flex-col items-center'}`}>
          {!isOpen ? (
            // Icons only when sidebar is collapsed
            <>
              <Button
                variant={location.pathname === '/admin/dashboard' ? 'default' : 'ghost'}
                size="icon"
                asChild
                className="my-1 h-8 w-8"
              >
                <Link to="/admin/dashboard">
                  <Home size={16} />
                </Link>
              </Button>
              <Button
                variant={location.pathname === '/admin/destinasi' ? 'default' : 'ghost'}
                size="icon"
                asChild
                className="my-1 h-8 w-8"
              >
                <Link to="/admin/destinasi">
                  <Map size={16} />
                </Link>
              </Button>
              
              <Button
                variant={location.pathname === '/admin/umkm' ? 'default' : 'ghost'}
                size="icon"
                asChild
                className="my-1 h-8 w-8"
              >
                <Link to="/admin/umkm">
                  <Package size={16} />
                </Link>
              </Button>
              
              {!isUMKMAdmin && (
                <>
                  <Button
                    variant={location.pathname === '/admin/kecamatan' ? 'default' : 'ghost'}
                    size="icon"
                    asChild
                    className="my-1 h-8 w-8"
                  >
                    <Link to="/admin/kecamatan">
                      <Image size={16} />
                    </Link>
                  </Button>
                  <Button
                    variant={location.pathname === '/admin/kontak' ? 'default' : 'ghost'}
                    size="icon"
                    asChild
                    className="my-1 h-8 w-8"
                  >
                    <Link to="/admin/kontak">
                      <MessageSquare size={16} />
                    </Link>
                  </Button>
                  <Button
                    variant={location.pathname === '/admin/statistik' ? 'default' : 'ghost'}
                    size="icon"
                    asChild
                    className="my-1 h-8 w-8"
                  >
                    <Link to="/admin/statistik">
                      <BarChart3 size={16} />
                    </Link>
                  </Button>
                </>
              )}
              
              <Button
                variant={location.pathname === '/admin/pengaturan' ? 'default' : 'ghost'}
                size="icon"
                asChild
                className="my-1 h-8 w-8"
              >
                <Link to="/admin/pengaturan">
                  <Settings size={16} />
                </Link>
              </Button>
              
              <div className="mt-auto pt-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8"
                >
                  <LogOut size={16} />
                </Button>
              </div>
            </>
          ) : (
            // Full links when sidebar is expanded
            <>
              <SidebarLink
                icon={Home}
                href="/admin/dashboard"
                label="Dashboard"
                active={location.pathname === '/admin/dashboard'}
                onClick={handleLinkClick}
              />
              <SidebarLink
                icon={Map}
                href="/admin/destinasi"
                label="Destinasi Wisata"
                active={location.pathname === '/admin/destinasi'}
                onClick={handleLinkClick}
              />
              
              <SidebarLink
                icon={Package}
                href="/admin/umkm"
                label="UMKM"
                active={location.pathname === '/admin/umkm'}
                onClick={handleLinkClick}
              />
              
              {!isUMKMAdmin && (
                <>
                  <SidebarLink
                    icon={Image}
                    href="/admin/kecamatan"
                    label="Kecamatan"
                    active={location.pathname === '/admin/kecamatan'}
                    onClick={handleLinkClick}
                  />
                  <SidebarLink
                    icon={MessageSquare}
                    href="/admin/kontak"
                    label="Pesan Kontak"
                    active={location.pathname === '/admin/kontak'}
                    onClick={handleLinkClick}
                  />
                  <SidebarLink
                    icon={BarChart3}
                    href="/admin/statistik"
                    label="Statistik"
                    active={location.pathname === '/admin/statistik'}
                    onClick={handleLinkClick}
                  />
                </>
              )}
              
              <SidebarLink
                icon={Settings}
                href="/admin/pengaturan"
                label="Pengaturan"
                active={location.pathname === '/admin/pengaturan'}
                onClick={handleLinkClick}
              />
              
              <div className="mt-4 pt-4 border-t">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50 text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-1 sm:mr-2 flex-shrink-0" size={16} />
                  <span className="truncate">Logout</span>
                </Button>
              </div>
            </>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;

