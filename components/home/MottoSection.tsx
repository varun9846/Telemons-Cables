import React from 'react';
import { motion } from 'framer-motion';

const MottoSection: React.FC = () => (
  <section className="relative py-24 overflow-hidden">
    {/* Background with modern pattern */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-gray-200">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234B5563' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
            Empowering Connectivity,
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              Enabling Innovation
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <p className="text-2xl text-gray-700 font-medium leading-relaxed">
            Telemons Cables is dedicated to delivering world-class networking, data cabling, infrastructure, and telecommunication solutions for the digital age.
          </p>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-px w-32 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          </div>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our mission is to connect people and businesses with reliable, high-performance cabling systems that drive progress and innovation. From enterprise data centers to smart homes, our products are engineered for excellence, sustainability, and future-ready performance—ensuring your network is always a step ahead.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex justify-center gap-6"
        >
          <button className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
            Learn More
          </button>
          <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-colors">
            Contact Us
          </button>
        </motion.div>
      </div>
    </div>
  </section>
);

export default MottoSection; 