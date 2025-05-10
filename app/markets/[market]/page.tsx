'use client'

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';
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

export default function MarketDetailPage() {
  const params = useParams();
  const router = useRouter();
  const marketId = params.market as string;
  const [market, setMarket] = useState<Market | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const response = await axios.get('/data/markets.json');
        const markets = response.data.markets;
        const foundMarket = markets.find((m: Market) => m.id === marketId);
        
        if (!foundMarket) {
          router.push('/markets');
          return;
        }

        setMarket(foundMarket);
      } catch (error) {
        console.error('Error fetching market:', error);
        router.push('/markets');
      } finally {
        setLoading(false);
      }
    };

    fetchMarket();
  }, [marketId, router]);

  const handleBack = () => {
    router.push('/markets');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 font-inter flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading market details...</p>
        </div>
      </div>
    );
  }

  if (!market) {
    return (
      <div className="min-h-screen bg-gray-50 font-inter">
        <Navbar />
        <div className="pt-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Market not found</h1>
          <p className="mt-4 text-gray-600">The requested market could not be found.</p>
          <button
            onClick={handleBack}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to Markets
          </button>
        </div>
        <Footer />
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
            {market.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {market.description}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors mb-8"
        >
          <FaArrowLeft />
          <span>Back to Markets</span>
        </button>

        {/* Market Details */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="md:w-1/2 relative aspect-[4/3] mb-6 md:mb-0">
              <Image
                src={market.image}
                alt={market.title}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">{market.detailedDescription}</p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Features</h3>
              <ul className="space-y-2 mb-6">
                {market.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-gray-700">
                    <svg
                      className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-base">{feature}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Solutions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {market.solutions.map((solution, idx) => (
                  <div key={idx} className="bg-blue-50 rounded-lg p-4">
                    <p className="text-blue-900 font-medium">{solution}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Specifications</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(market.specifications).map(([key, value], idx) => (
                    <div key={idx} className="border-b border-gray-200 pb-3">
                      <h4 className="font-medium text-gray-900">{key}</h4>
                      <p className="text-gray-600 mt-1">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Images */}
          {market.additionalImages && market.additionalImages.length > 0 && (
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {market.additionalImages.map((img, idx) => (
                  <div key={idx} className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={img}
                      alt={`${market.title} - Image ${idx + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
} 