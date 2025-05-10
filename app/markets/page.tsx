'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import axios from 'axios';

// Market interface for type safety
interface Market {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  solutions: string[];
  detailedDescription: string;
  specifications: { [key: string]: string };
  additionalImages: string[];
}

export default function MarketsPage() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const response = await axios.get('/data/markets.json');
        setMarkets(response.data.markets);
      } catch (error) {
        console.error('Error fetching markets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkets();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 font-inter flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading markets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-blue-900 to-blue-600 text-white flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Industry <span className="text-blue-300">Solutions</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover our specialized network infrastructure solutions for various industries.
          </p>
        </div>
      </section>

      {/* Markets Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {markets.map((market) => (
            <Link 
              key={market.id}
              href={`/markets/${market.id}`}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={market.image}
                    alt={market.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{market.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-2">{market.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {market.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
} 