
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from 'lucide-react';

// Sample data for testimonials
const testimonials = [
  {
    id: 1,
    name: "Budi Santoso",
    avatar: "BS",
    role: "Traveler",
    content: "Lampung Timur memiliki tempat-tempat wisata yang sangat indah. Pantainya bersih dan pemandangannya sangat memukau.",
    rating: 5
  },
  {
    id: 2,
    name: "Siti Rahayu",
    avatar: "SR",
    role: "Food Blogger",
    content: "Kuliner di Lampung Timur sangat beragam dan lezat. Makanan lautnya sangat segar dan harganya terjangkau.",
    rating: 4
  },
  {
    id: 3,
    name: "Ahmad Rizki",
    avatar: "AR",
    role: "Fotografer",
    content: "Sebagai fotografer, saya menemukan banyak spot indah untuk difoto di Lampung Timur. Sangat direkomendasikan.",
    rating: 5
  }
];

export const TestimonialSection = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Apa Kata Mereka</h2>
        <p className="mt-2 mx-auto max-w-2xl text-gray-600">
          Pengalaman pengunjung yang telah menjelajahi keindahan Lampung Timur
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="card-3d">
            <CardContent className="card-3d-content p-6">
              <div className="flex justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${testimonial.avatar}`} />
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-600">"{testimonial.content}"</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

