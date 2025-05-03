'use client'

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaNetworkWired, FaServer, FaTools, FaPowerOff, FaArrowLeft } from 'react-icons/fa';
import { MdCable, MdStorage } from 'react-icons/md';
import { Footer } from '@/components/common/Footer';
import { Navbar } from '@/components/common/Navbar';
import EnterpriseCables from '@/components/products/EnterpriseCables'

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

// Helper function to render the icon based on type
const renderIcon = (iconType: string, iconColor: string) => {
  // Map of icon types to their components
  const iconMap: { [key: string]: JSX.Element } = {
    'MdCable': <MdCable className={`w-10 h-10 ${iconColor}`} />,
    'FaServer': <FaServer className={`w-10 h-10 ${iconColor}`} />,
    'MdStorage': <MdStorage className={`w-10 h-10 ${iconColor}`} />,
    'FaPowerOff': <FaPowerOff className={`w-10 h-10 ${iconColor}`} />,
    'FaTools': <FaTools className={`w-10 h-10 ${iconColor}`} />,
    'FaNetworkWired': <FaNetworkWired className={`w-10 h-10 ${iconColor}`} />
  };

  return iconMap[iconType] || null;
};

export default function ProductsPage() {
  // State for product categories data
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const [defaultCategories, setDefaultCategories] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  // State to track if we're in detailed view mode (via hash)
  const [detailedView, setDetailedView] = useState<boolean>(false);
  // State for filtered categories based on hash
  const [filteredCategories, setFilteredCategories] = useState<ProductCategory[]>([]);
  // For header title when filtering
  const [filterTitle, setFilterTitle] = useState<string>('');
  // Loading state
  const [loading, setLoading] = useState<boolean>(true);
  const [enterpriseCables, setEnterpriseCables] = useState<EnterpriseCable[]>([]);
  const [selectedDefaultCategory, setSelectedDefaultCategory] = useState<any | null>(null);
  const [showDefaultCategories, setShowDefaultCategories] = useState(false);

  // Fetch enterprise cables data
  const fetchEnterpriseCables = useCallback(async () => {
    try {
      const response = await axios.get('/data/enterpriseCables.json');
      if (response.status !== 200) {
        throw new Error(`Failed to fetch enterprise cables: ${response.status}`);
      }
      setEnterpriseCables(response.data);
      setFilteredCategories([]); // Clear other categories
      setFilterTitle('Enterprise Data Center Copper Cable');
      setDetailedView(false);
    } catch (error) {
      console.error('Error fetching enterprise cables:', error);
    }
  }, []);

  // Fetch product categories data from JSON file
  const fetchProductData = useCallback(async () => {
    try {
      const response = await axios.get('/data/productCategories.json');
      if (response.status !== 200) {
        throw new Error(`Failed to fetch product data: ${response.status}`);
      }
      const data = response.data;
      setProductCategories(data);

      // Set initial active category
      if (data.length > 0) {
        setActiveCategory(data[0].title);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching product data:', error);
      setLoading(false);
    }
  }, []);
  const fetchDefaultCategories = useCallback(async () => {
    try {
      const response = await axios.get('/data/defaultCategories.json');
      if (response.status !== 200) {
        throw new Error(`Failed to fetch default categories: ${response.status}`);
      }
      const data = response.data;
      setDefaultCategories(data || []);
    } catch (error) {
      console.error('Error fetching default categories:', error);
      setDefaultCategories([]);
    }
  }, []);

  useEffect(() => {
    fetchProductData();
    fetchDefaultCategories();
  }, [fetchProductData, fetchDefaultCategories]);

  // Find the active category object
  const activeCategoryObj = productCategories.find(cat => cat.title === activeCategory) || (productCategories.length > 0 ? productCategories[0] : null);

  // Effect to handle hash changes for product navigation
  useEffect(() => {
    // Function to handle hash change and set the active product
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');

      // Reset filtered categories when no hash
      if (!hash) {
        setFilteredCategories(productCategories);
        setFilterTitle('');
        setDetailedView(false);
        return;
      }

      // If hash exists and matches a product title (URL encoded)
      if (hash && productCategories.length > 0) {
        // Decode the URL-encoded hash to match product titles
        const decodedHash = decodeURIComponent(hash);

        // Check if hash is a filter category (copper-systems, fiber-optic-systems, etc.)
        if (decodedHash === 'copper-systems') {
          // Filter for copper-related products
          const copperProducts = productCategories.filter(
            cat => cat.title.includes('Copper') || cat.title.includes('TX6') || cat.title === 'Patch Cords'
          );
          setFilteredCategories(copperProducts);
          setFilterTitle('Copper Systems');
          setDetailedView(false);

          // Set active category to the first copper product
          if (copperProducts.length > 0) {
            setActiveCategory(copperProducts[0].title);
          }
          return;
        }

        if (decodedHash === 'products-enterprises') {
          setFilterTitle('Products & Enterprises');
        }

        if (decodedHash === 'fiber-optic-systems') {
          // Filter for fiber-related products
          const fiberProducts = productCategories.filter(
            cat => cat.title.includes('Fiber')
          );
          setFilteredCategories(fiberProducts);
          setFilterTitle('Fiber Optic Systems');
          setDetailedView(false);

          // Set active category to the first fiber product
          if (fiberProducts.length > 0) {
            setActiveCategory(fiberProducts[0].title);
          }
          return;
        }

        if (decodedHash === 'grounding-bonding') {
          // Filter for grounding-related products
          const groundingProducts = productCategories.filter(
            cat => cat.title.includes('Grounding')
          );
          setFilteredCategories(groundingProducts);
          setFilterTitle('Grounding & Bonding');
          setDetailedView(false);

          // Set active category to the first grounding product
          if (groundingProducts.length > 0) {
            setActiveCategory(groundingProducts[0].title);
          }
          return;
        }

        // Check for specific product types like bulk-copper-cable
        if (decodedHash === 'bulk-copper-cable') {
          const bulkCopperProducts = productCategories.filter(
            cat => cat.title.includes('Bulk Copper')
          );
          setFilteredCategories(bulkCopperProducts);
          setFilterTitle('Bulk Copper Cable');
          setDetailedView(false);

          // Set active category to the first bulk copper product
          if (bulkCopperProducts.length > 0) {
            setActiveCategory(bulkCopperProducts[0].title);
          }
          return;
        }

        // Handle detailed view for a specific product
        const matchingProduct = productCategories.find(
          cat => cat.title.toLowerCase().replace(/\s+/g, '-') === decodedHash
        );

        if (matchingProduct) {
          setActiveCategory(matchingProduct.title);
          setDetailedView(true);
        } else {
          // No match, show all products
          setFilteredCategories(productCategories);
          setFilterTitle('');
        }

        if (decodedHash === 'data-center-copper-cable') {
          fetchEnterpriseCables();
          return
        }
      }
    };

    // Only set up hash change handling if products are loaded
    if (!loading && productCategories.length > 0) {
      // Set initial filtered categories
      setFilteredCategories(productCategories);

      // Call once on mount
      handleHashChange();

      // Add event listener for hash changes
      window.addEventListener('hashchange', handleHashChange);

      // Cleanup listener on unmount
      return () => {
        window.removeEventListener('hashchange', handleHashChange);
      };
    }
  }, [loading, productCategories, fetchEnterpriseCables]);

  // Hash handling for products-enterprises
  useEffect(() => {
    const handleHash = () => {
      setShowDefaultCategories(window.location.hash === '#products-enterprises');
      setSelectedDefaultCategory(null);
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Function to navigate to a product's detailed view
  const navigateToProduct = (category: ProductCategory) => {
    // Create a URL-friendly version of the title
    const urlFriendlyTitle = category.title.toLowerCase().replace(/\s+/g, '-');
    window.location.hash = urlFriendlyTitle;
    setActiveCategory(category.title);
    setDetailedView(true);
    // Scroll to the top of the detailed view container after a short delay
    setTimeout(() => {
      const detailedViewContainer = document.querySelector('.pt-20'); // Or a more specific selector if needed
      if (detailedViewContainer) {
        detailedViewContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Fallback to scrolling to the very top of the window
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100); // Adjust the delay if needed
  };

  // Function to go back to products list
  const goBackToProducts = () => {
    // If we're in a filtered view, go back to that filter
    if (filterTitle) {
      const filterHash = filterTitle.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
      window.location.hash = filterHash;
    } else {
      window.location.hash = '';
    }
    setDetailedView(false);
  };

  // Helper: Render defaultCategories list view
  const renderDefaultCategoriesList = () => (
    <>
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-blue-900 to-blue-600 text-white flex items-center justify-center mb-12">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Products & Enterprises
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover high-performance products designed for modern infrastructure.
          </p>
        </div>
      </section>
      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {defaultCategories.map((category: any, idx: number) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full flex flex-col"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg md:text-xl font-bold text-white">{category.title}</h3>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-gray-600 mb-4 text-base leading-relaxed line-clamp-2 flex-1">{category.description}</p>
                <button
                  onClick={() => setSelectedDefaultCategory(category)}
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
  );

  // Helper: Render defaultCategory detail view
  const renderDefaultCategoryDetail = () => (
    <div className="max-width-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <button
        onClick={() => setSelectedDefaultCategory(null)}
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
              {selectedDefaultCategory.features.map((feature: string, idx: number) => (
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
                {selectedDefaultCategory.specifications &&
                  Object.entries(selectedDefaultCategory.specifications).map(([key, value]: [string, unknown], idx: number) => (
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
        {selectedDefaultCategory.additionalImages && selectedDefaultCategory.additionalImages.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedDefaultCategory.additionalImages.map((img: string, idx: number) => (
                <div key={idx} className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src={img}
                    alt={`${selectedDefaultCategory.title} - Image ${idx + 1}`}
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
  );

  // Display loading state if products are not yet loaded
  if (loading || !activeCategoryObj) {
    return (
      <div className="min-h-screen bg-gray-50 font-inter flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  // Categories to display based on filtering
  const displayCategories = filteredCategories.length > 0 ? defaultCategories : defaultCategories;

  // If hash is #products-enterprises, show defaultCategories content
  if (showDefaultCategories) {
    return (
      <div className="min-h-screen bg-gray-50 font-inter">
        <Navbar />
        {selectedDefaultCategory ? renderDefaultCategoryDetail() : renderDefaultCategoriesList()}
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Navbar */}
      <Navbar />

      {detailedView ? (
        // Detailed Product View
        <div className="pt-20 pb-16">
          {/* Product Details Component */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <button
              onClick={goBackToProducts}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors mb-8"
            >
              <FaArrowLeft />
              <span>Back to Products</span>
            </button>

            {/* Hero Section */}
            <div className="relative h-[400px] rounded-xl overflow-hidden mb-12">
              <Image
                src={activeCategoryObj.image}
                alt={activeCategoryObj.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg">
                    {renderIcon(activeCategoryObj.iconType, activeCategoryObj.iconColor)}
                  </div>
                  <h1 className="text-4xl font-bold">{activeCategoryObj.title}</h1>
                </div>
                <p className="text-lg max-w-2xl">{activeCategoryObj.description}</p>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left Column - Specifications */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Overview</h2>
                  <p className="text-gray-700 mb-8 leading-relaxed">
                    {activeCategoryObj.detailedDescription}
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Features</h3>
                  <ul className="space-y-3 mb-8">
                    {activeCategoryObj.features.map((feature, idx) => (
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

                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Specifications</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeCategoryObj.specifications &&
                        Object.entries(activeCategoryObj.specifications).map(([key, value], idx) => (
                          <div key={idx} className="border-b border-gray-200 pb-3">
                            <h4 className="font-medium text-gray-900">{key}</h4>
                            <p className="text-gray-600 mt-1">{value}</p>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Additional Images & CTA */}
              <div>
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Product Gallery</h3>
                  <div className="space-y-4">
                    {activeCategoryObj.additionalImages?.map((img, idx) => (
                      <div key={idx} className="relative h-48 rounded-lg overflow-hidden">
                        <Image
                          src={img}
                          alt={`${activeCategoryObj.title} - Image ${idx + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Box */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg p-6 text-white">
                  <h3 className="text-xl font-semibold mb-4">Interested in this product?</h3>
                  <p className="mb-6">Contact our sales team for pricing, availability, and customized solutions.</p>
                  <button className="w-full bg-white text-blue-700 py-3 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                    Request Quote
                  </button>
                </div>
              </div>
            </div>

            {/* Related Products */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayCategories
                  .filter(cat => cat.title !== activeCategoryObj.title)
                  .slice(0, 3)
                  .map((category, index) => (
                    <article
                      key={index}
                      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-blue-200 border border-transparent"
                    >
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={category.image}
                          alt={category.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-lg md:text-xl font-bold text-white">{category.title}</h3>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-600 mb-4 text-base leading-relaxed line-clamp-2">{category.description}</p>
                        <button
                          onClick={() => navigateToProduct(category)}
                          className="px-4 py-2 bg-blue-100 text-blue-900 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </article>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Main Products List View
        <>
          {/* Hero Section */}
          <section className="relative h-[400px] bg-gradient-to-r from-blue-900 to-blue-600 text-white flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="relative z-10 text-center px-4 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                {filterTitle ? filterTitle : 'Explore Our'} <span className="text-blue-300">Networking Solutions</span>
              </h1>
              <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                {filterTitle
                  ? `Browse our ${filterTitle.toLowerCase()} designed for modern infrastructure.`
                  : 'Discover high-performance products designed for modern infrastructure.'}
              </p>
            </div>
          </section>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* <div className="text-center mb-16">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                {'Our'} <span className="text-blue-600">Products</span>
              </h1>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500 leading-relaxed">
                {
                  'Comprehensive suite of networking and data communication solutions designed for the modern infrastructure.'}
              </p>
            </div> */}

            {/* Product Navigation - Only show if not in filtered view or in copper systems view */}
            {(!filterTitle || filterTitle === 'Products & Enterprises') && (
              <div className="flex overflow-x-auto space-x-2 pb-4 mb-16 scrollbar-thin scrollbar-thumb-gray-300">
                {displayCategories?.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCategory(category?.title)}
                    className={`flex items-center px-4 py-2 rounded-lg text-base font-medium transition-all duration-300 ${activeCategory === category?.title
                      ? 'bg-blue-100 text-blue-900 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    aria-label={`Select ${category?.title}`}
                  >
                    <span className="mr-2">{renderIcon(category.iconType, category.iconColor)}</span>
                    <span>{category?.title}</span>
                  </button>
                ))}
              </div>
            )}
            {filterTitle === 'Enterprise Data Center Copper Cable' && (
              <div className="pt-10">
                <EnterpriseCables cables={enterpriseCables} />
              </div>
            )}
            {filterTitle === 'Products & Enterprises' && (
              <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="md:flex">
                  {/* Category Image */}
                  <div className="md:w-1/2 relative aspect-[4/3] md:aspect-auto">
                    <Image
                      src={activeCategoryObj?.image}
                      alt={activeCategoryObj?.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Category Details */}

                  <div className="md:w-1/2 p-10">
                    <div className="flex items-center mb-6">
                      <div className="mr-4">{renderIcon(activeCategoryObj.iconType, activeCategoryObj.iconColor)}</div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {activeCategoryObj?.title}
                      </h2>
                    </div>

                    <p className="text-gray-600 mb-8 text-base md:text-lg leading-relaxed">
                      {activeCategoryObj?.description}
                    </p>

                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Key Features:</h3>
                    <ul className="space-y-3">
                      {activeCategoryObj?.features?.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-gray-700">
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

                    <div className="mt-10">
                      <button
                        onClick={() => navigateToProduct(activeCategoryObj)}
                        className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg text-lg font-medium"
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                </div>
              </div>

            )}
            {/* All Products Section */}
            {filterTitle === 'Products & Enterprises' && (
              <div className="mt-24">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                  {'Browse All Products'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                  {defaultCategories?.map((category, index) => (
                    <article
                      key={index}
                      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-blue-200 border border-transparent"
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
                      <div className="p-6">
                        <p className="text-gray-600 mb-4 text-base leading-relaxed">{category?.description}</p>
                        <button
                          onClick={() => navigateToProduct(category)}
                          className="px-4 py-2 bg-blue-100 text-blue-900 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}