import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ProfitbaseFloatingWidget } from "@/components/ProfitbaseFloatingWidget";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
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
  title: "ЖК «Крепость» — жилой комплекс в Якутске",
  description:
    "Современный жилой дом с паркингом и коммерческими помещениями в квартале 65 Якутска. 91 квартира, 16 этажей, благоустроенный двор.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteHeader />
        {children}
        <SiteFooter />
        <ProfitbaseFloatingWidget />
      </body>
    </html>
  );
}
