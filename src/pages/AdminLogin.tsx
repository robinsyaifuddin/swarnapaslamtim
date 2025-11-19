import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, LogIn, HelpCircle, Mail, Phone, Building2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { authService } from '@/services/authService';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPasswordDialog, setShowForgotPasswordDialog] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    organization: '',
    fullName: '',
    email: '',
    phone: '',
    regPassword: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await authService.login({
        username,
        password
      });
      if (result.success) {
        toast.success(result.message);
        // Navigate based on user role
        if (result.user.role === 'central') {
          navigate('/admin/dashboard');
        } else {
          navigate('/admin/umkm');
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat login!');
    } finally {
      setIsLoading(false);
    }
  };
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);

    // Simulate password reset email
    setTimeout(() => {
      toast.success(`Instruksi reset password telah dikirim ke ${resetEmail}`);
      setResetLoading(false);
      setShowForgotPasswordDialog(false);
      setResetEmail('');
    }, 1500);
  };
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.organization || !registerForm.fullName || !registerForm.email) {
      toast.error('Lengkapi semua data pendaftaran');
      return;
    }
    if (registerForm.regPassword.length < 6) {
      toast.error('Password minimal 6 karakter');
      return;
    }
    if (registerForm.regPassword !== registerForm.confirmPassword) {
      toast.error('Konfirmasi password tidak sesuai');
      return;
    }

    setRegisterLoading(true);
    setTimeout(() => {
      toast.success('Data awal tersimpan. Lanjutkan verifikasi di halaman pendaftaran lengkap.');
      setRegisterLoading(false);
      setActiveTab('login');
      navigate('/admin/register', { state: registerForm });
    }, 1200);
  };

  const isRegisterMode = activeTab === 'register';

  const brandGreen = '#6ddab3';
  const heroContent = activeTab === 'login'
    ? {
        badge: 'Masuk',
        title: 'Mulai Pengelolaan',
        description: 'Gunakan akun resmi Swarnapas yang telah diverifikasi.'
      }
    : {
        badge: 'Daftar Pengelola',
        title: 'Ajukan Akun Pengelola',
        description: 'Isikan data UMKM atau instansi pengelola destinasi Anda untuk diverifikasi Swarnapas.'
      };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-10 py-6 lg:py-16">
        <div className="relative w-full max-w-6xl 2xl:max-w-7xl bg-gradient-to-br from-white via-white to-[#eefbf5] rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] shadow-[0_25px_80px_rgba(0,0,0,0.2)] border border-white/60 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left panel */}
            <div className="w-full lg:w-1/2 p-5 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.3em]" style={{ color: brandGreen }}>{heroContent.badge}</p>
                  <h1 className="text-3xl font-bold text-slate-900 mt-2 leading-tight">{heroContent.title}</h1>
                  <p className="text-slate-500 text-sm mt-2 max-w-md">
                    {heroContent.description}
                  </p>
                </div>

                <div className="flex bg-white rounded-full shadow-inner overflow-hidden text-sm font-semibold">
                  <button className={cn('flex-1 py-3 transition-all duration-300', activeTab === 'login' ? 'text-white' : 'text-slate-500')} style={{ backgroundColor: activeTab === 'login' ? brandGreen : 'transparent' }} onClick={() => setActiveTab('login')}>
                    Masuk
                  </button>
                  <button className={cn('flex-1 py-3 transition-all duration-300', activeTab === 'register' ? 'text-white' : 'text-slate-500')} style={{ backgroundColor: activeTab === 'register' ? brandGreen : 'transparent' }} onClick={() => setActiveTab('register')}>
                    Daftar Pengelola
                  </button>
                </div>

                <div className="relative min-h-[520px] sm:min-h-[540px] [perspective:2000px]">
                  <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d]" style={{ transform: isRegisterMode ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                    {/* Login face */}
                  <div className="absolute inset-0 bg-white rounded-[28px] sm:rounded-[32px] shadow-xl px-6 sm:px-8 py-8 sm:py-10 space-y-6 [backface-visibility:hidden]">
                    <form onSubmit={handleLogin} className="space-y-5">

                      <div className="space-y-2">
                        <Label htmlFor="username" className="text-xs uppercase tracking-wide text-slate-500">Username</Label>
                        <Input id="username" placeholder="adminlampungtimur" value={username} onChange={e => setUsername(e.target.value)} required autoComplete="username" className="border-slate-200 focus-visible:ring-primary" />
                      </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-500">
                            <Label htmlFor="password">Password</Label>
                            <button type="button" className="text-primary hover:underline" onClick={() => setShowForgotPasswordDialog(true)}>
                              Lupa Password?
                            </button>
                          </div>
                          <div className="relative">
                            <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" className="pr-12 border-slate-200 focus-visible:ring-primary" />
                            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>

                        <Button type="submit" className="w-full h-12 text-white rounded-full shadow-lg bg-primary hover:bg-primary/90" disabled={isLoading}>
                          {isLoading ? (
                            <span className="flex items-center gap-2">
                              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Memproses...
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-2 font-semibold">
                              <LogIn size={18} />
                              Masuk Dashboard
                            </span>
                          )}
                        </Button>

                      </form>
                    </div>

                  {/* Register face */}
                  <div className="absolute inset-0 bg-white rounded-[28px] sm:rounded-[32px] shadow-xl px-6 sm:px-8 py-8 sm:py-10 space-y-6 [backface-visibility:hidden]" style={{ transform: 'rotateY(180deg)' }}>
                    <form onSubmit={handleRegisterSubmit} className="space-y-4">

                      <div className="space-y-2">
                        <Label className="text-xs uppercase tracking-wide text-slate-500">Nama UMKM / Instansi</Label>
                        <div className="relative">
                          <Input placeholder="Contoh: UMKM Batik Sukadana" value={registerForm.organization} onChange={e => setRegisterForm(prev => ({ ...prev, organization: e.target.value }))} className="pl-10 border-slate-200 focus-visible:ring-primary" required />
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        </div>
                      </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-xs uppercase tracking-wide text-slate-500">PIC</Label>
                            <Input placeholder="Nama penanggung jawab" value={registerForm.fullName} onChange={e => setRegisterForm(prev => ({ ...prev, fullName: e.target.value }))} className="border-slate-200 focus-visible:ring-primary" required />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs uppercase tracking-wide text-slate-500">No. WhatsApp</Label>
                            <div className="relative">
                              <Input placeholder="6281xxxx" value={registerForm.phone} onChange={e => setRegisterForm(prev => ({ ...prev, phone: e.target.value }))} className="pl-10 border-slate-200 focus-visible:ring-primary" required />
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs uppercase tracking-wide text-slate-500">Email Aktif</Label>
                          <div className="relative">
                            <Input type="email" placeholder="nama@domain.com" value={registerForm.email} onChange={e => setRegisterForm(prev => ({ ...prev, email: e.target.value }))} className="pl-10 border-slate-200 focus-visible:ring-primary" required />
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-xs uppercase tracking-wide text-slate-500">Password</Label>
                            <Input type="password" placeholder="Minimal 6 karakter" value={registerForm.regPassword} onChange={e => setRegisterForm(prev => ({ ...prev, regPassword: e.target.value }))} className="border-slate-200 focus-visible:ring-primary" required />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs uppercase tracking-wide text-slate-500">Konfirmasi</Label>
                            <Input type="password" placeholder="Ulangi password" value={registerForm.confirmPassword} onChange={e => setRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))} className="border-slate-200 focus-visible:ring-primary" required />
                          </div>
                        </div>

                        <Button type="submit" disabled={registerLoading} className="w-full h-12 rounded-full text-white bg-primary hover:bg-primary/90">
                          {registerLoading ? 'Mengirim...' : 'Ajukan Akun Pengelola'}
                        </Button>

                        <p className="text-xs text-slate-500">Tim Swarnapas akan memverifikasi data dan menghubungi Anda melalui email atau WhatsApp terdaftar.</p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right visual panel */}
            <div className="relative w-full lg:w-1/2 min-h-[360px] sm:min-h-[420px] lg:min-h-[520px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80')" }}>
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/80" />
              <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 text-white">
                <div>
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.4em] bg-white/20 px-4 py-1 rounded-full">
                    <span className="size-2 rounded-full bg-rose-400 animate-pulse"></span>
                    Lampung Timur
                  </span>
                  <h2 className="text-3xl font-bold mt-4 leading-tight">Eksplorasi, Kolaborasi, dan Tingkatkan Potensi Daerah.</h2>
                  <p className="text-white/80 mt-3 max-w-sm">Pantau performa UMKM, unggah agenda wisata terbaru, dan wujudkan pelayanan publik yang lebih sigap.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-4xl font-bold">120+</p>
                      <p className="text-sm text-white/70">UMKM aktif</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold">48</p>
                      <p className="text-sm text-white/70">Agenda wisata</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold">15</p>
                      <p className="text-sm text-white/70">Kecamatan sinergi</p>
                    </div>
                  </div>
                  <Button variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30 rounded-full w-fit">
                    Lihat Potensi Daerah
                  </Button>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 flex gap-2">
                <span className="h-2 w-8 rounded-full bg-white/90" />
                <span className="h-2 w-2 rounded-full bg-white/40" />
                <span className="h-2 w-2 rounded-full bg-white/40" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={showForgotPasswordDialog} onOpenChange={setShowForgotPasswordDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Masukkan email yang terkait dengan akun Anda. Kami akan mengirimkan instruksi reset password.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleResetPassword} className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="nama@email.com" type="email" value={resetEmail} onChange={e => setResetEmail(e.target.value)} required />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setShowForgotPasswordDialog(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={resetLoading}>
                {resetLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <HelpCircle className="mr-2" size={16} />
                    Kirim Instruksi
                  </span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminLogin;