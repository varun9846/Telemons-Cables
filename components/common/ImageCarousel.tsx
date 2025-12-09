'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const carouselImages = [
  {
    url: '/images/carousel-1.jpg',
    title: 'Innovative Cable Solutions',
    description: 'Leading the industry with cutting-edge technology',
  },
  {
    url: '/images/carousel-2.jpg',
    title: 'Quality & Reliability',
    description: 'Trusted by professionals worldwide',
  },
  {
    url: '/images/carousel-3.jpg',
    title: 'Global Connectivity',
    description: 'Connecting businesses across continents',
  },
]

export const ImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {carouselImages.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image.url}
            alt={image.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
            <h2 className="text-4xl font-bold mb-4">{image.title}</h2>
            <p className="text-xl">{image.description}</p>
          </div>
        </div>
      ))}
      
      {/* Carousel Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? 'bg-yellow-500' : 'bg-white'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
