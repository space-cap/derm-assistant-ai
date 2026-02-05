import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Derm Assistant AI - 피부과 온보딩 플랫폼",
    template: "%s | Derm Assistant AI",
  },
  description:
    "신입 피부과 직원을 위한 지능형 온보딩 플랫폼. 복잡한 진료 수가와 시술 정보를 쉽게 학습하세요.",
  keywords: [
    "피부과",
    "온보딩",
    "진료 수가",
    "시술 가이드",
    "보톡스",
    "필러",
    "리프팅",
    "스킨부스터",
  ],
  authors: [{ name: "Derm Assistant AI Team" }],
  creator: "Derm Assistant AI",
  publisher: "Derm Assistant AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://derm-assistant.vercel.app",
    title: "Derm Assistant AI - 피부과 온보딩 플랫폼",
    description:
      "신입 피부과 직원을 위한 지능형 온보딩 플랫폼. 복잡한 진료 수가와 시술 정보를 쉽게 학습하세요.",
    siteName: "Derm Assistant AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Derm Assistant AI - 피부과 온보딩 플랫폼",
    description:
      "신입 피부과 직원을 위한 지능형 온보딩 플랫폼. 복잡한 진료 수가와 시술 정보를 쉽게 학습하세요.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col bg-gray-50 font-sans antialiased">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

