import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://readme-generator.vercel.app'),
  title: "README Generator - AI-Powered Documentation Tool",
  description: "Create professional README files with AI-powered content generation using Google Gemini 2.0 Flash. Features smart tech stack badges, live preview, and export options.",
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: '/icon-192.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "README Generator - AI-Powered Documentation Tool",
    description: "Create professional README files with AI-powered content generation using Google Gemini 2.0 Flash.",
    type: "website",
    url: "https://readme-generator.vercel.app",
    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: 'README Generator Icon'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'README Generator - AI-Powered Documentation Tool',
    description: 'Create professional README files with AI-powered content generation using Google Gemini 2.0 Flash.',
    images: ['/icon-512.png']
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
