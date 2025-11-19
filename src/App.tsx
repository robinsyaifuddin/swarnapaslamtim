
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { AuthProvider } from "./hooks/useAuth";
import ChatbotWidget from "@/components/ChatbotWidget";
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Destinasi = lazy(() => import("./pages/Destinasi"));
const DestinationDetail = lazy(() => import("./pages/DestinationDetail"));
const Agenda = lazy(() => import("./pages/Agenda"));
const AgendaJoin = lazy(() => import("./pages/AgendaJoin"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const UMKM = lazy(() => import("./pages/UMKM"));
const UMKMDetail = lazy(() => import("./pages/UMKMDetail"));
const ProductPaymentPage = lazy(() => import("./pages/ProductPaymentPage"));
const Kecamatan = lazy(() => import("./pages/Kecamatan"));
const Kontak = lazy(() => import("./pages/Kontak"));
const Informasi = lazy(() => import("./pages/Informasi"));
const InformasiDetail = lazy(() => import("./pages/InformasiDetail"));

// Admin Pages
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminRegister = lazy(() => import("./pages/AdminRegister"));
const AdminLayout = lazy(() => import("./components/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminDestinasi = lazy(() => import("./pages/AdminDestinasi"));
const AdminAgenda = lazy(() => import("./pages/AdminAgenda"));
const AdminUMKM = lazy(() => import("./pages/AdminUMKM"));
const AdminKontak = lazy(() => import("./pages/AdminKontak"));
const AdminKecamatan = lazy(() => import("./pages/AdminKecamatan"));
const AdminStatistik = lazy(() => import("./pages/AdminStatistik"));
const AdminPengaturan = lazy(() => import("./pages/AdminPengaturan"));
const AdminProfil = lazy(() => import("./pages/AdminProfil"));

const queryClient = new QueryClient();

// ScrollToTop component to ensure page starts at the top on navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<div />}> 
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/destinasi" element={<Destinasi />} />
            <Route path="/destinasi/:slug" element={<DestinationDetail />} />
            <Route path="/umkm" element={<UMKM />} />
            <Route path="/umkm/:slug" element={<UMKMDetail />} />
            <Route path="/umkm/product-payment" element={<ProductPaymentPage />} />
            <Route path="/informasi" element={<Informasi />} />
            <Route path="/informasi/:slug" element={<InformasiDetail />} />
            <Route path="/kecamatan" element={<Kecamatan />} />
            <Route path="/kontak" element={<Kontak />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/agenda/:slug" element={<AgendaJoin />} />
            <Route path="/payment" element={<PaymentPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="destinasi" element={<AdminDestinasi />} />
              <Route path="agenda" element={<AdminAgenda />} />
              <Route path="umkm" element={<AdminUMKM />} />
              <Route path="kecamatan" element={<AdminKecamatan />} />
              <Route path="kontak" element={<AdminKontak />} />
              <Route path="statistik" element={<AdminStatistik />} />
              <Route path="pengaturan" element={<AdminPengaturan />} />
              <Route path="profil" element={<AdminProfil />} />
            </Route>
            
            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
          <ChatbotWidget />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

