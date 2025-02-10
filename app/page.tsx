// app/page.tsx
'use client'
import { MainLayout } from '@/components/layout/MainLayout'
import { ImageCarousel } from '@/components/common/ImageCarousel'

export default function Home() {
  return (
    <MainLayout>
      <ImageCarousel />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Welcome to Telemons Cable</h1>
        <p className="text-xl text-gray-600">
          Leading provider of innovative cable solutions for industries worldwide
        </p>
      </div>
    </MainLayout>
  )
}