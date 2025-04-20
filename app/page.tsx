// app/page.tsx
'use client'
import { MainLayout } from '@/components/layout/MainLayout'
import { ImageCarousel } from '@/components/common/ImageCarousel'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

export default function Home() {

  return (
    <MainLayout>
      <ImageCarousel />
    </MainLayout>
  )
}