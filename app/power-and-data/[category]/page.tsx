"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import PowerPduList from "@/components/PowerData/PowerPduList";
import { PowerPdu } from "@/types/power-pdu";
import PowerCordList from "@/components/PowerData/PowerCordList";
import { PowerCord } from "@/types/power-cords";
import { CATEGORY_TITLES, CATEGORY_API_MAP } from '@/lib/constants/power-and-data';
import MpoFibreAssemblyList from '@/components/PowerData/MpoFibreAssemblyList';
import { MpoFibreAssembly } from '@/types/mpo-fibre-assemblies';
import MpoCassetteList from '@/components/PowerData/MpoCassetteList';
import { MpoCassette } from '@/types/mpo-cassettes';
import MpoChassisList from '@/components/PowerData/MpoChassisList';
import { MpoChassis } from '@/types/mpo-chassis';
import FibreDuctList from '@/components/PowerData/FibreDuctList';
import { FibreDuct } from '@/types/fibre-duct';
import DataCentreRacksList from '@/components/PowerData/DataCentreRacksList';
import { DataCentreRack } from '@/types/data-centre-racks';
import LiquidCoolingList from '@/components/PowerData/LiquidCoolingList';
import { LiquidCooling } from '@/types/liquid-cooling';
import EnterpriseCopperCables from '@/components/products/EnterpriseCopperCables';
import { EnterpriseCopperCable } from '@/types/enterprise-copper-cables';

interface PageProps {
    params: {
        category: string;
    };
}

export default function PowerAndDataPage({ params }: PageProps) {
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
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-telemons-blue-primary"></div>
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
            <section className="relative h-[275px] bg-gradient-to-r from-telemons-blue-primary to-telemons-blue-dark text-white flex items-center justify-center mb-12">
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

            <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-1">
                <button
                    onClick={() => router.push('/power-and-data')}
                    className="group flex items-center space-x-3 text-gray-700 hover:text-telemons-blue-primary transition-all duration-300 mb-8"
                >
                    <div className="p-2.5 rounded-xl bg-gray-100/80 group-hover:bg-telemons-blue-100 group-hover:scale-110 transition-all duration-300">
                        <FaArrowLeft className="text-sm" />
                    </div>
                    <span className="font-semibold text-sm">Back to Power & Data</span>
                </button>

                {category === "power-pdus" && <PowerPduList pdus={data as PowerPdu[]} />}
                {category === "power-cords-extension-leads" && <PowerCordList cords={data as PowerCord[]} />}
                {category === "mpo-fibre-assemblies" && <MpoFibreAssemblyList assemblies={data as MpoFibreAssembly[]} />}
                {category === "mpo-cassettes" && <MpoCassetteList cassettes={data as MpoCassette[]} />}
                {category === "mpo-chassis" && <MpoChassisList chassis={data as MpoChassis[]} />}
                {category === "fibre-duct" && <FibreDuctList ducts={data as FibreDuct[]} />}
                {category === "data-centre-racks" && <DataCentreRacksList racks={data as DataCentreRack[]} />}
                {category === "liquid-cooling" && <LiquidCoolingList coolingSystems={data as LiquidCooling[]} />}
                {category === "enterprise-copper-cables" && <EnterpriseCopperCables cables={data as EnterpriseCopperCable[]} />}
                {/* Add other category components as needed */}
            </div>
            <Footer />
        </div>
    );
}
