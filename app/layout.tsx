import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "../styles/globals.css";
import { Toaster } from 'react-hot-toast'
import { LoaderProvider } from '@/context/LoaderContext'
import { AuthProvider } from '@/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Telemons Cable - Industrial Cable Solutions',
  description: 'Leading provider of innovative cable solutions for industries worldwide',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full`}>
        <AuthProvider>
          <LoaderProvider>
            {children}
            <Toaster position="top-right" />
          </LoaderProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
