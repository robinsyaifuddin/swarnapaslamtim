
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { DialogTrigger, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { 
  User, 
  Lock, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Eye, 
  EyeOff, 
  Upload, 
  Save,
  LogOut,
  KeyRound,
  AlertCircle
} from 'lucide-react';

const AdminProfil = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  
  // Get admin info from session storage
  const adminUsername = sessionStorage.getItem('adminUsername') || 'Admin';
  const adminType = sessionStorage.getItem('adminType') || 'central';
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    username: adminUsername,
    fullName: adminType === 'central' ? 'Administrator Pusat' : 'Admin UMKM Lampung Timur',
    email: 'admin@lamtimurkab.go.id',
    phone: '+62 725 543200',
    address: 'Jl. Lintas Timur Sumatera, Sukadana, Lampung Timur',
    bio: 'Administrator website Swarnapas dengan pengalaman dalam mengelola konten pariwisata dan UMKM Kabupaten Lampung Timur.',
    joinDate: '15 Januari 2023',
    position: adminType === 'central' ? 'Administrator Pusat' : 'Administrator UMKM',
    department: 'Dinas Pariwisata',
    notifyEmail: true,
    notifySystem: true,
    twoFactorAuth: false
  });
  
  // Handler for saving profile changes
  const handleSaveProfile = () => {
    toast.success('Profil berhasil diperbarui!');
  };
  
  // Handler for changing password
  const handleChangePassword = () => {
    setIsChangePasswordOpen(false);
    toast.success('Password berhasil diubah!');
  };
  
  // Handler for input changes
  const handleInputChange = (field: string, value: string | boolean) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <User className="mr-2" size={24} />
          Profil Saya
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                <AvatarImage src={`https://ui-avatars.com/api/?name=${adminUsername}&background=0D8ABC&color=fff`} />
                <AvatarFallback className="text-2xl">{adminUsername.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-bold">{profileData.fullName}</h2>
                <p className="text-sm text-muted-foreground">{profileData.position}</p>
                <div className="mt-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${adminType === 'central' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                    {adminType === 'central' ? 'Admin Pusat' : 'Admin UMKM'}
                  </span>
                </div>
              </div>
              <div className="w-full pt-4 space-y-2">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{profileData.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{profileData.phone}</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-sm">{profileData.address}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Bergabung: {profileData.joinDate}</span>
                </div>
              </div>
              <div className="w-full pt-4 space-y-2">
                <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="outline">
                      <Lock className="mr-2" size={16} />
                      Ubah Password
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Ubah Password</DialogTitle>
                      <DialogDescription>
                        Buat password baru yang kuat dan berbeda dari password sebelumnya.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Password Saat Ini</Label>
                        <div className="relative">
                          <Input 
                            id="current-password" 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Masukkan password saat ini"
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            type="button" 
                            className="absolute right-0 top-0 h-full"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Password Baru</Label>
                        <div className="relative">
                          <Input 
                            id="new-password" 
                            type={showNewPassword ? "text" : "password"} 
                            placeholder="Masukkan password baru"
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            type="button" 
                            className="absolute right-0 top-0 h-full"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Konfirmasi Password</Label>
                        <div className="relative">
                          <Input 
                            id="confirm-password" 
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder="Konfirmasi password baru"
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            type="button" 
                            className="absolute right-0 top-0 h-full"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </Button>
                        </div>
                      </div>
                      <div className="bg-amber-50 border border-amber-100 rounded-md p-3 text-sm flex items-start gap-2">
                        <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={16} />
                        <p className="text-amber-700">
                          Password harus minimal 8 karakter dan berisi kombinasi huruf, angka, dan karakter khusus.
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsChangePasswordOpen(false)}>
                        Batal
                      </Button>
                      <Button onClick={handleChangePassword}>
                        Simpan Password
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button className="w-full" variant="destructive">
                  <LogOut className="mr-2" size={16} />
                  Logout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Informasi Profil</CardTitle>
            <CardDescription>
              Kelola informasi personal dan pengaturan akun Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="profile">
              <TabsList className="mb-6">
                <TabsTrigger value="profile">Profil</TabsTrigger>
                <TabsTrigger value="security">Keamanan</TabsTrigger>
                <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input 
                      id="username" 
                      value={profileData.username} 
                      onChange={(e) => handleInputChange('username', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Nama Lengkap</Label>
                    <Input 
                      id="full-name" 
                      value={profileData.fullName} 
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input 
                      id="phone" 
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Jabatan</Label>
                    <Input 
                      id="position" 
                      value={profileData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Departemen</Label>
                    <Input 
                      id="department" 
                      value={profileData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Alamat</Label>
                    <Textarea 
                      id="address" 
                      value={profileData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)} 
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)} 
                      rows={4}
                      placeholder="Ceritakan sedikit tentang diri Anda..."
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="profile-image">Foto Profil</Label>
                    <div className="border-2 border-dashed rounded-md p-6 text-center">
                      <Upload className="mx-auto mb-2 text-gray-400" size={24} />
                      <p className="text-sm text-gray-500">Drag & drop file di sini atau klik untuk memilih file</p>
                      <p className="text-xs text-gray-400 mt-1">Mendukung: JPG, PNG (Maks. 2MB)</p>
                      <Input id="profile-image" type="file" className="hidden" />
                      <Button variant="outline" size="sm" className="mt-4">
                        Pilih File
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-6">
                <div className="space-y-5">
                  <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Shield className="text-blue-600 mt-0.5" size={20} />
                      <div>
                        <h3 className="font-medium text-blue-600">Informasi Keamanan</h3>
                        <p className="text-sm mt-1">Pastikan Anda menggunakan password yang kuat dan mengaktifkan autentikasi dua faktor untuk meningkatkan keamanan akun.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Password & Autentikasi</h3>
                    <div className="p-4 border rounded-md space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <KeyRound className="text-gray-600" size={16} />
                            <h4 className="font-medium">Password</h4>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">Password terakhir diubah 45 hari yang lalu</p>
                        </div>
                        <Button variant="outline" onClick={() => setIsChangePasswordOpen(true)}>
                          Ubah Password
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <Shield className="text-gray-600" size={16} />
                            <h4 className="font-medium">Autentikasi Dua Faktor</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">Tingkatkan keamanan akun dengan verifikasi dua langkah</p>
                        </div>
                        <Switch 
                          checked={profileData.twoFactorAuth} 
                          onCheckedChange={(checked) => handleInputChange('twoFactorAuth', checked)}
                        />
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-medium mt-6">Sesi Aktif</h3>
                    <div className="border rounded-md divide-y">
                      {[
                        { device: 'Windows PC - Chrome', location: 'Lampung, Indonesia', ip: '36.82.110.xxx', time: 'Saat ini', current: true },
                        { device: 'iPhone - Safari', location: 'Bandar Lampung, Indonesia', ip: '114.124.xxx.xxx', time: '5 jam yang lalu', current: false },
                        { device: 'MacBook - Firefox', location: 'Jakarta, Indonesia', ip: '140.213.xxx.xxx', time: '2 hari yang lalu', current: false }
                      ].map((session, i) => (
                        <div key={i} className="p-4 flex items-start justify-between">
                          <div>
                            <p className="font-medium flex items-center gap-2">
                              {session.device}
                              {session.current && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                  Aktif
                                </span>
                              )}
                            </p>
                            <div className="mt-1 text-sm text-muted-foreground space-y-1">
                              <p>Lokasi: {session.location}</p>
                              <p>IP: {session.ip}</p>
                              <p>Login: {session.time}</p>
                            </div>
                          </div>
                          {!session.current && (
                            <Button variant="outline" size="sm">
                              Akhiri Sesi
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-end">
                      <Button variant="destructive">
                        Akhiri Semua Sesi Lain
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-6">
                <div className="space-y-5">
                  <h3 className="text-lg font-medium">Pengaturan Notifikasi</h3>
                  <p className="text-sm text-muted-foreground">
                    Kelola bagaimana dan kapan Anda menerima notifikasi dari sistem.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Email Notifikasi</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-login">Login Baru</Label>
                            <p className="text-xs text-muted-foreground">Dapatkan notifikasi ketika ada login baru ke akun Anda</p>
                          </div>
                          <Switch 
                            id="email-login" 
                            checked={profileData.notifyEmail} 
                            onCheckedChange={(checked) => handleInputChange('notifyEmail', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-pesan">Pesan Kontak Baru</Label>
                            <p className="text-xs text-muted-foreground">Dapatkan notifikasi ketika ada pesan kontak baru</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-umkm">Pendaftaran UMKM Baru</Label>
                            <p className="text-xs text-muted-foreground">Dapatkan notifikasi ketika ada pendaftaran UMKM baru</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Notifikasi Sistem</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="system-update">Pembaruan Sistem</Label>
                            <p className="text-xs text-muted-foreground">Dapatkan notifikasi ketika ada pembaruan sistem</p>
                          </div>
                          <Switch 
                            id="system-update" 
                            checked={profileData.notifySystem} 
                            onCheckedChange={(checked) => handleInputChange('notifySystem', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="system-activity">Aktivitas Admin Lain</Label>
                            <p className="text-xs text-muted-foreground">Dapatkan notifikasi ketika admin lain melakukan perubahan</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="system-security">Peringatan Keamanan</Label>
                            <p className="text-xs text-muted-foreground">Dapatkan notifikasi ketika ada masalah keamanan</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 border-t pt-5">
            <Button variant="outline">Batal</Button>
            <Button onClick={handleSaveProfile}>
              <Save className="mr-2" size={16} />
              Simpan Perubahan
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminProfil;

