import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { Inter, Poppins } from 'next/font/google'
import ErrorBoundary from '@/components/ErrorBoundary'
const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ 
  weight: '700',
  subsets: ['latin'],
  variable: '--font-poppins'
})
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GFS",
  description: "Green Food Seller",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased ${inter.className}`}
      >
        <Toaster />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
