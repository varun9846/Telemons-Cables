// app/test/page.tsx
'use client'
import { MainLayout } from '@/components/layout/MainLayout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

const Test = () => {
  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center">Welcome to Test Page</h1>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default Test;