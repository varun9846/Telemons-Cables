"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import FibreCables from "@/components/FibreNetworks/FibreCables";
import FibrePatchPanels from "@/components/FibreNetworks/FibrePatchPanels";
import FibrePatchPanelCassettes from "@/components/FibreNetworks/FibrePatchPanelCassettes";
import FibreBreakoutBoxes from "@/components/FibreNetworks/FibreBreakoutBoxes";
import FibrePatchBoxes from '@/components/FibreNetworks/FibrePatchBoxes';
import FibreConnectorsCouplers from '@/components/FibreNetworks/FibreConnectorsCouplers';
import FibreAttenuators from '@/components/FibreNetworks/FibreAttenuators';
import FibreToolsAccessories from '@/components/FibreNetworks/FibreToolsAccessories';
import { FibreCable } from "@/types/fibre-cable";
import { FibrePatchPanel } from "@/types/fibre-patch-panel";
import { FibrePatchPanelCassette } from "@/types/fibre-patch-panel-cassette";
import { FibreBreakoutBox } from "@/types/fibre-breakout-box";
import { FibrePatchBox } from '@/types/fibre-patch-box';
import { FibreConnectorCoupler } from '@/types/fibre-connector-coupler';
import { FibreAttenuator } from '@/types/fibre-attenuator';
import { CATEGORY_TITLES, CATEGORY_API_MAP } from '@/lib/constants/fibre-networking';

interface PageProps {
  params: {
    category: string;
  };
}

export default function FibreNetworkingPage({ params }: PageProps) {
  const { category } = params;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchFunction = CATEGORY_API_MAP[category as keyof typeof CATEGORY_API_MAP];
        if (!fetchFunction) {
          throw new Error('Category not found');
        }

        const result = await fetchFunction();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="relative h-[275px] bg-gradient-to-r from-blue-900 to-blue-600 text-white flex items-center justify-center mb-12">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 mt-[2rem] text-center px-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {CATEGORY_TITLES[category as keyof typeof CATEGORY_TITLES]}
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover high-performance products designed for modern infrastructure.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mt-12 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => router.push('/fibre-networking')}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors mb-8"
        >
          <FaArrowLeft />
          <span>Back to Fibre Networking</span>
        </button>
        
        {category === "fibre-cable" && <FibreCables cables={data as FibreCable[]} />}
        {category === "fibre-patch-panels" && <FibrePatchPanels panels={data as FibrePatchPanel[]} />}
        {category === "fibre-patch-panel-cassettes" && <FibrePatchPanelCassettes cassettes={data as FibrePatchPanelCassette[]} />}
        {category === "fibre-breakout-boxes" && <FibreBreakoutBoxes boxes={data as FibreBreakoutBox[]} />}
        {category === "fibre-patch-boxes" && <FibrePatchBoxes boxes={data as FibrePatchBox[]} />}
        {category === "fibre-connectors-couplers" && <FibreConnectorsCouplers connectors={data as FibreConnectorCoupler[]} />}
        {category === "fibre-attenuators" && <FibreAttenuators attenuators={data as FibreAttenuator[]} />}
        {category === "fibre-tools-accessories" && <FibreToolsAccessories tools={data as FibreToolsAccessories[]} />}
      </div>
      <Footer />
    </div>
  );
} 