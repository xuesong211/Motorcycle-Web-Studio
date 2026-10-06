import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '摩托车维修知识库 · 学徒工作台',
  description: '钱江、凯越、升仕官方维修手册蒸馏后的本地学习与诊断工作台。',
  openGraph: {
    title: '摩托车维修知识库',
    description: '钱江、凯越、升仕官方维修手册蒸馏后的学徒诊断工作台。',
    type: 'website',
    locale: 'zh_CN',
    images: [
      {
        url: '/og.png',
        width: 1792,
        height: 1024,
        alt: '摩托车维修知识库 · 学徒诊断工作台',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '摩托车维修知识库',
    description: '官方维修手册蒸馏后的本地学习与诊断工作台。',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
