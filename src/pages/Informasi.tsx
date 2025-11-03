import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, TrendingUp, Clock, Eye } from 'lucide-react';
import { lampungTimurArticles, articleCategories } from '@/data/lampungTimurArticles';

const Informasi = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Data artikel dan berita resmi Lampung Timur
  const articles = lampungTimurArticles;
  const categories = articleCategories;

  // Filter articles based on search and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get trending articles (most viewed)
  const trendingArticles = [...articles].sort((a, b) => parseFloat(b.views.replace('k', '000').replace('.', '')) - parseFloat(a.views.replace('k', '000').replace('.', ''))).slice(0, 3);
  return <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        

        {/* Stats Section */}
        <section className="py-8 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
              <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-primary/5 rounded-lg border border-blue-100">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 sm:mb-2">{articles.length}</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">Total Artikel</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-green-50 to-green-100/50 rounded-lg border border-green-100">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 sm:mb-2">{categories.length - 1}</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">Kategori</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-lg border border-orange-100">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 sm:mb-2">24/7</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">Update</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-6 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input placeholder="Cari artikel berita..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 h-12 border-gray-300 focus:border-primary focus:ring-primary/20" />
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Filter size={18} className="text-gray-600" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48 h-12 border-gray-300">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Results count */}
            <div className="mt-4 text-sm text-gray-600">
              Menampilkan {filteredArticles.length} dari {articles.length} artikel
            </div>
          </div>
        </section>

        {/* Trending Articles Section */}
        {searchQuery === '' && selectedCategory === 'all' && <section className="py-8 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="text-primary" size={24} />
                <h2 className="text-2xl font-bold text-gray-900">Trending Hari Ini</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {trendingArticles.map((article, index) => <div key={article.id} className="relative">
                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold z-10 shadow-md">
                      {index + 1}
                    </div>
                    <ArticleCard {...article} />
                  </div>)}
              </div>
            </div>
          </section>}

        {/* Articles Grid */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            {filteredArticles.length > 0 ? <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredArticles.map((article, index) => <div key={article.id} className="animate-fade-in" style={{
                animationDelay: `${index * 0.1}s`
              }}>
                      <ArticleCard {...article} />
                    </div>)}
                </div>
                
                {/* Load More Button */}
                {filteredArticles.length >= 6 && <div className="text-center mt-12">
                    <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
                      Muat Lebih Banyak
                    </Button>
                  </div>}
              </> : <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search size={40} className="text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">Artikel tidak ditemukan</h3>
                  <p className="text-gray-600 mb-6">
                    Maaf, kami tidak dapat menemukan artikel yang sesuai dengan pencarian Anda.
                  </p>
                  <Button onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }} className="bg-primary hover:bg-primary/90">
                    Reset Pencarian
                  </Button>
                </div>
              </div>}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-r from-lamsel-blue to-blue-700">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto text-white">
              <h2 className="text-3xl font-bold mb-4">Jangan Lewatkan Berita Terbaru</h2>
              <p className="text-xl opacity-90 mb-8">
                Berlangganan newsletter kami untuk mendapatkan informasi terkini langsung di email Anda
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input type="email" placeholder="Masukkan email Anda" className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20" />
                <Button size="lg" className="bg-white text-lamsel-blue hover:bg-gray-100 font-semibold px-8">
                  Berlangganan
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>;
};
export default Informasi;
