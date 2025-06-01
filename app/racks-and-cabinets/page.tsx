'use client'

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import FloorStandingRacks from '@/components/RacksCabinets/FloorStandingRacks';
import { FloorStandingRack } from '@/types/floor-standing-rack';

export default function RacksAndCabinetsPage() {
  const [racks, setRacks] = useState<FloorStandingRack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRacks = async () => {
      try {
        const response = await fetch('/api/floor-standing-racks');
        if (!response.ok) {
          throw new Error('Failed to fetch racks');
        }
        const data = await response.json();
        setRacks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRacks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Error Loading Racks</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Floor Standing Racks</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our range of high-quality floor standing racks designed for optimal organization and durability.
          </p>
        </div>
        <FloorStandingRacks racks={racks} />
      </main>
      <Footer />
    </div>
  );
}