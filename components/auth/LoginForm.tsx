'use client'
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { loginSchema } from '@/utils/validationSchemas'
import { useLoader } from '@/context/LoaderContext'
import { toast } from 'react-hot-toast'
import { FaGoogle } from 'react-icons/fa'
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import Image from 'next/image';


export const LoginForm = () => {
  const router = useRouter()
  const supabase = useSupabaseClient();
  const { showLoader, hideLoader } = useLoader()

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      showLoader()
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })

      if (error) throw error

      toast.success('Logged in successfully')
      router.push('/test')
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      hideLoader()
    }
  }

  const handleGoogleLogin = async () => {
    try {
      showLoader()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_REDIRECT_URL}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })
      if (error) throw error
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      hideLoader()
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-telemons-blue-900 via-telemons-blue-800 to-telemons-blue-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Animated circles representing global connectivity nodes */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-telemons-orange-primary/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-telemons-blue-primary/15 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-20 w-20 h-20 bg-telemons-orange-primary/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-32 w-12 h-12 bg-telemons-blue-primary/20 rounded-full animate-ping"></div>
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 800">
          <defs>
            <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#144F89" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#F58320" stopOpacity="0.1"/>
            </linearGradient>
            <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F58320" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#144F89" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
          <path d="M 50 150 Q 250 100 450 200 T 850 150" stroke="url(#lineGradient1)" strokeWidth="2" fill="none" className="animate-pulse"/>
          <path d="M 150 300 Q 400 250 700 350 T 950 300" stroke="url(#lineGradient2)" strokeWidth="1.5" fill="none" className="animate-pulse"/>
          <path d="M 100 500 Q 300 450 600 550 T 900 500" stroke="url(#lineGradient1)" strokeWidth="1" fill="none" className="animate-pulse"/>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Glass morphism card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
            <div className="relative z-10">
              {/* Header */}
              <div className="flex flex-col items-center mb-8">
                <div className="mb-4 p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                  <Image src="/telemons.jpg" alt="Telemons Cable" width={120} height={48} className="rounded-lg" />
                </div>
                <h2 className="text-center text-3xl font-bold text-white mb-2">
                  Welcome Back
                </h2>
                <p className="text-center text-lg text-telemons-blue-100/80 leading-relaxed">
                  Sign in to access your Telemons dashboard
                </p>
                
                {/* Decorative line */}
                <div className="w-16 h-1 bg-telemons-orange-primary rounded-full mt-4"></div>
              </div>

              {/* Form */}
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginSchema}
                onSubmit={handleLogin}
              >
                <Form className="space-y-6">
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-telemons-blue-100 mb-2">
                        Email Address
                      </label>
                      <Field
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-telemons-blue-200/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-telemons-orange-primary/50 focus:border-telemons-orange-primary/50 transition-all duration-200"
                        placeholder="Enter your email"
                      />
                      <ErrorMessage name="email" component="div" className="text-red-300 text-sm mt-2" />
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-telemons-blue-100 mb-2">
                        Password
                      </label>
                      <Field
                        name="password"
                        type="password"
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-telemons-blue-200/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-telemons-orange-primary/50 focus:border-telemons-orange-primary/50 transition-all duration-200"
                        placeholder="Enter your password"
                      />
                      <ErrorMessage name="password" component="div" className="text-red-300 text-sm mt-2" />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="space-y-4 pt-2">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-base font-medium text-white bg-gradient-to-r from-telemons-blue-primary to-telemons-blue-dark hover:from-telemons-blue-dark hover:to-telemons-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-telemons-orange-primary shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      className="w-full flex justify-center items-center py-3 px-4 border border-white/30 text-white bg-white/10 rounded-xl font-medium text-base hover:bg-white/20 transition-all duration-200 shadow-lg backdrop-blur-sm transform hover:scale-105"
                    >
                      <FaGoogle className="mr-3 text-lg" />
                      Continue with Google
                    </button>
                  </div>

                  {/* Footer */}
                  <div className="text-center pt-4">
                    <p className="text-telemons-blue-100/80">
                      New to Telemons?{' '}
                      <a
                        href="/signup"
                        className="font-medium text-telemons-orange-primary hover:text-telemons-orange-light transition-colors duration-200 underline decoration-telemons-orange-primary/50 hover:decoration-telemons-orange-light"
                      >
                        Create account
                      </a>
                    </p>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>

          {/* Additional connectivity message */}
          <div className="text-center">
            <p className="text-telemons-blue-200/60 text-sm">
              Connecting businesses across continents
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
