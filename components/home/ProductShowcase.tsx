import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const products = [
  {
    title: 'Enterprise Cables',
    description: 'High-performance network cables for enterprise infrastructure',
    image: '/images/products/enterprise-cables.jpg',
    link: '/products/enterprise-cables',
    category: 'Structured Cabling',
    icon: '🔌',
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'Copper Patch Panels',
    description: 'Professional-grade patch panels for optimal network organization',
    image: '/images/products/patch-panels.jpg',
    link: '/products/copper-patch-panels',
    category: 'Network Management',
    icon: '🔧',
    color: 'from-purple-500 to-purple-600'
  },
  {
    title: 'Keystone Jacks',
    description: 'Reliable connectivity solutions for modern networks',
    image: '/images/products/keystone-jacks.jpg',
    link: '/products/keystone-jacks',
    category: 'Connectivity',
    icon: '🔌',
    color: 'from-green-500 to-green-600'
  },
  {
    title: 'Modules & Faceplates',
    description: 'Elegant and functional network access points',
    image: '/images/products/modules-faceplates.jpg',
    link: '/products/modules-faceplates',
    category: 'Installation',
    icon: '🔨',
    color: 'from-amber-500 to-amber-600'
  }
];

const ProductShowcase: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 to-blue-300 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23FFFFFF\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Featured Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto"
          >
            Discover our comprehensive range of networking products designed for reliability and performance
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gradient-to-br from-gray-700 to-blue-600 backdrop-blur-lg rounded-2xl p-8 hover:bg-gradient-to-br hover:from-gray-600 hover:to-blue-500 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{product.icon}</div>
              <h3 className="text-2xl font-semibold text-white mb-4">{product.title}</h3>
              <p className="text-gray-200">{product.description}</p>
              <Link href={product.link} className="mt-6 inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                <span className="text-sm font-medium">Learn More</span>
                <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/products">
            <button className="inline-flex items-center px-8 py-4 border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white rounded-full font-medium transition-all duration-300 group">
              View All Products
              <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase; 