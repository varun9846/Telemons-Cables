'use client'

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import EnterpriseCables from '@/components/products/EnterpriseCables';
import CopperPatchPanels from '@/components/products/CopperPatchPanels';
import KeystoneJacks from '@/components/products/KeystoneJacks';
import ModulesFaceplates from '@/components/products/ModulesFaceplates';
import { ModuleFaceplate } from '@/types/module-faceplate';
import axios from 'axios';
import Backboxes from '@/components/products/Backboxes';
import { Backbox } from '@/types/backbox';
import TelephoneNetworking from '@/components/products/TelephoneNetworking';
import type { TelephoneNetworking as TelephoneNetworkingType } from '@/types/telephone-networking';
import FloorStandingRacks from '@/components/RacksCabinets/FloorStandingRacks';
import WallRacks from '@/components/RacksCabinets/WallRacks';
import OpenRacks from '@/components/RacksCabinets/OpenRacks';
import { FloorStandingRack } from '@/types/floor-standing-rack';
import { WallRack } from '@/types/wall-rack';
import { OpenRack } from '@/types/open-rack';

// Product category interface for type safety
interface ProductCategory {
    title: string;
    description: string;
    iconType: string;
    iconColor: string;
    features: string[];
    image: string;
    detailedDescription: string;
    specifications: { [key: string]: string };
    additionalImages: string[];
    frames?: {
        name: string;
        partCode: string;
        outlets?: number;
        ports?: number;
        category: string;
        rackUnits: string;
        colour: string;
        mounting: string;
        shielded: boolean;
        height?: string;
        connector?: string;
        connectionType?: string;
        description: string;
    }[];
}

// Add interface for EnterpriseCable
interface EnterpriseCable {
    id: string;
    title: string;
    partNumber: string;
    description: string;
    image: string;
    specifications: {
        performanceLevel: string;
        cableConstruction: string;
        conductorGauge: string;
        conductorType: string;
        flammabilityRating?: string[];
        euroClassFlameRating?: string;
        availableColors: string[];
        numberOfPairs?: string[];
        overallLength?: string;
    };
    features: string[];
    detailedDescription: string;
    additionalImages: string[];
}

// Add interface for DefaultCategory
interface DefaultCategory {
    title: string;
    description: string;
    image: string;
    detailedDescription: string;
    features: string[];
    specifications: { [key: string]: string };
    additionalImages: string[];
}

// Add interface for KeystoneJack
interface KeystoneJack {
    id: string;
    title: string;
    partNumber: string;
    description: string;
    image: string;
    specifications: {
        model: string;
        connectorType: string;
        shielded: string;
        category: string;
        requiresTerminationTool: string;
        suitableForRoundCable: string;
    };
    features: string[];
    detailedDescription: string;
}

export default function CategoryPage() {
    const params = useParams();
    const router = useRouter();
    const category = params.category as string;
    const [loading, setLoading] = useState(true);
    const [productData, setProductData] = useState<ProductCategory | null>(null);
    const [enterpriseCables, setEnterpriseCables] = useState<EnterpriseCable[]>([]);
    const [defaultCategories, setDefaultCategories] = useState<DefaultCategory[]>([]);
    const [selectedDefaultCategory, setSelectedDefaultCategory] = useState<DefaultCategory | null>(null);
    const [showSelectedCategory, setShowSelectedCategory] = useState(false);
    const [floorStandingRacks, setFloorStandingRacks] = useState<FloorStandingRack[]>([]);
    const [wallRacks, setWallRacks] = useState<WallRack[]>([]);
    const [openRacks, setOpenRacks] = useState<OpenRack[]>([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                if (category === 'data-center-copper-cable') {
                    const response = await axios.get('/data/enterpriseCables.json');
                    setEnterpriseCables(response.data);
                } else if (category === 'floor-standing') {
                    const response = await axios.get('/api/floor-standing-racks');
                    setFloorStandingRacks(response.data);
                } else if (category === 'wall-frames') {
                    const response = await axios.get('/api/wall-racks');
                    setWallRacks(response.data);
                } else if (category === 'open-racks') {
                    const response = await axios.get('/api/open-racks');
                    setOpenRacks(response.data);
                } else {
                    const response = await axios.get('/data/productCategories.json');
                    const products = response.data;
                    const matchingProduct = products.find(
                        (p: ProductCategory) => p.title.toLowerCase().replace(/\s+/g, '-') === category
                    );

                    if (!matchingProduct) {
                        router.push('/products');
                        return;
                    }

                    setProductData(matchingProduct);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                router.push('/products');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [category, router]);

    // Handle back navigation
    const handleBack = () => {
        router.push('/');
        setShowSelectedCategory(false);
    };
    const handleCategoryBack = () => {
        router.push('/products/products-enterprises');
        setShowSelectedCategory(false);
    };
    const handleCategoryClick = (category: DefaultCategory) => {
        setSelectedDefaultCategory(category);
        setShowSelectedCategory(true);
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const renderDefaultCategoriesList = () => (
        <div className="min-h-screen bg-gray-50 font-inter">
            <section className="relative h-[275px] bg-gradient-to-r from-blue-900 to-blue-600 text-white flex items-center justify-center mb-12">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="relative z-10 mt-[2rem] text-center px-4 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Connectors, Products & Enterprises
                    </h1>
                    <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Discover high-performance products designed for modern infrastructure.
                    </p>
                </div>
            </section>
            <>
                {/* Cards Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {defaultCategories?.map((category: any, idx: number) => (
                            <div
                                key={idx}
                                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full flex flex-col"
                            >
                                <div className="relative aspect-[4/3]">
                                    <Image
                                        src={category?.image}
                                        alt={category?.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-lg md:text-xl font-bold text-white">{category?.title}</h3>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <p className="text-gray-600 mb-4 text-base leading-relaxed line-clamp-2 flex-1">{category.description}</p>
                                    <button
                                        onClick={() => handleCategoryClick(category)}
                                        className="px-4 py-2 bg-blue-100 text-blue-900 rounded-lg hover:bg-blue-200 transition-colors font-medium mt-auto"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        </div>
    );


    const renderDefaultCategoryDetail = () => {
        if (selectedDefaultCategory) {
            return (
                <>
                    <section className="relative h-[275px] bg-gradient-to-r from-blue-900 to-blue-600 text-white flex items-center justify-center mb-12">
                        <div className="absolute inset-0 bg-black opacity-40"></div>
                        <div className="relative z-10 mt-[2rem] text-center px-4 animate-fade-in">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                                Connectors, Products & Enterprises
                            </h1>
                            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                                Discover high-performance products designed for modern infrastructure.
                            </p>
                        </div>
                    </section>
                    <div className="max-width-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <button
                            onClick={handleCategoryBack}
                            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors mb-8"
                        >
                            <FaArrowLeft />
                            <span>Back to Products & Enterprises</span>
                        </button>
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <div className="flex flex-col md:flex-row md:space-x-8">
                                <div className="md:w-1/2 relative aspect-[4/3] mb-6 md:mb-0">
                                    <Image
                                        src={selectedDefaultCategory.image}
                                        alt={selectedDefaultCategory.title}
                                        fill
                                        className="object-cover rounded-lg"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="md:w-1/2">
                                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedDefaultCategory.title}</h1>
                                    <p className="text-gray-700 mb-6 text-lg leading-relaxed">{selectedDefaultCategory.detailedDescription}</p>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Features</h3>
                                    <ul className="space-y-2 mb-6">
                                        {selectedDefaultCategory?.features?.map((feature: string, idx: number) => (
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
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Specifications</h3>
                                    <div className="bg-gray-50 rounded-lg p-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {selectedDefaultCategory?.specifications &&
                                                Object.entries(selectedDefaultCategory?.specifications).map(([key, value]: [string, unknown], idx: number) => (
                                                    <div key={idx} className="border-b border-gray-200 pb-3">
                                                        <h4 className="font-medium text-gray-900">{key}</h4>
                                                        <p className="text-gray-600 mt-1">{String(value)}</p>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Additional Images */}
                            {selectedDefaultCategory?.additionalImages && selectedDefaultCategory?.additionalImages?.length > 0 && (
                                <div className="mt-10">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Gallery</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {selectedDefaultCategory?.additionalImages?.map((img: string, idx: number) => (
                                            <div key={idx} className="relative h-48 rounded-lg overflow-hidden">
                                                <Image
                                                    src={img}
                                                    alt={`${selectedDefaultCategory?.title} - Image ${idx + 1}`}
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

                </>
            )
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 font-inter flex items-center justify-center">
                <Navbar />
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading product details...</p>
                </div>
            </div>
        );
    }

    // Handle products-enterprises view
    if (category === 'products-enterprises') {
        return (
            <div className="min-h-screen bg-gray-50 font-inter">
                <Navbar />
                {showSelectedCategory ? renderDefaultCategoryDetail() : renderDefaultCategoriesList()}
                <Footer />
            </div>
        );
    }

    // Handle floor standing racks view
    if (category === 'floor-standing') {
        return (
            <div className="min-h-screen bg-gray-50 font-inter">
                <Navbar />
                <section className="relative h-[275px] bg-gradient-to-r from-blue-900 to-blue-600 text-white flex items-center justify-center mb-12">
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                    <div className="relative z-10 mt-[2rem] text-center px-4 animate-fade-in">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                            Floor Standing Racks
                        </h1>
                        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Bulk pack of floor standing racks with tool-less termination and enhanced performance.
                        </p>
                    </div>
                </section>
                <div className="pt-0">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <button
                            onClick={handleBack}
                            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors mb-8"
                        >
                            <FaArrowLeft />
                            <span>Back to Products</span>
                        </button>
                        <FloorStandingRacks racks={floorStandingRacks} />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // Handle wall racks view
    if (category === 'wall-frames') {
        return (
            <div className="min-h-screen bg-gray-50 font-inter">
                <Navbar />
                <section className="relative h-[275px] bg-gradient-to-r from-blue-900 to-blue-600 text-white flex items-center justify-center mb-12">
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                    <div className="relative z-10 mt-[2rem] text-center px-4 animate-fade-in">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                            Wall Frames
                        </h1>
                        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Professional wall frames for efficient space utilization.
                        </p>
                    </div>
                </section>
                <div className="pt-0">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <button
                            onClick={handleBack}
                            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors mb-8"
                        >
                            <FaArrowLeft />
                            <span>Back to Racks & Cabinets</span>
                        </button>
                        <WallRacks racks={wallRacks} />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // Handle open racks view
    if (category === 'open-racks') {
        return (
            <div className="min-h-screen bg-gray-50 font-inter">
                <Navbar />
                <section className="relative h-[275px] bg-gradient-to-r from-blue-900 to-blue-600 text-white flex items-center justify-center mb-12">
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                    <div className="relative z-10 mt-[2rem] text-center px-4 animate-fade-in">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                            Open Racks
                        </h1>
                        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Open racks for flexible and adaptable storage solutions.
                        </p>
                    </div>
                </section>
                <div className="pt-0">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <button
                            onClick={handleBack}
                            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors mb-8"
                        >
                            <FaArrowLeft />
                            <span>Back to Racks & Cabinets</span>
                        </button>
                        <OpenRacks racks={openRacks} />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // Handle product category view
    if (!productData) {
        return (
            <div className="min-h-screen bg-gray-50 font-inter">
                <Navbar />
                <div className="pt-20 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
                    <p className="mt-4 text-gray-600">The requested product category could not be found.</p>
                    <button
                        onClick={handleBack}
                        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Return to Products
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            <Navbar />
            <div className="pt-20 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <button
                        onClick={handleBack}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors mb-8"
                    >
                        <FaArrowLeft />
                        <span>Back to Products</span>
                    </button>

                    {/* Product Details */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <div className="flex flex-col md:flex-row md:space-x-8">
                            <div className="md:w-1/2 relative aspect-[4/3] mb-6 md:mb-0">
                                <Image
                                    src={productData?.image}
                                    alt={productData?.title}
                                    fill
                                    className="object-cover rounded-lg"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            <div className="md:w-1/2">
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">{productData?.title}</h1>
                                <p className="text-gray-700 mb-6 text-lg leading-relaxed">{productData?.detailedDescription}</p>

                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Features</h3>
                                <ul className="space-y-2 mb-6">
                                    {productData?.features?.map((feature: string, idx: number) => (
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

                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Specifications</h3>
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {Object?.entries(productData?.specifications || {})?.map(([key, value], idx) => (
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
                        {productData?.additionalImages && productData?.additionalImages?.length > 0 && (
                            <div className="mt-10">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Gallery</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {productData?.additionalImages?.map((img, idx) => (
                                        <div key={idx} className="relative h-48 rounded-lg overflow-hidden">
                                            <Image
                                                src={img}
                                                alt={`${productData?.title} - Image ${idx + 1}`}
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
            </div>
            <Footer />
        </div>
    );
} 