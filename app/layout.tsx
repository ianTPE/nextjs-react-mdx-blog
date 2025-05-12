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
  title: "Ian&apos;s Vibe Coding Blog",
  description: "分享技術心得、開發經驗，以及生活中的點點滴滴。使用 Next.js 15、React 和 MDX 構建的現代化部落格。",
  openGraph: {
    title: "Ian&apos;s Vibe Coding Blog",
    description: "分享技術心得、開發經驗，以及生活中的點點滴滴。",
    type: "website",
    siteName: "Ian&apos;s Vibe Coding Blog",
    locale: "zh_TW",
    images: [{
      url: "/images/default-og-image.png",
      width: 1200,
      height: 630,
      alt: "Ian&apos;s Vibe Coding Blog"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ian&apos;s Vibe Coding Blog",
    description: "分享技術心得、開發經驗，以及生活中的點點滴滴。",
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
