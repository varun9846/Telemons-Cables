'use client'
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { signupSchema } from '@/utils/validationSchemas'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useLoader } from '@/context/LoaderContext'
import { toast } from 'react-hot-toast'
import { FaGoogle } from 'react-icons/fa'

export const SignupForm = () => {
  const router = useRouter()
  const { showLoader, hideLoader } = useLoader()

  const handleSignup = async (values: { email: string; password: string }) => {
    try {
      showLoader()
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      })

      if (error) throw error

      toast.success('Check your email to confirm your account')
      router.push('/login')
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      hideLoader()
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-lg shadow-xl p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="/login" className="font-medium text-yellow-600 hover:text-yellow-500">
              Sign in
            </a>
          </p>
        </div>
        <Formik
          initialValues={{ email: '', password: '', confirmPassword: '' }}
          validationSchema={signupSchema}
          onSubmit={handleSignup}
        >
          <Form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <Field
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <Field
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Sign up
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
