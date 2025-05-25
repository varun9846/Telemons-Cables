import React from 'react';
import { motion } from 'framer-motion';

const productCategories = [
  {
    title: 'Copper Solutions',
    description: 'High-performance copper cabling for enterprise and data center networks.',
    icon: '🔌',
    color: 'from-amber-500 to-amber-600'
  },
  {
    title: 'Fibre Solutions',
    description: 'Cutting-edge fiber optic solutions for ultra-fast connectivity.',
    icon: '💡',
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'Rack Solutions',
    description: 'Robust racks and cabinets for secure, scalable infrastructure.',
    icon: '🏗️',
    color: 'from-gray-700 to-gray-800'
  },
  {
    title: 'FTTx Solutions',
    description: 'Future-ready FTTx products for next-generation broadband.',
    icon: '🌐',
    color: 'from-green-500 to-green-600'
  },
  {
    title: 'Power Solutions',
    description: 'Reliable power distribution and management for all environments.',
    icon: '⚡',
    color: 'from-red-500 to-red-600'
  },
];

const markets = [
  {
    title: 'Data Centres',
    description: 'Optimized cabling and infrastructure for mission-critical data centers.',
    icon: '💻',
    color: 'from-purple-500 to-purple-600'
  },
  {
    title: 'Enterprise',
    description: 'Comprehensive solutions for modern business networks.',
    icon: '🏢',
    color: 'from-blue-600 to-blue-700'
  },
  {
    title: 'Education',
    description: 'Secure, scalable networks for schools and universities.',
    icon: '🎓',
    color: 'from-green-600 to-green-700'
  },
  {
    title: 'Healthcare',
    description: 'Reliable connectivity for hospitals and medical facilities.',
    icon: '🏥',
    color: 'from-red-600 to-red-700'
  },
  {
    title: 'Residential',
    description: 'Smart home cabling and networking for connected living.',
    icon: '🏠',
    color: 'from-amber-600 to-amber-700'
  },
];

const ProductsMarketsSection: React.FC = () => (
  <section className="relative bg-gray-900 py-24 overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute inset-0" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23FFFFFF\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      }} />
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Solutions & Markets
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Delivering excellence across diverse industries with our comprehensive range of networking solutions
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Product Categories */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold text-white mb-8">Product Categories</h3>
          <div className="grid gap-6">
            {productCategories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative bg-gray-800 rounded-xl p-6 overflow-hidden hover:scale-[1.02] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="flex items-start gap-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${cat.color} text-white text-2xl`}>
                    {cat.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{cat.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{cat.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Markets */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold text-white mb-8">Markets We Serve</h3>
          <div className="grid gap-6">
            {markets.map((market, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative bg-gray-800 rounded-xl p-6 overflow-hidden hover:scale-[1.02] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="flex items-start gap-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${market.color} text-white text-2xl`}>
                    {market.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{market.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{market.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default ProductsMarketsSection; 