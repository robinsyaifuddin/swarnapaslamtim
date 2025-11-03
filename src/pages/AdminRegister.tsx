
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Eye, EyeOff, UserPlus, Store } from 'lucide-react';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
    umkmName: '',
    umkmAddress: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    if (formData.password !== formData.confirmPassword) {
      toast.error('Password dan konfirmasi password tidak cocok!');
      setIsLoading(false);
      return;
    }

    // Simulate registration process
    setTimeout(() => {
      toast.success('Pendaftaran berhasil! Silakan tunggu persetujuan admin.');
      setIsLoading(false);
      navigate('/admin/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col justify-center items-center p-4 py-12">
      <div className="absolute top-4 left-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          onClick={() => navigate('/admin/login')}
        >
          <ArrowLeft size={16} />
          Kembali ke Login
        </Button>
      </div>

      <div className="w-full max-w-2xl mb-10">
        <Card className="shadow-[0_10px_20px_rgba(0,0,0,0.1)] border-0 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
          <CardHeader className="space-y-1 text-center bg-gradient-to-r from-green-600 to-teal-500 text-white rounded-t-lg p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/path/to/pattern.svg')] opacity-10 mix-blend-overlay"></div>
            <div className="relative z-10">
              <Store size={40} className="mx-auto mb-2" />
              <CardTitle className="text-3xl font-bold">Daftar sebagai Pengelola UMKM</CardTitle>
              <CardDescription className="text-gray-100 mt-2">
                Daftarkan UMKM Anda untuk memasarkan produk dan layanan
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-6 px-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nama Lengkap</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Nama lengkap Anda"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="shadow-sm border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="shadow-sm border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="08xxxxxxxxxx"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="shadow-sm border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Username untuk login"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="shadow-sm border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimal 8 karakter"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={8}
                      className="pr-10 shadow-sm border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-50"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Masukkan ulang password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="pr-10 shadow-sm border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-50"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="umkmName">Nama UMKM</Label>
                  <Input
                    id="umkmName"
                    name="umkmName"
                    placeholder="Nama usaha/UMKM Anda"
                    value={formData.umkmName}
                    onChange={handleChange}
                    required
                    className="shadow-sm border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-50"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="umkmAddress">Alamat UMKM</Label>
                  <Input
                    id="umkmAddress"
                    name="umkmAddress"
                    placeholder="Alamat lengkap UMKM"
                    value={formData.umkmAddress}
                    onChange={handleChange}
                    required
                    className="shadow-sm border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-50"
                  />
                </div>
              </div>
              
              <div className="mt-8">
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 shadow-md transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Memproses...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <UserPlus className="mr-2" size={18} />
                      Daftar Sekarang
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="border-t py-4 px-8 text-center">
            <div className="w-full flex flex-col items-center">
              <p className="text-sm text-muted-foreground">
                Dengan mendaftar, Anda menyetujui syarat dan ketentuan yang berlaku.
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminRegister;
