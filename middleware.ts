import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession()

  // Get the pathname of the request
  const { pathname } = req.nextUrl

  // Define public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/signup', '/auth/callback']
  
  // Define protected routes that require authentication
  const protectedRoutes = ['/test', '/dashboard', '/profile']
  
  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))
  
  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  // Get the user's session
  const { data: { session } } = await supabase.auth.getSession()
  
  // If the user is not authenticated and trying to access a protected route,
  // redirect them to the home page
  if (!session && isProtectedRoute) {
    const redirectUrl = new URL('/', req.url)
    return NextResponse.redirect(redirectUrl)
  }
  
  // If the user is authenticated and trying to access auth routes (login/signup),
  // redirect them to the dashboard
  if (session && (pathname === '/login' || pathname === '/signup')) {
    const redirectUrl = new URL('/test', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

// Specify which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
} 