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
    // icon: '🔌',
    color: 'from-telemons-blue-primary to-telemons-blue-dark'
  },
  {
    title: 'Copper Patch Panels',
    description: 'Professional-grade patch panels for optimal network organization',
    image: '/images/products/patch-panels.jpg',
    link: '/products/copper-patch-panels',
    category: 'Network Management',
    // icon: '🔧',
    color: 'from-telemons-orange-primary to-telemons-orange-dark'
  },
  {
    title: 'Keystone Jacks',
    description: 'Reliable connectivity solutions for modern networks',
    image: '/images/products/keystone-jacks.jpg',
    link: '/products/keystone-jacks',
    category: 'Connectivity',
    // icon: '🔌',
    color: 'from-telemons-blue-primary to-telemons-blue-600'
  },
  {
    title: 'Modules & Faceplates',
    description: 'Elegant and functional network access points',
    image: '/images/products/modules-faceplates.jpg',
    link: '/products/modules-faceplates',
    category: 'Installation',
        // icon: '🔨',
    color: 'from-telemons-orange-primary to-telemons-orange-600'
  }
];

const ProductShowcase: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-telemons-blue-900 via-telemons-blue-800 to-telemons-blue-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23FFFFFF\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-24 h-24 bg-telemons-orange-primary/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-telemons-blue-primary/15 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-20 w-20 h-20 bg-telemons-orange-primary/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-32 w-12 h-12 bg-telemons-blue-primary/20 rounded-full animate-ping"></div>
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
            className="text-xl text-telemons-blue-100 max-w-3xl mx-auto"
          >
            Discover our comprehensive range of networking products designed for reliability and performance
          </motion.p>
          
          {/* Decorative line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-1 bg-telemons-orange-primary mx-auto mt-6 rounded-full"
          ></motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
            >
              <div className={`bg-gradient-to-br ${product.color} backdrop-blur-lg rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/10`}>
                {/* <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{product.icon}</div> */}
                <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-telemons-orange-100 transition-colors duration-300">{product.title}</h3>
                <p className="text-telemons-blue-100 mb-6">{product.description}</p>
                
                {/* Category badge */}
                <div className="inline-block bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
                  {product.category}
                </div>
                
                <Link href={product.link} className="inline-flex items-center text-telemons-orange-200 hover:text-white transition-colors duration-300 group/link">
                  <span className="text-sm font-medium">Learn More</span>
                  <svg className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-telemons-orange-primary/20 to-telemons-blue-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
            <button className="inline-flex items-center px-8 py-4 border-2 border-telemons-orange-primary text-telemons-orange-primary hover:bg-telemons-orange-primary hover:text-white rounded-full font-semibold transition-all duration-300 group shadow-lg hover:shadow-xl transform hover:-translate-y-1">
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