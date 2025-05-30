"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import FibreCables from "@/components/FibreNetworks/FibreCables";
import FibrePatchPanels from "@/components/FibreNetworks/FibrePatchPanels";
import { FibreCable } from "@/types/fibre-cable";
import { FibrePatchPanel } from "@/types/fibre-patch-panel";
import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";

export default function FibreNetworkingCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const category = params.category as string;
  const [loading, setLoading] = useState(true);
  const [fibreCables, setFibreCables] = useState<FibreCable[]>([]);
  const [fibrePatchPanels, setFibrePatchPanels] = useState<FibrePatchPanel[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        if (category === "fibre-cable") {
          const response = await axios.get("/api/fibre-cables");
          setFibreCables(response.data);
        } else if (category === "fibre-patch-panels") {
          const response = await axios.get("/api/fibre-patch-panels");
          setFibrePatchPanels(response.data);
        } else {
          setError("Category not found");
        }
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => router.push("/fibre-networking")}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          Back to Fibre Networking
        </button>
      </div>
    );
  }

  if (category === "fibre-cable") {
    return (
      <div className="min-h-screen bg-gray-50 font-inter">
        <Navbar />
        <section className="relative h-[275px] bg-gradient-to-r from-blue-900 to-blue-600 text-white flex items-center justify-center mb-12">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative z-10 mt-[2rem] text-center px-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Fibre Cable</h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              High-quality fibre cables for reliable network connectivity.
            </p>
          </div>
        </section>
        <div className="pt-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => router.push("/fibre-networking")}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors mb-8"
            >
              <span>Back to Fibre Networking</span>
            </button>
            <FibreCables cables={fibreCables} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (category === "fibre-patch-panels") {
    return (
      <div className="min-h-screen bg-gray-50 font-inter">
        <Navbar />
        <section className="relative h-[275px] bg-gradient-to-r from-blue-900 to-blue-600 text-white flex items-center justify-center mb-12">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative z-10 mt-[2rem] text-center px-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Fibre Patch Panels</h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              High-quality fibre patch panels for reliable network connectivity.
            </p>
          </div>
        </section>
        <div className="pt-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => router.push("/fibre-networking")}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors mb-8"
            >
              <span>Back to Fibre Networking</span>
            </button>
            <FibrePatchPanels panels={fibrePatchPanels} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return null;
} 