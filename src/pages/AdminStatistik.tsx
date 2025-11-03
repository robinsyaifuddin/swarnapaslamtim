import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, LineChart, PieChart, Tooltip, Legend, Bar, XAxis, YAxis, CartesianGrid, Line, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ArrowDown, ArrowUp, BarChart3, Download, FileText, PieChart as PieChartIcon, TrendingUp, Users, Activity, DollarSign, Map, Calendar } from 'lucide-react';

// Mock data for statistics
const visitorData = [
  { month: 'Jan', visitors: 1200, lastYear: 980 },
  { month: 'Feb', visitors: 1900, lastYear: 1500 },
  { month: 'Mar', visitors: 1800, lastYear: 1300 },
  { month: 'Apr', visitors: 2100, lastYear: 1850 },
  { month: 'May', visitors: 2400, lastYear: 1950 },
  { month: 'Jun', visitors: 2700, lastYear: 2200 },
  { month: 'Jul', visitors: 3500, lastYear: 2800 },
  { month: 'Aug', visitors: 3200, lastYear: 2700 },
  { month: 'Sep', visitors: 2900, lastYear: 2500 },
  { month: 'Oct', visitors: 3000, lastYear: 2650 },
  { month: 'Nov', visitors: 2800, lastYear: 2400 },
  { month: 'Dec', visitors: 3200, lastYear: 2900 },
];

const categoryData = [
  { name: 'Destinasi Wisata', value: 45 },
  { name: 'UMKM', value: 30 },
  { name: 'Agenda', value: 15 },
  { name: 'Kecamatan', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const sourceData = [
  { name: 'Google', users: 4500 },
  { name: 'Direct', users: 3200 },
  { name: 'Social Media', users: 2800 },
  { name: 'Referral', users: 1500 },
  { name: 'Other', users: 950 },
];

const deviceData = [
  { name: 'Mobile', value: 68 },
  { name: 'Desktop', value: 27 },
  { name: 'Tablet', value: 5 },
];

const AdminStatistik = () => {
  const [timeRange, setTimeRange] = useState('year');

  // Calculate total stats
  const totalVisitors = visitorData.reduce((sum, item) => sum + item.visitors, 0);
  const totalLastYear = visitorData.reduce((sum, item) => sum + item.lastYear, 0);
  const visitorGrowth = ((totalVisitors - totalLastYear) / totalLastYear * 100).toFixed(1);
  const visitorGrowthValue = parseFloat(visitorGrowth);  // Convert string to number for safe comparison

  // Format numbers with comma separator
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <BarChart3 className="mr-2" size={24} />
          Statistik
        </h1>
        <div className="flex items-center gap-2">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih Jangka Waktu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">7 Hari Terakhir</SelectItem>
              <SelectItem value="month">30 Hari Terakhir</SelectItem>
              <SelectItem value="quarter">3 Bulan Terakhir</SelectItem>
              <SelectItem value="year">1 Tahun</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download size={16} />
          </Button>
          <Button variant="outline" size="icon">
            <FileText size={16} />
          </Button>
        </div>
      </div>

      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Pengunjung</p>
                <h3 className="text-2xl font-bold mt-1">{formatNumber(totalVisitors)}</h3>
                <div className="flex items-center mt-1 text-sm">
                  {visitorGrowthValue > 0 ? (
                    <div className="flex items-center text-green-600">
                      <ArrowUp className="mr-1" size={14} />
                      <span>{visitorGrowth}%</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <ArrowDown className="mr-1" size={14} />
                      <span>{Math.abs(visitorGrowthValue)}%</span>
                    </div>
                  )}
                  <span className="text-muted-foreground ml-1">vs tahun lalu</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Users className="text-blue-600" size={22} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Halaman/Sesi</p>
                <h3 className="text-2xl font-bold mt-1">3.5</h3>
                <div className="flex items-center mt-1 text-sm">
                  <div className="flex items-center text-green-600">
                    <ArrowUp className="mr-1" size={14} />
                    <span>12.3%</span>
                  </div>
                  <span className="text-muted-foreground ml-1">vs bulan lalu</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <Activity className="text-green-600" size={22} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pendapatan UMKM</p>
                <h3 className="text-2xl font-bold mt-1">Rp 245.8M</h3>
                <div className="flex items-center mt-1 text-sm">
                  <div className="flex items-center text-green-600">
                    <ArrowUp className="mr-1" size={14} />
                    <span>8.7%</span>
                  </div>
                  <span className="text-muted-foreground ml-1">vs bulan lalu</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-orange-100">
                <DollarSign className="text-orange-600" size={22} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Konversi</p>
                <h3 className="text-2xl font-bold mt-1">4.6%</h3>
                <div className="flex items-center mt-1 text-sm">
                  <div className="flex items-center text-red-600">
                    <ArrowDown className="mr-1" size={14} />
                    <span>1.2%</span>
                  </div>
                  <span className="text-muted-foreground ml-1">vs bulan lalu</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <TrendingUp className="text-purple-600" size={22} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="visitors">
        <TabsList className="mb-4">
          <TabsTrigger value="visitors">Pengunjung</TabsTrigger>
          <TabsTrigger value="content">Konten</TabsTrigger>
          <TabsTrigger value="traffic">Sumber Traffic</TabsTrigger>
          <TabsTrigger value="devices">Perangkat</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visitors">
          <Card>
            <CardHeader>
              <CardTitle>Tren Pengunjung Website</CardTitle>
              <CardDescription>Jumlah pengunjung website per bulan dibandingkan dengan tahun lalu</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={visitorData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="visitors" stroke="#0284c7" strokeWidth={2} name="Tahun Ini" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="lastYear" stroke="#94a3b8" strokeWidth={2} name="Tahun Lalu" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-5">
              <div>
                <p className="text-sm text-muted-foreground">Total Pengunjung Tahun Ini</p>
                <p className="text-xl font-bold">{formatNumber(totalVisitors)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Pengunjung Tahun Lalu</p>
                <p className="text-xl font-bold">{formatNumber(totalLastYear)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pertumbuhan</p>
                <p className={`text-xl font-bold ${parseFloat(visitorGrowth) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {visitorGrowth}%
                </p>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Popularitas Konten</CardTitle>
              <CardDescription>Distribusi kunjungan berdasarkan jenis konten</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={140}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-lg font-medium mb-4">Halaman Populer</h4>
                  <div className="space-y-6">
                    {[
                      { name: 'Pantai Tanjung Putus', category: 'Destinasi', views: 4583, icon: Map },
                      { name: 'Festival Krakatau', category: 'Agenda', views: 3254, icon: Calendar },
                      { name: 'Kopi Lamsel', category: 'UMKM', views: 2980, icon: DollarSign },
                      { name: 'Air Terjun Way Lalaan', category: 'Destinasi', views: 2610, icon: Map },
                      { name: 'Kecamatan Kalianda', category: 'Kecamatan', views: 1897, icon: Map }
                    ].map((page, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            page.category === 'Destinasi' ? 'bg-blue-100 text-blue-600' : 
                            page.category === 'Agenda' ? 'bg-orange-100 text-orange-600' : 
                            page.category === 'UMKM' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'
                          }`}>
                            <page.icon size={18} />
                          </div>
                          <div className="ml-3">
                            <p className="font-medium">{page.name}</p>
                            <p className="text-xs text-muted-foreground">{page.category}</p>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">{formatNumber(page.views)}</p>
                          <p className="text-xs text-right text-muted-foreground">kunjungan</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="traffic">
          <Card>
            <CardHeader>
              <CardTitle>Sumber Traffic</CardTitle>
              <CardDescription>Distribusi pengunjung berdasarkan sumber kedatangan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={sourceData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="users" name="Pengunjung" fill="#0ea5e9" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-5">
              <div className="grid grid-cols-3 gap-4 w-full">
                <div>
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm font-medium">Google</span>
                  </div>
                  <p className="text-xl font-bold">34.7%</p>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" style={{ opacity: 0.8 }}></div>
                    <span className="text-sm font-medium">Direct</span>
                  </div>
                  <p className="text-xl font-bold">24.7%</p>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" style={{ opacity: 0.6 }}></div>
                    <span className="text-sm font-medium">Social Media</span>
                  </div>
                  <p className="text-xl font-bold">21.6%</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="devices">
          <Card>
            <CardHeader>
              <CardTitle>Perangkat Pengguna</CardTitle>
              <CardDescription>Jenis perangkat yang digunakan pengunjung website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={140}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        <Cell fill="#0284c7" />
                        <Cell fill="#4ade80" />
                        <Cell fill="#f59e0b" />
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-lg font-medium mb-4">Analisis Perangkat</h4>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Mobile</span>
                        <span className="text-sm font-medium">68%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Mayoritas pengguna mengakses melalui smartphone</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Desktop</span>
                        <span className="text-sm font-medium">27%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '27%' }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Persentase pengguna desktop cenderung stabil</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Tablet</span>
                        <span className="text-sm font-medium">5%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '5%' }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Mengalami penurunan dibanding periode sebelumnya</p>
                    </div>
                  </div>
                  <div className="mt-8 p-4 bg-blue-50 rounded-md border border-blue-100">
                    <h5 className="font-medium mb-2">Rekomendasi</h5>
                    <p className="text-sm text-gray-600">Fokus pada pengoptimalan tampilan mobile untuk meningkatkan pengalaman pengguna smartphone yang merupakan mayoritas pengunjung.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminStatistik;
