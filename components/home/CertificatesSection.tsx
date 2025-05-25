import React from 'react';
import { motion } from 'framer-motion';

const certificates = [
  {
    title: 'Number One Cabling Brand',
    description: 'Leading the industry with innovative and reliable networking solutions.',
    icon: '⭐',
    color: 'from-amber-400 to-amber-500'
  },
  {
    title: 'Sustainable Choice',
    description: '100% Plastic Free Packaging, FSC Certification, EcoVadis Verified and more.',
    icon: '♻️',
    color: 'from-green-400 to-green-500'
  },
  {
    title: '25-Year Warranty',
    description: 'Comprehensive warranty on installations completed by an Excel Partner.',
    icon: '✅',
    color: 'from-blue-400 to-blue-500'
  },
  {
    title: 'CPR-Compliant',
    description: 'Fully CPR-compliant products for safe and secure installations.',
    icon: '🛡️',
    color: 'from-purple-400 to-purple-500'
  },
  {
    title: 'Specialist Support',
    description: 'Expert support tailored to your project needs, from start to finish.',
    icon: '🧑‍🔧',
    color: 'from-red-400 to-red-500'
  }
];

const CertificatesSection: React.FC = () => (
  <section className="bg-gradient-to-br from-gray-900 to-blue-300 py-24 relative overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute inset-0" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23FFFFFF\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      }} />
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Why Choose Telemons?
          </h2>
          <p className="text-xl text-gray-300">
            Trusted. Compliant. Supported.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {certificates.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative"
          >
            <div className="relative bg-gray-800 rounded-2xl p-6 h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-xl overflow-hidden">
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              
              {/* Icon Container */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cert.color} flex items-center justify-center text-3xl mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                {cert.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {cert.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {cert.description}
              </p>

              {/* Bottom Gradient Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-16 text-center"
      >
        <div className="inline-flex items-center space-x-2 text-white bg-gray-800 rounded-full px-6 py-3 hover:bg-gray-700 transition-colors">
          <span className="text-sm font-medium">Discover More Features</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CertificatesSection;
