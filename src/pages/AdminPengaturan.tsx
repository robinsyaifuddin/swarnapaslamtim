import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { 
  Settings, 
  Database, 
  Shield, 
  Mail, 
  CreditCard, 
  Upload, 
  AlertTriangle, 
  Eye, 
  EyeOff,
  Info,
  Save,
  RotateCw,
  CheckCircle2,
  XCircle,
  Map as MapIcon  // Rename Map to MapIcon to avoid conflict with JavaScript's Map
} from 'lucide-react';

const AdminPengaturan = () => {
  const [apiKeys, setApiKeys] = useState({
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
    supabaseKey: import.meta.env.VITE_SUPABASE_KEY || '',
    mailApiKey: '',
    paymentApiKey: '',
    storageApiKey: '',
    mapsApiKey: ''
  });
  
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Swarnapas',
    siteDescription: 'Portal wisata dan UMKM Kabupaten Lampung Timur',
    contactEmail: 'admin@lamtimurkab.go.id',
    contactPhone: '+62 721 12345',
    logoPath: '/logo.png',
    favicon: '/favicon.ico',
    enableAnalytics: true,
    enableNotifications: true,
    enableUserRegistration: false,
    maintenanceMode: false
  });
  
  const [databaseStatus, setDatabaseStatus] = useState({
    status: 'connected', // connected, disconnected, connecting
    lastSync: '2023-05-10 14:30:45',
    syncInProgress: false
  });
  
  const [showApiKey, setShowApiKey] = useState({
    supabase: false,
    mail: false,
    payment: false,
    storage: false,
    maps: false
  });

  const handleApiKeyChange = (key: string, value: string) => {
    setApiKeys(prev => ({ ...prev, [key]: value }));
  };

  const handleGeneralSettingChange = (key: string, value: any) => {
    setGeneralSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleDatabaseSync = () => {
    setDatabaseStatus(prev => ({ ...prev, syncInProgress: true }));
    toast.info('Sinkronisasi database dimulai...');
    
    // Simulate sync process
    setTimeout(() => {
      setDatabaseStatus({
        status: 'connected',
        lastSync: new Date().toLocaleString('id-ID'),
        syncInProgress: false
      });
      toast.success('Sinkronisasi database berhasil!');
    }, 2500);
  };

  const handleSaveApiKeys = () => {
    // Simulating API keys storage in a secure way
    toast.success('Konfigurasi API berhasil disimpan!');
  };

  const handleSaveGeneralSettings = () => {
    toast.success('Pengaturan umum berhasil disimpan!');
  };

  const toggleMaintenanceMode = () => {
    setGeneralSettings(prev => ({ 
      ...prev, 
      maintenanceMode: !prev.maintenanceMode 
    }));
    toast.info(generalSettings.maintenanceMode ? 'Mode pemeliharaan dinonaktifkan' : 'Mode pemeliharaan diaktifkan');
  };

  const handleTestConnection = (type: string) => {
    toast.info(`Menguji koneksi ${type}...`);
    
    // Simulate testing process
    setTimeout(() => {
      if (type === 'supabase' && apiKeys.supabaseUrl && apiKeys.supabaseKey) {
        toast.success('Koneksi Supabase berhasil!');
      } else if (type === 'mail' && apiKeys.mailApiKey) {
        toast.success('Koneksi Mail API berhasil!');
      } else if (type === 'payment' && apiKeys.paymentApiKey) {
        toast.success('Koneksi Payment Gateway berhasil!');
      } else if (type === 'storage' && apiKeys.storageApiKey) {
        toast.success('Koneksi Storage API berhasil!');
      } else if (type === 'maps' && apiKeys.mapsApiKey) {
        toast.success('Koneksi Maps API berhasil!');
      } else {
        toast.error('Koneksi gagal! Pastikan API key telah diisi dengan benar.');
      }
    }, 1500);
  };

  const toggleShowApiKey = (key: string) => {
    setShowApiKey(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <Settings className="mr-2" size={24} />
          Pengaturan Sistem
        </h1>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">Umum</TabsTrigger>
          <TabsTrigger value="api">API & Integrasi</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="security">Keamanan</TabsTrigger>
          <TabsTrigger value="maintenance">Pemeliharaan</TabsTrigger>
        </TabsList>
        
        {/* General Settings Tab */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Umum</CardTitle>
              <CardDescription>Konfigurasi dasar website Swarnapas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Nama Situs</Label>
                  <Input 
                    id="site-name" 
                    value={generalSettings.siteName} 
                    onChange={(e) => handleGeneralSettingChange('siteName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email Kontak</Label>
                  <Input 
                    id="contact-email" 
                    type="email" 
                    value={generalSettings.contactEmail} 
                    onChange={(e) => handleGeneralSettingChange('contactEmail', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Nomor Telepon</Label>
                  <Input 
                    id="contact-phone" 
                    value={generalSettings.contactPhone} 
                    onChange={(e) => handleGeneralSettingChange('contactPhone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo-path">Path Logo</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="logo-path" 
                      value={generalSettings.logoPath} 
                      onChange={(e) => handleGeneralSettingChange('logoPath', e.target.value)}
                    />
                    <Button variant="outline" size="icon">
                      <Upload size={16} />
                    </Button>
                  </div>
                </div>
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="site-description">Deskripsi Situs</Label>
                  <Textarea 
                    id="site-description" 
                    value={generalSettings.siteDescription} 
                    onChange={(e) => handleGeneralSettingChange('siteDescription', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-medium">Fitur Sistem</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="analytics">Analitik Pengunjung</Label>
                      <p className="text-sm text-muted-foreground">Aktifkan pelacakan analitik untuk melihat statistik pengunjung</p>
                    </div>
                    <Switch 
                      id="analytics" 
                      checked={generalSettings.enableAnalytics} 
                      onCheckedChange={(checked) => handleGeneralSettingChange('enableAnalytics', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">Notifikasi Admin</Label>
                      <p className="text-sm text-muted-foreground">Aktifkan notifikasi untuk admin tentang aktivitas situs</p>
                    </div>
                    <Switch 
                      id="notifications" 
                      checked={generalSettings.enableNotifications} 
                      onCheckedChange={(checked) => handleGeneralSettingChange('enableNotifications', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="user-reg">Pendaftaran Pengguna</Label>
                      <p className="text-sm text-muted-foreground">Izinkan pendaftaran pengguna UMKM baru pada situs</p>
                    </div>
                    <Switch 
                      id="user-reg" 
                      checked={generalSettings.enableUserRegistration} 
                      onCheckedChange={(checked) => handleGeneralSettingChange('enableUserRegistration', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-5">
              <Button variant="outline">Batal</Button>
              <Button onClick={handleSaveGeneralSettings}>
                <Save className="mr-2" size={16} />
                Simpan Pengaturan
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* API & Integration Tab */}
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>Integrasi API</CardTitle>
              <CardDescription>Kelola kredensial API untuk integrasi dengan layanan eksternal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Supabase Integration */}
              <div className="p-4 border rounded-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="text-blue-600" />
                    <h3 className="text-lg font-medium">Supabase Database</h3>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${databaseStatus.status === 'connected' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {databaseStatus.status === 'connected' ? 'Terhubung' : 'Terputus'}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="supabase-url">Supabase URL</Label>
                    <Input 
                      id="supabase-url" 
                      value={apiKeys.supabaseUrl} 
                      onChange={(e) => handleApiKeyChange('supabaseUrl', e.target.value)}
                      placeholder="https://your-project.supabase.co"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supabase-key">Supabase API Key</Label>
                    <div className="flex">
                      <div className="relative flex-1">
                        <Input 
                          id="supabase-key" 
                          type={showApiKey.supabase ? "text" : "password"} 
                          value={apiKeys.supabaseKey} 
                          onChange={(e) => handleApiKeyChange('supabaseKey', e.target.value)}
                          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                        />
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          type="button" 
                          className="absolute right-0 top-0 h-full"
                          onClick={() => toggleShowApiKey('supabase')}
                        >
                          {showApiKey.supabase ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                      </div>
                      <Button 
                        variant="outline" 
                        className="ml-2"
                        onClick={() => handleTestConnection('supabase')}
                      >
                        Test
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-md flex items-start gap-2">
                  <Info size={16} className="mt-0.5" />
                  <p>Supabase digunakan sebagai database utama untuk menyimpan dan mengelola semua data website.</p>
                </div>
              </div>
              
              {/* Mail API Integration */}
              <div className="p-4 border rounded-md space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="text-green-600" />
                  <h3 className="text-lg font-medium">Mail API</h3>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mail-api-key">Mail API Key</Label>
                  <div className="flex">
                    <div className="relative flex-1">
                      <Input 
                        id="mail-api-key" 
                        type={showApiKey.mail ? "text" : "password"} 
                        value={apiKeys.mailApiKey} 
                        onChange={(e) => handleApiKeyChange('mailApiKey', e.target.value)}
                        placeholder="SG.xxxxxxxx.yyyyyyy"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        type="button" 
                        className="absolute right-0 top-0 h-full"
                        onClick={() => toggleShowApiKey('mail')}
                      >
                        {showApiKey.mail ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                    </div>
                    <Button 
                      variant="outline" 
                      className="ml-2"
                      onClick={() => handleTestConnection('mail')}
                    >
                      Test
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md flex items-start gap-2">
                  <Info size={16} className="mt-0.5" />
                  <p>Digunakan untuk mengirim email notifikasi, newsletter, dan konfirmasi pendaftaran.</p>
                </div>
              </div>
              
              {/* Payment API Integration */}
              <div className="p-4 border rounded-md space-y-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="text-purple-600" />
                  <h3 className="text-lg font-medium">Payment Gateway</h3>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-api-key">Payment API Key</Label>
                  <div className="flex">
                    <div className="relative flex-1">
                      <Input 
                        id="payment-api-key" 
                        type={showApiKey.payment ? "text" : "password"} 
                        value={apiKeys.paymentApiKey} 
                        onChange={(e) => handleApiKeyChange('paymentApiKey', e.target.value)}
                        placeholder="sk_test_xxx"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        type="button" 
                        className="absolute right-0 top-0 h-full"
                        onClick={() => toggleShowApiKey('payment')}
                      >
                        {showApiKey.payment ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                    </div>
                    <Button 
                      variant="outline" 
                      className="ml-2"
                      onClick={() => handleTestConnection('payment')}
                    >
                      Test
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-purple-600 bg-purple-50 p-3 rounded-md flex items-start gap-2">
                  <Info size={16} className="mt-0.5" />
                  <p>Terintegrasi dengan gateway pembayaran untuk pemrosesan transaksi UMKM.</p>
                </div>
              </div>
              
              {/* Maps API Integration */}
              <div className="p-4 border rounded-md space-y-4">
                <div className="flex items-center gap-2">
                  <MapIcon className="text-amber-600" />
                  <h3 className="text-lg font-medium">Maps API</h3>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maps-api-key">Google Maps API Key</Label>
                  <div className="flex">
                    <div className="relative flex-1">
                      <Input 
                        id="maps-api-key" 
                        type={showApiKey.maps ? "text" : "password"} 
                        value={apiKeys.mapsApiKey} 
                        onChange={(e) => handleApiKeyChange('mapsApiKey', e.target.value)}
                        placeholder="AIzaSyBxxxxxx"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        type="button" 
                        className="absolute right-0 top-0 h-full"
                        onClick={() => toggleShowApiKey('maps')}
                      >
                        {showApiKey.maps ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                    </div>
                    <Button 
                      variant="outline" 
                      className="ml-2"
                      onClick={() => handleTestConnection('maps')}
                    >
                      Test
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-md flex items-start gap-2">
                  <Info size={16} className="mt-0.5" />
                  <p>Digunakan untuk menampilkan peta dan lokasi destinasi wisata dan UMKM.</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-5">
              <Button variant="outline">Batal</Button>
              <Button onClick={handleSaveApiKeys}>
                <Save className="mr-2" size={16} />
                Simpan Konfigurasi API
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Database Tab */}
        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle>Manajemen Database</CardTitle>
              <CardDescription>Kelola koneksi dan sinkronisasi database</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Info className="text-blue-600 mt-0.5" size={20} />
                  <div>
                    <h3 className="font-medium text-blue-600">Informasi Database</h3>
                    <p className="text-sm mt-1">Website ini menggunakan Supabase sebagai platform database yang menyediakan PostgreSQL database terkelola dengan API yang mudah digunakan.</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${databaseStatus.status === 'connected' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      Status Koneksi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-lg font-semibold ${databaseStatus.status === 'connected' ? 'text-green-600' : 'text-red-600'}`}>
                      {databaseStatus.status === 'connected' ? 'Terhubung' : 'Terputus'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {databaseStatus.status === 'connected' 
                        ? 'Database terhubung dan berfungsi dengan normal'
                        : 'Database tidak terhubung. Periksa koneksi dan kredensial'}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      Sinkronisasi Terakhir
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold">{databaseStatus.lastSync}</p>
                    <p className="text-sm text-muted-foreground">
                      Update data terakhir dengan database
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      Ukuran Database
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold">245.8 MB</p>
                    <p className="text-sm text-muted-foreground">
                      Dari 500 MB kuota database
                    </p>
                    <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '49%' }}></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4 mt-6">
                <h3 className="text-lg font-medium">Tabel Database</h3>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Tabel</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah Baris</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ukuran</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { name: 'destinations', rows: 24, size: '6.2 MB', status: 'synced' },
                        { name: 'umkm', rows: 48, size: '8.4 MB', status: 'synced' },
                        { name: 'agenda', rows: 12, size: '3.1 MB', status: 'synced' },
                        { name: 'kecamatan', rows: 17, size: '5.8 MB', status: 'synced' },
                        { name: 'users', rows: 105, size: '2.3 MB', status: 'synced' }
                      ].map((table, i) => (
                        <tr key={i}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{table.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{table.rows}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{table.size}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              <CheckCircle2 className="mr-1" size={12} /> {table.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 mt-6">
                <Button 
                  onClick={handleDatabaseSync} 
                  disabled={databaseStatus.syncInProgress}
                >
                  {databaseStatus.syncInProgress ? (
                    <>
                      <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                      Sinkronisasi...
                    </>
                  ) : (
                    <>
                      <RotateCw className="mr-2 h-4 w-4" />
                      Sinkronisasi Database
                    </>
                  )}
                </Button>
                <Button variant="outline">
                  Backup Database
                </Button>
                <Button variant="outline">
                  Restore Database
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Keamanan Sistem</CardTitle>
              <CardDescription>Kelola pengaturan keamanan dan kebijakan akses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 border border-green-100 rounded-md p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Shield className="text-green-600 mt-0.5" size={20} />
                  <div>
                    <h3 className="font-medium text-green-600">Status Keamanan</h3>
                    <p className="text-sm mt-1">Seluruh pengaturan keamanan telah diterapkan dan berjalan dengan baik. Terakhir diperbarui: 3 hari yang lalu.</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Kebijakan Akses</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">Autentikasi Dua Faktor</Label>
                      <p className="text-sm text-muted-foreground">Wajibkan 2FA untuk semua admin</p>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="ip-restrict">Pembatasan IP</Label>
                      <p className="text-sm text-muted-foreground">Batasi akses admin ke IP yang diizinkan</p>
                    </div>
                    <Switch id="ip-restrict" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-logout">Auto Logout</Label>
                      <p className="text-sm text-muted-foreground">Logout otomatis setelah 30 menit tidak aktif</p>
                    </div>
                    <Switch id="auto-logout" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="login-log">Log Login</Label>
                      <p className="text-sm text-muted-foreground">Catat semua upaya login ke sistem</p>
                    </div>
                    <Switch id="login-log" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="pt-6 space-y-4 border-t">
                <h3 className="text-lg font-medium">Pencadangan Data</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-backup">Backup Otomatis</Label>
                      <p className="text-sm text-muted-foreground">Backup database setiap hari pukul 00:00</p>
                    </div>
                    <Switch id="auto-backup" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="backup-encrypt">Enkripsi Backup</Label>
                      <p className="text-sm text-muted-foreground">Enkripsi file backup untuk keamanan tambahan</p>
                    </div>
                    <Switch id="backup-encrypt" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="pt-6 space-y-4 border-t">
                <h3 className="text-lg font-medium">Riwayat Keamanan</h3>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peristiwa</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pengguna</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { event: 'Login Admin', user: 'admin@lamtimurkab.go.id', time: '2024-11-02 14:23', status: 'success' },
                        { event: 'Perubahan Password', user: 'admin@lamtimurkab.go.id', time: '2024-11-01 09:15', status: 'success' },
                        { event: 'Upaya Login Gagal', user: 'unknown@mail.com', time: '2024-10-31 22:45', status: 'failed' },
                        { event: 'Backup Database', user: 'system', time: '2024-10-31 00:00', status: 'success' },
                        { event: 'Perubahan Konfigurasi API', user: 'admin@lamtimurkab.go.id', time: '2024-10-30 11:32', status: 'success' }
                      ].map((event, i) => (
                        <tr key={i}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.event}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.user}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.time}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {event.status === 'success' ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                <CheckCircle2 className="mr-1" size={12} /> Berhasil
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                <XCircle className="mr-1" size={12} /> Gagal
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-5">
              <Button>
                Unduh Log Keamanan
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Maintenance Tab */}
        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Mode Pemeliharaan</CardTitle>
              <CardDescription>Aktifkan mode pemeliharaan saat melakukan perbaikan atau pembaruan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className={`bg-${generalSettings.maintenanceMode ? 'amber' : 'blue'}-50 border border-${generalSettings.maintenanceMode ? 'amber' : 'blue'}-100 rounded-md p-4 mb-6`}>
                <div className="flex items-start gap-3">
                  {generalSettings.maintenanceMode ? (
                    <AlertTriangle className="text-amber-600 mt-0.5" size={20} />
                  ) : (
                    <Info className="text-blue-600 mt-0.5" size={20} />
                  )}
                  <div>
                    <h3 className={`font-medium text-${generalSettings.maintenanceMode ? 'amber' : 'blue'}-600`}>
                      {generalSettings.maintenanceMode ? 'Mode Pemeliharaan Aktif' : 'Mode Pemeliharaan Nonaktif'}
                    </h3>
                    <p className="text-sm mt-1">
                      {generalSettings.maintenanceMode 
                        ? 'Website saat ini dalam mode pemeliharaan. Pengunjung akan melihat halaman pemeliharaan.'
                        : 'Website beroperasi normal dan dapat diakses oleh semua pengunjung.'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-4">Mode Pemeliharaan</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Ketika mode pemeliharaan aktif, website tidak akan dapat diakses oleh pengunjung umum. Mereka akan melihat halaman pemeliharaan dengan pesan yang Anda tentukan di bawah ini.
                  </p>
                  
                  <div className="space-y-4 mt-6">
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <h4 className="font-medium">Mode Pemeliharaan</h4>
                        <p className="text-sm text-muted-foreground">Aktifkan untuk menonaktifkan akses publik ke website</p>
                      </div>
                      <Switch 
                        checked={generalSettings.maintenanceMode} 
                        onCheckedChange={(checked) => handleGeneralSettingChange('maintenanceMode', checked)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="maintenance-message">Pesan Pemeliharaan</Label>
                      <Textarea 
                        id="maintenance-message" 
                        rows={4}
                        defaultValue="Website sedang dalam pemeliharaan untuk meningkatkan layanan kami. Silakan kembali beberapa saat lagi. Terima kasih atas pengertian Anda."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="estimated-time">Perkiraan Waktu Selesai</Label>
                      <Input 
                        id="estimated-time" 
                        type="datetime-local" 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <h4 className="font-medium">Akses Admin</h4>
                        <p className="text-sm text-muted-foreground">Izinkan admin untuk tetap dapat mengakses dashboard</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 border rounded-md p-6">
                  <h3 className="text-lg font-medium mb-4">Pratinjau Halaman Pemeliharaan</h3>
                  <div className="border rounded-md bg-gray-50 p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="rounded-full bg-primary p-3 shadow-md">
                        <span className="text-xl font-bold text-white">LM</span>
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Website Sedang Dalam Pemeliharaan</h2>
                    <p className="text-gray-600 mb-4">
                      Website sedang dalam pemeliharaan untuk meningkatkan layanan kami. Silakan kembali beberapa saat lagi. Terima kasih atas pengertian Anda.
                    </p>
                    <p className="text-sm mb-4">
                      Perkiraan waktu selesai: <span className="font-medium">8 Mei 2023, 14:00 WIB</span>
                    </p>
                    <div className="flex justify-center gap-4">
                      <Button variant="outline" size="sm">
                        Kembali Nanti
                      </Button>
                      <Button size="sm">
                        Hubungi Admin
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-5">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant={generalSettings.maintenanceMode ? "destructive" : "default"}>
                    {generalSettings.maintenanceMode ? 'Nonaktifkan Mode Pemeliharaan' : 'Aktifkan Mode Pemeliharaan'}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {generalSettings.maintenanceMode ? 'Nonaktifkan Mode Pemeliharaan?' : 'Aktifkan Mode Pemeliharaan?'}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {generalSettings.maintenanceMode 
                        ? 'Website akan kembali diakses oleh publik. Pastikan semua pembaruan telah selesai.'
                        : 'Website tidak akan dapat diakses oleh pengunjung umum. Hanya admin yang dapat masuk ke sistem.'}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction onClick={toggleMaintenanceMode}>
                      {generalSettings.maintenanceMode ? 'Ya, Nonaktifkan' : 'Ya, Aktifkan'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPengaturan;

