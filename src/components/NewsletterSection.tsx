import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const NewsletterSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Berlangganan Newsletter</h2>
          <p className="text-lg opacity-90 mb-8">
            Dapatkan informasi terbaru tentang destinasi wisata dan promo menarik di Lampung Timur
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Masukkan email Anda"
              className="flex-1 bg-white/90 border-0"
            />
            <Button className="bg-white text-primary hover:bg-white/90">
              Berlangganan
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
