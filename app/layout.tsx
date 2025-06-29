import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import "@xyflow/react/dist/style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

// 聲明字體並匯出變數
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 使字體類別更易讀
const fontClasses = `${geistSans.variable} ${geistMono.variable} antialiased`;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://citrine.top'),
  title: "Citrine.top",
  description: "分享技術心得、開發經驗，以及生活中的點點滴滴。使用 Next.js 15、React 和 MDX 構建的現代化部落格。",
  openGraph: {
    title: "Citrine.top",
    description: "分享技術心得、開發經驗，以及生活中的點點滴滴。",
    type: "website",
    siteName: "Citrine.top",
    locale: "zh_TW",
    images: [{
      url: "/images/default-og-image.webp",
      width: 1200,
      height: 630,
      alt: "Citrine.top"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Citrine.top",
    description: "分享技術心得、開發經驗，以及生活中的點點滴滴。",
    images: ["/images/default-og-image.webp"]
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
        className={`${fontClasses} min-h-screen flex flex-col bg-gray-50`}
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
