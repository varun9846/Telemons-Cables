'use client'
import { SignupForm } from '@/components/auth/SignupForm'
import { PublicRoute } from '@/components/auth/PublicRoute'

export default function SignupPage() {
  return (
    <PublicRoute>
      <SignupForm />
    </PublicRoute>
  )
}
