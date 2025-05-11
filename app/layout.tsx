import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Blog - Next.js MDX Blog",
  description: "A modern blog built with Next.js, React, and MDX",
  openGraph: {
    title: "My Blog - Next.js MDX Blog",
    description: "A modern blog built with Next.js, React, and MDX",
    type: "website",
    siteName: "My Blog",
    locale: "zh_TW",
    images: [{
      url: "/images/default-og-image.png",
      width: 1200,
      height: 630,
      alt: "My Blog"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "My Blog - Next.js MDX Blog",
    description: "A modern blog built with Next.js, React, and MDX",
    images: ["/images/default-og-image.png"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-50`}
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
