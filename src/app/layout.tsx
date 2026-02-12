import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bit-box.vercel.app'),
  title: {
    template: "%s | ToolBitBox", // 페이지별 타이틀 뒤에 자동으로 붙음 (예: 진법 변환기 | BitBox)
    default: "ToolBitBox - 컴퓨터 공학/소프트웨어학과 1학년 진법 학습 및 시험 대비 도구", // 기본 타이틀
  },
  description:
    "2진수, 8진수, 16진수 변환부터 2의 보수 계산까지. 컴퓨터 공학/소프트웨어학과 1학년 학생들이 진법 변환, 2의 보수 등 개념을 학습하고 시험을 대비하는 데 최적화된 웹 유틸리티입니다.",
  keywords: [
    "컴퓨터 공학 1학년 진법 변환",
    "소프트웨어학과 2진수",
    "N진법 계산기 시험 대비",
    "2의 보수 개념 학습",
    "진법 퀴즈 대학생",
    "컴퓨터 구조 진법",
    "시스템 프로그래밍 진법",
    "ToolBitBox",
    "진법 변환기",
    "2진수 변환",
    "16진수 계산",
    "2의 보수",
    "정보처리기사 진법 변환",
  ],
  authors: [{ name: "ToolBitBox Team" }],
  creator: "ToolBitBox Team",
  verification: {
    google: "wD1i8ns0RmEvTKPEiElHXByzNaW_HYA_UHiGv-XidUU",
  },
  openGraph: {
    title: "ToolBitBox - 개발자를 위한 스마트 도구 상자",
    description:
      "복잡한 계산은 ToolBitBox에 맡기세요. 빠르고 정확한 개발자용 도구 모음.",
    url: "https://bit-box.vercel.app",
    siteName: "ToolBitBox",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  );
}
