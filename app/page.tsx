// app/page.tsx
'use client'
import { MainLayout } from '@/components/layout/MainLayout'
import { ImageCarousel } from '@/components/common/ImageCarousel'
import CertificatesSection from '@/components/home/CertificatesSection'
import InnovationSection from '@/components/home/InnovationSection'
import ProductShowcase from '@/components/home/ProductShowcase'
import MottoSection from '@/components/home/MottoSection'
import ProductsMarketsSection from '@/components/home/ProductsMarketsSection'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

export default function Home() {
  return (
    <MainLayout>
      <ImageCarousel />
      <InnovationSection />
      <ProductShowcase />
      <CertificatesSection />
      <MottoSection />
      <ProductsMarketsSection />
    </MainLayout>
  )
}